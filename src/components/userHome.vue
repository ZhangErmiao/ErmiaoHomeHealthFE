<template>
  <el-container>
    <el-header style="padding: 0;">
      <el-menu :default-active="activeIndex"  mode="horizontal" @select="handleSelectHeader" >
        <el-menu-item index="0">
          <img src="../assets/tt.png" style="width:150px; height: 55px ">
        </el-menu-item>
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="6">购买</el-menu-item>
        <el-menu-item index="7">社区</el-menu-item>
        <el-menu-item index="2">关于我们</el-menu-item>
        <el-menu-item index="3">设置</el-menu-item>
        <el-menu-item index="4">帮助</el-menu-item>
        <span id="username"> 你好，{{userMessage.username}}</span>
      </el-menu>
    </el-header>
    <el-main style="padding: 0; " >
      <el-container>
        <el-aside width="191px">
          <div style=" background-color: #545c64;padding: 20px 0;margin: 0 0.5px; ">
            <img style="width: 110px; height: 110px;border-radius: 50%" :src= "userMessage.iconUrl" alt=""/>
            <p style="color: white">{{userMessage.username}}</p>
          </div>
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @select="handleSelect"
            style=" min-height: 650px;width: 190px; "
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1">
              <i class="el-icon-s-home"></i>
              <span slot="title">ta的主页</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-key"></i>
                <span>ta的群组</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1">修改密码</el-menu-item>
                <!--                <el-menu-item index="2-2">权限设置</el-menu-item>-->
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="3">
              <i class="el-icon-aim"></i>
              <span slot="title">ta的设备</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <template id="userMessage" v-if="contentFlag[0]">
          <el-main style="padding-top: 0;background-color: ghostwhite">
<!-------------------------------提示语------------------------------------------------------------->
            <div style="text-align: left; margin-bottom: 30px">
              <h3>
              </h3>
              <el-breadcrumb  id='path'>
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/member' }">家庭成员管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户主页</el-breadcrumb-item>
              </el-breadcrumb>
<!--              <p style="font-size: 14px;color:grey">欢迎来到{{userMessage.username}}的主页</p>-->
            </div>
            <el-divider></el-divider>
<!------------------------------用户信息----------------------------------------------------------->
            <div style="text-align: left;font-size: 14px;color:grey;background-color: white;padding: 20px;border-radius: 8px">
              <span style="margin: 0 15px">用户名：{{userMessage.username}} </span>
              <span style="margin: 0 15px">ID：{{userMessage.id}} </span>
              <span style="margin: 0 15px">性别：{{userMessage.gender}} </span>
              <span style="margin: 0 15px">年龄：23</span>
            </div>
