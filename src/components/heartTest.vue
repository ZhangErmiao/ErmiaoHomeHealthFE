<template>
  <el-container >
  <el-header style="padding:0">
    <el-menu :default-active="activeIndex"  mode="horizontal" @select="handleSelectHeader" background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b" style="padding: 0">
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="7">购买</el-menu-item>
      <el-menu-item index="8">社区</el-menu-item>
      <el-menu-item index="2">关于我们</el-menu-item>
      <el-menu-item index="3">设置</el-menu-item>
      <el-menu-item index="4">帮助</el-menu-item>
      <el-menu-item index="5" style="float: right;" v-if="Token">你好，{{username}}</el-menu-item>
    </el-menu>
  </el-header>
    <el-main style="border: solid 0.1px gainsboro;">
        <el-row :gutter="25">
          <el-col :span="24">
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
                    <el-form-item label="数据类型" :label-width="formLabelWidth">
                      <el-select v-model="addDataForm.tid" placeholder="请选择数据类型">
                        <el-option v-for="item in typeTabs" :label="item.typeName" :value="item.id" :key="item.id"></el-option>
                      </el-select>
                    </el-form-item>
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
              <heart-test-breath :tid="prop"></heart-test-breath>

          </el-col>
        </el-row>

    </el-main>
  </el-container>
</template>

<script>
  import heartTestBreath from './heartTest_breath.vue'

  export default {
  name: 'HeartTest',
  components: {
    'heartTestBreath': heartTestBreath
  },
  data () {
    return {
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
    this.$http.get('http://39.105.193.111:5000/type/all', {params: {gid: '10038'}})
      .then(res => {
        console.log('数据类型：', res)
        this.typeTabs = res.data.data
        this.prop = this.typeTabs[0].id
      })
  },
  methods: {
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
        this.$http.post('http://39.105.193.111:5000/type/', {gid: '10038', typeName: value})
          .then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
      })
    },
    addData () {
      this.dialogFormVisible = true
      this.$http.get('http://39.105.193.111:5000/type/all', {params: {gid: '10038'}})
        .then(res => {
          this.typeTabs = res.data.data
        })
    }
  }
}
</script>
<style scoped>

</style>
