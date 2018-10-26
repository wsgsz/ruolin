<template>
  <div>
    <div>
      <div class="pages_share btn2em" v-show="image==''">
        <div style="width: 100%;background: #f0abac;padding:20rpx 30rpx;box-sizing: border-box;">
          <navigator class="share_index_bang" :url="'/pages/project/share/ranking/main?objId='+objId">分享排行榜</navigator>
        </div>
        <div class="share_index_bang2" >
          <div class="share_index_bang2_top">普通分享</div>
          <div class="share_index_bang2_center">生成长图任意分享</div>
          <div class="share_index_bang2_center">
            （只可分享至QQ空间、朋友圈、微博）
          </div>
          <navigator :url="'/pages/project/share/transmit/main?objId='+objId">
            <button class="share_index_bang2_button">普通分享</button>
          </navigator>
        </div>
      </div>
      <div class="pages_share " v-show="image==''">
        <div class="share_index_bang2" >
          <div class="share_index_bang2_top">点对点分享
           
          </div>
          <div class="share_index_bang2_center">一对一分享更便捷 <image src="/static/image/nengliang.png" style="width:25rpx;height:25rpx;"></image></div>
          <div class="share_index_bang2_center">
            （可自定义编辑，并可分享给指定用户）
          </div>
          <navigator :url="'/pages/project/share/ptp/main?objId='+objId">
            <button class="share_index_bang2_button">分享</button>
          </navigator>
        </div>
      </div>
      <div class="share_bottom">
        <div class="weui-loadmore" style="line-height: 1.2;margin:1em auto">
          <div class="weui-loading"></div>
          <div class="weui-loadmore__tips">说明</div>
        </div>
        <span>1.有效分享得2积分，点对点分享得10几分，成交得100积分，</span>
        <span>2.积分排行榜第一名获得500能量豆，第二名获得300能量豆第三名获得200能量豆。后七名获得100能量豆。</span>
        <span>2.积分榜每周结算一次</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      objId: '',
      image: ""
    }
  },
  onLoad(e) {
    Object.assign(this.$data, this.$options.data())
    this.objId = e.objId
  },
  methods: {
    transmit(ec) {
      // wx.showModal({
      //   title:"提示",
      //   content:"此功能暂未开放",
      //   showCancel:false
      // })
      this.$http.post('index/wc2dcode', { obj_id: ec, url: 'pages/project/detail/main' }).then(res => {
        this.image = res.data.data
      })
    }
  }
}

</script>
<style scoped>
.pages_share {
  padding: 0rpx 30rpx;
}

.share_index_bang2 {
  padding: 60rpx 0;
  margin: 0 0 0 0;
  box-sizing: border-box;
  height: 404rpx;
  background: url(../image/share_back.png);background-size: 100% 100%;
}

.share_index_bang {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  color: #d61518;
  background: #fff;
  font-weight: 500;
  font-size: 32rpx;
  margin: 20rpx 0;

}

.share_index_bang2_top {
  font-size: 32rpx;
  font-weight: 600;
  margin-bottom: 40rpx;
  text-align: center;
  line-height: 1;
  margin-top: 15rpx;
}

.share_index_bang2_center {
  font-size: 25rpx;
  color: #92969c;
  line-height: 1;
  text-align: center;
  margin-bottom: 20rpx;
}

.share_bottom {
  padding: 50rpx 30rpx;
  border-top: 1px solid #e6e6e6;
  color: #b6b6b6
}

.share_bottom span {
  display: block;
  font-size: 12px;
  width: 85%;
  margin: auto;
  line-height: 22px;
  color: #b6b6b6
}

.share_index_bang2_button {
  width: 80%;
  margin-top: 80rpx;
  background: #d61518;
  color: #fff;
  border-radius: 5rpx;
}

</style>