<!--           病例-->
            <div style=" margin: 15px 0;padding: 35px;background-color: white">
              <p>病史记录</p>
              <el-collapse v-model="activeNames" @change="handleChange">
                <!------------------------------------------------------病例史---------------------------------------------->

                <el-dialog title="添加病例史" :visible.sync="dialogFormVisible">
                  <el-form :model="sickHistory">
                    <el-form-item label="既往病史" :label-width="formLabelWidth" >
                      <el-input v-model="sickHistory.medicalHistory" autocomplete="off" placeholder="请输入患病时间和疾病名称"></el-input>
                    </el-form-item>
                    <el-form-item label="过敏史" :label-width="formLabelWidth">
                      <el-input v-model="sickHistory.allergicHistory" autocomplete="off" placeholder="请输入患病时间和过敏源"></el-input>
                    </el-form-item>
                    <el-form-item label="手术史" :label-width="formLabelWidth">
                      <el-input v-model="sickHistory.operationHistory" autocomplete="off" placeholder="请输入手术时间和手术类型"></el-input>
                    </el-form-item>
                    <el-form-item label="家族病史" :label-width="formLabelWidth">
                      <el-input v-model="sickHistory.familialDisease" autocomplete="off" placeholder="请输入家族病名称"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitSickHistory">确 定</el-button>
                  </div>
                </el-dialog>
                <el-collapse-item name="2-1">
                  <template slot="title" >
                    <i class="header-icon el-icon-s-order"></i>既往病史
                  </template>
                  <el-collapse  @change="handleChange" style="padding: 0 30px">
                    <el-collapse-item name="2-1" >
                      <template slot="title">
                        <i class="el-icon-d-arrow-right"></i>20170901 糖尿病
                      </template>
                      <p>sfasdkfhaldsjfhalskjdhflaksjdhfalsdjhfhalkdjshflsk</p>
                    </el-collapse-item>
                  </el-collapse>
                </el-collapse-item>
                <el-collapse-item name="2-2">
                  <template slot="title" >
                    <i class="header-icon el-icon-s-order"></i>家族病史
                  </template>
                  <el-collapse  @change="handleChange" style="padding: 0 30px">
                    <el-collapse-item name="2-2" >
                      <template slot="title">
                        <i class="el-icon-d-arrow-right"></i>20170901 糖尿病
                      </template>
                      <p>sfasdkfhaldsjfhalskjdhflaksjdhfalsdjhfhalkdjshflsk</p>
                    </el-collapse-item>
                  </el-collapse>
                </el-collapse-item>
                <el-collapse-item name="2-3">
                  <template slot="title" >
                    <i class="header-icon el-icon-s-order"></i>手术史
                  </template>
                  <el-collapse  @change="handleChange" style="padding: 0 30px">
                    <el-collapse-item name="2-1" >
                      <template slot="title">
                        <i class="el-icon-d-arrow-right"></i>20170901 糖尿病
                      </template>
                      <p>sfasdkfhaldsjfhalskjdhflaksjdhfalsdjhfhalkdjshflsk</p>
                    </el-collapse-item>
                  </el-collapse>
                </el-collapse-item>
                <el-collapse-item name="2-4">
                  <template slot="title" >
                    <i class="header-icon el-icon-s-order"></i>过敏史
                  </template>
                  <el-collapse  @change="handleChange" style="padding: 0 30px">
                    <el-collapse-item name="2-1" >
                      <template slot="title">
                        <i class="el-icon-d-arrow-right"></i>20170901 糖尿病
                      </template>
                      <p>sfasdkfhaldsjfhalskjdhflaksjdhfalsdjhfhalkdjshflsk</p>
                    </el-collapse-item>
                  </el-collapse>
                </el-collapse-item>
              </el-collapse>
            </div>
<!--            当前数据-->
            <div style="height: 104px; margin: 25px 0;display: flex;color:#333333;justify-content: space-between;align-content: center">
              <div
                style="padding: 0 20px;min-width: 180px;border-radius: 8px;background-color: white"
                v-for="(item, index) in showData"
                :key = 'index'>
                <p>{{item[item.length-1].typeName}}</p>
                <h2>0.13/Hz</h2>
              </div>
            </div>
