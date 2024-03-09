const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const db = require("../models/index");
const customerRepo = require("../repositories/customers.repositories")(db);
const employeeService = require("../services/employee.services");
const service = require("../utils/messageHandler");
const { checkUserType } = require("../utils/checkUserType");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateJwtToken");
const userTypeConstant = require("../constants/userType.constant");
const errResponse = new Error();

const handleLogin = async (req, res) => {
  const tr = await db.sequelize.transaction();
  try {
    let userType = checkUserType(req);
    const { username, password } = req.body;
    // console.log('USERNAMEEE', username);

    let userExist = await userType.fileRepo.findOneByIdentifier({
      username: username,
    });

    if (!userExist) {
      errResponse.code = 404;
      errResponse.message = {
        indonesian: "Username tidak ditemukan",
        english: "Username not found",
      };
      throw errResponse;
    }

    userExist = userExist.get({ plain: true });
    const roles = userExist.master_group.employee_group_roles.map(
      (item) => item.group_role_id
    );
    delete userExist.master_group;
    userExist.roles = roles;

    const currentToken = req?.cookies?.token;
    if (currentToken) {
      (errResponse.code = 403),
        (errResponse.message = {
          indonesian: "Anda sudah login",
          english: "You are already logged in",
        });
      throw errResponse;
    }

    const passwordMatch = await bcrypt.compare(password, userExist.password);
    if (!passwordMatch) {
      (errResponse.code = 400),
        (errResponse.message = {
          indonesian: "Password yang anda masukkan salah",
          english: "Invalid password",
        });
      throw errResponse;
    }

    let accessToken;
    if (userType.type === userTypeConstant.CUSTOMER) {
      accessToken = generateAccessToken(
        { username: userExist.username },
        { expiresIn: "5m" }
      );
    } else if (userType.type === userTypeConstant.EMPLOYEE) {
      accessToken = generateAccessToken(
        { username: userExist.username, roles: userExist.roles },
        { expiresIn: "5m" }
      );
    }

    const refreshToken = generateRefreshToken(
      { username: userExist.username },
      { expiresIn: "60m" }
    );

    // Update refresh token
    await userType.fileRepo.updateDataByUsername(
      username,
      {
        refresh_token: refreshToken,
      },
      tr
    );

    const successMsg = {
      indonesian: "Login berhasil",
      english: "Login successful",
    };

    await tr.commit();

    res.cookie("token", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 60 * 60 * 1000,
    });
    res.status(200).send(
      service.jsonSuccess(200, successMsg, {
        access_token: accessToken,
        roles: userExist.roles,
      })
    );
  } catch (error) {
    await tr.rollback();
    service.throwError(res, error);
  }
};

const handleRegister = async (req, res) => {
  const tr = await db.sequelize.transaction();
  try {
    const { name, username, phone_number, email, password } = req.body;

    const usernameExist = await customerRepo.findOneByIdentifier({
      username: username,
    });
    if (usernameExist) {
      (errResponse.code = 400),
        (errResponse.message = {
          indonesian: "Username sudah terdaftar",
          english: "Username already registered",
        });
      throw errResponse;
    }

    const emailExist = await fileRepo.findOneByIdentifier({ email: email });
    if (emailExist) {
      (errResponse.code = 400),
        (errResponse.message = {
          indonesian: "Email sudah terdaftar",
          english: "Email already registered",
        });
      throw errResponse;
    }

    const newData = {
      name: name,
      username: username,
      phone_number: phone_number,
      email: email,
      password: await bcrypt.hash(password, 10),
      active_flag: true,
      points_balance: 0,
      qr_code_data: crypto.randomBytes(64).toString("hex"),
    };

    const data = await customerRepo.createCustomer(newData);
    if (!data) {
      errResponse.code = 500;
      errResponse.message = {
        indonesian: "Registrasi gagal",
        english: "Registration failed",
      };
      throw errResponse;
    }

    const dataToDisplay = {
      username: data.username,
      email: data.email,
    };

    const successMsg = {
      indonesian: "Akun berhasil didaftarkan",
      english: "Account registered successfully",
    };

    res.status(200).send(service.jsonSuccess(200, successMsg, dataToDisplay));
    await tr.commit();
  } catch (error) {
    service.throwError(res, error);
    await tr.rollback();
  }
};

const handleLogout = async (req, res) => {
  const tr = await db.sequelize.transaction();
  try {
    let userType = checkUserType(req);
    const cookies = req?.cookies;

    console.log("COOKIES", cookies.token);
    if (!cookies?.token) {
      (errResponse.code = 401),
        (errResponse.message = {
          indonesian: "Anda tidak memiliki token",
          english: "You don't have any token",
        });
      throw errResponse;
    }

    const refreshToken = cookies.token;
    const userExist = await userType.fileRepo.findOneByIdentifier({
      refresh_token: refreshToken,
    });
    if (!userExist) {
      res.clearCookie("token", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      errResponse.code = 404;
      errResponse.message = {
        indonesian: "User tidak ditemukan",
        english: "User not found",
      };
      throw errResponse;
    }

    await userType.fileRepo.updateDataByUsername(
      userExist.username,
      {
        refresh_token: null,
      },
      tr
    );

    const successMsg = {
      indonesian: "Logout berhasil",
      english: "Logout successful",
    };

    await tr.commit();

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.status(200).send(service.jsonSuccess(200, successMsg));
  } catch (error) {
    await tr.rollback();
    service.throwError(res, error);
  }
};

const handleRefreshToken = async (req, res) => {
  try {
    let userType = checkUserType(req);

    const cookies = req?.cookies;
    if (!cookies?.token) {
      (errResponse.code = 401),
        (errResponse.message = {
          indonesian: "Anda belum login",
          english: "You are not logged in",
        });
      throw errResponse;
    }

    const refreshToken = cookies.token;
    let userExist = await userType.fileRepo.findOneByIdentifier({
      refresh_token: refreshToken,
    });
    userExist = userExist.get({ plain: true });
    const roles = userExist.master_group.employee_group_roles.map(
      (item) => item.group_role_id
    );
    delete userExist.master_group;
    userExist.roles = roles;
    console.log("USEREXIST", userExist);

    if (!userExist) {
      errResponse.code = 404;
      errResponse.message = {
        indonesian: "User tidak ditemukan",
        english: "User not found",
      };
      throw errResponse;
    }

    jwt.verify(
      refreshToken,
      process.env.DPOS_REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || userExist.username !== decoded.username) {
          (errResponse.code = 403),
            (errResponse.message = {
              indonesian: "Token tidak valid",
              english: "Token invalid",
            });
          throw errResponse;
        }

        let accessToken;
        if (userType.type === userTypeConstant.CUSTOMER) {
          accessToken = generateAccessToken(
            { username: decoded.username },
            { expiresIn: "5m" }
          );
        } else if (userType.type === userTypeConstant.EMPLOYEE) {
          accessToken = generateAccessToken(
            { username: decoded.username, roles: userExist.roles },
            { expiresIn: "5m" }
          );
        }

        const successMsg = {
          indonesian: "Refresh token berhasil digenerate",
          english: "Refresh token generated successfully",
        };

        const data = {
          access_token: accessToken,
          ...(userExist.roles && { roles: userExist.roles }),
        };

        res.status(200).send(service.jsonSuccess(200, successMsg, data));
      }
    );
  } catch (error) {
    service.throwError(res, error);
  }
};

module.exports = {
  handleLogin,
  handleRegister,
  handleLogout,
  handleRefreshToken,
};
