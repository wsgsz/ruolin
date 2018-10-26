<template>
  <div class="page">
    <div class="page__hd about_c">

        <image src="/static/image/logo.png" class="about_image" />

      <div class="page__desc">若邻汇是以口碑为核心的连锁品牌撮合平台。 汇聚千余实力品牌，百万优质创业者，千万高效分享者……让品牌处于口碑裂变的核心，为创业者精准推送项目，实现招商加盟的高效直线撮合！ 分享平台项目赚取佣金。 还有圈子玩法：建立你的圈子，发布你对一切的看法！
      <span class="page__title_v" @click="link()">商务合作</span>
       <div class="page__desc">  请您联系：<span style="color:#223f75" @click="tel('135-5201-5616')">135-5201-5616</span>(同微信) </div>
         <span class="page__title_v" @click="link()">市场合作</span>
       <div class="page__desc">  请您联系：<span style="color:#223f75"  @click="tel('139-0115-8975')">139-0115-8975</span>(同微信) </div>
       <div class="page__desc">  客服专线：<span style="color:#223f75"  @click="tel('4000-191-168')">4000-191-168</span> </div>
             <span class="page__title_v" @click="link()">地址：</span>
            
       <div class="page__desc">  北京市朝阳区东三环中路39号(100022) <br> 建外SOHO西区18号楼31层3103室</div>
         <div class="page__desc">  湖北省武汉市江汉区新华路(430000) <br> IFC1301室</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      motto: "Hello World"
    };
  },
  methods: {
    link() {
      wx.clearStorage({
        success: function() {
          console.log("清除token");
          wx.switchTab({
            url: "/pages/index/project/main"
          });
        }
      });
    },
    tel(obj){
      wx.makePhoneCall({
        phoneNumber:obj
      })
    }
  }
};
</script>
<style scoped>
.page {
  background: #f6f6f6;
  height: 100%;
  padding: 150rpx 30rpx 0 30rpx;
}
.about_c {
  padding: 130rpx 50rpx 50rpx 50rpx;
  margin: auto;
  background: #ffffff;
  position: relative;
}
.about_image {
  width: 100rpx;
  height: 100rpx;
  border-radius: 10rpx;
  overflow: hidden;
  padding: 30rpx;
  box-shadow: 0px 0px 5rpx 5rpx #f4eaea;
  position: absolute;
  left: 265rpx;
  top: -80rpx;
  background: #fff;
}
.page__desc {
  color: #1a1a1a;
  font-size: 13px;
  line-height: 35rpx;
  margin-bottom: 35rpx;
}
.page__title_v {
  margin-top: 35rpx;
  margin-bottom: 35rpx;
  display: block;
  font-size: 15px;
  font-weight: 500;
}
</style>
