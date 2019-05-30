<template>
  <div id="app">
<!--    <el-header style="padding:0">-->
<!--      <el-menu :default-active="activeIndex"  mode="horizontal" @select="handleSelectHeader" background-color="#545c64"-->
<!--               text-color="#fff"-->
<!--               active-text-color="#ffd04b" style="padding: 0 20px">-->
<!--        <el-menu-item index="1">首页</el-menu-item>-->
<!--        <el-menu-item index="2">购买</el-menu-item>-->
<!--        <el-menu-item index="3">社区</el-menu-item>-->
<!--        <el-menu-item index="4">关于我们</el-menu-item>-->
<!--        <el-menu-item index="5">设置</el-menu-item>-->
<!--        <el-menu-item index="6">帮助</el-menu-item>-->
<!--        <el-menu-item index="7" style="float: right;" v-if="Token">你好，{{username}}</el-menu-item>-->
<!--        <el-menu-item index="8" v-else>登录/注册</el-menu-item>-->
<!--      </el-menu>-->
<!--    </el-header>-->
    <router-view/>
    <el-footer class="footer" style="height: 200px">
      <div class="address">
        <p>电话：025-3385959</p>
        <p>邮箱：zzuyizhang@163.com</p>
        <p>地址：北京市海淀区西土城路10号</p>
      </div>
      <div class="photos">
        <img src="./assets/rf1.png" alt="">
      </div>
    </el-footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      // Token: localStorage.getItem('Authorization'),
      // activeIndex: this.$store.state.path[1],
      // path: []
    }
  },
  methods: {
    // handleSelectHeader (key, keyPath) {
    //   switch (key) {
    //     case '1':
    //       this.$store.dispatch('changePath', ['/', '1'])
    //         .then(() => { this.$router.push('/') }); break
    //     case '4': this.$store.dispatch('changePath', ['/about', '4'])
    //       .then(() => { this.$router.push('/about') }); break
    //     case '5': this.$store.dispatch('changePath', ['/set', '5'])
    //       .then(() => { this.$router.push('/set') }); break
    //     case '6': this.$store.dispatch('changePath', ['/help', '6'])
    //       .then(() => { this.$router.push('/help') }); break
    //     case '7': this.$store.dispatch('changePath', ['/set', '7'])
    //       .then(() => { this.$router.push('/set') }); break
    //     case '8': this.$store.dispatch('changePath', ['/login', '8'])
    //       .then(() => { this.$router.push('/login') }); break
    //   }
    //   console.log(this.$store.state.path)
    //   // console.log(keyPath)
    // }
  },
  computed: {
    username: function () {
      if (localStorage.getItem('userMessage')) {
        return JSON.parse(localStorage.getItem('userMessage')).username
      } else {
        return null
      }
    }
  }
}
</script>

<style>
/*.el-header {*/
/*  text-align:right;*/
/*  font-size: 12px;*/
/*  background-color: white;*/
/*  border-bottom: solid 1px gainsboro;*/
/*  color: #333;*/
/*  line-height: 60px;*/
/*}*/
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.footer{
  padding: 40px 150px;
  background-color:#34495e;
  /*background-color:gainsboro;*/
  /*background-color: #545c64;*/
  display: flex;
  justify-content: space-between;
}
.footer .address{
  width: 40%;
  text-align: left;
}
.footer .address p{
  padding: 3px;
  color: white;
  font-size: 13px;
}
</style>
