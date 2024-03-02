const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../models/index')
const employeesRepo = require('../repositories/employees.repositories')(db)
const service = require('../services/messageHandler')
const errResponse = new Error()

const handleLogin = async (req, res) => {
    const tr = await db.sequelize.transaction()
    try {
        const { username, password } = req.body

        const userExist = await employeesRepo.findOneByIdentifier({ username: username })
        if(!userExist) {
            errResponse.code = 404
            errResponse.message = {
                "indonesian": "Username tidak ditemukan",
                "english": "Username not found"
            }
            throw errResponse
        }

        const currentToken = req?.cookies?.token
        if(currentToken) {
            errResponse.code = 403,
            errResponse.message = {
                "indonesian": "Anda sudah login",
                "english": "You are already logged in"
            }
            throw errResponse
        }

        const passwordMatch = await bcrypt.compare(password, userExist.password)
        if(!passwordMatch) {
            errResponse.code = 400,
            errResponse.message = {
                "indonesian": "Password yang anda masukkan salah",
                "english": "Invalid password"
            }
            throw errResponse
        }
        const accessToken = jwt.sign(
            { username: userExist.username },
            process.env.DPOS_ACCESS_TOKEN_SECRET,
            { expiresIn: '5m'})

        const refreshToken = jwt.sign(
            { username: userExist.username },
            process.env.DPOS_REFRESH_TOKEN_SECRET,
            { expiresIn: '60m'})

        // Update refresh token
        await employeesRepo.updateEmployeeData(username, {
            refresh_token: refreshToken
        }, tr)

        const successMsg = {
            "indonesian": "Login berhasil",
            "english": "Login successful",
        }

        await tr.commit()

        res.cookie('token', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 60 * 60 * 1000 })
        res.status(200).send(service.jsonSuccess(200, successMsg, { access_token: accessToken}))
    } catch (error) {
        service.throwError(res, error)
        await tr.rollback()
    }
}

const handleRegister = async (req, res) => {
    const tr = await db.sequelize.transaction()
    try {
        const { name, username, phone_number, email, password } = req.body

        const usernameExist = await employeesRepo.findOneByIdentifier({ username: username })
        if(usernameExist) {
            errResponse.code = 400,
            errResponse.message = {
                "indonesian": "Username sudah terdaftar",
                "english": "Username already registered"
            }
            throw errResponse
        }

        const emailExist = await employeesRepo.findOneByIdentifier({ email: email })
        if(emailExist) {
            errResponse.code = 400,
            errResponse.message = {
                "indonesian": "Email sudah terdaftar",
                "english": "Email already registered"
            }
            throw errResponse
        }

        const newData = {
            name: name,
            username: username,
            phone_number: phone_number,
            email: email,
            password: await bcrypt.hash(password, 10),
            active_flag: true,
        }

        const data = await employeesRepo.createEmployee(newData)
        if(data) {
            const dataToDisplay = {
                username: data.username,
                email: data.email
            }
            const successMsg = {
                "indonesian": "Akun berhasil didaftarkan",
                "english": "Account registered successfully"
            }

            await tr.commit()
            res.status(200).send(service.jsonSuccess(200, successMsg, dataToDisplay))
        }

    } catch (error) {
        service.throwError(res, error)
        await tr.rollback()
    }
}

const handleLogout = async (req, res) => {
    const tr = await db.sequelize.transaction()
    try {
        const cookies = req?.cookies
        if(!cookies?.token) {
            errResponse.code = 401,
            errResponse.message = {
                "indonesian": "Anda belum login",
                "english": "You are not logged in"
            }
            throw errResponse
        }
        const refreshToken = cookies.token
        const userExist = await employeesRepo.findOneByIdentifier({ refresh_token: refreshToken })
        if(!userExist) {
            res.clearCookie('token', { httpOnly: true, sameSite: 'None', secure: true })
            errResponse.code = 404
            errResponse.message = {
                "indonesian": "User tidak ditemukan",
                "english": "User not found"
            }
            throw errResponse
        }
        
        await employeesRepo.updateEmployeeData(userExist.username, {
            refresh_token: null,
        }, tr)
        
        const successMsg = {
            "indonesian": "Logout berhasil",
            "english": "Logout successful"
        }

        await tr.commit()

        res.clearCookie('token', { httpOnly: true, sameSite: 'None', secure: true })
        res.status(200).send(service.jsonSuccess(200, successMsg))
        
    } catch (error) {
        await tr.rollback()
        service.throwError(res, error)
    }
}

const handleRefreshToken = async (req, res) => {
    try {
        const cookies = req?.cookies
        if(!cookies?.token) {
            errResponse.code = 401,
            errResponse.message = {
                "indonesian": "Anda belum login",
                "english": "You are not logged in"
            }
            throw errResponse
        }

        const refreshToken = cookies.token
        const userExist = await employeesRepo.findOneByIdentifier({ refresh_token: refreshToken })
        if(!userExist) {
            errResponse.code = 404
            errResponse.message = {
                "indonesian": "User tidak ditemukan",
                "english": "User not found"
            }
            throw errResponse
        }

        jwt.verify(refreshToken, process.env.DPOS_REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err || userExist.username !== decoded.username) {
                errResponse.code = 403,
                errResponse.message = {
                    "indonesian": "Token tidak valid",
                    "english": "Token invalid"
                }
                throw errResponse
            }

            const accessToken = jwt.sign(
                { username: decoded.username },
                process.env.DPOS_ACCESS_TOKEN_SECRET,
                { expiresIn: '5m' }
            )

            const successMsg = {
                "indonesian": "Refresh token berhasil digenerate",
                "english": "Refresh token generated",
            }
            res.status(200).send(service.jsonSuccess(200, successMsg, { access_token: accessToken}))
        })

    } catch (error) {
        service.throwError(res, error)
    }
}

module.exports = {
    handleLogin,
    handleRegister,
    handleLogout,
    handleRefreshToken
}