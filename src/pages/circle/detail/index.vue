<template>
  <div>
    <!-- <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell">
        <div class="weui-cell__bd">{{circle.circle_name}}</div>
        <div class="weui-cell__ft" v-show="data.whetherNotToJoin==1">已加入圈子</div>
        <div class="weui-cell__ft" v-show="data.whetherNotToJoin==0" @click="addCricle()">加入圈子</div>
      </div>
    </div> -->
    <!--  -->
    <div class="circle_detail">
      <div class="weui-cell__ft cwhetherNotToJoin" v-show="data.whetherNotToJoin==1">已加入圈子</div>
      <div class="weui-cell__ft cwhetherNotToJoin" v-show="data.whetherNotToJoin==0" @click="addCricle()">加入圈子</div>
      <swiper indicator-dots=true autoplay=true interval="5000" indicator-active-color="#d61518" indicator-color="#ffffff" duration="900" circular=true style="height:418rpx;">
        <div v-for="(item, index) in circle.circle_banner" :key="index">
          <swiper-item>
            <image :src="item" class="slide-image" />
          </swiper-item>
        </div>
      </swiper>
    </div>
    <div v-if="getMe">
      <navigator url="/pages/userinfo/pcLogin/main" class="getmehou" >
        <image src="/static/image/guanlihoutai.png" style="width:40rpx;height:40rpx;vertical-align: middle;"/>
        管理后台
      </navigator>

    </div>
    <!-- data.whetherNotToJoin==1 显示 已经加入圈子 显示   -->
    <div class="weui-grids fiveList" v-show="data.whetherNotToJoin==1">
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
    <div class="weui-cells weui-cells_after-title btn2em" style="margin-top:30rpx;" v-if="data.whetherNotToJoin==1">
      <div class="page__bd_spacing" style="margin-top:30rpx;">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <div class="detail_one"></div>
          </div>
          <div class="weui-cell__bd fw500">圈主简介</div>
        </div>
      </div>
      <div class="weui-cell">
        <view class="weui-cell">
          <view class="weui-cell__hd" style="position: relative;margin-right: 10px;">
            <image :src="circleMainIntroduction.user_avatar" style="width: 68rpx;height:68rpx; display: block;border-radius:50%" />
          </view>
          <div class="weui-cell__bd index_ul_content" style="height:70rpx;">
            <div url="/pages/userinfo/questionnaire/main" class="user_index_right">
              <div class="user_index_right_name">{{circleMainIntroduction.user_nickname}} </div>
              <navigator url="/pages/index/type/main?linkUrl=userinfo" class="user_index_right_type red" v-show="circleMainIntroduction.user_type==0">未选择</navigator>
              <div class="user_index_right_type red fw500" v-show="circleMainIntroduction.user_type==1" @click="checktype()">投资人</div>
              <div class="user_index_right_type red fw500" v-show="circleMainIntroduction.user_type==2" @click="checktype()">创业者</div>
              <div class="user_index_right_type red fw500" v-show="circleMainIntroduction.user_type==3" @click="checktype()">品牌方</div>
              <div v-show="circleMainIntroduction.user_type==3">
                <navigator url="/pages/userinfo/questionnaire/main" class="industry_name_l1 userw80" v-show="circleMainIntroduction.user_check=='1'">未审核</navigator>
                <div class="industry_name_l1 userw80" v-show="circleMainIntroduction.user_check=='2'">待审核</div>
                <div class="industry_name_l1 userw80" v-show="circleMainIntroduction.user_check=='3'">已审核</div>
              </div>
              <div>
              </div>
            </div>
            <div class="text_1" style="width:100%">
              <!-- <div class="u_index_center text_1">ID：{{10000+circleMainIntroduction.id*1}}</div> -->
            </div>
          </div>
        </view>
      </div>
    </div>
    <!-- 圈内公告 -->
    <div class="weui-cells weui-cells_after-title btn2em" style="margin-top:30rpx;">
      <div class="page__bd_spacing" style="margin-top:30rpx;">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <div class="detail_one"></div>
          </div>
          <div class="weui-cell__bd fw500">圈内公告</div>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd" style="font-size:14px;color:#1a1a1a" >
          <rich-text :nodes="circle.circle_announcement" bindtap="tap"></rich-text>
           <!-- <wxParse :content="circle.circle_announcement" /> -->
        </div>
      </div>
    </div>
    <!-- 置顶话题 -->
    <div class="weui-cells weui-cells_after-title btn2em" style="margin-top:30rpx;" v-if="placed_top">
      <div class="page__bd_spacing" style="margin-top:30rpx;">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <div class="detail_one"></div>
          </div>
          <div class="weui-cell__bd fw500">置顶话题</div>
        </div>
      </div>
      <navigator :url="'/pages/circle/detailTopic/main?topicId=' + placed_top.id + '&circleId=' + circle.id" class=" placed_top">
        <div class="placed_top_name" style="font-size:14px;color:#1a1a1a">{{placed_top.topic_title}}</div>
        <image class="placed_top_image" :src="itemse" v-for="(itemse,placed_topindex) in placed_top.topic_files" :key="placed_topindex" />
        <p class="placed_top_p">{{placed_top.add_time}}&nbsp;</p>
      </navigator>
    </div>
    <!--  -->
    <div class="weui-panel">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <div class="detail_one"></div>
        </div>
        <div class="weui-cell__bd cricle_index_guanzhu">
          <div class="fw500">话题</div>
          <div class="cricle_index_guanzhu_right">
            查看所有话题
            <image src="/static/image/right.png" style="display:inline-block" />
          </div>
        </div>
      </div>
      <div class="weui-cells weui-cells_after-title" v-for="(topic,topicindex) in topic" :key="topicindex" style="padding-top:20rpx" @click="linkDetailTopic(topic.id)">
        <div class="weui-cell">
          <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
            <image :src="topic.topic_files[0]" style="width: 68rpx;height:68rpx; display: block;border-radius:50%" />
          </div>
          <div class="weui-cell__bd circle_flex">
            <div style="font-size:14px;">{{topic.circle_name}}
            </div>
            <!-- <div class="circle_flex_right">{{topic.circle_name}}</div> -->
          </div>
        </div>
        <div class="weui-article" style="border-bottom:1px solid #e5e5e5">
          <div class="weui-article__p">
            {{topic.topic_title}}
          </div>
          <image class="weui-article__img" :src="topic.topic_files[0]" style="width:100%;height:380rpx;" />
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
    <!--  -->
    <div  class="weui-cell__bd circle_last_cjht" @click="linktopic()" v-if="data.whetherNotToJoin==1">
      创建话题
    </div>
    <div style="height: 80rpx;width:100%"></div>
    <div class="daka_list" v-show="data.whetherNotToJoin==1" @click="daka()">
      打卡
    </div>
  </div>
