<template>
  <div>
    <div class="weui-cells weui-cells_after-title">
      <ul>
        <li v-for="(list,index) in trade" :key='index' class="weui-cells_li btn2em">
          <navigator :url="'/pages/project/preheat/detail/main?objId='+list.obj_id" class="weui-cell">
            <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
              <image :src="list.objfirstimage" class="logo_index" />
            </div>
            <div class="weui-cell__bd right_bd" style="height:220rpx;">
              <div class="index_bd_name">{{list.obj_name}}
                <div class="collect_start">
                  <image src="/static/image/cstart.png" />
                </div>
              </div>
              <div class="fx_el" style="margin-bottom:15rpx">
                <div>
                  <image src="/static/image/dianjun.png" class="iconimage" /> 店均盈利：
                  <span class="red">{{list.profit}} </span></div>
                <div>
                  <image src="/static/image/mbmd.png" class="iconimage" />现有门店：<span class="red">{{list.target_stores}} </span>
                </div>
              </div>
              <div class="fx_el">
                <div>
                  <image src="/static/image/cjrs.png" class="iconimage" />分享人数
                  <span class="red">{{list.browse}}人</span></div>
                <div></div>
              </div>
              <div class="text2" style="margin-top:20rpx;">
                <div class="industry_name_l1">{{list.industry_name}}</div>
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
      page: 0,
      ReachBottom: true,
      ince: 0
    };
  },
  onLoad() {
    Object.assign(this.$data, this.$options.data())
    this.getData();
    wx.setNavigationBarTitle({
      title: "我的收藏"
    })
  },
  methods: {
    getData() {
      this.$http
        .post("favorite/forwardlist", {
          pageSize: 10,
          last_id: this.ince
        })
        .then(res => {
          if(res.data.status=='1'){
          if (res.data.data.length < 10) {
            this.ReachBottom = false;
          }
          this.trade = this.trade.concat(res.data.data);
          this.ince = this.trade[this.trade.length - 1].obj_id
          }else{
            this.ReachBottom = false;
          }
        });
    }
  },
  async onPullDownRefresh() {
    wx.stopPullDownRefresh();
    this.trade = []
    this.ince = 0
    this.getData();
  },
  onReachBottom() {
    const _this = this;
    if (_this.ReachBottom == true) {
      this.page += 1;
      this.getData(this.page);
    } else {

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

.flex_list {
  display: flex;
  justify-content: flex-start;
  padding: 30rpx;
  font-size: 26rpx;
  border-top: 1px solid #e5e5e5
}

.index_bd_name {
  width: 100%;
  margin-bottom: 15rpx;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.collect_start image {
  width: 30rpx;
  height: 30rpx;
}

</style>
