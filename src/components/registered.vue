<template>
  <el-container class="container">
    <el-header class="el-head">
      <router-link to="/login" >
        <el-button  class="head">登录</el-button>
      </router-link>
      <router-link to="/registered" >
        <el-button class="head defaultActive">注册</el-button>
      </router-link>
    </el-header>
    <el-main>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item   label="用户名" prop="username">
          <el-input  placeholder="请输入用户名" v-model.number="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="render">
          <el-select v-model="ruleForm.render" placeholder="请选择性别" >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="密码" prop="password">
          <el-input  placeholder="请输入密码" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item  label="确认密码" prop="checkPass">
          <el-input  placeholder="请确认密码" type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <p id="err" v-show="err">用户名已存在</p>
        <el-form-item >
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: 'Registered',
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
    let checkRender = (rule, value, callback) => {
      if (value === null) {
        return callback(new Error('请选择性别'))
      }
      setTimeout(() => {
        if (value === null) {
          callback(new Error('请选择性别'))
        } else {
          callback()
        }
      }, 1000)
    }
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      err: false,
      options: [
        {
          value: 0,
          label: '男'
        }, {
          value: 1,
          label: '女'
        }],
      ruleForm: {
        username: '',
        render: null,
        password: '',
        checkPass: '',
        icon: 'http://www.dinghai.com/a.png'
      },
      rules: {
        username: [
          { validator: checkName, trigger: 'blur' }
        ],
        render: [
          { validator: checkRender, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('http://39.105.193.111:5000/user/register', this.ruleForm)
            .then((res) => {
              console.log('请求成功', res)
              if (res.data.success) {
                console.log('注册成功')
                this.$router.push('/login')
              } else {
                this.err = true
                console.log('用户名已存在')
              }
            })
          console.log('submit!')
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
  #err{
    color: red;
  }
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
</style>
