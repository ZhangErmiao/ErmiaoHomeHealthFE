<template>
  <div>
    <el-divider></el-divider>
    <div style="text-align: left;padding:10px 0 25px 0; ;border-radius: 10px;font-size: 14px">
      <el-form v-model="selectedOptions">
          <span>选择群组</span>
          <el-cascader
            expand-trigger="hover"
            :options="groupOptions"
            v-model="selectedOptions.gid"
            @change="handleGroupChange"
          >
          </el-cascader>
          <span>选择用户</span>
          <el-cascader
            expand-trigger="hover"
            :options="userOptions"
            v-model="selectedOptions.uid"
            @change="handleUserChange"
          >
          </el-cascader>
          <div style="display: inline-block;margin:0 30px">
            <span>选择时间</span>
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
      </el-form>

    </div>

    <el-divider>用户数据显示</el-divider>
    <div v-if="show">
      <div style="height: 104px; background-color: #333333;margin-bottom: 20px;display: flex;color:ghostwhite;justify-content: space-around;align-content: center">
        <div
          v-for="(item, index) in showData"
          :key = 'index'>
          <p>{{item[item.length-1].typeName}}</p>
          <h2>0.13/Hz</h2>
        </div>
      </div>
      <el-row  :gutter="20">
        <el-col :span="12"  v-for="item in typeTabs"
                :key="item.id"
                :label="item.typeName"
                :name="typeTabs.indexOf(item).toString()"
        >
          <div class="Echart" :id="getID(item.id)" :key="item.id"></div>
          <p>{{item.typeName}}</p>
        </el-col>
      </el-row>
    </div>
    <p v-else style="line-height: 400px;font-size: 18px;color: gainsboro">未选择数据显示用户和时间</p>
  </div>
</template>
<script>
export default {
  name: 'heartTestBreath',
  props: ['selectedOptions'],
  data () {
    return {
      show: false,
      groupOptions: [],
      userOptions: [],
      // selectedOptions: {
      //   gid: [],
      //   uid: []
      // },
      uid: JSON.parse(localStorage.getItem('userMessage')).id,
      activeName: '0',
      myChart: [],
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
    this.$http.get('http://39.105.193.111:5000/group/all')
      .then((res) => {
        if (res.data.code === 200) {
          console.log('group:', res)
          this.groupOptions = []
          res.data.data.forEach((item) => {
            let groupItem = {}
            groupItem.label = item.groupName
            groupItem.value = item.id.toString()
            this.groupOptions.push(groupItem)
          })
        }
      })
  },
  methods: {
    getID (id) {
      return 'echart_' + id // id不可以数字开头
    },
    open () {
      this.show = true
      this.$http.get('http://39.105.193.111:5000/type/all', {params: {gid: this.selectedOptions.gid[0]}}) // 获取类型
        .then(res => {
          console.log('数据类型：', res)
          this.typeTabs = res.data.data
          return Promise.all(this.typeTabs.map((item, index) => { // 问题：多个http请求按顺序发，用forEach时回调函数不知道哪一个先返回，数据混乱
            console.log(item, index)
            return this.$http.get('http://39.105.193.111:5000/sensor', {params: {tid: item.id, uid: this.selectedOptions.uid[0]}})
              .then(res => {
                let list = []
                for (let i = 0; i < res.data.data.length; i++) {
                  list.push(res.data.data[i].value)
                }
                this.myChart[index] = this.$echarts.init(document.getElementById(this.getID(item.id)), 'macarons')
                list.push(item)
                return list
              })
          }))
        }).then(res => {
          console.log('new:', res)
          this.showData = res
          this.showData.map((item, index) => {
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
                y: 28,
                x2: 35,
                y2: 40
              },
              calculable: true,
              dataZoom: {
                show: true,
                realtime: true,
                start: 0,
                end: 20
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
                  data: item.slice(0, item.length - 1)
                  // data: item // 这样也能画图
                }
              ]
            }
            console.log('nn', item, index)
            this.myChart[index].setOption(this.option)
            window.onresize = function () {
              this.myChart.resize()
            }
          })
        })
    }, // 数据搜索
    handleGroupChange (value) {
      console.log(value)
      this.$http.get('http://39.105.193.111:5000/group/user/all', {params: {id: value}})
        .then(res => {
          console.log(res)
          this.userOptions = []
          res.data.data.userList.forEach(item => {
            let userItem = {}
            userItem.label = item.username
            userItem.value = item.id
            this.userOptions.push(userItem)
          })
          console.log(this.selectedOptions)
        })
    },
    handleUserChange (value) {
      console.log('this:', value)
    }, // 这个没用
    handleClick (tab, event) {
      console.log('tid:', this.typeTabs[tab.name].id)
    }
  }
}
</script>
<style scoped>
  .Echart{
    width:100%;
    height: 300px;
    margin-bottom: 20px;
    background-color: white;

  }
</style>
