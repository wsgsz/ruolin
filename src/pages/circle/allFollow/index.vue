<template>
  <div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell" v-for="(item,index) in follow" :key="index">
        <navigator :url="'/pages/circle/detail/main?circle_id='+item.id" class="weui-cell__hd" style="position: relative;margin-right: 10px;">
          <image :src="item.circle_image" style="width: 50px; height: 50px; display: block" />
        </navigator>
        <navigator :url="'/pages/circle/detail/main?circle_id='+item.id" class="weui-cell__bd" style="width: 400rpx;">
          <div style="width: 380rpx;">{{item.circle_name}}</div>
          <div style="font-size: 13px;color: #888888;width: 380rpx;">摘要信息</div>
        </navigator>

        <div class="weui-cell__bd" style="width: 120rpx;margin-right:20rpx;">
          <div style="width: 120rpx;background: #d61518;color: #fff;height: 50rpx;text-align: center;border-radius: 5rpx;padding:0px 4rpx;margin-right: 40rpx" @click="daka(item.id,index)">去打卡</div>
        </div>
        <div class="weui-cell__bd" style="width:50rpx;" @click="AttentionCircle(item.id,index)">
          <image src="/static/image/follow_more.png" style="height:50rpx;width:50rpx;" />
        </div>
      </div>
    </div>
    <div class="weui-loadmore" v-show="!more">
      <div class="weui-loading"></div>
      <div class="weui-loadmore__tips">正在加载</div>
    </div>
    <div class="weui-loadmore weui-loadmore_line" v-show="more">
      <div class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无数据</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      follow: [],
      more: true,
      current_page: 1,
      last_id: ""
    }
  },
  onShow() {
    Object.assign(this.$data, this.$options.data());
    this.getAll(this.last_id, this.current_page)
  },
  methods: {
    daka(circleId,index) {
      wx.navigateTo({
        url: "/pages/circle/punch/main?circle_Id=" + circleId + "&circle=" + JSON.stringify(this.follow[index].data.circleIntroduction)
      })
    },
    getAll(lastId, current_page) {
      this.$http.post('circle/iFocusOnScene', {
        last_id: lastId,
        page: current_page
      }).then(res => {
        if (res.data.status == "1") {
          this.more = false
          this.follow = this.follow.concat(res.data.data.data)
          if (res.data.data.data.length < 10) {
            this.more = true
          }
        }
      })
    },
    AttentionCircle(circleId, index) {
      const _this = this
      wx.showActionSheet({
        itemList: ['退出圈子'],
        success: function(res) {
          _this.$http.post('circle/cancelAttentionCircle', { circle_id: circleId }).then(res => {
            if (res.data.status == '1') {
              _this.follow.splice(index, '1')
            }
          })
        }
      });
    }
  },
  async onPullDownRefresh() {
    wx.stopPullDownRefresh();
    const _this = this;
    _this.last_id = "";
    _this.current_page = 1;
    _this.follow = []
    _this.getAll(_this.last_id, _this.current_page)
  },
  // 下拉
  onReachBottom() {
    const _this = this;
    if (_this.more == false) {
      _this.current_page += 1;
      _this.getAll(_this.last_id, _this.current_page)
    }
  }
}

</script>
<style scoped>
</style>
