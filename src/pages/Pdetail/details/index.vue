<template>
  <div class="page__bd">
    <div v-show="get_token==''" style="height:100%;z-index:222">
      <get-login @getName="getTypes"></get-login>
      <!-- {{gettoken}} -->
    </div>
    <div v-show="get_token!=''">
      <div v-show="get_mobile==''" style="width:100%;z-index:111;height:100vh;position:fixed;bottom:0px;left:0px;" @click="getmobild()">
      </div>
      <swiper indicator-dots="true" autoplay="true" indicator-active-color="#d61518" indicator-color="#ffffff" interval="5000" duration="900" circular="true" style="height:60vw">
        <div v-if="lists.brandimage!=''">
          <swiper-item>
            <image :src="lists.brandimage" class="slide-image" />
          </swiper-item>
        </div>
        <div v-if="lists.productimage!=''">
          <swiper-item>
            <image :src="lists.productimage" class="slide-image" />
          </swiper-item>
        </div>
        <div v-if="lists.investmentimage!=''">
          <swiper-item>
            <image :src="lists.investmentimage" class="slide-image" />
          </swiper-item>
        </div>
        <div v-if="lists.storeimage!=''">
          <swiper-item>
            <image :src="lists.storeimage" class="slide-image" />
          </swiper-item>
        </div>
      </swiper>
      <div class="weui-cells weui-cells_after-title btn2em">
        <div class="weui-cell" v-if="lists.checkdata!='2'">
          <div class="weui-cell__hd">
            <div class="detail_one"></div>
          </div>
          <div class="weui-cell__bd fw500">{{lists.obj_name}}</div>
          <div class="weui-cell__ft" v-show="data.zhuan=='0'" @click="giveFabulous()">
            <image src="/static/image/wsc.png" style="width:47rpx;height:70rpx" />
          </div>
          <div class="weui-cell__ft" v-show="data.zhuan=='1'" @click="removeFabulous()">
            <image src="/static/image/ysc.png" style="width:71rpx;height:70rpx" />
          </div>
        </div>
        <div class="weui-cell" v-if="lists.checkdata=='2'">
          <div class="weui-cell__hd">
            <div class="detail_one"></div>
          </div>
          <div class="weui-cell__bd fw500">{{lists.obj_name}}</div>
        </div>
        <div class="weui-cell" v-if="data.zan==[]" v-show="lists.checkdata=='2'">
          <div class="weui-cell__hd zanimage" style="position:releative">
            <image :src="data.zan[0].user_avatar" style="margin-left:0rpx;z-index:1" />
            <image :src="data.zan[1].user_avatar" v-if="data.zan[1]" style="margin-left:-10px;z-index:2" />
            <image :src="data.zan[2].user_avatar" v-if="data.zan[2]" style="margin-left:-10px;z-index:3" />
          </div>
          <div class="weui-cell__bd details_zan_length1" style=""><span class="details_zan_length"> {{data.zan[0].user_nickname }}</span>等{{data.zan.length}}人已点赞</div>
        </div>
      </div>
      <!-- 项目介绍 -->
      <div class="page__bd_spacing" style="margin-top:30rpx;">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <div class="detail_one"></div>
          </div>
          <div class="weui-cell__bd fw500">项目介绍</div>
        </div>
      </div>
      <div class="weui-form-preview btn2em ">
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label" style="color:#1a1a1a">项目简介：</div>
            <div class="weui-form-preview__value" style="color:#92969c">{{lists.introducecontent}}</div>
          </div>
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label" style="color:#1a1a1a">公司名称：</div>
            <div class="weui-form-preview__value" style="color:#92969c">{{lists.name_company}}</div>
          </div>
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label" style="color:#1a1a1a">总部地点：</div>
            <div class="weui-form-preview__value" style="color:#92969c">{{lists.headquarters_location}}</div>
          </div>
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label" style="color:#1a1a1a">项目类型：</div>
            <div class="weui-form-preview__value" style="color:#92969c">{{lists.name_company}}</div>
          </div>
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label" style="color:#1a1a1a">服务内容：</div>
            <div class="weui-form-preview__value" style="color:#92969c">{{lists.service_content}}</div>
          </div>
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label" style="color:#1a1a1a">盈利构成：</div>
            <div class="weui-form-preview__value" style="color:#92969c">{{lists.earnings}}</div>
          </div>
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label" style="color:#1a1a1a">全国门店：</div>
            <div class="weui-form-preview__value" style="color:#92969c">{{lists.stores}}</div>
          </div>
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label" style="color:#1a1a1a">运营面积：</div>
            <div class="weui-form-preview__value" style="color:#92969c">{{lists.operating_space}}</div>
          </div>
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label" style="color:#1a1a1a">投资金额：</div>
            <div class="weui-form-preview__value" style="color:#92969c">{{lists.invest_money}}</div>
          </div>
        </div>
      </div>
      <div class="weui-form-preview btn2em ">
         <swiper class="swiper_container" vertical="true" autoplay="true" circular="true" interval="2000" style="height:80rpx;line-height:80rpx;padding:0px 30rpx;font-size: 14px;">
                       <block v-for="(items,indeitems) in advert.list" :key="indeitems"  v-if="advert.list.length!=0">
                    <swiper-item @click="linkToNotice(lists.obj_id,lists.obj_name)">
                      <view class="swiper_item" style="display: flex;align-items: center;justify-content: space-between;"> 
                        <div class="ellipsis-1" style="width: 590rpx">
                          <image src="/static/image/index_gongg.png" style="width:30rpx;height:30rpx;;vertical-align: middle" />&nbsp;{{items.title}}
                        </div>
                        
                         <div style="width: 100rpx;font-size: 13px;color: #92969c">
                            更多 <image src="/static/image/Right.png" style="width:25rpx;height:25rpx;align-items: center;vertical-align: middle;" />
                        </div>
                      </view>
                    </swiper-item>
                </block>
                 <block v-if=" advert.list==0" >
                    <swiper-item>
                      <view class="swiper_item" style="display: flex;align-items: center;justify-content: space-between;"> 
                        <div class="ellipsis-1" style="width: 590rpx">
                          <image src="/static/image/index_gongg.png" style="width:30rpx;height:30rpx;;vertical-align: middle" />&nbsp;暂无
                        </div>
                         <div style="width: 100rpx;font-size: 13px;color: #92969c">
                          
                        </div>
                      </view>
                    </swiper-item>
                </block>
              </swiper>
      </div>
      <!-- 项目主介绍 -->
      <!--   <div class="weui-cells weui-cells_after-title btn2em" style="margin-top:30rpx;">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <div class="detail_one"></div>
          </div>
          <div class="weui-cell__bd fw500">项目主简介</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <image :src="d_user.user_avatar" style="margin-right: 5px;vertical-align: middle;width:68rpx; height: 68rpx;border-radius:50%;" />
            <div style="font-size:14px;display:inline-block;margin-left:30rpx;">{{d_user.user_nickname}}</div>
          </div>
          <navigator :url="'/pages/information/websorket/main?r_id='+d_user.id+'&userAvatar='+d_user.user_avatar+'&user_nickname='+d_user.user_nickname" open-type="navigate" class="weui-cell__bd" style="text-align:right;width:150rpx;">
          
            <div class="btn_liji" style="display:inline-block">立即沟通</div>
          </navigator>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd" style="font-size:15px;color:#1a1a1a">{{lists.introducecontent}}</div>
        </div>
      </div> -->
      <!-- 项目介绍 -->
      <div class="weui-cells weui-cells_after-title btn2em" style="margin-top:30rpx;">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <div class="detail_one"></div>
          </div>
          <div class="weui-cell__bd fw500">项目介绍</div>
        </div>
        <div class="cen_box" style="overflow:hidden">
          <div style="overflow:hidden;width:100%">
            <wxParse :content="lists.commcontent" />
          </div>
        </div>
      </div>
      <!-- 评论 -->
      <div v-if="lists.checkdata!='2'">
        <div class="weui-panel weui-panel_access">
          <div class="weui-cells weui-cells_after-title" style="margin-top:30rpx;">
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <div class="detail_one"></div>
              </div>
              <div class="weui-cell__bd fw500">评论
                <font v-show="data.comcount!='0'">（{{data.comcount}}）</font>
              </div>
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <image :src="users.user_avatar" class="duser_avatar" />
            </div>
            <div class="weui-cell__bd" @click="discuss(lists.obj_id)" style="background:#e6e6e6;font-size:14px;padding:15rpx;">添加评论...</div>
          </div>
          <!-- 评论 -->
          <div class="weui-panel__bd" v-for='(comm,inded) in comment' :key="inded">
            <div class="weui-media-box weui-media-box_appmsg">
              <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
                <image class="weui-media-box__thumb" :src="comm.user_avatar" style="border-radius:50%" />
              </div>
              <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
                <div class="weui-media-box__title">{{comm.user_nickname}}</div>
                <div class="weui-media-box__desc">{{comm.createtime}}</div>
              </div>
            </div>
            <div style="padding:0px 30rpx">
              <!-- 评论 -->
              <div class="detail_ccontent">
                {{comm.content}}
              </div>
              <!-- 图片 -->
              <div class="weui-flex detail_pimage">
                <div class="weui-flex__item" v-show="comm.pic1!=''">
                  <image class="weui-media-box__thumb" :src="comm.pic1" />
                </div>
                <div class="weui-flex__item pic2_w" v-show="comm.pic2!=''">
                  <image class="weui-media-box__thumb" :src="comm.pic2" />
                </div>
                <div class="weui-flex__item" v-show="comm.pic2!=''">
                  <image class="weui-media-box__thumb" :src="comm.pic3" />
                </div>
              </div>
              <!--点赞  -->
              <div class="weui-flex" style="margin-bottom:15rpx;height:75rpx;justify-content:flex-start;width:50%">
                <div class="weui-flex__item" v-if="comm.mezan == '0'">
                  <div class="placeholder" @click="zanping(lists.obj_id,comm.id,inded)">
                    <button class="detail_ping_therbutton">
                      <image src="/static/image/zan.png" class="detail_ping_therimg" /> {{comm.huozan.usercount}}
                    </button>
                  </div>
                </div>
                <div class="weui-flex__item" v-if="comm.mezan =='1'">
                  <div class="placeholder" @click="removezanping(lists.obj_id,comm.id,inded)">
                    <button class="detail_ping_therbutton">
                      <image src="/static/image/removezan.png" class="detail_ping_therimg" /> {{comm.huozan.usercount}}
                    </button>
                  </div>
                </div>
                <div class="weui-flex__item">
                  <div class="placeholder" @click="discuss(comm.obj_id,comm.user_id,comm.id,'sen')">
                    <button class="detail_ping_therbutton">
                      <image src="/static/image/pinglun.png" class="detail_ping_therimg" /> {{comm.comlist.length}} </button>
                  </div>
                </div>
              </div>
              <!-- 列表 -->
              <div class=" huozan" v-if="comm.huozan.usercount!='0'" style="margin-bottom:2rpx">
                <div style="display:inline-block;margin-right:25rpx" v-for="(huozan,huoindex) in comm.huozan.userlist" :key="huoindex">
                  <div class="placeholder">{{huozan.user_nickname}}</div>
                </div>
              </div>
              <div class="huozan" v-for="(comlist,indexcm) in comm.comlist" :key="indexcm" style="font-size:14px" @click="discuss(comm.obj_id,comlist.user_id,comm.id,'send')">
                <div style="display:inline-block;color:#223f75"> {{comlist.user_nickname}}<p style="color:#92969c;display:inline-block">回复</p>{{comlist.puser_nickname}}: </div>{{comlist.content}}
              </div>
            </div>
          </div>
          <!--  -->
        </div>
        <div class="weui-panel__ft" v-if="!ReachBottom" @click="getloader()" style="text-align:center">
          <div class="weui-cell weui-cell_access weui-cell_link">
            <div class="weui-cell__bd" style="color:#92969c">查看更多</div>
          </div>
        </div>
        <div class="weui-loadmore weui-loadmore_line" v-if="ReachBottom">
          <div class="weui-loadmore__tips weui-loadmore__tips_in-line">没有更多数据</div>
        </div>
      </div>
      <!--  -->
      <div style="height:90rpx;width:100%;"></div>
      <div class="weui-flex detail_footer" v-if="lists.checkdata!='2'">
        <div class="weui-flex__item" style="background:rgba(235,123,121,.9)">
          <navigator :url="'/pages/project/share/index/main?objId='+lists.obj_id" class="weui-grid">
            <div class="">分享赚取佣金</div>
          </navigator>
        </div>
        <div class="weui-flex__item" style="background:#d61518">
          <div class="weui-grid">
            <div class="" @click="linklocking(data)">锁定项目</div>
          </div>
        </div>
      </div>
      <!-- 预热项目的底部 -->
      <div class="weui-flex detail_footer" v-if="lists.checkdata=='2'">
        <div class="weui-flex__item" style="background:rgba(235,123,121);border-top:1px solid #e5e5e5">
          <div class="weui-grid" v-show="data.zanstate=='0'" @click="givezanstate()" style="height:100RPX;line-height:100RPX;background:#fff;padding:0px 20rpx">
            <div class="zan_footer">
              <image class="zan_footer_image" src="/static/image/addzan.png" style="" />
              <div class="zan_footer_image_div"> {{lists.zan}}/
                <font style="color:#d61518">{{lists.allzan }}</font>
              </div>
            </div>
          </div>
          <!-- @click="removezanstate()" -->
          <div class="weui-grid" v-show="data.zanstate=='1'" style="background:#fff;padding:0px 20rpx">
            <div class="zan_footer">
              <image class="zan_footer_image" src="/static/image/removezan.png" style="" />
              <div class="zan_footer_image_div"> {{lists.zan}}/
                <font style="color:#d61518">{{lists.allzan }}</font>
              </div>
            </div>
          </div>
        </div>
        <div class="weui-flex__item " style="background:#fff;border-left:1px solid #e5e5e5;border-top:1px solid #e5e5e5">
          <navigator :url="'/pages/project/share/index/main?objId='+lists.obj_id" class="weui-grid" style="padding:0px;20rpx;">
            <image class="zan_footer_image" src="/static/image/detail_zhuanfa.png" />
            <view class="zan_footer_image_div">分享</view>
          </navigator>
        </div>
      </div>
    </div>
    <navigator :url="'/pages/information/websorket/main?r_id='+d_user.id+'&userAvatar='+d_user.user_avatar+'&user_nickname='+d_user.user_nickname" open-type="navigate" class="weui-cell__bd" style="position:fixed;top:50vh;right:0rpx;width:20px;height:80px;display:block;background:#d61518;color:#fff;text-align:center;padding:5rpx 9rpx;border-top-left-radius: 8rpx;border-bottom-left-radius: 8rpx">
      <div style="font-size:12px;">立即沟通</div>
    </navigator>
  </div>
