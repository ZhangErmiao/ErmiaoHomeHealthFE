<template>
  <el-container>
    <el-header style="padding:0">
      <el-menu :default-active="activeIndex"  mode="horizontal" @select="handleSelectHeader" >
        <el-menu-item index="1">
          <img src="../assets/tt.png" style="width:150px; height: 53px ">
        </el-menu-item>
        <el-menu-item index="2">首页</el-menu-item>
        <el-menu-item index="3">购买</el-menu-item>
        <el-menu-item index="4">社区</el-menu-item>
        <el-menu-item index="5">关于我们</el-menu-item>
        <el-menu-item index="6">设置</el-menu-item>
        <el-menu-item index="7">帮助</el-menu-item>
        <el-menu-item index="8" style="float: right;" v-if="Token">你好，{{userMessage.username}}</el-menu-item>
        <el-menu-item index="9" v-else>登录/注册</el-menu-item>
      </el-menu>
    </el-header>
    <!-----------------------------------------------    ------------------------------------------------>
    <el-main >
        <p><b>使用说明</b></p>
        <el-steps :active="2" align-center>
          <el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="步骤4" description="这是一段很长很长很长很长很长很长很长很长很长很长很长很长的描述性文字"></el-step>
        </el-steps>
        <div style="margin:80px 120px; text-align: left;line-height: 30px">
          <p>射频研究实验室以天线技术、毫米波与太赫兹通信器件与集成电路设计技术为主要研究方向，并由一支年轻而充满活力的科研团队组成。实验室每年都会邀请国际知名大学的教授开展前沿讲座，讲座内容不仅学术性强，而且与产业紧密结合，在各自研究领域都具有一定的开创性，师生反响强烈。</p>
          <el-row :gutter="80" style="color: darkgray; font-size: 13px;line-height: 20px">
            <el-col :span="12"><p>实验室学术带头人为李秀萍教授，Prof. Law Choi Look兼职教授（新加坡南洋理工大学）以及许昌龙高级资深研究员（高通无线通信技术(中国)有限公司）。目前实验室有指导教师3名，研究生22名（其中博士生4名，硕士生18名）。
              实验室先后承担863重大项目、国家自然科学基金项目、国家重点实验室开放课题项目、国际合作项目（西门子公司项目）以及若干与国内公司合作的横向合作项目，开发的产品已经得到了产业化应用，申请国家发明专利20余项，出版编著3部。
              实验室经费充足，具备良好的硬件开发和测试环境，支持硕士生进行硬件设计以及加工和测试，鼓励并支持研究生发表高水平国际会议论文并资助出国参会。</p></el-col>
            <el-col :span="12"><p>Novelda’s XeThru Impulse Radar is a complete CMOS radar system integrated on a single chip. This technology is used to implement a high-precision electromagnetic sensor for human vital sign monitoring, personal security, environmental monitoring, industrial/home automation and other novel sensor applications.

              XeThru can improve the quality of life, and personal comfort and safety, by enabling non-intrusive sensors that collect relevant data while preserving full privacy. The technology Novelda AS is a privately held, R&D driven, sensor company based in Norway and specializing in nanoscale wireless low-power technology for ultra-high resolution impulse radar.</p></el-col>
          </el-row>
        </div>
      <el-divider >
        <p><b>常见问题</b></p>
      </el-divider>
        <div class="questionItem">
          <p style=""><b>如何下单购买？</b></p>
          <p>射频研究实验室以天线技术、毫米波与太赫兹通信器件与集成电路设计技术为主要研究方向，并由一支年轻而充满活力的科研团队组成。实验室每年都会邀请国际知名大学的教授开展前沿讲座，讲座内容不仅学术性强，而且与产业紧密结合，在各自研究领域都具有一定的开创性，师生反响强烈。</p>
        </div>
        <div class="questionItem">
          <p style=""><b>如何下单购买？</b></p>
          <p>射频研究实验室以天线技术、毫米波与太赫兹通信器件与集成电路设计技术为主要研究方向，并由一支年轻而充满活力的科研团队组成。实验室每年都会邀请国际知名大学的教授开展前沿讲座，讲座内容不仅学术性强，而且与产业紧密结合，在各自研究领域都具有一定的开创性，师生反响强烈。</p>
        </div>
        <div class="questionItem">
          <p style=""><b>如何下单购买？</b></p>
          <p>射频研究实验室以天线技术、毫米波与太赫兹通信器件与集成电路设计技术为主要研究方向，并由一支年轻而充满活力的科研团队组成。实验室每年都会邀请国际知名大学的教授开展前沿讲座，讲座内容不仅学术性强，而且与产业紧密结合，在各自研究领域都具有一定的开创性，师生反响强烈。</p>
        </div>
        <div class="questionItem">
          <p style=""><b>如何下单购买？</b></p>
          <p>射频研究实验室以天线技术、毫米波与太赫兹通信器件与集成电路设计技术为主要研究方向，并由一支年轻而充满活力的科研团队组成。实验室每年都会邀请国际知名大学的教授开展前沿讲座，讲座内容不仅学术性强，而且与产业紧密结合，在各自研究领域都具有一定的开创性，师生反响强烈。</p>
        </div>
        <div class="questionItem">
          <p style=""><b>如何下单购买？</b></p>
          <p>射频研究实验室以天线技术、毫米波与太赫兹通信器件与集成电路设计技术为主要研究方向，并由一支年轻而充满活力的科研团队组成。实验室每年都会邀请国际知名大学的教授开展前沿讲座，讲座内容不仅学术性强，而且与产业紧密结合，在各自研究领域都具有一定的开创性，师生反响强烈。</p>
        </div>
        <div class="questionItem">
          <p style=""><b>如何下单购买？</b></p>
          <p>射频研究实验室以天线技术、毫米波与太赫兹通信器件与集成电路设计技术为主要研究方向，并由一支年轻而充满活力的科研团队组成。实验室每年都会邀请国际知名大学的教授开展前沿讲座，讲座内容不仅学术性强，而且与产业紧密结合，在各自研究领域都具有一定的开创性，师生反响强烈。</p>
        </div>
        <div class="questionItem">
          <p style=""><b>如何下单购买？</b></p>
          <p>射频研究实验室以天线技术、毫米波与太赫兹通信器件与集成电路设计技术为主要研究方向，并由一支年轻而充满活力的科研团队组成。实验室每年都会邀请国际知名大学的教授开展前沿讲座，讲座内容不仅学术性强，而且与产业紧密结合，在各自研究领域都具有一定的开创性，师生反响强烈。</p>
        </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Help',
  data () {
    return {
      Token: localStorage.getItem('Authorization'),
      activeIndex: '7',
      userMessage: {
        username: JSON.parse(localStorage.getItem('userMessage')).username
      }
    }
  },
  methods: {
    handleSelectHeader (key, keyPath) {
      switch (key) {
        case '1': this.$router.push('/'); break
        case '2': this.$router.push('/'); break
        // case '3': this.$router.push('/'); break
        // case '4': this.$router.push('/help'); break
        case '5': this.$router.push('/about'); break
        case '6': this.$router.push('/set'); break
        case '7': this.$router.push('/help'); break
        case '8': this.$router.push('/set'); break
        case '9': this.$router.push('/login'); break
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
  .el-divider {
    margin: 40px 0;
  }
  .el-main{
    padding: 5px 0;
    margin: 60px 0;
  }
  .questionItem p{
    width: 60%;
    text-align: left;
    font-size: 13.5px;
    margin:15px auto;
  }
  .questionItem p:first-child{
    border-left: solid 3px #409EFF;
    font-size: 14px;
    padding:0 10px;
  }
</style>
