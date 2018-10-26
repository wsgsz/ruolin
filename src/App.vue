<script>
export default {
  // created() {
  //   const _this = this;
  //   console.log("this");
  //   // 调用API从本地缓存中获取数据
  //   const logs = wx.getStorageSync("logs") || [];
  //   logs.unshift(Date.now());
  //   wx.setStorageSync("logs", logs);
  //   console.log("app created and cache logs by setStorageSync");
  // },
  onLoad() {
    console.log("resd")
  },
  methods: {
    // 获取信息
    getSetting() {
      const _this = this;
      wx.getSetting({
        success: function(res) {
          if (res.authSetting["scope.userInfo"]) {
            wx.getUserInfo({
              success: function(res) {
                //用户已经授权过
                // console.log("用户已经授权过");
                _this.getName();
              }
            });
          } else {
            // console.log("用户还未授权过");
          }
        }
      });
    },
    getUserInfo1() {
      // console.log("click事件首先触发");
      // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
      // console.log(wx.canIUse('button.open-type.getUserInfo'))
      if (wx.canIUse("button.open-type.getUserInfo")) {
        // 用户版本可用
      } else {
        console.log("请升级微信版本");
      }
    },
    bindGetUserInfo(e) {
      const _this = this;
      if (e.mp.detail.rawData) {
        //用户按了允许授权按钮
        // console.log("用户按了允许授权按钮");
        _this.getName();
      } else {
        //用户按了拒绝按钮
        // console.log("用户按了拒绝按钮");
      }
    },
    getName() {
      const _this = this;
      wx.getUserInfo({
        success: function(res) {
          console.log(res.userInfo);
          wx.setStorageSync("user_nickname", res.userInfo.nickName);
          wx.setStorageSync("user_avatar", res.userInfo.avatarUrl);
        }
      });
    }
  }
};
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
