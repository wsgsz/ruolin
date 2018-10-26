<template>
  <div>
    <swiper class="index_project_swiper" indicator-active-color="#d61518" indicator-color="#ffffff" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular">
      <div v-for="(item, index) in data.banner" :key="index">
        <swiper-item>
          <image :src="item.banner_image" class="slide-image" />
        </swiper-item>
      </div>
    </swiper>
    <div class="weui-grids btn2em" style="border-top:0px;">
      <block>
        <navigator url="/pages/project/stars/main" class="weui-grid" hover-class="weui-grid_active">
          <image class="weui-grid__icon" src="/static/image/stars.png" style="width:92rpx;height:103rpx" />
        </navigator>
      </block>
      <block>
        <navigator url="/pages/project/hotspot/main" class="weui-grid" hover-class="weui-grid_active">
          <image class="weui-grid__icon" src="/static/image/hots.png" style="width:92rpx;height:103rpx" />
          <!-- <div class="weui-grid__label">热点项目</div> -->
        </navigator>
      </block>
      <block>
        <navigator url="/pages/project/preheat/main" class="weui-grid" hover-class="weui-grid_active">
          <image class="weui-grid__icon" src="/static/image/preheat.png" style="width:92rpx;height:103rpx" />
        </navigator>
      </block>
    </div>
    <!-- 搜索  -->
    <navigator url="/pages/project/searchbar/main" class="weui-search-bar" style="border-top:0px;border-bottom:0px">
      <div class="weui-search-bar__form">
        <div class="weui-search-bar__box">
          <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
          <input type="text" class="weui-search-bar__input" placeholder="搜索" />
          <div class="weui-icon-clear">
            <icon type="clear" size="14"></icon>
          </div>
        </div>
        <label class="weui-search-bar__label">
          <icon class="weui-icon-search" type="search" size="14"></icon>
          <div class="weui-search-bar__text">请您输入项目名称关键词</div>
        </label>
      </div>
    </navigator>
    <!-- 搜索 -->
    <div class="weui-cells" style="margin-top:50rpx;margin-bottom:50rpx;">
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell" style="padding-top:0px;padding-bottom:0px;">
          <div class="weui-cell__hd">
            <div style="width:2px;height:20px;background:red;margin-right:15px;"></div>
          </div>
          <div class="weui-cell__bd" style="font-weight:600;">推荐项目</div>
        </div>
      </div>
      <ul>
        <li v-for="(list,index) in data.trade" :key='index'>
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
                <block v-for="(items,indeitems) in list.advert.list" :key="indeitems" v-if="list.advert.list.length!='0'">
                    <swiper-item @click.stop="linkToNotice(list.obj_id,list.obj_name)">
                      <view class="swiper_item"> <image src="/static/image/index_gongg.png" style="width:20rpx;height:20rpx;" />&nbsp;{{items.title}}</view>
                    </swiper-item>
                </block>
                   <block v-if="list.advert.list.length!='0'">
                    <swiper-item >
                      <view class="swiper_item"> <image src="/static/image/index_gongg.png" style="width:20rpx;height:20rpx;" />&nbsp;暂无</view>
                    </swiper-item>
                </block>
              </swiper>
                <navigator :url="'/pages/information/websorket/main?r_id='+list.user_uid+'&userAvatar='+list.user_avatar+'&user_nickname='+list.user_nickname" class="btn_liji">立即沟通</navigator>
              </div>
          </div>
          <div class="el_line"></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import bFooter from "@/components/footer";
export default {
  data() {
    return {
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 900,
      circular: true,
      data: [],
      get_token: "" //token
    };
  },
  onLoad() {
    if (wx.getStorageSync("token") == "") {
      wx.reLaunch({
        url: "/pages/index/index/main"
      });
    } else {
      this.getData();
    }
  },
  components: {
    bFooter
  },
  onShareAppMessage: function() {
    const _this = this;
    return {
      title: "项目首页",
      path: "pages/index/project/main"
    };
  },
  methods: {
    linkToNotice(e, name) {
      console.log(name);
      wx.navigateTo({
        url: "/pages/project/notice/main?objId=" + e + "&name=" + name
      });
    },
    getData() {
      this.$http.post("index/index", {}).then(res => {
        console.log(res.data.data);
        this.data = res.data.data;
      });
    },
    linkTo(e) {
      wx.navigateTo({
        url: "/pages/project/preheat/detail/main?objId=" + e
      });
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
  padding: 50rpx 30rpx 20rpx 30rpx;
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
.el_line{
  width: 680rpx;
  height: 1rpx;
  background: #e5e5e5;
  margin:50rpx auto 5rpx auto;
}
.list_btn_swiper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding:0px 30rpx;
  box-sizing: border-box;
  .swiper_container {
  height: 56rpx;
  width: 100%;
  line-height: 56rpx;
.swiper_item {
  font-size:12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #92969c;
}
}
}



</style>
