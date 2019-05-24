<template>
  <div>
    <div>
      <el-button type="button" @click="open">添加呼吸数据</el-button>
      <span> <b> 呼吸/Hz </b></span>
      <div style="display: inline-block">
        <el-date-picker
          v-model="value2"
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
    <div id="breathEchart1"></div>
    <el-row :gutter="10">
      <el-col :span="12">
        <div id="breathEchart2"></div>
      </el-col>
      <el-col :span="12">
        <div id="breathEchart3"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'heartTestBreath',
    data (){
      return {
        val: 4,
        value2: '',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    },
    mounted () {
      let myChart3_1 = this.$echarts.init(document.getElementById('breathEchart1'),'macarons')
      myChart3_1.setOption({
        tooltip : {
          trigger: 'axis'
        },
        legend: {
          data:['呼吸值','体脂率','BMI']
        },
        toolbox: {
          show : true,
          y: 'top',
          feature : {
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
          }
        },
        grid: {
          x: 40,
          y:25,
          x2:10,
          y2:60,
        },
        calculable : true,
        dataZoom : {
          show : true,
          realtime : true,
          start : 20,
          end : 80
        },
        xAxis : [
          {
            type : 'category',
            boundaryGap : false,
            data : function (){
              var list = [];
              for (var i = 1; i <= 30; i++) {
                list.push('2019-03-' + i);
              }
              return list;
            }()
          }
        ],
        yAxis : [
          {
            type : 'value'
          }
        ],
        series : [
          {
            name:'呼吸值',
            type:'line',
            data:function (){
              var list = [];
              for (var i = 1; i <= 30; i++) {
                list.push(Math.round(Math.random()* 10));
              }
              return list;
            }()
          },
          {
            name:'体脂率',
            type:'line',
            data:function (){
              var list = [];
              for (var i = 1; i <= 30; i++) {
                list.push(Math.round(Math.random()* 10));
              }
              return list;
            }()
          },
          {
            name:'BMI',
            type:'line',
            data:function (){
              var list = [];
              for (var i = 1; i <= 30; i++) {
                list.push(Math.round(Math.random()* 10));
              }
              return list;
            }()
          },

        ]
      })

      let myChart3_2 = this.$echarts.init(document.getElementById('breathEchart2'),'macarons')
      myChart3_2.setOption({
        grid: {
          x: 25,
          y:25,
          x2: 25,
          y2: 25,
        },
        tooltip : {
          formatter: "{a} <br/>{b} : {c}" // 悬浮时显示的注释
        },
        series : [
          {
            name:'BMI指标',
            type:'gauge',
            min: -10,
            max: 10,
            width: '50%',
            detail : {formatter:'{value}'},
            data:[{value: this.val, name: 'BMI'}]
          }
        ]
      })
      let myChart3_3 = this.$echarts.init(document.getElementById('breathEchart3'),'macarons')
      myChart3_3.setOption({
        grid: {
          x: 25,
          y:25,
          x2: 25,
          y2: 25
        },
        tooltip : {
          formatter: "{a} <br/>{b} : {c}" // 悬浮时显示的注释
        },
        series : [
          {
            name:'体脂率',
            type:'gauge',
            min: -10,
            max: 10,
            width: '50%',
            detail : {formatter:'{value}%'},
            data:[{value: this.val, name: '体脂率'}]
          }
        ]
      })
    },
  methods: {
    open() {
      this.$prompt('请输入邮箱', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你的邮箱是: ' + value
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
  }
</script>
<style scoped>
  #breathEchart1,#breathEchart2,#breathEchart3{
    width: 800px;
    height: 300px;
    /*margin-bottom: 25px ;*/
    margin: 25px auto;

  }
  #breathEchart2,#breathEchart3{
    width: 400px;
  }

</style>
