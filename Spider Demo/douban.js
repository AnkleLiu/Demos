"use strict"


const request = require('request')
const cheerio = require('cheerio')

function Movie() {
    this.name = ''
    this.score = 0
    this.quote = ''
    this.ranking = 0
    this.coverUrl = ''
}


const log = function() {
    console.log.apply(console, arguments)
}


const movieFromDiv = function(div) {
    const movie = new Movie()
    const e = cheerio.load(div)
    movie.name = e('.title').text()
    movie.score = e('.rating_num').text()
    movie.quote = e('.inq').text()
    const pic = e('.pic')
    movie.ranking = pic.find('em').text()
    movie.coverUrl = pic.find('img').attr('src')
    return movie
}


const saveMovie = function(movies) {
    const fs = require('fs')
    const path = 'douban.txt'
    const s = JSON.stringify(movies, null, 2)
    fs.writeFile(path, s, function(error) {
        if (error !== null) {
            log('*** 写入文件错误', error)
        } else {
            log('--- 保存成功')
        }
    })
}


const moviesFromUrl = function(url) {
    request(url, function(error, response, body) {
        if (error === null && response.statusCode == 200) {
            const e = cheerio.load(body)
            const movies = []
            const movieDivs = e('.item')
            for(let i = 0; i < movieDivs.length; i++) {
                let element = movieDivs[i]
                const div = e(element).html()
                const m = movieFromDiv(div)
                movies.push(m)
            }
            saveMovie(movies)
        } else {
            log('*** ERROR 请求失败 ', error)
        }
    })
}


const __main = function() {
    const url = 'https://movie.douban.com/top250'
    moviesFromUrl(url)
}

__main()
