console.log('player.js')
// 播放、暂停、上一首、下一首。
    // 还剩下播放暂停按钮显示的切换
// 主界面上显示当前播放的歌曲。
    // 完成。
// 播放列表里面切换歌曲。
    // 完成，不优雅。
// 随机播放、循环播放。
    // 这个难住我了，我写了个半成品，等时间和进度条写完再来调试这个。现在不能拖动进度条不好调试。
    // 这个随机播放有点问题，我取消随机播放以后，只是不显示了，但是还是随机播放。
// 歌曲播放进度条、时间显示。
    // 当 canplay 的时候就要更新时间，还有正在播放的时候，还有切歌的时候
// 确保自己知道每一个效果是怎样用 CSS 实现的

const songMap = function() {
    var m = {
        '1.mp3': {
            'song': 'Counting Stars',
            'singer': 'OneRepublic',
            'cover': './imgs/1.jpg',
        },
        '2.mp3': {
            'song': 'I knew you were trouble',
            'singer': 'Taylor Swift',
            'cover': './imgs/2.jpg',
        },
        '3.mp3': {
            'song': 'Take a Bow',
            'singer': 'Rihanna',
            'cover': './imgs/3.jpg',
        },
        '4.mp3': {
            'song': 'The Truth that You leave',
            'singer': 'Pianoboy',
            'cover': null,
        },
        '5.mp3': {
            'song': '老街',
            'singer': '李荣浩',
            'cover': null,
        },
    }
    return m
}

const songList = ['1.mp3', '2.mp3', '3.mp3', '4.mp3', '5.mp3']

// 更改 歌曲名称 和 歌手
const changeSongAndSinger = function() {
    const audio = e('#id-audio-player')
    const info = e('.info')
    const currentSong = audio.src.split('/').pop()
    info.children[0].innerHTML = songMap()[currentSong].song
    info.children[1].innerHTML = songMap()[currentSong].singer
}

// audio canplay 事件，准备好以后，一是要播放，二是要显示当前播放的歌曲
const audioCanPlay = function() {
    const audio = e('#id-audio-player')
    bindEvent(audio, 'canplay' ,function(event) {
        changeSongAndSinger()
        initProgress()
        updateProgress()
        audio.play()
    })
}

// ended 事件，一首歌曲播放完成以后自动播放下一首歌曲，最后一首播放完以后停止播放
const audioEnded = function(randomPlay='false', loopPlay='false') {
    const audio = e('#id-audio-player')
    const currentSrc = audio.src.split('/').pop()
    const currentIndex = songList.indexOf(currentSrc)
    bindEvent(audio, 'ended', () => {
        if (randomPlay == 'true') {
            // 随机播放
            const randomIndex = Math.floor(Math.random() * songList.length)
            const nxtSong = songList[randomIndex]
            audio.src = 'audio/' + nxtSong
        } else if (loopPlay == 'true') {
            // 列表循环
            const nxtIndex = (currentIndex + 1) % songList.length
            audio.src = 'audio/' + songList[nxtIndex]
        } else {
            // 最后一首歌播放完成以后停止播放
            if(currentIndex !== (songList.length - 1)) {
                const nextIndex = (currentIndex + 1) % songList.length
                audio.src = 'audio/' + songList[nextIndex]
            } else {
                return
            }
        }
    })
}

// 初始化播放时间
const initProgress = () => {
    const audio = e('#id-audio-player')
    const currentTime = audio.currentTime
    const duration = audio.duration
    e('.duration').innerHTML = fancyTimeFormat(duration).split('.')[0]
    e('.currentTime').innerHTML = fancyTimeFormat(currentTime).split('.')[0]
}

// 播放进度
const updateProgress = () => {
    const bar = e('.bar')
    const audio = e('#id-audio-player')
    const progressBar = e('#id-div-progress')
    const totalWidth = bar.clientWidth
    bindEvent(audio, 'timeupdate', function(event) {
        const currentTime = audio.currentTime
        const duration = audio.duration
        playedWidth = (currentTime / duration) * totalWidth
        progressBar.style.width = playedWidth + 'px'
        e('.currentTime').innerHTML = fancyTimeFormat(currentTime).split('.')[0]
    })
}

// 改变播放进度
const bindEventProgressBarClicked = () => {
    const bar = e('.bar')
    const progressBar = e('#id-div-progress')
    const audio = e('#id-audio-player')
    bindEvent(bar, 'click', (event) => {
        const offSetX = event.offsetX
        const totalWidth = bar.clientWidth
        const newProgress = (offSetX / totalWidth) * audio.duration
        audio.currentTime = newProgress
        e('.currentTime').innerHTML = fancyTimeFormat(newProgress).split('.')[0]
    })
}

