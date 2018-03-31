const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
var nunjucks = require('nunjucks')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false,
}))
// 配置模板引擎
nunjucks.configure('templates', {
    autoescape: true,
    express: app,
    noCache: true,
})
// 配置静态文件路径
const asset = path.join(__dirname, 'static')
app.use('/static', express.static(asset))
//
app.get('/', (request, response) => {
    // res.send('你好世界')
    response.render('weather.html')
})

const run = (port='3333', host='') => {
    const server = app.listen(port, host, () => {
        const address = server.address()
        const host = address.address
        const port = address.port
        console.log(`listening at ${host}:${port}`)
    })
}

if(require.main === module) {
    const port = '3333'
    const host = '127.0.0.1'
    run(port, host)
}