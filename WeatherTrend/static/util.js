/**
 * Created by Uncle Liu on 2018/1/18.
 */
var log = function() {
    console.log.apply(console, arguments)
}

var e = function(selector) {
    return document.querySelector(selector)
}

var es = function(selector) {
    return document.querySelectorAll(selector)
}

var appendHtml = function(element, html) {
    element.insertAdjacentHTML('beforeend', html)
}

var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

var toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}

var bindAll = function(selector, eventName, callback) {
    var elements = document.querySelectorAll(selector)
    for(var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

// find 函数可以查找 element 的所有子元素
var find = function(element, selector) {
    return element.querySelector(selector)
}

// 定义 ajax 函数
const ajax = (request) => {
    const r = new XMLHttpRequest()
    const method = request.method
    const url = request.url
    r.open(method, url, true)
    const contentType = r.contentType
    if (contentType != undefined) {
        r.setRequestHeader("Content-Type", contentType)
    }
    r.onreadystatechange = () => {
        if (r.readyState == 4) {
            let data = r.responseText
            request.callback(data)
        }
    }
    if (method == "POST") {
        const parseData = JSON.stringify(request.data)
        r.send(parseData)
        return
    }
    r.send()
}