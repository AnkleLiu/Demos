/**
 * Created by Uncle Liu on 2018/1/18.
 */
const initTrendCharts = (weatherOptions) => {
    console.log('inside initTrendCharts', weatherOptions)
    const containerTrend = document.querySelector('#id-div-trend')
    const trendChart = echarts.init(containerTrend)
    let initOptions = {
        title: {
            text: '未来十天气温变化',
            subtext: '可不要贪杯哦'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['最高气温','最低气温']
        },
        xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: weatherOptions.day,
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} °C'
            }
        },
    }
    initOptions.series = [
        {
            name:'最高气温',
            type:'line',
            data:weatherOptions.high,
            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
        },
        {
            name:'最低气温',
            type:'line',
            data:weatherOptions.low,
            markPoint: {
                data: [
                    {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                ]
            },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'},
                    [{
                        symbol: 'none',
                        x: '90%',
                        yAxis: 'max'
                    }, {
                        symbol: 'circle',
                        label: {
                            normal: {
                                position: 'start',
                                formatter: '最大值'
                            }
                        },
                        type: 'max',
                        name: '最高点'
                    }]
                ]
            }
        }
    ]
    trendChart.setOption(initOptions)
    console.log('天气趋势表初始化完成')
}