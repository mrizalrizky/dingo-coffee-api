module.exports = (app) => {
    const router = require('express').Router()
    const employeeController = require('../controllers/employees.controller')

    router.get('/', employeeController.getAllEmployees)

    app.use('/api/employees', router)
}