<!--            历史数据-->
            <el-divider >
              <router-link to="/heartTest" @click="lookHistoryDatas">
                <i class="el-icon-edit-outline" ></i>
                <span >查看历史数据记录</span>
              </router-link>
            </el-divider>
            {{userClick}}
          </el-main>
        </template>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'UserHome',
  props: ['userClick'],
  data () {
    let checkOldPass = function (key, value, callback) {
      if (!value) {
        callback(new Error('请输入原始密码'))
      } else {
        callback()
      }
    }
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else if (this.ruleForm.password !== '') {
        if (value === this.ruleForm.password) {
          callback(new Error('新旧密码相同'))
        }
        callback()
      } else {
        if (this.ruleForm.checkNewPass !== '') {
          this.$refs.ruleForm.validateField('checkNewPass')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      showData: [[{typeName: 'Breath', id: 1}], [{typeName: 'Breath', id: 1}], [{typeName: 'Breath', id: 1}], [{typeName: 'Breath', id: 1}]],
      value1: true,
      value2: true,
      formLabelWidth: '120px',
      dialogFormVisible: false,
      err: false,
      contentFlag: [true, false, false],
      medical: '',
      sickHistory: {
        medicalHistory: '',
        allergicHistory: '',
        operationHistory: '',
        familialDisease: ''
      },
      userMessage: this.$route.query.userClick ? this.$route.query.userClick : {
        username: this.$route.query.userClick ? this.$route.query.userClick.username : JSON.parse(localStorage.getItem('userMessage')).username,
        id: JSON.parse(localStorage.getItem('userMessage')).id,
        render: '女',
        weight: 60,
        height: 168,
        iconUrl: require('../assets/b4.jpg') // 不写require图片路径会解析成静态资源，没有被编译
      },
      ruleForm: {
        password: '',
        newPassword: '',
        checkNewPass: ''
      },
      rules: {
        password: [
          { validator: checkOldPass, trigger: 'blur' }
        ],
        newPassword: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkNewPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      activeIndex: '1',
      activeNames: ['1'],
      Token: localStorage.getItem('Authorization'),
      path: [],
      isCollapse: true
    }
  },
  // computed: {
  //   // bmi () {
  //   //   let bmi = this.weight / (this.height / 100)
  //   //   return Math.pow(bmi, 2)
  //   // }
  // },
  // mounted () {
  //   console.log('c:', this.$route.query.userClick)
  //   this.$http.get('http://39.105.193.111:5000/history/')
  //     .then(res => {
  //       console.log(res)
  //       // alert(res)
  //     }).catch(error => {
  //       console.log(error)
  //     })
  // },
  methods: {
    lookHistoryDatas () {

    },
    submitSickHistory () {
      this.$http.get('http://39.105.193.111:5000/history/', {params: {uid: this.userMessage.id}})
        .then(res => {
          console.log(res)
          alert(res)
        })
      this.dialogFormVisible = false
      this.$http.post('http://39.105.193.111:5000/history', this.sickHistory)
        .then(res => {
          console.log(res)
        })
    },
    addSickHistory () {
      this.dialogFormVisible = true
    },
    submitForm (formName) { // 这部分还没写
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.put('http://39.105.193.111:5000/user/password', {'password': this.ruleForm.password, 'newPassword': this.ruleForm.newPassword})
            .then((res) => {
              console.log(res)
              if (res.data.code === 200) {
                this.$message({
                  message: '密码修改成功！',
                  type: 'success'
                })
                this.$refs[formName].resetFields()
              } else if (res.data.code === 400) {
                this.$message.error('密码修改失败！')
                this.$refs[formName].resetFields()
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.err = false
      this.$refs[formName].resetFields()
    },
    // changeHeight () {
    //   this.$prompt('请输入身高', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消'
    //   }).then(({ value }) => {
    //     this.userMessage.height = value
    //     this.$http.put('http://39.105.193.111:5000/user/update', {height: value})
    //       .then(res => {
    //         console.log(res)
    //       })
    //     console.log('身高修改成功', '身高：', value)
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '取消输入'
    //     })
    //   })
    // },
    changeName () {
      // this.$prompt('请输入新的用户名', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消'
      // }).then(({ value }) => {
      //   this.userMessage.username = value
      //   this.$http.put('http://39.105.193.111:5000/user/update', {username: value})
      //     .then(res => {
      //       console.log(res)
      //     })
      //   console.log('用户名修改成功', '用户名：', value)
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '取消输入'
      //   })
      // })
    },
    changeRender () {
      this.$prompt('请输入身高', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        this.userMessage.height = value
        this.$http.put('http://39.105.193.111:5000/user/update', {height: value})
          .then(res => {
            console.log(res)
          })
        console.log('身高修改成功', '身高：', value)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    // changeWeight () {
    //   this.$prompt('请输入体重', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     inputErrorMessage: '邮箱格式不正确'
    //   }).then(({ value }) => {
    //     this.userMessage.weight = value
    //     console.log('体重修改成功', '体重：', value)
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '取消输入'
    //     })
    //   })
    // },
    handleChange (val) {
      console.log(val)
    },
    handleSelect (key, keyPath) { // 内容页切换
      console.log(key)
      switch (key) {
        case '1':this.contentFlag = [true, false, false]; break
        case '2-1':this.contentFlag = [false, true, false]; break
        case '2-2':this.contentFlag = [false, false, true]; break
      }
    },
    // handleOpen (key, keyPath) {
    //   this.$http.get('http://39.105.193.111:5000/group/user/all')
    //     .then(res => {
    //       console.log(res)
    //     })
    //   console.log(keyPath)
    // },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    // 问题：登录之后需要刷新页面才能注销，否则401 （已解决）
    handleSelectHeader (key, keyPath) {
      switch (key) {
        case '1': this.$router.push('/'); break
        case '2': this.$router.push('/about'); break
        case '3': this.$router.push('/set'); break
        case '4': this.$router.push('/help'); break
        case '6': this.$router.push('/about'); break
      }
      console.log(keyPath)
    },
  }
}
</script>
<style scoped>
  .el-header {
    text-align:right;
    font-size: 12px;
    background-color: white;
    border-bottom: solid 1px gainsboro;
    color: #333;
  }
  #username{
    font-size: 14px;
    color:white;
    margin-right: 30px;
  }
  .block{
    margin: 15px 0;
  }

  /*.el-aside {*/
  /*  color: red;*/
  /*  background-color: rgb(238, 241, 246);*/
  /*  height: 100%;*/
  /*}*/
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

</style>
