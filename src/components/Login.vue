<template>
  <el-container class="container">
    <el-header class="el-head">
      <router-link to="/login" >
          <el-button  class="head defaultActive">登录</el-button>
      </router-link>
      <router-link to="/registered" >
        <el-button class="head">注册</el-button>
      </router-link>
    </el-header>
    <el-main>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
        <el-form-item  label="用户名" prop="username">
          <el-input  placeholder="请输入用户名" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item  label="密码" prop="password">
          <el-input  placeholder="请输入密码" type="password" v-model="ruleForm.password" ></el-input>
        </el-form-item>
          <p id="err" v-show="err">用户名或密码错误</p>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: 'Login',
  data () {
    let checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      }
      setTimeout(() => {
        if (!value) {
          callback(new Error('请输入用户名'))
        } else {
          callback()
        }
      }, 1000)
    }

    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }

    return {
      activeIndex: this.$store.state.activeIndex,
      err: false,
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { validator: checkName, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('http://39.105.193.111:5000/user/login', this.ruleForm)
            .then((res) => {
              console.log('请求发送成功', res)
              if (res.data.code === 200) {
                this.$store.dispatch('isLogIn', res.data.data)
                  .then(() => {
                    // console.log(localStorage.getItem('user'))
                    this.$router.push('/') // 这个地方的this有坑，要么用function+bind或箭头函数
                  })
              } else {
                this.err = true
                console.log('用户名或密码错误')
              }
            })
            .catch(function (error) {
              alert('登录失败')
              console.log(error)
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
    }
  }
}
</script>

<style>
  .el-head{
    border-bottom:solid 1px silver;
  }
 .container{
   border: solid 1px royalblue;
   margin: 50px auto;
   width:50%;
 }
 .head{
    border: none;
    height: 59px;
  }
  .defaultActive{
    border-radius: 0;
    border-bottom: solid 2px #409EFF;
  }
  el-form-item{
    margin: 20px 0;
  }
  #err{
    color: red;
  }
</style>
