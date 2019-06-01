<template>
  <el-container style=" background-color: ghostwhite;">
    <el-header style="padding:0">
    <el-menu :default-active="activeIndex"  mode="horizontal" @select="handleSelectHeader" style="padding: 0">
      <el-menu-item index="9">
        <img src="../assets/tt.jpg" style="width:150px; height: 55px ">
      </el-menu-item>
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="7">购买</el-menu-item>
      <el-menu-item index="8">社区</el-menu-item>
      <el-menu-item index="2">关于我们</el-menu-item>
      <el-menu-item index="3">设置</el-menu-item>
      <el-menu-item index="4">帮助</el-menu-item>
      <el-menu-item index="5" style="float: right;" v-if="Token">你好，{{username}}</el-menu-item>
    </el-menu>
  </el-header>
    <el-main style="border-top: solid 0.1px gainsboro;margin:0 100px;padding: 10px 0 ">
      <el-row >
        <el-col :span="16">
          <el-breadcrumb  id='path' >
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>健康数据记录</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="8" >
          <el-button type="text" @click="addDataType" style="padding-top:0">
            <i class="el-icon-edit"></i>添加数据类型
          </el-button>
          <el-button type="text" @click="addData" style="padding-top:0">
            <i class="el-icon-edit"></i>添加数据值
          </el-button>
<!--                <el-button type="text" @click="askData" style="padding-top:0">-->
<!--                  <i class="el-icon-edit"></i>获取数据-->
<!--                </el-button>-->
          <el-dialog title="添加数据值" :visible.sync="dialogFormVisible">
            <el-form :model="addDataForm">
<!--              <el-form-item label="数据类型" :label-width="formLabelWidth">-->
<!--                <el-select v-model="addDataForm.tid" placeholder="请选择数据类型">-->
<!--                  <el-option v-for="item in typeTabs" :label="item.typeName" :value="item.id" :key="item.id"></el-option>-->
<!--                </el-select>-->
<!--              </el-form-item>-->
              <el-form-item label="数据值" :label-width="formLabelWidth">
                <el-input v-model="addDataForm.value" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="newDataSubmit">确 定</el-button>
            </div>
          </el-dialog>
        </el-col>
      </el-row>
      <div style="text-align: left;padding:10px 0 25px 0; ;border-radius: 10px;font-size: 14px">
        <el-form v-model="selectedOptions">
          <span>选择群组</span>
          <el-cascader
            expand-trigger="hover"
            :options="groupOptions"
            v-model="selectedOptions.gid"
            @change="handleGroupChange"
            placeholder="请选择要显示的群组"
          >
          </el-cascader>
          <span>选择用户</span>
          <el-cascader
            expand-trigger="hover"
            :options="userOptions"
            v-model="selectedOptions.uid"
            @change="handleUserChange"
            placeholder="请选择要显示的用户"
          >
          </el-cascader>
          <span>选择数据类型</span>
          <el-cascader
            expand-trigger="hover"
            :options="typeOptions"
            v-model="selectedOptions.type"
            @change="handleUserChange"
            placeholder="请选择要显示的数据类型"
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
          <el-button type="button" @click="searchDatas">搜索</el-button>
        </el-form>
      </div>
      <div>
        <el-divider>用户数据显示</el-divider>
        <div v-if="show">
          <div class="Echart" id="echart"></div>
        </div>
        <p v-else style="line-height: 400px;font-size: 18px;color: gainsboro">未选择数据显示用户和时间</p>
      </div>
    </el-main>
  </el-container>
</template>

