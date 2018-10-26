<template>
  <div class="page">
    <div class="page__bd" style="background:#fff;height:100vh">
      <div class="weui-cells weui-cells_after-title">

         <navigator url="/pages/userinfo/personal/main" class="index_top" v-show="data.user_mobile==''" style="height: auto;border-bottom:30rpx solid #e5e5e5">
          <image src="/static/image/userindex_back.png" class="back_index" /> 
          <div class="weui-cell" style="border-bottom:0px;padding-top:50rpx;padding-bottom: 50rpx;z-index: 22">
            <div class="weui-cell__hd" style="position: relative;margin-right: 20px;margin-left: 10px;">
              <image :src="data.user_avatar" style="width: 120rpx; height: 120rpx; display: block;border-radius:50%" />
            </div>
            <div class="weui-cell__bd">
              <div style="font-size: 14px;color: #fff;">{{data.user_nickname}} 
            
              </div>
              <div style="font-size: 13px;color: #fff;">ID：{{10000+data.id*1}}</div>
              <div style="font-size: 12px;color: #fff;">请完善个人资料</div>
            </div>
          </div>
        </navigator>
        <div class="index_top" v-show="data.user_mobile!=''">
           <image src="/static/image/userindex_back.png" class="back_index" /> 
          <navigator url="/pages/userinfo/infor/main" class="weui-cell" style="border-bottom:0px;padding-top:50rpx;padding-bottom: 50rpx;z-index: 22">
            <div class="weui-cell__hd" style="position: relative;margin-right: 20px;margin-left: 10px;">
              <image :src="data.user_avatar" style="width: 120rpx; height: 120rpx; display: block;border-radius:50%" />
            </div>
            <div class="weui-cell__bd">
              <div style="font-size: 14px;color: #fff;">{{data.user_nickname}} 
                <div v-show="data.user_level=='0'" class="ben_new_el" >
             <!--    <image src="/static/image/ben_new0.png" class="ben_new" />
              新人 -->
                <image src="/static/image/ben_new1.png" class="ben_new" />
             新人
              </div> 
              <div v-show="data.user_level=='1'" >
                <image src="/static/image/ben_new1.png" class="ben_new" />
              黄金
              </div> 
              <div v-show="data.user_level=='2'" >
                <image src="/static/image/ben_new2.png" class="ben_new" />
              白金
              </div> 
              <div v-show="data.user_level=='3'" >
                <image src="/static/image/ben_new3.png" class="ben_new" />
             黑卡
              </div> 
                <div v-show="data.user_level=='4'" >
                <image src="/static/image/ben_new4.png" class="ben_new" />
              黑金卡
              </div> 
              </div>
              <div style="font-size: 13px;color: #fff;">ID：{{10000+data.id*1}}</div>
              <div style="font-size: 12px;color: #fff;">个人资料完善度100%</div>
            </div>
            <div class="">
               <image src="/static/image/whiteright.png" style="width:30rpx;height:30rpx;display: inline-block;vertical-align: middle;" />
            </div>
          </navigator>
          <div class="index_top_bottom" v-show="data.user_mobile!=''">
          <div class="index_top_bottom_1">
            <image class="index_top_bottom_1_image" src="/static/image/user_shenfen.png" @click="checktype()" />
            <!-- <div style="font-size: 14px;">品牌方</div> -->
              <navigator url="/pages/index/type/main?linkUrl=userinfo" style="font-size: 14px;" v-show="data.user_type==0">未选择</navigator>
                <div style="font-size: 14px;" v-show="data.user_type==1" @click="checktype()">投资人</div>
                <div style="font-size: 14px;" v-show="data.user_type==2" @click="checktype()">创业者</div>
                <div style="font-size: 14px;" v-show="data.user_type==3" @click="checktype()">品牌方</div>

            <div style="font-size: 12px;color: #d31518"  v-show="data.user_type==3">
              <navigator url="/pages/userinfo/questionnaire/main" v-show="data.user_check=='1'">&nbsp;未审核<image src="/static/image/Right.png" style="width:20rpx;height:20rpx;display: inline-block;vertical-align: middle;" /></navigator>
               <div v-show="data.user_check=='2'">&nbsp;待审核<image src="/static/image/Right.png" style="width:20rpx;height:20rpx;display: inline-block;vertical-align: middle;" /></div>
                  <div v-show="data.user_check=='3'">&nbsp;已审核<image src="/static/image/Right.png" style="width:20rpx;height:20rpx;display: inline-block;vertical-align: middle;" /></div>
            </div>
          </div>
          <div style="height: 50rpx;width : 2rpx;background: #e5e5e5;margin:auto"></div>
          <navigator url="/pages/userinfo/energyBean/main" class="index_top_bottom_2">
            <image class="index_top_bottom_2_image" src="/static/image/user_nengliang.png" />
             <div style="font-size: 14px;">能量豆</div>
            <div style="font-size: 12px;">{{data.energy_bean}}</div>
          </navigator>
          </div>
        </div>
      
        <navigator url="/pages/userinfo/forwarding/main" class="weui-cell ptb30">
          <div class="weui-cell__hd">
            <image src="/static/image/detail_zhuanfa.png" style="width: 38rpx;height: 38rpx;margin-right: 30rpx" />
          </div>
          <div class="weui-cell__bd">
            <div class="user_index_list">我的分享</div>
          </div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </navigator>
        <navigator url="/pages/userinfo/project/main" class="weui-cell ptb30">
          <div class="weui-cell__hd">
            <image src="/static/image/user_project.png" style="width: 38rpx;height: 38rpx;margin-right: 30rpx" />
          </div>
          <div class="weui-cell__bd">
            <div class="user_index_list">我的项目</div>
          </div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </navigator>
        <navigator url="/pages/userinfo/Collection/main" class="weui-cell" hover-class="weui-grid_active">
          <div class="weui-cell__hd">
            <image src="/static/image/user_Collection.png" style="width: 38rpx;height: 38rpx;margin-right: 30rpx" />
          </div>
          <div class="weui-cell__bd">
            <div class="user_index_list">我的收藏</div>
          </div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </navigator>
        <navigator url="/pages/userinfo/userCreated/main" class="weui-cell ptb30">
          <div class="weui-cell__hd">
            <image src="/static/image/user_userCreated.png" style="width: 38rpx;height: 38rpx;margin-right: 30rpx" />
          </div>
          <div class="weui-cell__bd">
            <div class="user_index_list">我的圈子</div>
          </div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </navigator>
        <navigator url="/pages/userinfo/pcLogin/main" class="weui-cell ptb30">
          <div class="weui-cell__hd">
            <image src="/static/image/user_pcLogin.png" style="width: 38rpx;height: 38rpx;margin-right: 30rpx" />
          </div>
          <div class="weui-cell__bd">
            <div class="user_index_list">PC登陆</div>
          </div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </navigator>
        <navigator url="/pages/userinfo/about/main" class="weui-cell ptb30" hover-class="weui-grid_active">
          <div class="weui-cell__hd">
            <image src="/static/image/user_about.png" style="width: 38rpx;height: 38rpx;margin-right: 30rpx" />
          </div>
          <div class="weui-cell__bd">
            <div class="user_index_list">关于我们</div>
          </div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </navigator>
        <navigator url="/pages/userinfo/help/main" class="weui-cell ptb30" hover-class="weui-grid_active">
          <div class="weui-cell__hd">
            <image src="/static/image/user_help.png" style="width: 38rpx;height: 38rpx;margin-right: 30rpx" />
          </div>
          <div class="weui-cell__bd">
            <div class="user_index_list">帮助</div>
          </div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </navigator>
      </div>
    </div>
  </div>