</template>
<script>
import getLogin from "@/components/getLogin";
import wxParse from "mpvue-wxparse";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      data: "",
      lists: "",
      d_user: "",
      comment: [],
      ince: 0,
      advert: "",
      // locking: "",
      ReachBottom: false,
      users: "", //个人信息
      objId: "", //项目Id
      scene: "", //分享码
      get_token: "", //token
      get_mobile: "" //手机号
    };
  },
  components: {
    getLogin,
    wxParse
  },
  onShareAppMessage: function() {
    const _this = this;
    return {
      title: _this.lists.name_company,
      desc: _this.lists.introducecontent,
      path: "pages/project/details/main?objId=" + this.objId
    };
  },
  onShow() {
    this.get_mobile = wx.getStorageSync("userMobile");
    this.getData(this.objId);
    this.ReachBottom = false
  },
  onLoad(e) {
    console.log(e);
    Object.assign(this.$data, this.$options.data());
    // if(e.objId=='')
    console.log(e.scene)
    if (e.scene == undefined) {
      this.objId = e.objId
    } else {
      this.objId = unescape(e.scene).split(",")[0];
      this.scene = unescape(e.scene).split(",")[1];
      this.shareddd(this.objId, this.scene);
    }
    wx.showShareMenu({ withShareTicket: true });
    this.get_token = wx.getStorageSync("token");
    this.get_mobile = wx.getStorageSync("userMobile");
    this.detailgetUserinfo();
    this.count(this.objId);
    this.gettoubiao(this.objId);
  },
  methods: {
      linkToNotice(e,name){
        wx.navigateTo({
          url: "/pages/project/notice/main?objId=" + e+'&name='+name
      })
    },
    getTypes(e) {
      this.get_token = e.token;
      this.get_mobile = e.user_mobile;
      this.getData(this.objId);
      this.detailgetUserinfo();
      // this.shareddd(this.objId, this.scene)
    },
    // 获取个人信息
    detailgetUserinfo() {
      this.$http.post("users/getUserinfo", {}).then(res => {
        this.users = res.data.data;
      });
    },
    // 长图分享 计数
    shareddd(obj_id, code) {
      this.$http
        .post("favorite/objsharesadd", {
          lei: 1,
          obj_id: this.objId,
          usercode: code
        })
        .then(res => {});
    },
    getmobild() {
      wx.navigateTo({
        url: "/pages/userinfo/personal/main"
      });
    },
    //
    count(objId) {
      this.$http.post("obj/participate", { obj_id: objId }).then(res => {
        console.log("计数成功");
      });
    },
    handleTapShareButton() {
      //  普通分享
      this.$http
        .post("favorite/objsharesadd", { lei: 2, obj_id: this.objId })
        .then(res => {
          setTimeout(() => {
            wx.showToast({
              title: "已完成",
              icon: "success",
              duration: 3000
            });
          }, 2000);
        });
    },
    linklocking(e) {
      wx.navigateTo({
        url: "/pages/project/details/locking/main?obj_id=" + e.list.obj_id
      });
    },
    getData(id) {
      this.$http.post("obj/details", { id: id }).then(res => {
        this.data = res.data.data;
        this.advert = res.data.data.advert
        this.lists = res.data.data.list;
        this.d_user = res.data.data.users;
        this.comment = res.data.data.comment;
      });
    },
    // 获取投标
    gettoubiao(id) {
      this.$http.post("obj/objbind", { id: id }).then(res => {
        // this.locking = res.data.data.conarea;
      });
    },
    discuss(objId, userId, comId, sen) {
      wx.navigateTo({
        url: "/pages/project/comment/main?objId=" +
          objId +
          "&userId=" +
          userId +
          "&comId=" +
          comId +
          '&sen=' + sen
      });
    },
    handleTapShareButton() {
      //  有效分享
      this.$http
        .post("favorite/objsharesadd", { lei: 1, obj_id: this.objId })
        .then(res => {
          wx.showToast({
            title: "已完成",
            icon: "success",
            duration: 3000
          });
        });
    },
    giveFabulous() {
      this.$http
        .post("favorite/add", {
          obj_id: this.objId,
          type: "2"
        })
        .then(res => {
          if (res.data.status == "1") {
            this.data.zhuan = "1";
          }
        });
    },
    removeFabulous() {
      this.$http
        .post("favorite/dels", {
          obj_id: this.lists.obj_id,
          type: "2"
        })
        .then(res => {
          if (res.data.status == "1") {
            this.data.zhuan = "0";
          }
        });
    },
    // 点赞
    givezanstate() {
      this.$http
        .post("favorite/add", {
          obj_id: this.objId,
          type: "1"
        })
        .then(res => {
          if (res.data.status == "1") {
            this.data.zanstate = "1";
            this.lists.zan += 1;
          }
        });
    },
    removezanstate() {
      this.$http
        .post("favorite/add", {
          obj_id: this.objId,
          type: "1"
        })
        .then(res => {
          if (res.data.status == "1") {
            this.data.zanstate = "1";
          }
        });
    },
    getloader(objId) {
      this.$http
        .post("comment/comlist", { obj_id: this.objId, limit: 999, count: 999 })
        .then(res => {
          this.comment = res.data.data;
          this.ReachBottom = true;
        });
    },
    zanping(userId, pId, index) {
      const _this = this;
      _this.$http
        .post("comment/addzan", { obj_id: userId, obj_content_id: pId })
        .then(res => {
          if (res.data.status == "1") {
            _this.comment[index].mezan = "1";
            _this.comment[index].huozan.usercount += 1;
            _this.comment[index].huozan.userlist.push({
              id: "",
              user_id: _this.users.id,
              user_nickname: _this.users.user_nickname
            });
            // console.log(_this.comment[index].huozan.userlist)
          }
        });
    },
    removezanping(userId, pId, index) {
      const _this = this;
      _this.$http
        .post("comment/delzan", { obj_id: userId, obj_content_id: pId })
        .then(res => {
          if (res.data.status == "1") {
            _this.comment[index].mezan = "0";

            _this.comment[index].huozan.userlist = _this.comment[
              index
            ].huozan.userlist.filter(function(e) {
              return e.user_id != _this.users.id;
            });
            // console.log(_this.comment[index].huozan.userlist)
            _this.comment[index].huozan.usercount -= 1;
          }
        });
    }
  },
  // computed: {
  //   ...mapGetters([
  //     'gettoken', 'user_mobile'
  //   ])
  // },
  async onPullDownRefresh() {
    wx.stopPullDownRefresh();
    this.ince = 0;
    this.getData(this.objId);
  }
  // onReachBottom() {
  //   const _this = this;
  //   if (_this.ReachBottom != true) {
  //     _this.getloader(_this.objId)
  //   }
  // }
};

