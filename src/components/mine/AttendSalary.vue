<template>
    <div>
      <!--工资统计图-->
      <div id="wageChart" class="chart-container">

      </div>
    </div>
</template>

<script>
  // 引入 ECharts 主模块
  const echarts = require('echarts/lib/echarts');
  // 引入折线图
  require('echarts/lib/chart/line');
  require("echarts/lib/chart/bar");
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require("echarts/lib/component/markPoint");
  require("echarts/lib/component/markLine");
  require("echarts/lib/component/toolbox");

  import {fetchWage} from '../../api/wage'
    export default {
      data(){
        return {
          eid: "YF000001"
        }
      },
      mounted(){
        this.$nextTick(function () {
          this.draw('wageChart')
        })
      },
      methods: {
        draw(id) {
          const WageChart = echarts.init(document.getElementById(id))
          WageChart.setOption({
            title: {
              text: '工资图',
              subtext: '研姐姐'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data:[]  //  图例  2016 2017 2018
            },
            toolbox: {
              show: true,
              feature: {
                // dataZoom: {
                //   yAxisIndex: 'none'
                // },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
              }
            },
            xAxis:  {
              type: 'category',
              boundaryGap: false,
              data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                formatter: '{value} $'
              }
            },
            series: []   // 填充的数据
          })
          fetchWage(this.eid).then(res=>{
            let wageData = res.data[0]
            // console.log(wageData["2016"])
            let newLegend = []
            let newseries = []
            if (wageData["2016"]){
              newLegend.push("2016")
              newseries.push({
                name:'2016',
                type:'line',
                data:wageData["2016"],  // 2016 的工资数据 最后用数组 push
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
              })
            }
            if (wageData["2017"]){
              newLegend.push("2017")
              newseries.push({
                name:'2017',
                type:'line',
                data:wageData["2017"],  // 2016 的工资数据 最后用数组 push
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
              })
            }
            if (wageData["2018"]){
              newLegend.push("2018")
              newseries.push({
                name:'2018',
                type:'line',
                data:wageData["2018"],  // 2016 的工资数据 最后用数组 push
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
              })
            }
            console.log(newLegend)
            WageChart.setOption({
              legend: {
                data: newLegend
              },
              series: newseries
            })
          })
        }
      }
    }
</script>

<style scoped>
.chart-container {
  width: 96%;
  height: 540px;
}
</style>