</template>
<script>
  import wxParse from "mpvue-wxparse";
export default {
  data() {
    return {
      getUserId:"",
      getMe:"",
      circle_id: "",
      data: "",
      last_id: "",
      current_page: 1,
      circle: "",
      placed_top: "",
      topic: [],
      more: true,
      circleMainIntroduction: "",
      nodes:[{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'width:100%'
      }
    }
      ]
    };
  },
  components:{
    wxParse
  },
  onLoad(e) {
    Object.assign(this.$data, this.$options.data());
    this.getUser()
    this.circle_id = e.circle_id;
    // this.getDetail(this.circle_id, this.last_id, this.current_page);
  },
  onShow(e) {
    this.topic=[]
    this.last_id = ""
    this.current_page = 1
    this.getDetail(this.circle_id, this.last_id, this.current_page);
  },
  methods: {
    getUser(){
      this.$http.post("users/getUserinfo",{}).then(res=>{
        this.getUserId = res.data.data.id
      })
    },
     getCli(){
      wx.setClipboardData({
        data:"https://m.ruolingroup.com/ruolin/hou"
      })
    },
    addCricle() {
      this.$http.post('circle/concernCircleAdd', { circle_id: this.circle_id }).then(res => {
        if (res.data.status == '1') {
          this.data.whetherNotToJoin = '1'
        }
      })
    },
    // 去打卡
    daka() {
         wx.navigateTo({
        url: "/pages/circle/punch/main?circle_Id=" + this.circle_id + "&circle=" + JSON.stringify(this.data.circleIntroduction)+'&topic='+JSON.stringify(this.placed_top)
      })
    },
    // 去创建HUATI
    linktopic() {
      wx.navigateTo({
        url: "/pages/circle/createTopic/main?circle_Id=" + this.circle_id + "&circle=" + JSON.stringify(this.data.circleIntroduction)
      })
    },
    getDetail(circle_id, last_id, current_page) {
      this.$http
        .post("circle/detailsCircle", {
          circle_id: circle_id,
          last_id: last_id,
          page: current_page
        })
        .then(res => {
          if (res.data.status == "1") {
            this.more = false;
            this.circle = res.data.data.circle;
            this.data = res.data.data;
            this.placed_top = res.data.data.placed_top;
            this.circleMainIntroduction = res.data.data.circleMainIntroduction
            this.topic = this.topic.concat(res.data.data.topic.data);
            this.last_id = res.data.data.topic.lastId;
            this.getUserId == res.data.data.circleMainIntroduction.id?this.getMe=true:this.getMe=false
            console.log(this.getMe)
            wx.setNavigationBarTitle({
              title:res.data.data.circleIntroduction.circle_name
            })
            if (res.data.data.topic.data.length < 10) {
              this.more = true;
            }
          }
        });
    },
    linkDetailTopic(id) {
      wx.navigateTo({
        url: '/pages/circle/detailTopic/main?topicId=' + id + '&circleId=' + this.circle.id + '&circleMainIntroduction=' + JSON.stringify(this.circleMainIntroduction)
      })
      // :url="'/pages/circle/detailTopic/main?topicId='+topic.id+'&circleId='+circle.id+'&circleMainIntroduction='+JSON.parse(circleMainIntroduction)"
    }
  },
  async onPullDownRefresh() {
    wx.stopPullDownRefresh();
    const _this = this;
    _this.last_id = "";
    _this.topic=[];
    _this.current_page = 1;
    _this.getDetail(_this.circle_id, _this.last_id, _this.current_page);
  },
  // 下拉
  onReachBottom() {
    const _this = this;
    if (_this.more == true) {} else {
      _this.current_page += 1;
      _this.getDetail(_this.circle_id, _this.last_id, _this.current_page);
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
position:fixed;
top:50vh;
right:0rpx;
width:40rpx;
height:120rpx;
display:block;
background:rgba(214,21,24,0.5);
color:#fff;
text-align:center;
border-top-left-radius:10rpx;
line-height:1.2;
font-size:26rpx;
border-bottom-left-radius:10rpx;
padding:10rpx 8rpx;

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
button:after,button:before{
  position: inherit;
  display: none;
}
.getmehou{
  width:680rpx;height:90rpx;line-height: 90rpx;text-align: center;margin:50rpx auto;
  box-shadow: 0px 0px 2px 2px #e5e5e5
}
</style>
