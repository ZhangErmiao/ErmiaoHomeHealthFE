<template>
  <div>
    <el-container>
      <el-header style="padding: 0;">
        <el-menu :default-active="activeIndex"  mode="horizontal" @select="handleSelectHeader" background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b">
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="7">购买</el-menu-item>
          <el-menu-item index="8">社区</el-menu-item>
          <el-menu-item index="2">关于我们</el-menu-item>
          <el-menu-item index="3">设置</el-menu-item>
          <el-menu-item index="4">帮助</el-menu-item>
          <el-menu-item index="6" style="float: right;">你好，{{username}}</el-menu-item>
        </el-menu>
      </el-header>
      <el-main style="padding: 0;">
        <el-container style="height: 700px; border: 1px solid gainsboro">
          <el-aside width="191px">
            <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @select="handleSelect"
              style="height: 100%;width: 190px; ">
              <el-menu-item index="1">
                <i class="el-icon-edit-outline"></i>
                <span slot="title">创建群组</span>
              </el-menu-item>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-school"></i>
                  <span>我的群组</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-1">相亲相爱一家人</el-menu-item>
                  <el-menu-item index="2-2">我们是一家人</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-aside>
<!---------------------------------------------- 创建群组 -------------------------------------------->
          <template id="createMyGroup" v-if="contenter[0]">
            <el-container>
              <el-header >
                <el-breadcrumb  id='path'>
                  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                  <el-breadcrumb-item>家庭成员管理</el-breadcrumb-item>
                  <el-breadcrumb-item>创建群组</el-breadcrumb-item>
                </el-breadcrumb>
              </el-header>
              <el-main>
                <el-form :model="newGroupForm" status-icon ref="newGroupForm" label-width="100px">
                  <el-form-item   label="群组名称" prop="name">
                    <el-input  placeholder="请输入群组名称" v-model.number="newGroupForm.name"></el-input>
                    <p id="err" v-show="err">用户名已存在</p>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('newGroupForm')">创建</el-button>
                    <el-button @click="resetForm('newGroupForm')">重置</el-button>
                  </el-form-item>
                </el-form>
              </el-main>
            </el-container>
          </template>
<!-----------------------------------------  我的群组 ------------------------------------------------->
          <template id="showMyGroup" v-if="contenter[1]">
            <el-container>
              <el-header >
                <el-breadcrumb  id='path'>
                  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                  <el-breadcrumb-item>家庭成员管理</el-breadcrumb-item>
                </el-breadcrumb>
                <el-dropdown>
                  <i class="el-icon-setting" style="margin-right: 15px"></i>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>新增成员</el-dropdown-item>
                    <el-dropdown-item>批量删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-header>
              <el-main style="padding-top: 0">
                <el-table :data="tableData" height="550px">
                  <el-table-column prop="date" label="日期" width="140">
                  </el-table-column>
                  <el-table-column prop="name" label="姓名" width="120">
                  </el-table-column>
                  <el-table-column prop="render" label="性别" width="100">
                  </el-table-column>
                  <el-table-column prop="address" label="地址">
                  </el-table-column>
                  <el-table-column prop="change" label="操作">
                    <template slot-scope="scope">
                      <el-button @click="handleClick(scope.row)" type="text" size="small">移动</el-button>
                      <el-button type="text" size="small">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="block">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage1"
                    :page-size="20"
                    layout="total, prev, pager, next"
                    :total="101">
                  </el-pagination>
                </div>
              </el-main>
            </el-container>
          </template>
        </el-container>
      </el-main>
    </el-container>

  </div>
</template>

<script>
export default {
  name: 'Member',
  data () {
    return {
      err: false,
      path: [],
      newGroupForm: {
        name: ''
      },
      contenter: [true, false],
      username: JSON.parse(localStorage.getItem('userMessage')).username,
      tableData: [{date: '2016-05-02',
        name: '丁小海',
        render: '男',
        address: '上海市普陀区金沙江路 1518 弄'}, {
        date: '2016-05-02',
        name: '张二喵',
        render: '女',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      Token: localStorage.getItem('Authorization'),
      activeIndex: '1',
      isCollapse: true,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    }
  },
  watch: {
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('http://39.105.193.111:5000/group/', {'name': 'group_01'})
            .then((res) => {
              console.log('请求成功', res)
              if (res.data.code === 200) {
                console.log('注册成功')
                console.log(res)
                // this.$router.push('/login')
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
    },
    handleClick (row) {
      console.log(row)
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
    handleSelect (key, keyPath) {
      switch (keyPath[0]) {
        case '1': this.contenter = [true, false]; break
        case '2': this.contenter = [false, true]; break
      }
      console.log(keyPath)
    },
    logOut () {
      this.$http({
        method: 'post',
        url: 'http://39.105.193.111:5000/user/logout'
      })
        .then(res => {
          console.log('注销成功', res)
          localStorage.removeItem('user')
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleOpen (key, keyPath) { // 暂时没用
      console.log(keyPath)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style scoped>
  .block{
    margin: 15px 0;
  }
  .el-header {
    text-align:right;
    font-size: 12px;
    background-color: white;
    border-bottom: solid 1px gainsboro;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: red;
    background-color: rgb(238, 241, 246);
    height: 100%;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  #path{
    margin:25px 0;
  }
</style>
