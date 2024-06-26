const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const verifyJWT = require('./app/middlewares/verifyJWT.js')
const logger = require('./app/services/logger.js')
const service = require('./app/services/messageHandler.js')
const credentials = require('./app/middlewares/credentials.js')
const corsOptions = require('./app/config/corsOptions.config.js')
const db = require('./app/models/index.js')
require('dotenv').config()

app.use(credentials)

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(logger.printLog())

require('./app/routes/auth.routes.js')(app)

app.get('/api/health-check', (req, res) => {
    res.status(200).send(service.jsonSuccess(200, {
        "indonesian": `API berjalan dalam keadaan sehat pada port ${process.env.PORT}`,
        "english": `API running on port ${process.env.PORT} is healthy`
    })) 
})

app.use('/api/seed-data', async (req, res) => {
    const tr = await db.sequelize.transaction()
    try {
        const rolesData = await db.rolesDB.bulkCreate([
            { name: "Staff" },
            { name: "Supervisor" },
            { name: "Manager" },
            { name: "Admin" }
        ])

        const productsData = await db.productsDB.bulkCreate([
            {
                name: "Coca Cola",
                description: "Deskripsi coca cola",
                price: 10000
            },
            {
                name: "Es teh manis",
                description: "Deskripsi es teh manis",
                price: 7000
            }
        ])

        await tr.commit()
        res.status(200).send("Data seeding succeed")
    } catch (error) {
        await tr.rollback()
        service.throwError(res, error)
    }
})

// app.use(verifyJWT)
require('./app/routes/index.js')(app)


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})