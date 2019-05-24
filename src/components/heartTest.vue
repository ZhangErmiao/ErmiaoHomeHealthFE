<template>
  <el-container >
  <el-header style="padding:0">
    <el-menu :default-active="activeIndex"  mode="horizontal" @select="handleSelectHeader" background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b" style="padding: 0 20px">
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="7">购买</el-menu-item>
      <el-menu-item index="8">社区</el-menu-item>
      <el-menu-item index="2">关于我们</el-menu-item>
      <el-menu-item index="3">设置</el-menu-item>
      <el-menu-item index="4">帮助</el-menu-item>
      <el-menu-item index="5" style="float: right;" v-if="Token">你好，{{username}}</el-menu-item>
    </el-menu>
  </el-header>
    <el-main style="padding: 0;background-color: gainsboro">
      <el-tabs :tab-position="tabPosition"  v-model="activeName" type="border-card" @tab-click="handleClick" style="height: 100%">
      <el-tab-pane label="健康档案" name="first">
        <el-breadcrumb id="path">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>呼吸心跳记录</el-breadcrumb-item>
          <el-breadcrumb-item>健康档案</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="25">
          <el-col :span="18">
            <el-tabs  type="border-card" @tab-click="handleClick" style="margin: 15px auto;">
              <el-tab-pane label="呼吸" name="first">
                <heart-test-breath></heart-test-breath>
              </el-tab-pane>
              <el-tab-pane label="心跳" name="second">
                <heart-test-heart></heart-test-heart>
              </el-tab-pane>
              <el-tab-pane label="体重" name="third">
                <heartTestWeight></heartTestWeight>
              </el-tab-pane>
              <el-tab-pane label="腰围" name="fourth">定时任务补偿</el-tab-pane>
              <el-tab-pane label="血压" name="1">用户管理</el-tab-pane>
              <el-tab-pane label="血糖" name="2">配置管理</el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :span="6">
            <el-tabs  type="border-card" @tab-click="handleClick" style="margin: 15px auto;">
              <el-tab-pane label="呼吸" name="first">
              </el-tab-pane>
              <el-tab-pane label="心跳" name="second">配置管理</el-tab-pane>
              <el-tab-pane label="体重" name="third">
              </el-tab-pane>
              <el-tab-pane label="腰围" name="fourth">定时任务补偿</el-tab-pane>
              <el-tab-pane label="血压" name="1">用户管理</el-tab-pane>
              <el-tab-pane label="血糖" name="2">配置管理</el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>


      </el-tab-pane>
      <el-tab-pane label="健康记录" name="second">健康记录</el-tab-pane>
      <el-tab-pane label="健康评估" name="third">健康评估</el-tab-pane>
      <el-tab-pane label="我的设备" name="fourth">我的设备</el-tab-pane>
    </el-tabs>

    </el-main>
  </el-container>
</template>

<script>
  import heartTestWeight from './heartTest_weight.vue'
  import heartTestBreath from './heartTest_breath.vue'
  import heartTestHeart from './heartTest_heart.vue'
export default {
  name: 'HeartTest',
  components: {
    'heartTestWeight': heartTestWeight,
    'heartTestBreath': heartTestBreath,
    'heartTestHeart': heartTestHeart,
  },
  data () {
    return {
      value1: '',
      username: JSON.parse(localStorage.getItem('userMessage')).username,
      Token: localStorage.getItem('Authorization'),
      activeIndex: '1',
      activeName: 'first',
      tabPosition: 'left',

    }
  },

  methods: {
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
    handleClick (tab, event) {
      console.log(tab, event)
    }

  }
}
</script>
<style scoped>

</style>
