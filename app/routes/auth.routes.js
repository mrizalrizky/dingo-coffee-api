module.exports = (app) => {
    const router = require('express').Router()
    const authController = require('../controllers/auth.controller')

    router.post('/login', authController.handleLogin)
    router.post('/register', authController.handleRegister)
    router.post('/logout', authController.handleLogout)
    router.get('/refresh-token', authController.handleRefreshToken)

    app.use('/api/auth', router)
}