<script>
/* eslint-disable */
export default {
  name: 'HeartTest',
  data () {
    return {
      show: false,
      uid: JSON.parse(localStorage.getItem('userMessage')).id,
      myChart: [],
      option: {},
      value: '',
      showData: [], // 画图数据
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
      },
      groupOptions: [],
      userOptions: [],
      typeOptions: [],
      selectedOptions: {
        gid: [],
        uid: [],
        type:[]
      },
      dialogFormVisible: false,
      addDataForm: {
        value: '',
        tid: ''
      },
      formLabelWidth: '120px',
      typeTabs: [],
      value1: '',
      username: JSON.parse(localStorage.getItem('userMessage')).username,
      id: JSON.parse(localStorage.getItem('userMessage')).id,
      Token: localStorage.getItem('Authorization'),
      activeIndex: '1',
      activeName: 'first',
      activeName2: '0',
      tabPosition: 'left'
    }
  },
  mounted: function () {
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
    searchDatas () {
      console.log('search：', this.selectedOptions)
      this.show = true
      this.$http.get('http://39.105.193.111:5000/sensor', {params: {tid: this.selectedOptions.type[0], uid: this.selectedOptions.uid[0]}})
        .then(res => {
          console.log('search res: ', res)
          if (res.data.code === 200) {
            this.showData = res.data.data
            this.myChart = this.$echarts.init(document.getElementById('echart'), 'macarons')
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
                  data: this.showData
                  // data: item // 这样也能画图
                }
              ]
            }
            this.myChart.setOption(this.option)
            window.onresize = function () {
              this.myChart.resize()
            }
          }
        })
      // this.$http.get('http://39.105.193.111:5000/type/all', {params: {gid: this.selectedOptions.gid[0]}}) // 获取类型
      //   .then(res => {
      //     console.log('数据类型：', res)
      //     this.typeTabs = res.data.data
      //     return Promise.all(this.typeTabs.map((item, index) => { // 问题：多个http请求按顺序发，用forEach时回调函数不知道哪一个先返回，数据混乱
      //       console.log(item, index)
      //       return this.$http.get('http://39.105.193.111:5000/sensor', {params: {tid: item.id, uid: this.selectedOptions.uid[0]}})
      //         .then(res => {
      //           let list = []
      //           for (let i = 0; i < res.data.data.length; i++) {
      //             list.push(res.data.data[i].value)
      //           }
      //           this.myChart[index] = this.$echarts.init(document.getElementById(this.getID(item.id)), 'macarons')
      //           list.push(item)
      //           return list
      //         })
      //     }))
      //   }).then(res => {
      //     console.log('new:', res)
      //     this.showData = res
      //     this.showData.map((item, index) => {
      //       this.option = {
      //         tooltip: {
      //           trigger: 'axis'
      //         },
      //         toolbox: {
      //           show: true,
      //           y: 'top',
      //           feature: {
      //             magicType: {show: true, type: ['line', 'bar']},
      //             restore: {show: true},
      //             saveAsImage: {show: true}
      //           }
      //         },
      //         grid: {
      //           x: 40,
      //           y: 28,
      //           x2: 35,
      //           y2: 40
      //         },
      //         calculable: true,
      //         dataZoom: {
      //           show: true,
      //           realtime: true,
      //           start: 0,
      //           end: 20
      //         },
      //         xAxis: [
      //           {
      //             type: 'category',
      //             boundaryGap: false,
      //             data: function () {
      //               var list = []
      //               for (var i = 1; i <= 30; i++) {
      //                 list.push('2019-03-' + i)
      //               }
      //               return list
      //             }()
      //           }
      //         ],
      //         yAxis: [
      //           {
      //             type: 'value'
      //           }
      //         ],
      //         series: [
      //           {
      //             name: '呼吸值',
      //             type: 'line',
      //             data: item.slice(0, item.length - 1)
      //             // data: item // 这样也能画图
      //           }
      //         ]
      //       }
      //       console.log('nn', item, index)
      //       this.myChart[index].setOption(this.option)
      //       window.onresize = function () {
      //         this.myChart.resize()
      //       }
      //     })
      //   })
    },
    handleGroupChange (value) {
      console.log(value)
      let http1 = () => {
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
      }
      let http2 = () => {
        this.$http.get('http://39.105.193.111:5000/type/all', {params: {gid: this.selectedOptions.gid[0]}}) // 获取类型
          .then(res => {
            console.log('数据类型：', res)
            // this.$set(data, typeTabs, res.data.data)
            this.typeOptions = []
            res.data.data.forEach(item => {
              let typeItem = {}
              typeItem.label = item.typeName
              typeItem.value = item.id
              this.typeOptions.push(typeItem)
            })
            console.log('typeOptions: ', this.typeOptions)
          })
      }
      Promise.all([http1(), http2()]).then(res => {
        console.log('user and type:', res)
      })
    },
    handleUserChange (value) {
      console.log('this:', value)
    },
    newDataSubmit () {
      this.dialogFormVisible = false
      this.$http.post('http://39.105.193.111:5000/sensor/', this.addDataForm)
        .then(res => {
          console.log(res)
        })
      console.log(this.addDataForm)
    },
    handleSelectHeader (key, keyPath) {
      switch (key) {
        case '1': this.$router.push('/'); break
        case '2': this.$router.push('/about'); break
        case '3': this.$router.push('/set'); break
        case '4': this.$router.push('/help'); break
        case '6': this.$router.push('/login'); break
      }
      console.log(keyPath)
    },
    addDataType () {
      this.$prompt('请输入数据类型', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        this.$http.post('http://39.105.193.111:5000/type/', {gid: this.selectedOptions.gid[0], typeName: value})
          .then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
      })
    },
    addData () {
      this.dialogFormVisible = true
      this.$http.get('http://39.105.193.111:5000/type/all', {params: {gid: this.selectedOptions.gid[0]}})
        .then(res => {
          this.typeTabs = res.data.data
        })
    },
    getID (id) {
      return 'echart_' + id // id不可以数字开头
    },
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
