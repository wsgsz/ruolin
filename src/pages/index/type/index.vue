<template>
  <div class="index_el">
    <div v-if="type==''">
      <div class="getusertype">
        <div>
          <span>终于等到您！</span>
          <span>欢迎来到若邻汇，</span>
          <span>请您先选择一个身份吧！</span>
        </div>
      </div>
      <div class="getusertypeel getusertype1" @click="type='2'">
        <image src="/static/image/chuangyezhe.png" />
        <div class="getusertypeel_top">创业者</div>
        <div class="getusertypeel_center">每一个有梦想的人都是创业者</div>
      </div>
      <div class="getusertypeel getusertype2" @click="type='3'">
        <image src="/static/image/pinpaifang.png" />
        <div class="getusertypeel_top">品牌方</div>
        <div class="getusertypeel_center">每一个优秀的品牌都需要更大的舞台</div>
      </div>
    </div>
    <!--  -->
    <div v-if="type!=''">
      <div v-if="type=='2'" class="type_type">
        <div>
          <div class="type_index">
            您选择了创业者
          </div>
          <div class="type_index">
            在若邻汇你有
            <font color="#d61518">以下特权</font>
          </div>
          <div class="type_index"></div>
          <span class="type_title">浏览：</span>
          <span class="type_center">按标签建立个人账户，平台会根据您的个人喜好，及时向您推荐您感兴趣的项目，还可以到圈子里发现更多有趣的内容。</span>
          <div class="type_index"></div>
          <div class="type_index"></div>
          <span class="type_title">分享：</span>
          <span class="type_center">分享您觉得有戏的项目，项目成交即可获得大量佣金！还可以获得大量能量豆奖励。</span>
          <div class="type_index"></div>
          <div class="type_index"></div> <span class="type_title">发布：</span>
          <span class="type_center">若邻汇的圈子就是你的舞台，可以自己建立圈子或在圈内发布创业心得或者提出问题让圈内用户讨论。如果有好想法也可以在圈子里发起众筹，投资者可能会帮助到你。</span>
          <div class="type_index"></div>
          <div class="type_index"></div> <span class="type_title">项目锁定：</span>
          <span class="type_center">通过支付平台一笔金额锁定项目或区域，如果项目达成交易，即可赚取佣金。</span>
          <div class="type_index"></div>
          <div class="type_index"></div><span class="type_title">升级：</span>
          <span class="type_center">通过分享、建圈、发布、邀请好友、锁定项目……来赚取能量豆，不仅可以升级自己的平台等级获取更多权限，还可以用能量豆兑换丰厚奖品。</span>
        </div>
      </div>
      <div v-if="type=='3'" class="type_type">
        <div class="type_index">
          您选择了品牌房
        </div>
        <div class="type_index">
          在若邻汇你有
          <font color="#d61518">以下特权</font>
        </div>
        <div class="type_index"></div>
        <div class="type_index"></div>
        <span class="type_title">展示：</span>
        <span class="type_center">通过精美的项目详情页和尽可能详细的数据资料向每一个人展示您的项目，扩大知名度并吸引投资、招商。</span>
        <div class="type_index"></div>
        <div class="type_index"></div><span class="type_title">对接：</span>
        <span class="type_center">进驻平台需要配置两个人工客服进行项目对接，与创业者直接对接商谈。</span>
        <span class="type_title">浏览：</span>
        <div class="type_index"></div>
        <div class="type_index"></div> <span class="type_title">浏览项目广场或者圈子，可以发现更多行业信息和普通消费者的喜好，掌握这些行情信息可以升级自己的项目，让其更具优势。</span>
        <span class="type_title">学习：</span>
        <div class="type_index"></div>
        <div class="type_index"></div><span class="type_center">若邻汇平台有很多课程和品牌打造工具，您可以成为黑卡会员或者付费购买以获得这些资源。</span>
        <div class="type_index"></div>
        <div class="type_index"></div>
        <span class="type_title">发布：</span>
        <span class="type_center">在圈子里可以发布自己的项目优势和创业经历，以优秀的内容为项目吸引更多流量。</span>
      </div>
      <div class="type_footer">
        <div class="type_footer1" @click="type=''">
          好的，我再想想
        </div>
        <div class="type_footer2" @click="clicktype()">
          确认身份
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: "",
      linkUrl:""
    };
  },
  onLoad(e){
     Object.assign(this.$data, this.$options.data())
     this.linkUrl = e.linkUrl
  },
  methods: {
    clicktype() {
      const _this = this
      this.$http
        .post("users/identityChoice", { user_type: this.type })
        .then(res => {
          if (res.data.status == "1") {
            wx.switchTab({
              url: "/pages/index/"+_this.linkUrl+"/main"
            });
          }
        });
    }
  }
};

</script>
<style scoped>
.index_el {
  background: #f6f6f6;
  height: 100%;
}

.getusertype {
  padding: 40rpx 30rpx;
  text-align: left;
  font-size: 36rpx;
  font-weight: 500;
  background: #fff;
  border-top: 1px solid #eee
}

.getusertype span {
  display: block;
  line-height: 1;
  margin: 25rpx 0;
}

.getusertypeel {
  margin: 30rpx;
  box-shadow: 0rpx 0rpx 4rpx 4rpx #f6f6f6;
  background: #fff
}

.getusertype1 {
  padding: 24rpx;
}

.getusertype1 image {
  width: 160rpx;
  height: 160rpx;
  display: block;
  margin: auto;
}

.getusertype2 {
  padding: 50rpx;
}

.getusertype2 image {
  display: block;
  width: 177rpx;
  height: 109rpx;
  margin: auto;
}

.getusertypeel_top {
  margin: 40rpx 0;
  text-align: center;
  width: 100%;
  font-size: 32rpx;
  font-weight: 500;
}

.getusertypeel_center {
  font-size: 28rpx;
  color: #92969c;
  text-align: center;
}

.type_footer {
  height: 88rpx;
  line-height: 88rpx;
  width: 100%;
  font-size: 28rpx;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0px;
  left: 0px;
  text-align: center;
  border-top: 1px solid #e5e5e5
}

.type_footer1 {
  width: 50%;
  color: #92969c;
  text-align: center;
  background: #fff
}

.type_footer2 {
  width: 50%;
  background: #d61518;
  color: #fff;
}

.type_index {
  font-size: 18px;
  margin-bottom: 10px;
}

.type_title {
  font-size: 15px;
  display: block;
}

.type_center {
  font-size: 14px;
  display: block;
}

.type_type {
  padding: 30px 15px;
  padding-bottom: 120rpx;
  background: #fff;
}

</style>
