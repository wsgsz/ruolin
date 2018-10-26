<template>
  <div>
    <div class="circle_userinfo" style="background:url(/static/image/circle_index_bg.png);background-size: 100% 100% ">
      <image class="circle_userinfo_image" :src="user.user_avatar" />
      <span class="circle_userinfo_name">{{user.user_nickname}}</span>
    </div>
    <!-- 我关注的圈子 -->
    <div class="weui-panel btn2em">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <div class="detail_one"></div>
        </div>
        <div class="weui-cell__bd cricle_index_guanzhu">
          <div class="fw500">加入的圈子</div>
          <div class="cricle_index_guanzhu_right" @click="getAllFollow()">
          </div>
        </div>
      </div>
      <scroll-view :scroll-x="true" class="circle_indx_iFocus" v-show="heJoinedCircle!=[]" style="height:160rpx;">
        <navigator :url="'/pages/circle/detail/main?circle_id='+iFocus.id" class="circle_indx_iFocus_el" v-for="(iFocus,indexiF) in heJoinedCircle" :key="indexiF">
          <image class="circle_indx_iFocus_image" :src="iFocus.circle_image" />
          <div class="circle_userinfo_add">
            <div class="circle_userinfo_add_1"> {{iFocus.circle_name}}</div>
            <div class="circle_userinfo_add_2">
              <span>打卡： <block>{{iFocus.hasClockInNumberDays}}天</block> </span> &nbsp;| &nbsp;
              <span>排名： <block>{{iFocus.currentRanking}}</block> </span>
            </div>
          </div>
        </navigator>
      </scroll-view>
      <div class="" v-if="heJoinedCircle==[]" style="color:#333;text-align:center;height:130rpx;line-height:130rpx;font-size:13px;color:@92969c">
        你暂时无关注的圈子，快来关注些吧！
      </div>
    </div>
    <!-- 评论与打卡 -->
    <div>
      <div class="weui-panel weui-panel_access">
        <div class="weui-cells weui-cells_after-title" style="margin-top:30rpx;">
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <div class="detail_one"></div>
            </div>
            <div class="weui-cell__bd fw500">他的评论与打卡
            </div>
          </div>
        </div>
        <div class="weui-panel__bd" v-for='(comm,inded) in hisCommentsClockOut' :key="inded">
          <div class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
              <image class="weui-media-box__thumb" :src="comm.user_avatar" style="border-radius:50%" />
            </div>
            <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
              <div class="weui-media-box__title">{{comm.user_nickname}}</div>
              <div class="weui-media-box__desc">{{comm.create_time}}</div>
            </div>
          </div>
          <div style="padding:0px 30rpx">
            <!-- 评论  -->
            <div class="detail_ccontent">
              {{comm.content}}
            </div>
            <div class="weui-flex detail_pimage">
              <div class="weui-flex__item" v-for="(comimage,comimageindex) in comm.image" :key="comimageindex" :class="{pic2_w:comimageindex=='1'}" v-show="comimage!=''">
                <image class="weui-media-box__thumb" :src="'https://m.ruolingroup.com'+comimage" />
              </div>
            </div>
            <!--    点赞   -->
            <div class="weui-flex" style="margin-bottom:15rpx;height:75rpx;justify-content:flex-start;width:50%;align-items: center">
              <div class="weui-flex__item">
                <div class="placeholder">
                  <div class="detail_ping_therbutton" @click="giveLike(comm.id,comm.circle_id,comm.circle_topic_id,inded)">
                    <image src="/static/image/zan.png" class="detail_ping_therimg" v-show="comm.iszan=='0'" />
                    <image src="/static/image/removezan.png" class="detail_ping_therimg" v-show="comm.iszan=='1'" />
                  </div>
                </div>
              </div>
              <div class="weui-flex__item">
                <div class="placeholder">
                  <div class="detail_ping_therbutton" @click="discusslink(comm.circle_id,comm.circle_topic_id,'',comm.id)">
                    <image src="/static/image/pinglun.png" class="detail_ping_therimg" />
                  </div>
                </div>
              </div>
              <div class="weui-flex__item">
                <div class="placeholder">
                  <button open-type="share" class="detail_ping_therbutton" style="position: initial !important;background: #fff">
                    <image src="/static/image/fenxiang.png" class="detail_ping_therimg" />
                  </button>
                </div>
              </div>
            </div>
            <!-- 列表  -->
            <div class=" huozan" style="margin-bottom:2rpx" v-show="comm.zan!=''">
              <div style="display:inline-block;margin-right:25rpx">
                <div class="placeholder">
                  <!-- <image src="/static/image/addzan.png" style="width:30rpx;height:30rpx;margin-right: 10rpx;" /> -->
                  {{comm.zan}}</div>
              </div>
            </div>
            <div class="huozan" v-for="(comlist,indexcm) in comm.reply" :key="indexcm" style="font-size:13px">
              <div style="display:inline-block;color:#223f75"> {{comlist.user_nickname}} : </div>{{comlist.content}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="weui-loadmore" v-show="!more">
      <div class="weui-loading"></div>
      <div class="weui-loadmore__tips">正在加载</div>
    </div>
    <div class="weui-loadmore weui-loadmore_line" v-show="more">
      <div class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无数据</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      uid: "54",
      more: true,
      data: "",
      last_id: "",
      current_page: 1,
      user: "",
      heJoinedCircle: "",
      hisCommentsClockOut: []
    }
  },
  onShareAppMessage: function() {
    const _this = this;
    return {
      title: _this.data.user + '的个人主页',
      path: "pages/circle/userinfo/main?uid=" + _this.uid
    };
  },
  onLoad(e) {

  },
  onShow() {
    this.getList(this.uid, this.last_id, this.current_page)
  },
  methods: {
    getList(uid, last_id, current_page) {
      this.$http.post("users/personalHomePage", { uid: uid, last_id: last_id, current_page: current_page }).then(res => {
        this.more = false
        this.data = res.data.data
        this.user = res.data.data.user
        this.heJoinedCircle = res.data.data.heJoinedCircle.data
        this.hisCommentsClockOut = this.hisCommentsClockOut.concat(res.data.data.hisCommentsClockOut.data)
        this.last_id = res.data.data.hisCommentsClockOut.lastId
        if(res.data.data.hisCommentsClockOut.data.length<10){
          this.more = true
        }
      })
    },
    giveLike(id, circle_id, topic_id, index) {
      this.$http.post("circle/giveLike", {
        circle_id: circle_id,
        circle_topic_id: topic_id,
        circle_topic_comments_id: id
      }).then(res => {
        this.hisCommentsClockOut[index].zan = res.data.data
        if (this.hisCommentsClockOut[index].iszan == '1') {
          this.hisCommentsClockOut[index].iszan = '0'
        } else {
          this.hisCommentsClockOut[index].iszan = '1'
        }
      })
    },
    discusslink(ciecleId, topicId, commentId, clockId) {
      wx.navigateTo({
        url: "/pages/circle/comment/main?circle_id=" + ciecleId + '&topic_id=' + topicId + '&comment_id=' + commentId + '&clock_id=' + clockId
      })
    },
  },
  async onPullDownRefresh() {
    wx.stopPullDownRefresh();
    const _this = this;
    _this.last_id = "";
    _this.current_page = 1;
    _this.discussionArea = []
    this.getDetail(this.ecId.circleId, this.ecId.topicId, this.last_id, this.current_page);
  },
  // 下拉
  onReachBottom() {
    const _this = this;
    if (_this.more == false) {
      _this.current_page += 1;
      _this.getList(_this.uid, _this.last_id, _this.current_page)
    }
  }
}