</template>
<script>
import bFooter from "@/components/footer";
export default {
  data() {
    return {
      token: "",
      data: "",

    };
  },
  components: {
    bFooter
  },
  onLoad(e) {
    Object.assign(this.$data, this.$options.data())
    // this.getData()
  },
  onShow() {
    Object.assign(this.$data, this.$options.data())
    this.getData()
  },
  methods: {
    getData(token) {
      this.$http.post("users/getUserinfo", {}).then(res => {
        // console.log(res.data.data);
        this.data = res.data.data;
      });
    },
    checktype() {
      const _this = this
      wx.showActionSheet({
        itemList: ['创业者', '品牌方'],
        success: function(res) {
          const type = res.tapIndex + 2
          if (!res.cancel) {
            _this.$http.post('users/identityChoice', { user_type: type }).then(res => {
              if (res.data.status == '0') {
                wx.showToast({
                  title: "不可选择当前已选身份",
                  icon: "none"
                })
              } else {
                _this.data.user_type = type
              }
            })
          }
        }
      });

    },
    linkuserInfor(e) {
      wx.navigateTo({
        url: "/pages/circle/userinfo/main?id=" + e
      })
    }
  },
};

</script>
<style scope>
.user_logo {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
}

.weui-cell {
  border-bottom: 1px solid #eee
}

.weui-cell image {
  vertical-align: middle;
}

.index_top {
  /*background: url(../image/userindex_back.png);*/
  /*background-size: 100%;*/
  width: 100%;
  height: 350rpx;
  position: relative;
  border-bottom:100rpx solid #eee;
}
.back_index{
  width: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  height: 100%;
  z-index: 11
}
.index_top_bottom{
  width: 680rpx;
  height: 200rpx;
background: #fff;
margin:auto;
display: flex;
justify-content: space-between;
position: relative;
z-index: 22
}
.index_top_bottom_1,.index_top_bottom_2{
  width: 50%;
  padding:30rpx 100rpx;
}
.index_top_bottom div{
  text-align: center;
}
.index_top_bottom_1_image{
  width: 50rpx;
  height: 50rpx;
  display: block;
  margin:auto;
  margin-bottom: 25rpx;
}
.index_top_bottom_2_image{
  width: 30rpx;
    height: 50rpx;
  display: block;
  margin:auto;
  margin-bottom: 30rpx;
}
.ben_new{
  width:40rpx;
  height:40rpx;
  vertical-align: top !important;
  color: #333;
  margin-left: -5px;
  align-items: center;
}
.ben_new_el{
  height: 40rpx;
  line-height: 40rpx;
  font-size: 13px;
  display: inline-block;padding:0px 5px;
  border-top-right-radius: 40rpx;
  border-top-left-radius: 40rpx;
  border-bottom-right-radius: 40rpx;
  border-bottom-left-radius: 40rpx;
  background:#a9687a 
}
</style>
