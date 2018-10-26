<template>
  <div class="pageess">
    <div class="page__hd">
      <div class="page__title">电脑版后台</div>
      <div class="page__desc">使用电脑版后台,可以更高效地处理一些手机上不太方便的操作</div>
      <div class="page__desc page__desc1">1.编辑复杂的活动图文详情据。</div>
      <div class="page__desc page__desc1" @click="getCli" style="color: #d61518">https://m.ruolingroup.com/ruolin/hou</div>
      <div class="page__desc page__desc1">点击复杂,去电脑上粘贴访问即可。如有任何问题,请联系客服</div>
    </div>
    <div style="position: fixed;width: 100%;bottom: 0px;height: 150rpx;">
      <div style="text-align: center;font-size: 13px;color: #223f75">
      4000-191-168
    </div>
    <div style="text-align: center;font-size:14px;">
      如有任何问题，请联系客服
    </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      motto: 'Hello World',
    }
  },
  methods: {
    getCli(){
      wx.setClipboardData({
        data:"https://m.ruolingroup.com/ruolin/hou"
      })
    }
  },
}

</script>
<style scoped>
.page__hd {
    padding: 40rpx;
}
.page__title {
    text-align: left;
    font-size: 20px;
    font-weight: 400;
    text-align: center;
    margin:100rpx 0;
}
.page__desc1{
  padding:0px 120rpx;
  text-align: center;
}
.page__desc {
    margin-top: 60rpx;
    font-size: 14px;
}
.pageess{
  height: 100vh;
  background: url(../image/back_help.png);background-size: 100% 100%
}
</style>