</script>
<style scoped>
.circle_userinfo {
  background-size: 100%;
  text-align: center;
  padding-top: 50rpx;
  height: 415rpx;
  box-sizing: border-box;
}
.huozan {
  padding: 15rpx 30rpx;
  background: #f6f6f6;
  border-radius: 3px;
}

.circle_userinfo_image {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  margin: auto;
  display: block;
}

.circle_userinfo_name {
  text-align: center;
  font-size: 14px;
  line-height: 20px;
  margin-top: 6px;
  color: #ffffff;
}

.circle_detail {
  position: relative;
}

.creatTop {
  position: fixed;
  right: 0px;
  top: 500rpx;
}
.circle_indx_iFocus_el{
  width: 280rpx;
  height:160rpx;
  box-sizing: border-box;
  position: relative;
  border-radius: 8rpx;
}
.circle_userinfo_add{
  width: 280rpx;
  height:160rpx;
  padding:30rpx 0;  
  color: #fff;
  position: absolute;
  left: 0px;
  top: 0px;
  display: flex;
  align-items: center;
  flex-wrap:wrap;  

  background:rgba(0,0,0,.4);

  box-sizing: border-box;
  text-align: center;
}
.circle_userinfo_add_1{
  width: 100%;
font-size: 13px;
}
.circle_userinfo_add_2{
  width: 100%;
  font-size:12px;
}
.circle_indx_iFocus_el image{
  width: 100%;
}
.cwhetherNotToJoin {
  width: 150rpx;
  height: 55rpx;
  text-align: center;
  border-radius: 6rpx;
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  border: 1rpx solid #ffffff;
  line-height: 55rpx;
  font-size: 13px;
  position: absolute;
  top: 50rpx;
  right: 30rpx;
  z-index: 111;
}

.placed_top {
  padding: 20rpx 30rpx;
}

.placed_top_name {
  font-size: 14px;
  color: #1a1a1a;
  line-height: 25px;
  padding-bottom: 10rpx;
}

.placed_top_image {
  width: 100%;
  height: 380rpx;
}

.placed_top_p {
  font-size: 12px;
  color: #92969c;
  line-height: 20px;
  text-align: right;
}

.circle_flex {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
}

.circle_last_cjht {
  position: fixed;
  top: 50vh;
  right: 0rpx;
  width: 60px;
  height: 50rpx;
  display: block;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  text-align: center;
  border-top-left-radius: 10rpx;
  line-height: 50rpx;
  font-size: 13px;
  border-bottom-left-radius: 10rpx;
}

.topic_detail {
  width: 60%;
  display: flex;
  justify-content: space-between;
  color: #92969c
}

.topic_detail_div image {
  width: 34rpx;
  height: 34rpx;
  margin-right: 10rpx;
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

.detail_ccontent {
  font-size: 14px;
  color: #1a1a1a
}

.detail_ping_therbutton {
  background: #fff;
  border: 0px;
  position: inherit;
}

.placeholder {
  font-size: 13px;
  color: #92969c;
}

.detail_ping_therimg {
  width: 34rpx;
  height: 34rpx;
  margin-right: 10rpx;
  vertical-align: middle;
}

.daka_list {
  width: 100%;
  height: 88rpx;
  font-size: 14px;
  line-height: 88rpx;
  text-align: center;
  background: #d61518;
  color: #ffffff;
  position: fixed;
  bottom: 0px;
  left: 0px;
}

button:after,
button:before {
  position: inherit;
  display: none;
}

</style>
