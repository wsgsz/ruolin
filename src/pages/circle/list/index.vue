<template>
  <div>
    所有圈子列表
          <div class="weui-cells weui-cells_after-title">
         <ul>
      <li v-for="(list,index) in trade" :key='index' class="weui-cells_li">
 <div class="weui-cell">
 
                <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
                    <image :src="list.circle_image" style="width: 60px; height: 60px; display: block"/>
                    <div class="weui-badge" style="position: absolute;top: -.4em;right: -.4em;">{{list.circle_name}}</div>
                </div>
                <div class="weui-cell__bd">
                    <div style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">{{list.label_name}} <span style="font-size:11px;">分享人数：{{list.browse}}人&nbsp;  规模：{{list.stores}}人</span> </div>
                </div>
            </div>
           </li>
           <div v-if="ReachBottom">下拉加载中。。。</div>
         </ul>
        </div>
          <navigator url="/pages/circle/newCreate/main" class="weui-grid" hover-class="weui-grid_active">
           <button class="weui-btn" type="primary" style="position:fixed;bottom:0px;left:0px;width:100%">发布项目</button>
          </navigator>
  </div>
</template>

<script>
export default {
  data() {
    return {
      trade: [],
      page: 0,
      ReachBottom: false,
      ince: 0
    };
  },
  onLoad() {
    this.getData();
  },
  components: {},
  methods: {
    getData() {
      this.$http
        .post("circle/alllist", {
          pageSize: 10,
          last_id: this.ince
        })
        .then(res => {
          if (res.data.data.length == 0) {
            this.ReachBottom = false;
          }
          this.trade = this.trade.concat(res.data.data);
          this.ince = this.trade[this.trade.length - 1].obj_id;
          console.log(this.trade);
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
</style>