</script>
<style scoped>
.placeholder {
  font-size: 13px;
  color: #92969c;
}

.zan_footer {
  background: #fff;
  height: 100rpx;
  /*  \display:flex;
  justify-content: space-between;
  align-items: center;*/
}

.zan_footer_image {
  width: 30rpx;
  height: 30rpx;
  display: block;
  margin: auto;
  padding: 15rpx 0;
}

.zan_footer_image_div {
  width: 100%;
  height: 30rpx;
  line-height: 30rpx;
  color: #333;
  text-align: center;
  font-size: 14px;
}

.detail_ping_therimg {
  width: 34rpx;
  height: 34rpx;
  margin-right: 10rpx;
  vertical-align: middle;
}

.detail_ping_therbutton {
  background: #fff;
  border: 0px;
  position: absolute;
}

.page__title {
  font-size: 16px;
}

.weui-panel {
  margin-top: 0px;
}

.weui-grid {
  padding: 30rpx 20rpx;
  width: 15%;
}

.cen_box {
  width: 100%;
  box-sizing: border-box;
  display: block;
  padding: 20rpx;
  overflow: hidden;
}

.cen_box_html {
  display: block;
  overflow: hidden;
  width: 100%;
  font-size: 13px;
}

.cen_box_html img {
  width: 100% !important;
}

