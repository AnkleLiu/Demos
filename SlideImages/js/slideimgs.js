var bindEventSlide = function () {
    var selector = '.slide-button'
    bindAll(selector, 'click', function(event) {
        var slide = event.target.parentElement
        // 拿到当前下标，总长度，计算下一个下标
        var current = Number(slide.dataset.active)
        var length = Number(slide.dataset.imgs)
        // 通过 offset 来确定是上一张还是下一张
        var offset = Number(event.target.dataset.offset)
        var nextIndex = (current + + length + offset) % length
        // 修改 dataset，移除所有的 active，然后给下个 id 的元素添加 active
        slide.dataset.active = nextIndex
        var nextSelector = '#id-image-' + nextIndex
        var className = 'active'
        removeClassAll(className)
        var image = e(nextSelector)
        image.classList.add(className)
        // 下面是小圆点
        var nextIndiSelector = '#id-indi-' + nextIndex
        var indiClass = 'white'
        removeClassAll(indiClass)
        var indi = e(nextIndiSelector)
        indi.classList.add(indiClass)
    })
}

var playNext = function() {
    var slide = e('.slide')
    // 拿到当前下标，总长度，计算下一个下标
    var current = Number(slide.dataset.active)
    var length = Number(slide.dataset.imgs)
    var nextIndex = (current + + length + 1) % length
    // 修改 dataset，移除所有的 active，然后给下个 id 的元素添加 active
    slide.dataset.active = nextIndex
    var nextSelector = '#id-image-' + nextIndex
    var className = 'active'
    removeClassAll(className)
    var image = e(nextSelector)
    image.classList.add(className)
    // 下面是小圆点
    var nextIndiSelector = '#id-indi-' + nextIndex
    var indiClass = 'white'
    removeClassAll(indiClass)
    var indi = e(nextIndiSelector)
    indi.classList.add(indiClass)
}

var setupAutoPlay = function() {
    setInterval(function(){
        playNext()
    }, 1000)
}

setupAutoPlay()
bindEventSlide()
