<template>
  <div>
       
 <navigator :url="'/pages/circle/detail/main?circle_id='+topic.id" class="weui-cells weui-cells_after-title" v-for="(topic,topicindex) in data" :key="topicindex" style="padding-top:20rpx">
      <div class="weui-cell">
        <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
          <image :src="topic.user_avatar" style="width: 68rpx;height:68rpx; display: block;border-radius:50%" />
        </div>
        <div class="weui-cell__bd circle_flex">
          <div style="font-size:13px;">{{topic.user_nickname}}
          </div>
          <div class="circle_flex_right">{{topic.label_name}}</div>
        </div>
      </div>
      <div class="weui-article" style="border-bottom:1px solid #e5e5e5">
        <div class="weui-article__p">
          {{topic.circle_name}}
        </div>
        <image class="weui-article__img" :src="topic.circle_image" style="width:100%;height:380rpx;" />
      </div>
    </navigator>
       <div class="weui-loadmore" v-show="!more" style="margin-bottom:88rpx;">
      <div class="weui-loading"></div>
      <div class="weui-loadmore__tips">正在加载</div>
    </div>
    <div class="weui-loadmore weui-loadmore_line" v-show="more" style="margin-bottom:88rpx;">
      <div class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无数据</div>
    </div>
    <navigator url="/pages/circle/created/main"  class="created_All">
      创建圈子
    </navigator>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      lastId: "",
      page: 1,
      more: false
    };
  },
  onLoad(e) {
     Object.assign(this.$data, this.$options.data())
    this.getAllcircle(this.lastId, this.page);
  },
  methods: {
    getAllcircle(last_id, current_page) {
      this.$http
        // .post("circle/alllist", { lastId: last_id, page: current_page })
          .post("circle/alllist", { lastId: last_id})
        .then(res => {
          if (res.data.status == "1") {
            this.data = this.data.concat(res.data.data.data);
            console.log(this.data);
            this.lastId = res.data.data.lastId;
            if (res.data.data.data.length < 10) {
              // 没有值了
              this.more = true;
              // this.data = this.data.concat(res.data.data.data);
              // this.lastId = res.data.data.lastId;
            } else {
            }
          }
        });
    }
  },
  async onPullDownRefresh() {
    wx.stopPullDownRefresh();
  },
  onReachBottom() {
    const _this = this;
    if (_this.more == false) {
      _this.page += 1;
      _this.getAllcircle(this.lastId, this.page);
    }
  }
};
</script>

<style scoped>
.cfff {
  background: #fff
}

.circle_flex {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
}

.circle_flex_right {
  padding: 3rpx 5rpx;
  border: 1rpx solid #92969c;
  font-size: 12px;
  color: #92969c;
  display: block;
  height:14px;
  line-height:14px;
}
.created_All{
  background: #d61518;
  color: #ffffff;
  font-size: 13px;
  text-align: center;
  line-height: 88rpx;
  position: fixed;
  bottom:0px;
  width: 100%;
}
</style>
