/**
 * Created by Uncle Liu on 2018/5/2.
 */
const express = require('express')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const session = require('cookie-session')
//
const { log } = require('./utils')
const { secretKey } = require('./config')
//
const todo = require('./routes/todo')
const index = require('./routes/index')
//
const app = express()
//
app.use(bodyParser.urlencoded({
    extended: true,
}))
//
app.use(session({
    secret: secretKey,
}))
//
const env = nunjucks.configure('templates', {
    autoescape: true,
    express: app,
    noCache: true,
})
//
env.addFilter('formattedTime', (ts) => {
    const formattedTime = require('./filter/formattedTime')
    return formattedTime(ts)
})
//
const asset = __dirname + '/static'
app.use('/static', express.static(asset))
//
app.use('/', index)
app.use('/todo', todo)
//
const run = (port=3000, host='') => {
    const server = app.listen(port, host, () => {
        const address = server.address()
        host = address.address
        port = address.port
        log(`listening server at http://${host}:${port}`)
    })
}

if (require.main === module) {
    const port = 4000
    const host = '0.0.0.0'
    run(port, host)
}