.huozan {
  padding: 15rpx 30rpx;
  background: #f6f6f6;
  border-radius: 3px;
}

image {
  width: 100%;
}

button:after,
button:before {
  content: "";
  border: 0px;
}

.detail_footer {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
}

.detail_footer .weui-grid {
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 14px;
  color: #fff;
}

.zanimage {
  border: 4rpx solid #fff;
  height: 60rpx;
}

.zanimage image {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  /*position: absolute;*/
}

.goutong {
  width: 48rpx;
  height: 68rpx;
  position: absolute;
  top: 14rpx;
  right: 30rpx;
}

.detail_one {
  width: 2px;
  height: 20px;
  background: red;
  margin-right: 15px;
}

.detail_ccontent {
  font-size: 14px;
  color: #1a1a1a
}

.detail_pimage {
  zoom: 1;
  overflow: hidden;
  display: block;
}

.detail_pimage .weui-flex__item {
  height: 20vw;
  margin-bottom: 20rpx;
  margin-top: 20rpx;
  float: left;
  width: 30%;
}

.detail_pimage .pic2_w {
  padding: 0px 5%;
}

.detail_footer .weui-grid {
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 14px;
  color: #fff;
}

.zanimage {
  border: 4rpx solid #fff;
  height: 60rpx;
}

.zanimage image {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  /*position: absolute;*/
}

.goutong {
  width: 48rpx;
  height: 68rpx;
  position: absolute;
  top: 14rpx;
  right: 30rpx;
}

.detail_one {
  width: 2px;
  height: 20px;
  background: red;
  margin-right: 15px;
}

.detail_ccontent {
  font-size: 14px;
}

.detail_pimage {
  zoom: 1;
  overflow: hidden;
  display: block;
}

.detail_pimage .weui-flex__item {
  height: 20vw;
  margin-bottom: 20rpx;
  margin-top: 20rpx;
  float: left;
  width: 30%;
}

.detail_pimage .pic2_w {
  padding: 0px 5%;
}

.user_avatar {
  margin-right: 5px;
  vertical-align: middle;
  width: 40rpx;
  height: 40rpx;
}

.details_zan_length1 {
  margin-left: 20rpx;
  color: #92969c;
  font-size: 24rpx;
}

.details_zan_length {
  width: 3em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wxParse {
  overflow: hidden !important;
}

.detail_ccontent {
  margin: 10px 0;
}

.duser_avatar {
  width: 68rpx;
  height: 68rpx;
  margin-right: 30rpx;
  vertical-align: middle;
  border-radius: 50%;
}

</style>
