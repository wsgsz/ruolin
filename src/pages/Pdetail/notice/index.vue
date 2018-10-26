<template>
  <div class="notice_list">
    <div class="li" v-for="(item,index) in trade" :key="index" @click="linkTo(item)">
      <div class="num">{{index+1}}</div>
      <div class="title ellipsis-1">{{item.title}}</div>
      <div class="createtime">{{item.createtime}} </div>
    </div>
    <div class="weui-loadmore" v-if="ReachBottom">
      <div class="weui-loading"></div>
      <div class="weui-loadmore__tips">正在加载</div>
    </div>
    <div class="weui-loadmore weui-loadmore_line" v-if="!ReachBottom">
      <div class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无数据</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      trade: [],
      page: 1,
      ReachBottom: false,
      ince: 0,
      objId: "",
      uname:""
    };
  },
  onLoad(e) {
    Object.assign(this.$data, this.$options.data())
    this.objId = e.objId
    this.uname = e.name
    this.getData(this.page)
    wx.setNavigationBarTitle({
      title:this.uname+'项目公告'
    })
  },
  methods: {
    getData(page) {
      this.$http
        .post("advertisement/index", {
          obj_id: this.objId,
          page: page,
          pageSize: 10,
          last_id: this.ince
        })
        .then(res => {
          if (res.data.status == '1') {
            this.ReachBottom = true
            this.trade = this.trade.concat(res.data.data.list);
            this.ince = this.trade[this.trade.length - 1].id
            console.log(this.trade);
            if (res.data.data.list.length < 10) {
              this.ReachBottom = false;
            }
          }
        });
    },
    linkTo(e) {
      wx.navigateTo({
        url: "/pages/project/notice/noticeList/main?link=" + JSON.stringify(e)
      })
    }
  },
  onReachBottom() {
    const _this = this;
    if (this.ReachBottom == true) {
      _this.page += 1;
      _this.getData(this.page);

    }
  }
}

</script>
<style scoped lang="less">
.notice_list {
  padding: 0px 30rpx;
  width: 100%;
  box-sizing: border-box;

  .li {
    height: 120rpx;
    line-height: 128rpx;

    display: flex;
    border-bottom: 30rpx solid #f6f6f6;

    .num {
      font-size: 12px;
      width: 30rpx;
      display: inline-block;
    }

    .title {
      font-size: 12px;
      width: 600rpx;
      margin-right: 20rpx;
    }

    .createtime {
      width: 180rpx;
      overflow: hidden;
      font-size: 12px;
      color: #92969c;
    }
  }
}

</style>
