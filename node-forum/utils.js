/**
 * Created by Uncle Liu on 2017/12/25.
 */
const fs = require('fs')
// 放一些工具函数
// 格式化时间
const formattedTime = () => {
    const d = new Date()
    const month = d.getMonth() + 1
    const date = d.getDate() + 1
    const hours = d.getHours()
    const minutes = d.getMinutes()
    const seconds = d.getSeconds()
    //
    const t = `${hours}:${minutes}:${seconds}`
    return t
}
// 用来记录日志的函数
const log = (...args) => {
    const t = formattedTime()
    const arg = [t].concat(args)
    console.log.apply(console, args)
    const content = t + ' ' + args + '\n'
    fs.writeFileSync('log.txt', content, {
        flag: 'a',
    })
}

module.exports = {
    log: log,
}