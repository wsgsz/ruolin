<template>
  <div>
    <!-- <navigator url="/pages/information/websorket/main">websorket</navigator> -->
    <div class="weui-flex information">
      <navigator url="/pages/index/information/main" open-type="redirect" class="weui-flex__item">
        <div class="information_text">私信</div>
      </navigator>
      <navigator url="/pages/information/notice/main" open-type="redirect" class="weui-flex__item">
        <div class="information_text active">通知</div>
      </navigator>
    </div>
    <!--  -->
    <!--   <div class="weui-panel__bd">
      <navigator url="" class="weui-media-box weui-media-box_appmsg" >
        <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
          <image class="weui-media-box__thumb" src="" />
        </div>
        <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
          <div class="weui-media-box__title">标题一</div>
          <div class="weui-media-box__desc">由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</div>
        </div>
      </navigator>
      <navigator url="" class="weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
          <image class="weui-media-box__thumb" src="" />
        </div>
        <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
          <div class="weui-media-box__title">标题二</div>
          <div class="weui-media-box__desc">由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</div>
        </div>
      </navigator>
    </div> -->
    <!--  -->
    <div class="weui-cells weui-cells_after-title">
      <navigator :url="'/pages/information/websorket/main?r_id='+item.receive_uid+'&userAvatar='+item.user_avatar+'&userNickname='+item.user_nickname" class="weui-cell" v-for="(item,index) in data" :key="index">
        <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
          <image :src="item.user_avatar" style="width: 50px; height: 50px; display: block" />
        </div>
        <div class="weui-cell__bd">
          <div>{{item.user_nickname}} {{item.time}}</div>
          <div style="font-size: 13px;color: #888888;">{{item.user_signature}}</div>
        </div>
      </navigator>
    </div>
    <b-footer zindex="1"></b-footer>
  </div>
</template>
<script>
import bFooter from '@/components/footer'
export default {
  data() {
    return {
      data: "",
      page: 1,
      last_id: ""
    }
  },
  onLoad() {
    Object.assign(this.$data, this.$options.data())
    this.getList(this.page)
  },
  components: {
    bFooter
  },
  methods: {
    getList() {
      this.$http.post('message/notificationList', { page: this.page, last_id: last_id }).then(res => {
        console.log(res.data.data.data)
        this.data = res.data.data.data
      })
    },
  },
  async onPullDownRefresh() {
    wx.stopPullDownRefresh();
  },
  onReachBottom() {
    const _this = this;
    setTimeout(() => {
      _this.ReachBottom = true;
    }, 2000);
    this.page += 1;
    this.getList(this.page);
  }
}

</script>
<style scoped>
.information {
  height: 80rpx;
  border-bottom: 1px solid #e6e6e6
}

.information .weui-flex__item {
  text-align: center;
  justify-content: space-between;
  z-index: 11
}

.information .information_text {
  font-size: 36rpx;
  font-weight: 500;
  line-height: 80rpx;
  color: #1a1a1a;
  width: 90rpx;
  /*border-bottom: 2px solid #fff;*/
  margin: auto;
  box-sizing: border-box;
}

.information .information_text.active {
  border-bottom: 2px solid #1a1a1a;
}

</style>
