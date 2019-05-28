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
          <el-aside width="200px">
            <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @select="handleSelect"
              style="height: 100%;width: 198px; text-align: left">
              <el-menu-item index="1">
                <i class="el-icon-edit-outline"></i>
                <span slot="title">创建群组</span>
              </el-menu-item>
              <el-menu-item index="2">
                <i class="el-icon-search"></i>
                <span slot="title">搜索群组</span>
              </el-menu-item>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-school"></i>
                  <span>我的群组</span>
                </template>
                <el-menu-item-group style="text-align: left">
                  <el-menu-item :index='id.toString()' :key="id" v-for="{id, groupName} in group">{{groupName}}
                    <i class="el-icon-close" style="text-align: right" @click="deleteGroup(id)"></i>
                  </el-menu-item>
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
                <el-form :model="newGroupForm" :rules="rules" status-icon ref="newGroupForm" label-width="100px">
                  <el-form-item   label="群组名称" prop="name">
                    <el-input  placeholder="请输入群组名称" v-model.number="newGroupForm.name"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('newGroupForm')">创建</el-button>
                    <el-button @click="resetFormName('newGroupForm')">重置</el-button>
                  </el-form-item>
                </el-form>
              </el-main>
            </el-container>
          </template>
<!-- ----------------------------------搜索群组 --------------------------------------------------->
          <template id="searchMyGroup" v-if="contenter[1]">
            <el-container>
              <el-header >
                <el-breadcrumb  id='path'>
                  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                  <el-breadcrumb-item>家庭成员管理</el-breadcrumb-item>
                  <el-breadcrumb-item>创建群组</el-breadcrumb-item>
                </el-breadcrumb>
              </el-header>
              <el-main>
                <el-form :model="searchGroupForm" :rules="rules" status-icon ref="searchGroupForm" label-width="100px">
                  <el-form-item   label="群组ID" prop="id">
                    <el-input  placeholder="请输入群组id" v-model.number="searchGroupForm.id"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="searchForm('searchGroupForm')">搜索</el-button>
                    <el-button @click="resetFormId('searchGroupForm')">重置</el-button>
                  </el-form-item>
                </el-form>
              </el-main>
            </el-container>
          </template>
<!-----------------------------------------  我的群组 ------------------------------------------------->
          <template id="showMyGroup" v-if="contenter[2]">
            <el-container>
              <el-header >
                <el-breadcrumb id="path">
                  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                  <el-breadcrumb-item>家庭成员管理</el-breadcrumb-item>
                </el-breadcrumb>
                <i class="el-icon-plus" @click="addUser"></i>
              </el-header>
              <el-main style="padding-top: 0">
                <el-table :data="tableData" height="550px">
                  <el-table-column prop="id" label="ID" width="140">
                  </el-table-column>
                  <el-table-column prop="username" label="用户名" width="120">
                  </el-table-column>
                  <el-table-column prop="gender" label="性别" width="100">
                  </el-table-column>
                  <el-table-column prop="address" label="既往病史">
                  </el-table-column>
                  <el-table-column prop="change" label="操作">
                    <template slot-scope="scope">
                      <el-button @click="handleClick(scope.row)" type="text" size="small">移动</el-button>
                      <el-button type="text" size="small" @click="userDelete(scope.row)">删除</el-button>
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
                    :total=tableData.length>
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
/* eslint-disable */
export default {
  name: 'Member',
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
    return {
      path: [],
      group: [],
      newGroupForm: {
        name: ''
      },
      searchGroupForm: {
        id: ''
      },
      rules: {
        name: [{ validator: checkName, trigger: 'blur' }]
      },
      contenter: [true, false, false],
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
    userDelete (obj) {
      console.log({id: this.key, uid: obj.id})
      if (obj.id === JSON.parse(localStorage.getItem('userMessage')).id){
        this.$message('不可以删除自己哦')
      } else {
        this.$http.delete('http://39.105.193.111:5000/group/user',{data:{'id': this.key, 'uid': obj.id}})
          .then(res => {
            this.tableData = this.tableData.filter((item) => {return item.id !== obj.id})
            console.log(res)
          })
      }

    },
    checkSameName (value, tableData) {
      if (tableData) {
        tableData.forEach( item => {
          if (item.name === value) {
            return false
          } else {
            return true
          }
        })
      } else {
        return true
      }
    },
    addUser () {
      this.$prompt('请输入用户名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        console.log(this.tableData)
        if (this.checkSameName(value, this.tableData)) {
          this.$message('已添加过该用户')
        } else { // 先搜索是否有该用户，然后再添加
          this.$http.get('http://39.105.193.111:5000/user/search/',{params: {username: value}})
            .then(res => {
              if (res.status === 200) {
               if ( res.data) {
                this.$http.post('http://39.105.193.111:5000/group/user', {
                  "id": this.key,
                  "users": [
                    {"id": res.data.id}
                  ]
                }).then(() => {
                  this.tableData.push({username: value, id: res.data.id})
                  console.log("用户添加成功", this.key)
                })
              } else {
                 this.$message('该用户不存在')
               }
              console.log(res)
              }
            })
        }
      }).catch((err) => {
        console.log(err)
        // this.$message({
        //   type: 'info',
        //   message: '取消输入'
        // });
      });
    },
    deleteGroup (id) {
      console.log({'id': id})
      this.$http.delete('http://39.105.193.111:5000/group', {data:{'id': id}})
        .then(res => {
          console.log(res)
        })
    },
    searchForm (formId) {
      this.$http.get('http://39.105.193.111:5000/group/', {params: {id: formId}})
        .then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
      }).finally(() => {this.resetFormId(formId)})
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let flag = true
          this.$http.post('http://39.105.193.111:5000/group/', this.newGroupForm)
            .then((res) => {
              console.log('请求成功', res)
              flag = false
              if (res.data.code === 200) {
                console.log('注册成功')
                console.log(res)
                this.$message({
                  message: '群组创建成功！',
                  type: 'success'
                })
                this.resetFormName(formName)
                // this.$router.push('/member')
              } else {
                this.err = true
                this.$message.error('群组名称已存在') // 后台允许相同名称的群
                // console.log('群名称已存在！')
              }
            })
          if (flag) {
            console.log('submit!')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // resetForm (formName) {
    //   this.$refs[formName].resetFields()
    // },
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
        case '1': this.contenter = [true, false, false]; break
        case '2': this.contenter = [false, true, false]; break
        case '3': this.contenter = [false, false, true]; break
      }
      if (keyPath && keyPath.length>1) {
        let id = keyPath[1]
        this.$http.get('http://39.105.193.111:5000/group/user/all', {params: {id: id}})
          .then(res => {
            console.log(res)
            this.tableData = res.data.data.userList
            this.key = id
          })
      }
      console.log(key)
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
      if (key === '3') {
        this.$http.get('http://39.105.193.111:5000/group/all')
          .then((res) => {
            if (res.data.code === 200) {
              console.log(res)
              this.group = res.data.data
            }
          })
      }
      // console.log(keyPath)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    resetFormName (formName) {
      this.$refs[formName].resetFields()
    },
    resetFormId (formId) {
      this.$refs[formId].resetFields()
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
    display: inline-block;
    float: left;
    line-height: 60px;
    width: 400px;
  }
</style>