// 随机播放，还是列表循环
// 只能选中其中一个，
const changePlayMode = () => {
    // Math.floor(Math.random()*10)
    const controlsBottom = e('.bottom')
    const randomButton = e('.random')
    const loopButton = e('.loop')
    bindEvent(controlsBottom, 'click', (event) => {
        // console.log('random');
        let target = event.target
        while (target.tagName !== 'A') {
            target = target.parentElement
        }
        console.log('target', target);
        let actives = findAll(controlsBottom, '.active')
        for (let i = 0; i < actives.length; i++) {
            let item = actives[i]
            if ((item.classList.contains('random') || item.classList.contains('loop')) && item !== target) {
                console.log('should remove');
                // 在显示上只选择一个
                item.classList.remove('active')
            }
        }
        // 判断是随机播放，还是循环播放，根据 target
        if (target.classList.contains('random')) {
            console.log('随机播放');
            audioEnded(randomPlay='true', loopPlay='false')
        } else if (target.classList.contains('loop')) {
            console.log('循环播放');
            audioEnded(randomPlay='false', loopPlay='true')
        }
    })
}

// 播放列表里面切换歌曲
const changeSongThroughList = function() {
    const playList = e('ol')
    bindEvent(playList, 'click', (event) => {
        const target = event.target
        const audio = e('#id-audio-player')
        // console.log(target.className);
        // target 有几种情况：<li> <a>，<img>，<h3>，<h4>
        // 分别对应不同的 className
        if(target.className == 'playlist a') {
            console.log('playlist a');
            const songName = find(target, '.song').innerHTML
            const singer = find(target, '.singer').innerHTML
            const song = find(target, '.ss').dataset.path
            audio.src = 'audio/' + song
        } else if (target.className == 'playlist img') {
            console.log('playlist img');
            const songName = find(target.nextElementSibling, '.song').innerHTML
            const singer = find(target.nextElementSibling, '.singer').innerHTML
            const song = target.nextElementSibling.dataset.path
            audio.src = 'audio/' + song
        } else if (target.className == 'playlist ss') {
            console.log('playlist ss');
            const songName = target.children[0].innerHTML
            const singer = target.children[1].innerHTML
            const song = target.dataset.path
            audio.src = 'audio/' + song
        } else if (target.className == 'playlist song') {
            console.log('playlist song');
            const songName = target.innerHTML
            const singer = target.nextElementSibling.innerHTML
            const song = target.parentElement.dataset.path
            audio.src = 'audio/' + song
        } else {
            console.log('playlist singer');
            const songName = target.previousElementSibling.innerHTML
            const singer = target.innerHTML
            const song = target.parentElement.dataset.path
            audio.src = 'audio/' + song
        }
    })
}

// 上一首、下一首
const bindEventPrevAndNext = function() {
    const prevSelector = '.rewind'
    const nextSelector = '.forward'
    const audio = e('#id-audio-player')
    const prev = e(prevSelector)
    const next = e(nextSelector)
    bindEvent(prev, 'click', () => {
        console.log('prev');
        const currentSrc = audio.src.split('/').pop()
        const currentIndex = songList.indexOf(currentSrc)
        let preIndex = -1
        if (currentIndex === 0) {
            preIndex = songList.length - 1
        } else {
            preIndex = (currentIndex - 1) % songList.length
        }
        audio.src = 'audio/' + songList[preIndex]
        changeSongAndSinger()
    })
    bindEvent(next, 'click', () => {
        console.log('next');
        const currentSrc = audio.src.split('/').pop()
        const currentIndex = songList.indexOf(currentSrc)
        let nxtIndex = -1
        if (currentIndex === (songList.length - 1)) {
            nxtIndex = 0
        } else {
            nxtIndex = (currentIndex + 1) % songList.length
        }
        audio.src = 'audio/' + songList[nxtIndex]
        changeSongAndSinger()
    })
}

// 给播放按钮绑定单击事件，还剩下播放暂停切换图片
const bindEventPlayAndPause = function() {
    const playButtonSelector = '.play'
    const playButton = e(playButtonSelector)
    bindEvent(playButton, 'click', () => {
        const audio = e('#id-audio-player')
        if (audio.paused) {
            e('.class-span-play').classList.add("icon-zanting")
            e('.class-span-play').classList.remove("icon-bofang")
            audio.play()
        } else {
            e('.class-span-play').classList.add("icon-bofang")
            e('.class-span-play').classList.remove("icon-zanting")
            audio.pause()
        }
    })
}

const __main = function() {
    audioCanPlay()
    audioEnded()
    changePlayMode()
    bindEventProgressBarClicked()
    bindEventPlayAndPause()
    bindEventPrevAndNext()
    changeSongThroughList()
}

__main()
