<template >
  <el-container >
    <el-header style="padding:0">
      <el-menu :default-active="activeIndex"  mode="horizontal" @select="handleSelect" background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b" style="padding: 0 20px">
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="7">购买</el-menu-item>
        <el-menu-item index="8">社区</el-menu-item>
        <el-menu-item index="2">关于我们</el-menu-item>
        <el-menu-item index="3">设置</el-menu-item>
        <el-menu-item index="4">帮助</el-menu-item>
        <el-menu-item index="5" style="float: right;" v-if="Token">你好，{{username}}</el-menu-item>
        <el-menu-item index="6" v-else>登录/注册</el-menu-item>
      </el-menu>
    </el-header>
    <el-main style="padding:0;">
      <div class="block">
        <el-carousel height="350px"  indicator-position="outside">
          <el-carousel-item v-for="item in imagesbox" :key="item.id">
            <img alt="" :src= item.idView>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="app">
        <el-row :gutter="35" type="flex" id="app" style="margin: 0">
          <el-col :span="5"><el-card shadow="hover">
            <router-link to="/heartTest">
            <img src="../assets/心跳2.png" alt="">
            <p>健康数据记录</p>
          </router-link>
          </el-card></el-col>
<!--          <el-col :span="5"><el-card shadow="hover">-->
<!--            <router-link to="/login">-->
<!--              <img src="../assets/人员关系.png" alt="">-->
<!--              <p>人员信息统计</p>-->
<!--            </router-link>-->
<!--          </el-card></el-col>-->
<!--          <el-col :span="5"><el-card shadow="hover">-->
<!--            <router-link to="/login">-->
<!--              <img src="../assets/数据2.png" alt="">-->
<!--              <p>家庭数据统计</p>-->
<!--            </router-link>-->
<!--          </el-card></el-col>-->
          <el-col :span="5"><el-card shadow="hover">
            <router-link to="/member">
              <img src="../assets/人员信息7.png" alt="">
              <p>家庭成员管理</p>
            </router-link>
          </el-card></el-col>
        </el-row>
      </div>
      <div >
        <div style="padding: 15px 5px;border-bottom:solid 1px royalblue ">
          <i class="el-icon-message-solid"></i>
          <span>今日健康资讯</span>
        </div>
        <div style="padding: 15px 30px;text-align: left" >
          <el-link :underline="false" icon="el-icon-link" class="el-link">第一次登录的时候，前端调后端的登陆接口，发送用户名和密码无下划线</el-link>
          <el-link :underline="false" icon="el-icon-link">第一次登录的时候，前端调后端的登陆接口，发送用户名和密码无下划线</el-link>
          <el-link :underline="false" icon="el-icon-link">第一次登录的时候，前端调后端的登陆接口，发送用户名和密码无下划线</el-link>
          <el-link :underline="false" icon="el-icon-link">第一次登录的时候，前端调后端的登陆接口，发送用户名和密码无下划线</el-link>
          <el-link :underline="false" icon="el-icon-link">第一次登录的时候，前端调后端的登陆接口，发送用户名和密码无下划线</el-link><el-link :underline="false" icon="el-icon-link">第一次登录的时候，前端调后端的登陆接口，发送用户名和密码无下划线</el-link>
        </div>

      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      Token: localStorage.getItem('Authorization'),
      activeIndex: '1',
      imagesbox: [{id: 0, idView: require('../assets/logo.png')},
        {id: 1, idView: require('../assets/t.png')},
        {id: 2, idView: require('../assets/b3.jpg')}]
    }
  },
  computed: {
    username: function () {
      if (localStorage.getItem('userMessage')) {
        return JSON.parse(localStorage.getItem('userMessage')).username
      } else {
        return null
      }
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      switch (key) {
        case '1': this.$router.push('/'); console.log('我已经跳转拉'); break
        case '2': this.$router.push('/about'); break
        case '3': this.$router.push('/set'); break
        case '4': this.$router.push('/help'); break
        case '5': this.$router.push('/set'); break
        case '6': this.$router.push('/login'); break
      }
      console.log(keyPath)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-carousel__item img {
    opacity: 0.7;
    margin: 0;
  }

  /*.el-carousel__item:nth-child(2n) {*/
  /*  background-color: #99a9bf;*/
  /*}*/

  /*.el-carousel__item:nth-child(2n+1) {*/
  /*  background-color: #d3dce6;*/
  /*}*/
.app{
  padding: 20px;
  border-top: solid 5px gainsboro;
  border-bottom: solid 5px gainsboro;
}
#app{
  justify-content: space-around;

}
  .block img{
    width: 100%;
    height: 100%;
  }
  .el-link{
    padding: 10px;
    display: block;
  }

</style>
