<template>
  <div class="getLogin">
  <div class="g_back" style="z-index: 111">
       <image class="g_image" src="/static/image/index_logo.png" />
    <div class="getLogin_wel">欢迎使用若邻汇</div>
    <div class="getLogin_con">
      申请获得您的公开信息（昵称、头像等），
    </div>
    <div class="getLogin_con">
      按照您的个人要求，为您提供更高效精准的撮合。
    </div>
    <button class="weui-btn bagred" type="primary" open-type="getUserInfo" @getuserinfo="bindGetUserInfo
" style="border-radius:5px">微信登录</button>
  </div>
  <image class="g_back" src="/static/image/back_index.png" />
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex';
export default {
  data() {
    return {};
  },
  // onLoad() {
  //   this.getwxLogin()
  // },
  methods: {
    ...mapMutations({
      settoken: 'SET_GETTOKEN',
      setmobile: 'SET_USERMOBILE'
    }),
    getwxLogin(detail) {
      const _this = this;
      wx.login({
        success: function(res) {
          if (res.code) {
            _this.$http
              .post(
                "https://m.ruolingroup.com/api/v1/users/microLetterAppletLanded", {
                  code: res.code
                }
              )
              .then(res => {
                // _this.settoken(res.data.data.token)
                // _this.setmobile(res.data.data.user_mobile)
                // console.log(res.data.data)
                // console.log("gettoken")
                console.log(res.data.data)
                wx.setStorage({
                  key: "token",
                  data: res.data.data.token
                });
                wx.setStorage({
                  key: "userMobile",
                  data: res.data.data.user_mobile
                });
                const send_emit = res.data.data

                _this.$http.post('users/GetAppletUserInformation', { detail: detail, token: res.data.data.token }).then(res => {
                  if (res.data.status == '1') {
                    _this.$emit('getName', send_emit)
                    return false
                  }
                })
                // _this.setuserinfor(res.data.data)
                // console.log(_this.gettoken)
                // console.log(res.data.data)
                // console.log("gettoken")
                // console.log(_this.user_mobile)
                // wx.setStorage({
                //   key: "token",
                //   data: res.data.data.token
                // });
                // wx.setStorage({
                //   key: "userMobile",
                //   data: res.data.data.user_mobile
                // });
              }).catch(error => {
                wx.showModal({
                  content: "登录失败",
                  showCancel: false
                });
              });
          } else {
            wx.showModal({
              content: "登录失败" + res.errMsg,
              showCancel: false
            });
          }
        }
      });
    },


    getSetting() {
      const _this = this;
      wx.getSetting({
        success: function(res) {
          if (res.authSetting["scope.userInfo"]) {
            wx.getUserInfo({
              success: function(res) {
                _this.getName();
              }
            });
          } else {}
        }
      });
    },
    // getUserInfo1() {
    //   // console.log("click事件首先触发");
    //   // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
    //   // console.log(wx.canIUse('button.open-type.getUserInfo'))
    //   if (wx.canIUse("button.open-type.getUserInfo")) {
    //     // 用户版本可用
    //   } else {
    //     console.log("请升级微信版本");
    //   }
    // },
    bindGetUserInfo(e) {
      const _this = this;
      if (e.mp.detail.rawData) {
        _this.getName();
      } else {}
    },
    getName() {
      const _this = this;
      wx.getUserInfo({
        success: function(res) {
          _this.getwxLogin(res)
        },
        fail: function(err) {

        }
      });
    }
  },
  computed: {
    ...mapGetters([
      'gettoken', 'user_mobile'
    ])
  }
};

</script>
<style scoped>
.getLogin {
  padding: 60rpx 30rpx;
  background: #fff;
  height: 100%;
  position: relative;
/*  background: url('../../static/image/back_index.png');
  background-size: 100% 100%;*/
}
.g_back{
  position: absolute;
  width: 100%;
  height:100%;
  left: 0px;
  top: 0px;
  z-index: 99
}
.getLogin .g_image {
  width: 125rpx;
  height: 122rpx;
  display: block;
  margin: 70rpx auto;
  margin-top: 210rpx;
}

.getLogin_wel {
  font-size: 56rpx;
  text-align: center;
  margin-bottom: 210rpx;
  color: #fff
}

.getLogin_con {
  font-size: 28rpx;
  color: #92969c;
  text-align: center;
  line-height: 45rpx;
}

.bagred {
  margin-top: 50rpx;
  width: 611rpx;
  height: 88rpx;
  font-size: 14x;
  line-height: 88rpx
  border-radius5rpx;
}

</style>
