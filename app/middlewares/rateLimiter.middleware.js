const { rateLimit } = require('express-rate-limit')

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: 'Too many requests.'
})

module.exports = rateLimiter