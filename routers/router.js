const router =  require('koa-router')()
module.exports = (app) => {
    router.get( '/index', app.controllers.api.products)
}