<template>
  <div>
    <div class="weui-cells weui-cells_after-title">
      <ul>
        <li v-for="(list,index) in trade" :key='index' class="weui-cells_li">
          <navigator :url="'/pages/project/preheat/detail/main?objId='+list.obj_id" class="weui-cell p50">
            <div class="weui-cell__hd pre_hds">
              <image :src="list.objfirstimage" class="logo_index" />
            </div>
            <div class="weui-cell__bd right_bd" style="height:220rpx;">
              <div class="index_bd_name" style="margin-bottom:15rpx;">{{list.obj_name}}</div>
              <div class="zan_pre ellipsis-1" style="color: #d61518;margin-bottom: 0rpx;width: 450rpx">
               {{list.slogan}}
              </div>
              <div class="text2 index_bd_name c9296_content" style="margin-bottom:15rpx;">
                <div class="industry_name_l1" sty>{{list.industry_name}}</div>
                {{list.introducecontent}}
              </div>
              <div class="prejun">
                <div style="width:45%">
                  <image src="/static/image/zan.png" class="iconimage" />已获点赞:
                  <span class="red">{{list.zan}} </span>个</div>
                <div style="width:55%">
                  <!-- <image src="/static/image/mbmd.png" class="iconimage" /> -->
                  {{list.createtime}}
                  <!-- 现有门店:<span class="red">{{list.target_stores}} </span> -->
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
      </ul>
    </div>
    <div style="width:100%;height:128rpx;"></div>
    <navigator url="/pages/project/Release/main" class="weui-grid btnsnavi" hover-class="weui-grid_active">
      <button class="weui-btn btns" type="primary" style="">发布项目</button>
    </navigator>
  </div>
</template>
<script>
export default {
  data() {
    return {
      trade: [],
      page: 0,
      ReachBottom: true,
      ince: 0,
      objId:""
    };
  },
  // onShow(){
  //   this.ReachBottom = true
  // },
  onLoad(e) {
    Object.assign(this.$data, this.$options.data())
    this.objId = e.objId
    this.getData()
  },
  methods: {
    getData() {
      this.$http
        .post("obj/preheatlist", {
          pageSize: 10,
          last_id: this.ince
        })
        .then(res => {
        if(res.data.status=='0'){
          this.kong = false
        }else{
            if (res.data.data.length == 0) {
            this.ReachBottom = true;
          } else {
            this.trade = this.trade.concat(res.data.data);
            this.ince = this.trade[this.trade.length - 1].obj_id
            console.log(this.trade);
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
    setTimeout(() => {
      _this.ReachBottom = true;
    }, 2000);
    this.page += 1;
    this.getData(this.page);
  }
};

</script>
<style scoped>
.preheat_zan {
  font-size: 13px;
  color: #888888;
  display: flex;
  justify-content: space-between;
}

.industry_name_l1 {
  display: inline-block;
  margin-right: 15rpx;
  padding: 0px 4rpx;
}
.btnsnavi{
  width: 100%;
 position: fixed;
 bottom: 0px;
 left: 0px;
 padding:0px;
 background: #fff
}
.btns {
  width:680rpx;
  height:88rpx;
  line-height: 88rpx;
  margin:20rpx 30rpx;
  text-align:center;
  background: #d61518;
  border-radius: 5rpx;
}

.prejun {
  font-size: 24rpx;
  color: #888888;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  white-space:nowrap;
}

.zan_pre {
  font-size: 24rpx;
  color: #888888;
  margin-bottom: 15rpx
}

.pre_hds {
  position: relative;
  margin-right: 10px;
}

</style>
