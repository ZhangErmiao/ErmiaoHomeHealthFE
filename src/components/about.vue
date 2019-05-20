<template>
  <el-container>
    <el-header style="padding: 0;">
      <el-menu :default-active="activeIndex"  mode="horizontal" @select="handleSelectHeader" background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b">
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="6">购买</el-menu-item>
        <el-menu-item index="7">社区</el-menu-item>
        <el-menu-item index="2">关于我们</el-menu-item>
        <el-menu-item index="3">设置</el-menu-item>
        <el-menu-item index="4">帮助</el-menu-item>
        <span id="username"> 你好，{{userMessage.username}}</span>
      </el-menu>
    </el-header>
<!-----------------------------------------------    ------------------------------------------------>
    <el-main>
      <img style="width: 100%" src="../assets/bb.png"/>
      <div style="margin:80px 120px; text-align: left;line-height: 30px">
        <p style="font-size: 30px;color: gray; ">About us</p>
        <p>Novelda AS is a privately held, R&D driven, sensor company based in Norway and specializing in nanoscale wireless low-power technology for ultra-high resolution impulse radar.</p>
        <el-row :gutter="80" style="color: darkgray; font-size: 13px;line-height: 20px">
          <el-col :span="12"><p>Novelda’s XeThru Impulse Radar is a complete CMOS radar system integrated on a single chip. This technology is used to implement a high-precision electromagnetic sensor for human vital sign monitoring, personal security, environmental monitoring, industrial/home automation and other novel sensor applications.

            XeThru can improve the quality of life, and personal comfort and safety, by enabling non-intrusive sensors that collect relevant data while preserving full privacy. The technology Novelda AS is a privately held, R&D driven, sensor company based in Norway and specializing in nanoscale wireless low-power technology for ultra-high resolution impulse radar.</p></el-col>
          <el-col :span="12"><p>Novelda’s XeThru Impulse Radar is a complete CMOS radar system integrated on a single chip. This technology is used to implement a high-precision electromagnetic sensor for human vital sign monitoring, personal security, environmental monitoring, industrial/home automation and other novel sensor applications.

            XeThru can improve the quality of life, and personal comfort and safety, by enabling non-intrusive sensors that collect relevant data while preserving full privacy. The technology Novelda AS is a privately held, R&D driven, sensor company based in Norway and specializing in nanoscale wireless low-power technology for ultra-high resolution impulse radar.</p></el-col>
        </el-row>
      </div>
      <img style="width: 100%" src="../assets/bbb.png"/>
      <div style="margin:80px 120px; text-align: left;line-height: 30px">
        <p style="font-size: 30px;color: gray; ">Company Value</p>
        <p>Novelda AS is a privately held, R&D driven, sensor company based in Norway and specializing in nanoscale wireless low-power technology for ultra-high resolution impulse radar.</p>
        <el-row :gutter="80" style="color: darkgray; font-size: 13px;line-height: 20px">
          <el-col :span="8">
            <el-container>
              <el-header style="font-size: 20px;text-align: left">Be playful and inspiring!</el-header>
              <el-main>
                <p>XeThru can improve the quality of life, and personal comfort and safety, by enabling non-intrusive sensors that collect relevant data while preserving full privacy. The technology Novelda AS is a privately held, R&D driven, sensor company based in Norway and specializing in nanoscale wireless low-power technology for ultra-high resolution impulse radar.</p>
              </el-main>
            </el-container>
          </el-col>
          <el-col :span="8">
            <el-container>
              <el-header style="font-size: 20px;text-align: left">Be playful and inspiring!</el-header>
              <el-main>
                <p>XeThru can improve the quality of life, and personal comfort and safety, by enabling non-intrusive sensors that collect relevant data while preserving full privacy. The technology Novelda AS is a privately held, R&D driven, sensor company based in Norway and specializing in nanoscale wireless low-power technology for ultra-high resolution impulse radar.</p>
              </el-main>
            </el-container>
          </el-col>
          <el-col :span="8">
            <el-container>
              <el-header style="font-size: 20px;text-align: left">Be playful and inspiring!</el-header>
              <el-main>
                <p>XeThru can improve the quality of life, and personal comfort and safety, by enabling non-intrusive sensors that collect relevant data while preserving full privacy. The technology Novelda AS is a privately held, R&D driven, sensor company based in Norway and specializing in nanoscale wireless low-power technology for ultra-high resolution impulse radar.</p>
              </el-main>
            </el-container>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      activeIndex: '2',
      userMessage: {
        username: JSON.parse(localStorage.getItem('userMessage')).username
      }
    }
  },
  methods: {
    handleSelectHeader (key, keyPath) {
      switch (key) {
        case '1': this.$router.push('/'); break
        case '2': this.$router.push('/about'); break
        case '3': this.$router.push('/set'); break
        case '4': this.$router.push('/help'); break
        case '6': this.$router.push('/about'); break
      }
      console.log(keyPath)
    }
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
    line-height: 60px;
  }
  #username{
    font-size: 14px;
    color:white;
    margin-right: 30px;
  }
  .el-main{
    padding: 0;
  }
</style>
