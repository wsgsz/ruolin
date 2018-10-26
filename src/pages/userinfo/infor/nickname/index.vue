<template>
  <div>
    <div class="page" xmlns:wx="http://www.w3.org/1999/xhtml">
      <div class="page__bd">

        <div class="weui-cells weui-cells_after-title" style="margin:30rpx 0">
          <div class="weui-cell weui-cell_input">
            <div class="weui-cell__bd" style="border:1px solid #eee">
              <input class="weui-input" v-model="userNickname" />
            </div>
          </div>
        </div>
        <div class="weui-btn-area">
          <button class="weui-btn bagred" type="primary" @click="showTopTips">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userNickname: ""
    };
  },

  onLoad(e) {
    console.log(e)
    wx.setNavigationBarTitle({
      title: "修改昵称"
    })
    this.userNickname = e.userNickname
  },
  methods: {
    showTopTips(){
      if(this.userNickname==""){
        wx.showToast({
          title:"不能为空"
        })
      }else{
      this.$http.post('users/editUserinfo',{user_nickname:this.userNickname}).then(res=>{
        console.log(res)
        if(res.data.status=="1"){
            wx.showToast({
            title: "已完成",
            icon: "success",
            duration: 2000
          });
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            });
          }, 2000);
        }
      })
      }

    }
  }
};

</script>
<style scoped>
.gethave {
  margin: 40vh 15px 0px 15px;
}

.weui-vcode-btn {
  width: 20vw;
  text-align: center;
}

</style>
