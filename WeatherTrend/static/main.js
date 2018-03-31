/**
 * Created by Uncle Liu on 2018/1/18.
 */
// 给下拉菜单绑定事件
const bindEventSelector = () => {
    const selector = e('#inputGroupSelect01')
    selector.addEventListener('input', (event) => {
        var cityName = event.target.options[event.target.selectedIndex].value
        console.log('city name', cityName)
        getCityId(cityName)
    })
}
// 获取城市名字
const getCityName = () => {
    const selector = e("#inputGroupSelect01")
    const cityName = selector.value
    return selector.value
}
// city id 回调函数
const cityCallback = (cityData) => {
    let cityId = JSON.parse(cityData)
    cityId = cityId.results[0].id
    log('city id', cityId)
    // 根据得到的城市 id 获得城市的天气
    getCityWeather(cityId)
}
// 获取 city id
const getCityId = (cityName) => {
    log('getCityId')
    const url = `https://weixin.jirengu.com/weather/cityid?location=${cityName}`
    const method = 'GET'
    const callback = cityCallback
    const request = {
        "url": url,
        "method": method,
        "callback": callback,
    }
    ajax(request)
}
// 通过 city id 获取 city weather
const getCityWeather = (cityId) => {
    log('getCityWeather')
    const url = `http://weixin.jirengu.com/weather/now?cityid=${cityId}`
    const method = 'GET'
    const callback = (data) => {
        data = JSON.parse(data)
        log('city weather', data.weather[0])
        parseWeather(data.weather[0])
    }
    const request = {
        'url': url,
        'method': method,
        'callback': callback,
    }
    ajax(request)
}
// 解析获得的天气数据
const parseWeather = (weather) => {
    const cityWeather = weather
    // 现在天气对象
    const nowObj = weather.now
    // 今天天气对象
    const todayObj = weather.today
    // 未来天气数组
    const futureArray = weather.future
    let day = [], high = [], low = []
    for (let i = 0; i < futureArray.length; i++) {
        const item = futureArray[i]
        day.push(item.day)
        high.push(item.high)
        low.push(item.low)
    }
    const futureTrend = {
        'day': day,
        'high': high,
        'low': low,
    }
    log('inside parseWeather, furure: ', futureTrend)
    initTrendCharts(futureTrend)
}
// 程序入口
const __main = () => {
    log('zfmele')
//              WWMT5Q64CR3G
    bindEventSelector()
    const cityName = getCityName()
    getCityId(cityName)
}
// 执行程序
__main()