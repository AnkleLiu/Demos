/**
 * Created by Uncle Liu on 2017/12/25.
 */
const express = require('express')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const session = require('cookie-session')
// 解决跨域的
const cors = require('cors')
const { log } = require('./utils')
// 加密的
const { secretKey } = require('./config')

// 初始化一个 express 实例
const app = express()
// 配置 body-parser
app.use(bodyParser.urlencoded({
    extended: false,
}))
// 配置 body-parser 解析 JSON 格式的数据
app.use(bodyParser.json())
// 设置 session
app.use(session({
    secret: secretKey,
}))
// 配置 nunjucks 模板
// 第一个参数是路径，返回一个 nunjucks.Environment 实例
const env = nunjucks.configure('templates', {
    autoescape: true,
    express: app,
    noCache: true,
})
// 配置 nunjucks 自定义的过滤器
env.addFilter('formattedTime', (ts) => {
    const formattedTime = require('./filter/formattedTime')
    const s = formattedTime(ts)
    return s
})
// 配置静态资源文件，js css 图片 等
const asset = __dirname + '/static'
app.use('/static', express.static(asset))
// 页面跳转的时候的提示信息
app.use((request, response, next) => {
    response.locals.flash = request.session.flash
    delete request.session.flash
    next()
})
// 引入路由
const index = require('./routes/index')
const topic = require('./routes/topic')
const { board } = require('./routes/board')
const { user } = require('./routes/user')
const reply = require('./routes/reply')
const apiTopic = require('./api/topic')
// 注册路由
app.use('/', index)
app.use('/board', board)
app.use('/topic', topic)
app.use('/reply', reply)
app.use('/user', user)
app.use('/api/topic', apiTopic)
// 错误处理，放到最后
app.use((request, response) => {
    response.status(404)
    response.render('404.html')
})

app.use((error, request, response) => {
    console.error(error.stack)
    response.status(500)
    response.send('定制的 500 错误')
})

const run = (port = 4000, host = '') => {
    const server = app.listen(port, host, () => {
        const address = server.address()
        host = address.address
        port = address.port
        log(`listening server at http://${host}:${port}`)
    })
}

if (require.main === module) {
    const port = process.env.PORT || 2444
    const host = '0.0.0.0'
    run(port, host)
}
