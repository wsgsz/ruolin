<template>
  <div>
    <div class="weui-cells weui-cells_after-title">
      <ul>
        <li v-for="(list,index) in trade" :key='index' class="weui-cells_li btn2em">
          <navigator :url="'/pages/circle/detail/main?circle_id='+list.id" class="weui-cell">
            <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
              <image :src="list.circle_image" class="logo_index" />
            </div>
            <div class="weui-cell__bd right_bd" style="height:220rpx;">
              <div style="margin-bottom:15rpx;">{{list.circle_name}}</div>
                <div class="fx_el fx_el_ex" style="margin-bottom: 28rpx;">
                <div>
                  分享人数：
                  <span class="red">{{list.participants}} 人</span></div>
              </div>

              <div class="fx_el fx_el_ex" style="margin-bottom: 28rpx;">
                <div>
                  点赞：
                  <span class="red">{{list.zan}} 次</span></div>
                <div>
                  收藏：<span class="red">{{list.collection}}</span>
                </div>
              </div>

            </div>
          </navigator>
        </li>
        <div class="weui-loadmore" v-if="ReachBottom">
          <div class="weui-loading"></div>
          <div class="weui-loadmore__tips">正在加载</div>
        </div>
        <div class="weui-loadmore weui-loadmore_line" v-if="!ReachBottom">
          <div class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无数据</div>
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      trade: [],
      ReachBottom: true,
      last_id: 0,
      page: 1
    };
  },
  onLoad() {
    Object.assign(this.$data, this.$options.data())
    this.getData(this.page, this.last_id);
  },
  methods: {
    getData(page, lastId) {
      this.$http
        .post("users/iCreated", {
          pageSize: 10,
          page: page,
          last_id: lastId
        })
        .then(res => {
          if (res.data.data.data.length < 10) {
            this.ReachBottom = false;
          }
          this.trade = this.trade.concat(res.data.data.data);
          this.last_id = res.data.data.lastId
          console.log(this.trade);
        });
    }
  },
  async onPullDownRefresh() {
    wx.stopPullDownRefresh();
    this.last_id = ''
    this.page = 1
     this.trade=[]
    this.getData();
  },
  onReachBottom() {
    const _this = this;
    console.log(_this.ReachBottom)
    if (_this.ReachBottom == true) {
      _this.page += 1;
      _this.getData(_this.page, _this.last_id)
    }
  }
};

</script>
<style scoped>




.weui-form-preview {
  margin-bottom: 25px;
}

.preheat_zan {
  font-size: 13px;
  color: #888888;
  display: flex;
  justify-content: space-between;
}

.industry_name_l1 {
  display: inline-block;
  margin-right: 30rpx;
}

.fx_el {
  font-size: 26rpx;
  color: #888888;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  margin-bottom: 6rpx;
  white-space: nowrap;
}

.flex_list {
  display: flex;
  justify-content: flex-start;
  padding: 30rpx;
  font-size: 26rpx;
  border-top: 1px solid #e5e5e5
}

</style>
