module.exports = (app) => {
    require('./employees.routes')(app)
    require('./products.routes')(app)
    require('./promotions.routes')(app)
}