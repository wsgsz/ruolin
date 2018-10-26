<template>
  <div>
    <div class="page" xmlns:wx="http://www.w3.org/1999/xhtml">
      <div class="page__bd">
        <div class="weui-cells weui-cells_after-title">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <textarea class="weui-textarea" placeholder="请输入文本" v-model="user_signature" style="height: 3.3em" />
              <!-- <div class="weui-textarea-counter">0/200</div> -->
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
     user_signature:""
    };
  },
  onLoad(e) {
     Object.assign(this.$data, this.$options.data())
   this.user_signature = e.user_signature
  },
  methods: {
    showTopTips(){
      if(this.user_signature==""){
        wx.showToast({
          title:"不能为空",
          icon: "none"
        })
      }else{
      this.$http.post('users/editUserinfo',{user_signature:this.user_signature}).then(res=>{
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
        }else{
         wx.showToast({
          title:"未修改",
          icon: "none"
        }) 
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
