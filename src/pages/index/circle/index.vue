<template>
  <div class="cfff">
    <!-- 10个列表 -->
    <div class="weui-cell">
      <div class="weui-cell__hd">
        <div class="detail_one"></div>
      </div>
      <div class="weui-cell__bd cricle_index_guanzhu">
        <div class="fw500">推荐的圈子</div>
      </div>
    </div>
    <div class="weui-flex circle_index_10 btn2em" style="flex-wrap:wrap">
      <!-- @click="linkDetail(list.id)" -->
      <navigator :url="'/pages/circle/detail/main?circle_id='+list.id" class="circle_index_10_list" v-for="(list,index) in recommendCircle" :key="index">
        <image :src="list.circle_icon" style="border-radius:50%;" />
        <div class="circle_index_10_list_span">{{list.circle_name}}</div>
      </navigator>
      <navigator url="/pages/circle/allCircle/main" class="circle_index_10_more">
        查看更多
      </navigator>
    </div>
    <!-- 关注的圈子 -->
    <div class="weui-panel btn2em">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <div class="detail_one"></div>
        </div>
        <div class="weui-cell__bd cricle_index_guanzhu">
          <div class="fw500">我关注的圈子</div>
          <div class="cricle_index_guanzhu_right" @click="getAllFollow()">
            <div class="cricle_index_guanzhu_right">
              更多
              <image src="/static/image/right.png" style="display:inline-block" />
            </div>
          </div>
        </div>
      </div>
      <scroll-view :scroll-x="true" class="circle_indx_i" v-show="iFocusOnCircle.length!='0'">
        <navigator :url="'/pages/circle/detail/main?circle_id='+iFocus.id" class="circle_indx_i_el" v-for="(iFocus,indexiF) in iFocusOnCircle" :key="indexiF">
          <image class="circle_indx_i_image" :src="iFocus.circle_image" />
          <div class="circle_indx_i_m">
            <div class="circle_indx_i_m_top">
              {{iFocus.circle_name}}
            </div>
            <div class="circle_indx_i_m_bottom">
              <div class="circle_indx_i_m_b_q">去打卡</div>
              <div class="circle_indx_i_m_b_r" v-if="iFocus.judgeCircle=='1'">
                <image class="image" src="/static/image/seeUser.png"  />
              </div>
            </div>
          </div>
        </navigator>
      </scroll-view>
      <div class="" v-show="iFocusOnCircle.length=='0'" style="color:#333;text-align:center;height:130rpx;line-height:130rpx;font-size:13px;color:#92969c">
        你暂时无关注的圈子，快来关注些吧！
      </div>
      <navigator url="/pages/circle/created/main" class="circle_idnex_add">
        <image class="circle_idnex_add_image" src="/static/image/jia.png" />创建圈子
      </navigator>
    </div>
    <!-- 话题列表 -->
    <div class="weui-cells weui-cells_after-title" v-for="(topic,topicindex) in topicCircle" :key="topicindex" style="padding-top:20rpx" @click="linkDetailTopic(topic.id,topic.circle_id)">
      <div class="weui-cell">
        <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
          <image :src="topic.user_avatar" style="width: 68rpx;height:68rpx; display: block;border-radius:50%" />
        </div>
        <div class="weui-cell__bd circle_flex">
          <div style="font-size:13px;">{{topic.user_nickname}}
          </div>
          <div class="circle_flex_right">{{topic.circle_name}}</div>
        </div>
      </div>
      <div class="weui-article" style="border-bottom:1px solid #e5e5e5">
        <div class="weui-article__p">
          {{topic.topic_title}}
        </div>
        <image class="weui-article__img" :src="topic.topic_files[0]" style="width:100%;height:380rpx;" />
      </div>
    </div>
    <div class="weui-loadmore" v-show="more">
      <div class="weui-loading"></div>
      <div class="weui-loadmore__tips">正在加载</div>
    </div>
    <div class="weui-loadmore weui-loadmore_line" v-show="end">
      <div class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无数据</div>
    </div>
  </div>
