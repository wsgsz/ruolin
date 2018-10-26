<template>
  <div>
    <div class="weui-cells weui-cells_after-title">
      <ul>
        <li v-for="(list,index) in trade" :key='index' class="weui-cells_li" >
          <navigator :url="'/pages/project/preheat/detail/main?objId='+list.obj_id" class="weui-cell p50">
            <div class="weui-cell__hd" style="position: relative;margin-right: 40rpx;height:220rpx;">
              <image :src="list.objfirstimage" class="logo_index" />
            </div>
            <div class="weui-cell__bd right_bd" style="height:220rpx;">
              <div class="index_bd_name">{{list.obj_name}}</div>
              <div class="text2 index_bd_name c9296_content" style="margin-bottom:20rpx;font-weight:400;">
                {{list.introducecontent}}
              </div>
              <div style="font-size: 13px;color: #888888;" class="list_btn">
                <div class="industry_name" style="display:flex">
                  <div class="industry_name_l1">{{list.industry_name}}</div>
                </div>
              </div>
            </div>
          </navigator>
        </li>
        <div class="weui-loadmore" v-if="!ReachBottom">
          <div class="weui-loading"></div>
          <div class="weui-loadmore__tips">正在加载</div>
        </div>
        <div class="weui-loadmore weui-loadmore_line" v-if="ReachBottom">
          <div class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无数据</div>
        </div>
        <!-- <div v-if="ReachBottom">下拉加载中。。。</div> -->
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      trade: [],
      page: 0,
      ReachBottom: false,
      ince: 0,
    };
  },
  onLoad() {
     Object.assign(this.$data, this.$options.data())
    this.getData();
  },
  methods: {
    getData() {
      this.$http
        .post("obj/hotspotlist", {
          pageSize: 10,
          last_id: this.ince
        })
        .then(res => {
      
            if (res.data.data.length == 0) {
              this.ReachBottom = true;
            } else {
              this.trade = this.trade.concat(res.data.data);
              this.ince = this.trade[this.trade.length - 1].obj_id
              console.log(this.trade);
            }

        });
    }
  },
  async onPullDownRefresh() {
    // to doing..
    // 停止下拉刷新
    wx.stopPullDownRefresh();
  },
  onReachBottom() {
    const _this = this;
    // 到这底部在这里需要做什么事情
    setTimeout(() => {
      _this.ReachBottom = true;
    }, 2000);
    this.page += 1;
    this.getData(this.page);
  }
};

</script>
<style scoped>
.industry_name_l1 {
  height: 1em;
  line-height: 1em;
  padding: 5rpx 10rpx;
  background: #fff;
  border: 1px solid #92969c;
  color: #92969c;
  margin-right: 20rpx;
}

.list_btn {
  display: flex;
  justify-content: space-between;
}

.industry_name {
  display: flex;
}

</style>
