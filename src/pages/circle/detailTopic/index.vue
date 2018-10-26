<template>
  <div>
    <!-- <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell">
        <div class="weui-cell__bd">{{circle.circle_name}}</div>
        <div class="weui-cell__ft" v-show="data.whetherNotToJoin==1">已加入圈子</div>
        <div class="weui-cell__ft" v-show="data.whetherNotToJoin==0" @click="addCricle()">加入圈子</div>
      </div>
    </div> -->
    <div class="detailTop" v-show="data.whetherNotToJoin==0" @click="showToast()">
      <div class="weui-cell__ft cwhetherNotToJoin" @click="addCricle()">加入圈子</div>
    </div>
    <!--  -->
    <div class="circle_detail">
      <div class="weui-cell__ft cwhetherNotToJoin" v-show="data.whetherNotToJoin==1">已加入圈子</div>
      <swiper indicator-dots=true autoplay=true interval="5000" indicator-active-color="#d61518" indicator-color="#ffffff" duration="900" circular=true style="height:418rpx;">
        <div v-for="(item, index) in circle.circle_banner" :key="index">
          <swiper-item>
            <image :src="item" class="slide-image" />
          </swiper-item>
        </div>
      </swiper>
    </div>
    <!-- data.whetherNotToJoin==1 显示 已经加入圈子 显示   -->
    <div class="weui-grids fiveList btn2em">
      <navigator :url="'/pages/circle/newCreate/member/main?user_nickname='+circle.user_nickname+'&user_avatar='+circle.user_avatar+'&uid='+circle.uid+'&circle_name='+circle.circle_name+'&circle_id='+circle.id" class="weui-grid" hover-class="weui-grid_active" style="width:25%;">
        <image class="weui-grid__icon" src="/static/image/dakarizhi.png" style="width:112rpx;height:80rpx" />
      </navigator>
      <navigator :url="'/pages/circle/newCreate/rankingList/main?user_nickname='+circle.user_nickname+'&user_avatar='+circle.user_avatar+'&uid='+circle.uid+'&circle_name='+circle.circle_name+'&content='+circle.circle_announcement+'&banner='+circle.circle_banner+'&circle_id='+circle.id" class="weui-grid" hover-class="weui-grid_active" style="width:25%;">
        <image class="weui-grid__icon" src="/static/image/paihangbang.png" style="width:80rpx;height:80rpx" />
      </navigator>
      <navigator :url="'/pages/circle/newCreate/Calender/main?user_nickname='+circle.user_nickname+'&user_avatar='+circle.user_avatar+'&uid='+circle.uid+'&circle_name='+circle.circle_name+'&content='+circle.circle_announcement+'&banner='+circle.circle_banner+'&circle_id='+circle.id" class="weui-grid" hover-class="weui-grid_active" style="width:25%;">
        <image class="weui-grid__icon" src="/static/image/chengyuan.png" style="width:54rpx;height:80rpx" />
      </navigator>
      <div class="weui-grid" style="width:25%;" @click="shareDetail()">
        <button open-type="share" style="position: initial !important;background: #fff">
          <image class="weui-grid__icon" src="/static/image/circlefenxiang.png" style="width:54rpx;height:80rpx" />
        </button>
      </div>
    </div>
    <!-- 圈主简介 -->
    <!-- data.whetherNotToJoin==1 显示 已经加入圈子 显示  -->
    <div class="weui-cells weui-cells_after-title btn2em" style="margin-top:30rpx;">
      <div class="page__bd_spacing" style="margin-top:30rpx;">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <div class="detail_one"></div>
          </div>
          <div class="weui-cell__bd fw500">圈主简介</div>
        </div>
      </div>
      <view class="weui-cell">
        <view class="weui-cell__hd" style="position: relative;margin-right: 10px;">
          <image :src="circleMainIntroduction.user_avatar" style="width: 68rpx;height:68rpx; display: block;border-radius:50%" />
        </view>
        <div class="weui-cell__bd index_ul_content" style="height:70rpx;">
          <div url="/pages/userinfo/questionnaire/main" class="user_index_right">
            <div class="user_index_right_name">{{circleMainIntroduction.user_nickname}} </div>
            <div class="user_index_right_type red" v-show="circleMainIntroduction.user_type==0">未选择</div>
            <div class="user_index_right_type red fw500" v-show="circleMainIntroduction.user_type==1">投资人</div>
            <div class="user_index_right_type red fw500" v-show="circleMainIntroduction.user_type==2">创业者</div>
            <div class="user_index_right_type red fw500" v-show="circleMainIntroduction.user_type==3">品牌方</div>
            <div v-show="circleMainIntroduction.user_type==3">
              <div class="industry_name_l1 userw80" v-show="circleMainIntroduction.user_check=='1'">未审核</div>
              <div class="industry_name_l1 userw80" v-show="circleMainIntroduction.user_check=='2'">待审核</div>
              <div class="industry_name_l1 userw80" v-show="circleMainIntroduction.user_check=='3'">已审核</div>
            </div>
            <div>
            </div>
          </div>
          <div class="text_1" style="width:100%">
            <div class="u_index_center text_1">ID：{{10000+circleMainIntroduction.id*1}}</div>
          </div>
        </div>
      </view>
    </div>
    <!-- 置顶话题 -->
    <div class="weui-cells weui-cells_after-title btn2em" style="margin-top:30rpx;">
      <!--       <div class="page__bd_spacing" style="margin-top:30rpx;">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <div class="detail_one"></div>
          </div>
          <div class="weui-cell__bd fw500">置顶话题</div>
        </div>
      </div> -->
      <div class=" placed_top">
        <div class="placed_top_name" style="font-size:16px;color:#1a1a1a;font-weight: 600">{{topic.topic_title}}</div>
        <p class="placed_top_p" style="text-align:left;">{{topic.add_time}}&nbsp;</p>
        <div class="weui-cell">
          <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
            <image :src="topic.user_avatar" style="width: 68rpx;height: 68rpx; display: block" />
          </div>
          <div class="weui-cell__bd" style="width: 400rpx;">
            <div style="width: 400rpx;">{{topic.user_nickname}}</div>
          </div>
        </div>
        <div class="placed_top_name" style="font-size:14px;color:#1a1a1a">{{topic.topic_describes}}</div>
        <image class="placed_top_image" :src="itemse" v-for="(itemse,placed_topindex) in topic.topic_files" :key="placed_topindex" />
        <!--   <div class="topic_detail">
          <div class="topic_detail_div">
            <image src="/static/image/zan.png" /> {{topic.great_number}}</div>
          <div class="topic_detail_div">
            <image src="/static/image/pinglun.png" /> {{topic.commentnum}}</div>
          <div class="topic_detail_div">
            <image src="/static/image/fenxiang.png" /> {{topic.forwarding_number}}</div>
        </div>  -->
      </div>
    </div>
    <!-- 评论  -->
    <div>
      <div class="weui-panel weui-panel_access">
        <div class="weui-cells weui-cells_after-title" style="margin-top:30rpx;">
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <div class="detail_one"></div>
            </div>
            <div class="weui-cell__bd fw500">评论
              <font v-show="data.discussionCount!='0'">（{{data.discussionCount}}）</font>
            </div>
          </div>
        </div>
        <!--    <div class="weui-cell">
          <div class="weui-cell__hd">
          </div>
          <div class="weui-cell__bd" @click="discuss(lists.obj_id)" style="background:#e6e6e6;font-size:14px;padding:15rpx;">添加评论...</div>
        </div> -->
        <!-- 评论 -->
        <div class="weui-panel__bd" v-for='(comm,inded) in discussionArea' :key="inded">
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
            <!-- 评论 -->
            <div class="detail_ccontent">
              {{comm.content}}
            </div>
            <div class="weui-flex detail_pimage">
              <div class="weui-flex__item" v-for="(comimage,comimageindex) in comm.image" :key="comimageindex" :class="{pic2_w:comimageindex=='1'}" v-show="comimage!=''">
                <image class="weui-media-box__thumb" :src="comimage" />
              </div>
            </div>
            <!--点赞  -->
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
                  <!-- ciecleId,topicId,commentId,clockId -->
                  <div class="detail_ping_therbutton" @click="discusslink(comm.circle_id,comm.circle_topic_id,'',comm.id)">
                    <image src="/static/image/pinglun.png" class="detail_ping_therimg" />
                  </div>
                </div>
              </div>
              <div class="weui-flex__item">
                <div class="placeholder">
                  <!--  <button open-type="share"  @click="handleTapShareButton" class="detail_ping_therbutton">
                      <image src="/static/image/fenxiang.png" class="detail_ping_therimg" /> 分享
                    </button> -->
                  <button open-type="share" class="detail_ping_therbutton" style="position: initial !important;background: #fff">
                    <image src="/static/image/fenxiang.png" class="detail_ping_therimg" />
                  </button>
                  <!--     <div class="detail_ping_therbutton" @click="circle_share()">
                    <image src="/static/image/fenxiang.png" class="detail_ping_therimg" />
                  </div> -->
                </div>
              </div>
            </div>
            <!-- 列表 -->
            <div class=" huozan" style="margin-bottom:2rpx" v-show="comm.zan!=''">
              <div style="display:inline-block;margin-right:25rpx">
                <div class="placeholder">
                  <!-- <image src="/static/image/zan.png" style="width:30rpx;height:30rpx;margin-right: 10rpx;" /> -->
                  {{comm.zan}}</div>
              </div>
            </div>
            <!--   <div class="huozan" v-for="(comlist,indexcm) in comm.reply" :key="indexcm" style="font-size:13px">
              <div style="display:inline-block;color:#223f75"> {{comlist.user_nickname}} : </div>{{comlist.content}}
            </div> -->
            <div class="huozan" v-for="(comlist,indexcm) in comm.reply" :key="indexcm" style="font-size:14px;overflow: hidden;" @click="discusslink(comm.circle_id,comm.circle_topic_id,'',comm.id,comlist.uid)"  >
              <div class="comnickname" > {{comlist.user_nickname}}
                <div style="display: inline" v-if="comlist.superior_id!=0">{{comlist.superior_id}}
                  <div style="color:#92969c;display:inline-block">回复</div>{{comlist.reply_nickname}}
                </div>
                : &nbsp;</div>
              <p style="word-wrap:break-word; white-space:normal; word-break:break-all;display: inline">{{comlist.content}}</p>
            </div>
          </div>
        </div>
        <!--  -->
      </div>
    </div>
    <div class="weui-loadmore" v-show="!more">
      <div class="weui-loading"></div>
      <div class="weui-loadmore__tips">正在加载</div>
    </div>
    <div class="weui-loadmore weui-loadmore_line" v-show="more">
      <div class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无数据</div>
    </div>
    <!--  -->
    <!--     <navigator :url="'/pages/information/websorket/main'" open-type="navigate" class="weui-cell__bd circle_last_cjht">
      创建话题
    </navigator> -->
    <div class="daka_list" v-show="data.whetherNotToJoin==1" @click="daka()">
      打卡
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ecId: "",
      data: "",
      last_id: "",
      current_page: 1,
      circle: "",
      data: "",
      placed_top: "",
      topic: "",
      more: true,
      circleMainIntroduction: "",
      discussionArea: []
    };
  },
  onShareAppMessage: function() {
    const _this = this;
    return {
      title: _this.data.circleIntroduction.name_company,
      desc: _this.data.circleIntroduction.introducecontent,
      path: "pages/circle/detailTopic/main?circleId=" + _this.ecId.circleId + '&topicId=' + _this.ecId.topicId
    };
  },
  onLoad(e) {
    Object.assign(this.$data, this.$options.data());
    this.ecId = e;
    // this.circleMainIntroduction = JSON.parse(e.circleMainIntroduction)
  },
  onShow() {
    this.discussionArea = []
    this.last_id = ""
    this.current_page = 1
    this.getDetail(this.ecId.circleId, this.ecId.topicId, this.last_id, this.current_page);
  },
  methods: {
    showToast() {
      wx.showToast({
        title: "请先加入圈子",
        icon: "none"
      })
    },
    daka() {
      wx.navigateTo({
        url: "/pages/circle/punch/main?circle_Id=" + this.ecId.circleId + "&circle=" + JSON.stringify(this.data.circleIntroduction)+'&topic='+JSON.stringify(this.topic)})
    },
    addCricle() {
      this.$http.post('circle/concernCircleAdd', { circle_id: this.ecId.circleId }).then(res => {
        if (res.data.status == '1') {
          this.data.whetherNotToJoin = '1'
        }
      })
    },
    discusslink(ciecleId, topicId, commentId, clockId, superior_id) {
      wx.navigateTo({
        url: "/pages/circle/comment/main?circle_id=" + ciecleId + '&topic_id=' + topicId + '&comment_id=' + commentId + '&clock_id=' + clockId + '&superior_id=' + superior_id
      })
      // discuss(comm.circle_id,comm.circle_topic_id,comm.id)
    },
    getDetail(circle_id, topic_id, last_id, current_page) {
      this.$http
        .post("circle/topicdetailsCircle", {
          circle_id: circle_id,
          topic_id: topic_id,
          last_id: last_id,
          page: current_page
        })
        .then(res => {
          if (res.data.status == "1") {
            this.more = false;
            this.circle = res.data.data.circle;
            this.data = res.data.data;
            this.placed_top = res.data.data.placed_top;
            this.discussionArea = this.discussionArea.concat(res.data.data.discussionArea.data)
            this.last_id = res.data.data.discussionArea.lastId
            this.topic = res.data.data.topic
            this.circleMainIntroduction = res.data.data.circleMainIntroduction
            console.log(res.data.data.discussionArea.data.length)
            if (res.data.data.discussionArea.data.length < 10) {
              this.more = true;
            }
          }
        });
    },
    giveLike(id, circle_id, topic_id, index) {
      this.$http.post("circle/giveLike", {
        circle_id: circle_id,
        circle_topic_id: topic_id,
        circle_topic_comments_id: id
      }).then(res => {
        this.discussionArea[index].zan = res.data.data
        if (this.discussionArea[index].iszan == '1') {
          this.discussionArea[index].iszan = '0'
        } else {
          this.discussionArea[index].iszan = '1'
        }
        // console.log(this.discussionArea[index].iszan)
      })
    }
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
      _this.getDetail(_this.ecId.circleId, _this.ecId.topicId, _this.last_id, _this.current_page);
    }
  }
};

</script>
<style scoped>
.circle_detail {
  position: relative;
}

.creatTop {
  position: fixed;
  right: 0px;
  top: 500rpx;
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
  z-index: 99;
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

.huozan {
  padding: 15rpx 30rpx;
  background: #f6f6f6;
  border-radius: 3px;
}

.detailTop {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, .1);
  z-index: 88
}
.comnickname{
  display:inline-block;color:#223f75;word-break:break-all;
}
</style>
