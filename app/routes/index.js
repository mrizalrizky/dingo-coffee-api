module.exports = (app) => {
    require('./employees.routes')(app)
    require('./products.routes')(app)
    require('./promotions.routes')(app)
    require('./payment.routes')(app)
    require('./branches.routes')(app)
}