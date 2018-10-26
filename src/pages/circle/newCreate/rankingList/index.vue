<template>
  <div>
    <!--  -->
    <div class="weui-panel weui-panel_access">
      <div class="weui-panel__bd">
        <navigator url="" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active">
          <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
            <image class="weui-media-box__thumb" :src="circleMainIntroduction.user_avatar" />
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
        <div class="weui-navbar">
          <block v-for="(item,index) in tabs" :key="index">
            <div :id="index" :class="{'weui-bar__item_on':activeIndex == index}" class="weui-navbar__item" @click="tabClick">
              <div class="weui-navbar__title">{{item}}</div>
            </div>
          </block>
          <div class="weui-navbar__slider" :class="navbarSliderClass"></div>
        </div>
        <div class="weui-tab__panel">
          <div class="weui-tab__content" :hidden="activeIndex != 0">
         <div class="ranking_list" v-for="(item,circleListTodayindex) in circleListToday" :key="circleListTodayindex" style="text-align:center">
        <div class="ranking_list_1" :class="{active1:circleListTodayindex=='0',active2:circleListTodayindex=='1',active3:circleListTodayindex=='2'}" style="width:88rpx;">
         <p> {{circleListTodayindex+1}}</p>
        </div>
        <div class="ranking_list_2">
          {{item.user_nickname }}
        </div>
        <div class="ranking_list_3">
          {{item.energy_bean}}分
        </div>
      </div>
          </div>
          <div class="weui-tab__content" :hidden="activeIndex != 1">

                  <div class="ranking_list" v-for="(item,CircleListEeekindex) in CircleListEeek" :key="CircleListEeekindex" style="text-align:center">
        <div class="ranking_list_1" :class="{active1:CircleListEeekindex=='0',active2:CircleListEeekindex=='1',active3:CircleListEeekindex=='2'}" style="width:88rpx;">
         <p> {{CircleListEeekindex+1}}</p>
        </div>
        <div class="ranking_list_2" >
          {{item.user_nickname }}
        </div>
        <div class="ranking_list_3">
          {{item.energy_bean}}分
        </div>
      </div>

          </div>
          <div class="weui-tab__content" :hidden="activeIndex != 2">

        <div class="ranking_list" v-for="(item,CircleTotalListindex) in CircleTotalList" :key="CircleTotalListindex" style="text-align:center">
        <div class="ranking_list_1" :class="{active1:CircleTotalListindex=='0',active2:CircleTotalListindex=='1',active3:CircleTotalListindex=='2'}" style="width:88rpx;">
         <p> {{CircleTotalListindex+1}}</p>
        </div>
        <div class="ranking_list_2">
          {{item.user_nickname }}
        </div>
        <div class="ranking_list_3">
          {{item.energy_bean}} 分
        </div>
      </div>

          </div>
        </div>
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
       tabs: ["今日", "本周", "总榜"],
      activeIndex: 0,
      fontSize: 30,
      CircleListEeek:"",// 本周
      CircleTotalList:"",//全部
      circleListToday:""//今日
    };
  },
  onLoad(e) {
     Object.assign(this.$data, this.$options.data());
    this.circle_id = e.circle_id
    this.typeclick(this.circle_id)
  },
    computed: {
    navbarSliderClass() {
      if (this.activeIndex == 0) {
        return 'weui-navbar__slider_0'
      }
      if (this.activeIndex == 1) {
        return 'weui-navbar__slider_1'
      }
      if (this.activeIndex == 2) {
        return 'weui-navbar__slider_2'
      }
    }
  },
  methods: {
        tabClick(e) {
      console.log(e);
      this.activeIndex = e.currentTarget.id;
    },
    typeclick(circle_id){
      this.$http.post('circle/RankingList',{circle_id:circle_id}).then(res=>{
        this.list = res.data.data
        this.circleMainIntroduction = res.data.data.circleMainIntroduction
        this.circleIntroduction = res.data.data.circleIntroduction
        this.CircleListEeek = res.data.data.CircleListEeek
        this.CircleTotalList = res.data.data.CircleTotalList
        this.circleListToday = res.data.data.circleListToday
        console.log(this.list)
      })
    }
  },
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
.weui-navbar__slider_0 {
  left: 29rpx;
  transform: translateX(0);
}
.weui-navbar__slider_1 {
  left: 29rpx;
  transform: translateX(250rpx);
}
.weui-navbar__slider_2 {
  left: 29rpx;
  transform: translateX(500rpx);
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
  font-size: 14px;
}
.ranking_list_1{
  width: 50rpx;
}
.ranking_list_2{
  width: 600rpx;
  text-align: left
}
.ranking_list_3{
  width: 100rpx;
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