</template>
<script>
import bFooter from "@/components/footer";
export default {
  data() {
    return {
      recommendCircle: "",
      iFocusOnCircle: "",
      topicCircle: "",
      last_id: "",
      current_page: 1,
      end: true,
      more: false
    };
  },
  onReady() {
    Object.assign(this.$data, this.$options.data())
    this.last_id = "",
      this.current_page = 1,
      this.end = true,
      this.more = false
    this.getList("", this.current_page);
  },
  onShareAppMessage: function() {
    const _this = this;
    return {
      title: '若邻汇',
      path: "pages/index/project/main"
    };
  },
  components: {
    bFooter
  },
  methods: {
    getAllFollow(obj) {
      wx.navigateTo({
        url: '/pages/circle/allFollow/main?circle_id=' + obj
      })
    },
    linkDetailTopic(id, circleId) {
      wx.navigateTo({
        url: '/pages/circle/detailTopic/main?topicId=' + id + '&circleId=' + circleId
      })
    },
    getList(last_id, current_page) {
      const _this = this
      this.$http.post("circle/circleindex", { last_id: last_id, page: current_page })
        .then(res => {
          this.iFocusOnCircle = res.data.data.iFocusOnCircle.data
          console.log(this.iFocusOnCircle)
          this.last_id = res.data.data.recommendCircle.lastId
          if (_this.current_page == "1") {
            this.recommendCircle = res.data.data.recommendCircle.data;
            this.topicCircle = res.data.data.topicCircle.data;
          } else {
            if (res.data.data.topicCircle.data.length < 10) {
              // 没有值了
              this.end = true
              this.more = false
            } else {

            }
            this.topicCircle = this.topicCircle.concat(res.data.data.topicCircle.data)
          }
        });
    },
    linkDetail(ec) {
      wx.navigateTo({
        url: '/pages/circle/detail/main?circle_id=' + ec
      })
      console.log(ec)
    },

  },
  // 上拉
  async onPullDownRefresh() {
    wx.stopPullDownRefresh();
    const _this = this;
    _this.last_id = ""
    _this.current_page = 1
    _this.getList(_this.last_id, _this.current_page)
  },
  // 下拉
  onReachBottom() {
    const _this = this;
    if (_this.end == false) {
      this.current_page += 1;
      this.getList(_this.last_id, _this.current_page);
    }
  }
};

</script>
<style scoped lang="less">
.circle_indx_i{
    width: 100%;
  height: 156rpx;
  white-space: nowrap;
  padding-right: 15px;
  margin: 10px 25px 25PX 0;
  display: inline-block;

  .circle_indx_i_el{
    width: 260rpx;
    position: relative;
    height: 156rpx;
      display: inline-block;
      margin-right: 20rpx;
      border-radius: 5rpx;
      overflow: hidden;
    .circle_indx_i_image{
      position: absolute;
      bottom: 0px;
      right: 0px;
      width: 100%;
      height: 156rpx;

    }
    .circle_indx_i_m{
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 156rpx;
      padding:20rpx 0 20rpx 30rpx;
      font-size: 12px;
      color: #fff;
      display: flex;
      align-items: flex-start;
      box-sizing: border-box;
      flex-wrap: wrap;
      background: rgba(0, 0, 0, 0.5);
      .circle_indx_i_m_top{
        width: 100%;
        font-size: 13px;
        line-height: 13px;
      }
      .circle_indx_i_m_bottom{
        width:100%;
height:90rpx;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        .circle_indx_i_m_b_q{
  
          height: 40rpx;
          line-height: 40rpx;
          text-align: center;
          background: #d61518;
          color: #fff;
          font-size: 12px;
          padding:0px 5rpx;
          border-radius:5rpx;
          display: flex;
          align-items: flex-end;
        }
        .circle_indx_i_m_b_r{
          width:60rpx;
          height: 40rpx;
          display: flex;
          justify-content:center;
          align-items: center;
          background: rgba(0,0,0,0.8);
          border-top-left-radius: 30rpx;
          border-bottom-left-radius: 30rpx;
          z-index: 11;
        }
        .circle_indx_i_m_b_r .image{
          width: 30rpx;
          height: 30rpx;
        }
      }
    }
  }
}


.circle_flex {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
}

.circle_flex_right {
  padding: 3rpx 5rpx;
  border: 1rpx solid #92969c;
  font-size: 12px;
  color: #92969c;
  display: block;
  height: 14px;
  line-height: 14px;
}

</style>
