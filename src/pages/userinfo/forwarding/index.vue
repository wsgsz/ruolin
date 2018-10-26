<template>
  <div>
    <div class="weui-cells weui-cells_after-title">
      <ul>
        <li v-for="(list,index) in trade" :key='index' class="weui-cells_li btn2em">
          <navigator :url="'/pages/project/preheat/detail/main?objId='+list.obj_id" class="weui-cell">
            <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
              <image :src="list.objfirstimage" class="logo_index" />
            </div>
            <div class="weui-cell__bd alcenter">
              <div style="margin-bottom:15rpx;">{{list.obj_name}}</div>
              <div class="fx_el">
                <div>
                  分享：
                  <span class="red">{{list.pfen}} 次</span></div>
                <div>
                  点对点分享：<span class="red">{{list.dfen}}次</span>
                </div>
              </div>
              <div class="fx_el">
                <div>
                  动态：
                  <!-- 审核状态:1待审核2审核成功,点赞中3审核失败,4集赞成功5锁定抢单中6项目达成 -->
                 <!--  <span class="red" v-if="list.checkdata=='1'">待审核</span>
                  <span class="red" v-if="list.checkdata=='2'">审核成功,点赞中</span>
                  <span class="red" v-if="list.checkdata=='3'">审核失败</span>
                  <span class="red" v-if="list.checkdata=='4'">集赞成功</span>
                  <span class="red" v-if="list.checkdata=='5'">锁定抢单中</span>
                  <span class="red" v-if="list.checkdata=='6'">项目达成</span> -->
                  <span class="red" v-if="list.checkdata=='1'">未达成交易</span>
                  <span class="red" v-if="list.checkdata=='2'">未达成交易</span>
                  <span class="red" v-if="list.checkdata=='3'">未达成交易</span>
                  <span class="red" v-if="list.checkdata=='4'">未达成交易</span>
                  <span class="red" v-if="list.checkdata=='5'">未达成交易</span>
                  <span class="red" v-if="list.checkdata=='6'">已达成交易</span>
                </div>
                <!--     <div>
                  可获取佣金：<span class="red"> 未知字段</span></div> -->
            <!--   </div>
              <div class="fx_el"> -->
                <div>
                  分享人数：<span class="red"> {{list.browse}}人</span></div>
                <!-- <div></div> -->
              </div>
              <div class="text2">
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
  },
  methods: {
    getData() {
      this.$http
        .post("users/myShares", {
          pageSize: 10,
          last_id: this.ince
        })
        .then(res => {
          if (res.data.status == '1') {
            if (res.data.data.length < 10) {
              this.ReachBottom = false;
              console.log(this.ReachBottom)
            }
            this.trade = this.trade.concat(res.data.data);
            this.ince = this.trade[this.trade.length - 1].obj_id
            console.log(this.trade);
          } else {
            this.ReachBottom = false
          }
        });
    }
  },
  async onPullDownRefresh() {
    wx.stopPullDownRefresh();
    this.ince = 0
    this.trade=[]
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

.fx_el {
  font-size: 26rpx;
  color: #888888;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  margin-bottom: 16rpx;
  white-space: nowrap;
  width: 100%;
}
.fx_el div{
  width: 50%;
  text-align: left;
}
.flex_list {
  display: flex;
  justify-content: flex-start;
  padding: 30rpx;
  font-size: 26rpx;
  border-top: 1px solid #e5e5e5
}
.alcenter{
  height:220rpx;align-items:center;
  align-items:middle
}
</style>
