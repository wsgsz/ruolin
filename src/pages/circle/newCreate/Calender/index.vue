<template>
  <div>
    <!--  -->
    <div class="weui-panel weui-panel_access">
      <div class="weui-panel__bd">
        <navigator url="" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active">
          <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
            <image class="weui-media-box__thumb" :src="circleMainIntroduction.user_avatar" style="border-radius:50%" />
          </div>
          <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
            <div class="weui-media-box__title">{{circleMainIntroduction.user_nickname}}</div>
            <div class="weui-media-box__desc">用户ID：{{10000+circleMainIntroduction.id*1}}</div>
          </div>
        </navigator>
      </div>
    </div>
    <!--  -->
    <!--  -->
    <div class="weui-panel ranling_list_index">
        <div class="weui-media-box weui-media-box_appmsg ranling_list">
          <div class="weui-media-box__hd weui-media-box__hd_in-appmsg"  style="width:270rpx;height:150rpx;">
            <image class="weui-media-box__thumb" :src="circleIntroduction.circle_image" />
          </div>
          <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
            <div class="weui-media-box__title" style="font-size:15px;margin-bottom:15rpx;">{{circleIntroduction.circle_name}}</div>
             <div class="weui-media-box__desc" style="font-size:14px;">
               <image src="/static/image/cjrs.png" style="width:26rpx;height:26rpx;" />
               {{circleIntroduction.circleAttendance}}人已参加</div>
          </div>
        </div>
    </div>

    <!--  -->
        <div class="weui-tab">
        <div class="ranking_list" v-for="(item,calenderindex) in calender" :key="calenderindex" style="text-align:center">
        <div class="ranking_list_1">
         <image :src="item.user_avatar" /> 
        </div>
        <div class="ranking_list_2 ellipsis-1">
          {{item.user_nickname }}
        </div>
        <div class="ranking_list_3 ellipsis-1">
          ID:{{10000+item.id*1}} 
        </div>
             <div class="ranking_list_4 ellipsis-1">
          加入时间:{{item.add_time}} 
        </div>
      </div>
      </div>
      <div class="weui-loadmore" v-show="more">
      <div class="weui-loading"></div>
      <div class="weui-loadmore__tips">正在加载</div>
    </div>
    <div class="weui-loadmore weui-loadmore_line" v-show="!more">
      <div class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无数据</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      circle_id:'',
      list:'',
      circleMainIntroduction:"",
      circleIntroduction:"",
      more:true,
      last_id: "",
      current_page: 1,
      calender:[]

    };
  },
  onLoad(e) {
     Object.assign(this.$data, this.$options.data());
    this.circle_id = e.circle_id
    this.typeclick(this.circle_id,this.last_id,this.current_page)
  },

  methods: {
    typeclick(circle_id,last_id,current_page){
      this.$http.post('circle/membersCircle',{circle_id:circle_id,last_id: last_id,
          page: current_page}).then(res=>{
        this.list = res.data.data
        this.circleMainIntroduction = res.data.data.circleMainIntroduction
        this.circleIntroduction = res.data.data.circleIntroduction
        this.more = false
        this.calender = this.calender.concat(res.data.data.data);
              if (res.data.data.data < 10) {
              this.more = true;
            }
        console.log(this.list)
      })
    }
  },
   async onPullDownRefresh() {
    wx.stopPullDownRefresh();
    const _this = this;
    _this.last_id = "";
    _this.current_page = 1;
    this.typeclick(this.circle_id,this.last_id,this.current_page)
  },
  // 下拉
  onReachBottom() {
    const _this = this;
    if (_this.more == true) {
    } else {
      _this.current_page += 1;
     _this.typeclick(_this.circle_id,_this.last_id,_this.current_page)
    }
  }

};

</script>
<style scoped>
page,
.page,
.page__bd {
  height: 100%;
}
.page__bd {
  padding-bottom: 0;
}
.weui-tab__content {
  padding-top: 10px;
  text-align: center;
}
.ranling_list_index{
  margin:30rpx;
  box-sizing: border-box;
    box-shadow: 0px 0px 2px 2px #f6f6f6
}
.ranling_list{
  padding:20rpx 30rpx;
  box-sizing: border-box;
}
.ranking_list{
  display:flex;
  justify-content: space-between;
  width: 100%;
  padding:0px 30rpx;
  box-sizing: border-box;
  margin-top:20rpx;
  font-size: 13px;
  line-height: 68rpx;
}
.ranking_list_1{
  width: 100rpx;
}
.ranking_list_1 image{
  width: 68rpx;
  height: 68rpx;
  border-radius:50%;
}
.ranking_list_2{
  width: 200rpx;
  text-align: left
}
.ranking_list_3{
  width: 170rpx;
  text-align: left
}
.ranking_list_4{
  width: 320rpx;
  text-align: right
}
.active1 {
  color: red;
  background: url(../image/rankingone.png);
  background-size: 25rpx 42rpx;
  background-repeat: no-repeat;
  background-position: center;
  content:'';
}

.active2 {
  color: yellow;
  background: url(../image/rankingtwo.png);
  background-size: 25rpx 42rpx;
  background-repeat: no-repeat;
  background-position: center;
   content:'';
}

.active3 {
  color: red;
  background: url(../image/rankingthere.png);
  background-size: 25rpx 42rpx;
  background-repeat: no-repeat;
  background-position: center;
   content:'';
}
.active1 p ,.active2 p ,.active3 p{
  visibility: hidden;
}
</style>
