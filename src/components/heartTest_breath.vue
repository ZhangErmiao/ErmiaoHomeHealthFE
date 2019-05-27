<template>
  <el-tabs  type="border-card" v-model="activeName" @tab-click="handleClick" style="margin: 0 auto;min-height: 500px; ">
    <el-tab-pane
      v-for="item in typeTabs"
    :key="item.id"
      :label="item.typeName"
      :name="typeTabs.indexOf(item).toString()"
      lazy
    >
      <div style="text-align: left;padding: 0 40px">
        <span> <b> {{item.typeName}}速率 </b></span>
        <div style="display: inline-block">
          <el-date-picker
            v-model="value"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <el-button type="button" @click="open">搜索</el-button>
      </div>
      <div id="Echart1" :key="item.id"></div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: 'heartTestBreath',
  data () {
    return {
      uid: JSON.parse(localStorage.getItem('userMessage')).id,
      activeName: '0',
      myChart: '',
      option: {},
      value: '',
      showData: [], // 画图数据
      typeTabs: [], // 数据类型数组
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  mounted () {
    this.$http.get('http://39.105.193.111:5000/type/all', {params: {gid: '10038'}}) // 获取类型
      .then(res => {
        console.log('数据类型：', res)
        this.typeTabs = res.data.data
        this.$http.get('http://39.105.193.111:5000/sensor', {params: {tid: this.typeTabs[0].id, uid: this.uid}}) // 获取数据
          .then(res => {
            // console.log(res)
            var list = []
            for (let i = 0; i < res.data.data.length; i++) {
              list.push(res.data.data[i].value)
            }
            this.showData = list
            console.log('数据值: ', this.showData)
          }).then(() => {
            this.myChart = this.$echarts.init(document.getElementById('Echart1'), 'macarons')
            this.option = {
              tooltip: {
                trigger: 'axis'
              },
              toolbox: {
                show: true,
                y: 'top',
                feature: {
                  magicType: {show: true, type: ['line', 'bar']},
                  restore: {show: true},
                  saveAsImage: {show: true}
                }
              },
              grid: {
                x: 40,
                y: 25,
                x2: 10,
                y2: 60
              },
              calculable: true,
              dataZoom: {
                show: true,
                realtime: true,
                start: 20,
                end: 80
              },
              xAxis: [
                {
                  type: 'category',
                  boundaryGap: false,
                  data: function () {
                    var list = []
                    for (var i = 1; i <= 30; i++) {
                      list.push('2019-03-' + i)
                    }
                    return list
                  }()
                }
              ],
              yAxis: [
                {
                  type: 'value'
                }
              ],
              series: [
                {
                  name: '呼吸值',
                  type: 'line',
                  data: this.showData
                }
              ]
            }
            this.myChart.setOption(this.option)
            window.onresize = function () {
              this.myChart.resize()
            }
          })
      })
  },
  watch: {
    showData: {
      deep: true,
      handler () {
        if (this.myChart) {
          this.option.series[0].data = this.showData
          this.myChart.setOption(this.option)
        }
        window.onresize = function () {
          this.myChart.resize()
        }
      }
    }
  },
  methods: {
    open () {}, // 数据搜索
    handleClick (tab, event) {
      console.log('tid:', this.typeTabs[tab.name].id)
      this.$http.get('http://39.105.193.111:5000/sensor', {params: {tid: this.typeTabs[tab.name].id, uid: this.uid}})
        .then(res => {
          var list = []
          for (let i = 0; i < res.data.data.length; i++) {
            list.push(res.data.data[i].value)
          }
          this.showData = list
          this.myChart.setOption(this.option)
          console.log('数据值: ', this.showData)
        })
    }
  }
}
</script>
<style scoped>
  #Echart1{
    width:100%;
    height: 300px;
    /*margin-bottom: 25px ;*/
    margin: 25px auto;

  }
</style>
