<template>
  <div>
    <div class="weui-cells weui-cells_after-title">
      <ul>
      <li v-for="(list,index) in trade" :key='index'>
          <div class="index_list">
            <div class="weui-cell__hd index_list_left"  @click="linkTo(list.obj_id)">
              <image :src="list.objfirstimage" class="logo_index" />
            </div>
            <div class="weui-cell__bd right_bd index_list_right">
              <div class="index_list_right_name" @click="linkTo(list.obj_id)">

                <div class="index_list_right_name_name ellipsis-1">{{list.obj_name}}</div>
                <div class="index_icon">{{list.industry_name}}</div>
              </div>
              <div class="index_list_right_title">
                <div class="index_list_right_title_left">
                  店型: &nbsp;
                </div>
                <div class="red">
{{list.target_stores}}
                </div>
              </div>
              <div class="index_list_right_title">
                <div class="index_list_right_title_left">
                  投资额度: &nbsp;
                </div>
                <div class="red">
                  {{list.invest_money}}
                </div>
              </div>
               <div class="index_list_right_title">
                <div class="index_list_right_title_left">
                  收益: &nbsp;
                </div>
               <div class="red">
                   {{list.profit}}
                </div>
              </div>
              <div class="index_list_right_title">
                <div class="index_list_right_title_left">
                  回报: &nbsp;
                </div>
                <div class="red">
                  {{list.operating_space}}
                </div>
              </div>
            </div>
          </div>
          <div>
              <div class="list_btn_swiper " >
                <swiper class="swiper_container" vertical="true" autoplay="true" circular="true" interval="2000">
                <block v-for="(items,indeitems) in list.advert" :key="indeitems" v-if="list.advert.length!='0'">
                    <swiper-item @click.stop="linkToNotice(list.obj_id,list.obj_name)">
                      <view class="swiper_item"> <image src="/static/image/index_gongg.png" style="width:20rpx;height:20rpx;" />&nbsp;{{items.title}}</view>
                    </swiper-item>
                </block>
                   <block v-if="list.advert.length!='0'">
                    <swiper-item >
                      <view class="swiper_item"> <image src="/static/image/index_gongg.png" style="width:20rpx;height:20rpx;" />&nbsp;暂无</view>
                    </swiper-item>
                </block>
              </swiper>
                <navigator :url="'/pages/information/websorket/main?r_id='+list.user_uid+'&userAvatar='+list.user_avatar+'&user_nickname='+list.user_nickname" class="btn_liji">立即沟通</navigator>
              </div>
          </div>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      trade: [],
      page: 1,
      ReachBottom: true,
      ince: ""
    };
  },
  onShow() {
    // this.ReachBottom = true
  },
  onLoad() {
    this.getData(this.page);
  },
  methods: {
        linkTo(e) {
      wx.navigateTo({
        url: "/pages/project/preheat/detail/main?objId=" + e
      });
    },
    getData(page) {
      this.$http
        .post("obj/fivestarslist", {
          pageSize: 10,
          page:page,
          last_id: this.ince
        })
        .then(res => {
          this.ReachBottom = false
          this.trade = this.trade.concat(res.data.data);
          this.ince = this.trade[this.trade.length - 1].obj_id
          if (res.data.data.length < 10) {
            this.ReachBottom = true;
          }
        });
    },
    linkToNotice(e, name) {
      console.log(name)
      wx.navigateTo({
        url: "/pages/project/notice/main?objId=" + e + '&name=' + name
      })
    }
  },
  async onPullDownRefresh() {
    wx.stopPullDownRefresh();
  },
  onReachBottom() {
    const _this = this;
    if (_this.ReachBottom == false) {
      _this.page += 1;
      console.log(_this.page)
      _this.getData(_this.page);
    }
  }
};

</script>
<style scoped lang="less">
.index_project_swiper {
  width: 680rpx;
  height: 372rpx;
  box-shadow: 0rpx 0rpx 4rpx 4rpx #f6f6f6;
  margin: auto;
  .slide-image {
    width: 100%;
  }
}
.index_list {
  padding: 50rpx 30rpx;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  .index_list_left {
    position: relative;
    margin-right: 20rpx;
    height: 220rpx;
    .logo_index {
      width: 220rpx;
      height: 220rpx;
    }
  }
  .index_list_right {
    width: 450rpx;
    height: 220rpx;
    display: flex;
    align-items: center;
    .index_list_right_name {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .index_list_right_name_name {
        width: 350rpx;
         font-weight: 600;
      }
      .index_icon {
        max-width: 100rpx;
        display: inline-block;
        color: #92969c;
        border: 1px solid #92969c;
        height: 28rpx;
        line-height: 28rpx;
        padding: 0 8rpx;
        font-size: 12px;
        background: #f6f6f6;
      }
    }
    .index_list_right_title {
      width: 100%;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      flex-grow: 1;
      .index_list_right_title_left {
        max-width: 180rpx;
      }
      .red {
        width: 330rpx;
        flex-grow: 1;
      }
    }
  }
}
.list_btn_swiper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0px 30rpx;
  box-sizing: border-box;
  .swiper_container {
    height: 56rpx;
    width: 100%;
    line-height: 56rpx;

    .swiper_item {
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #92969c;
    }
  }
}
</style>
