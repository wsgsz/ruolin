<template>
  <div>
    <div class="weui-cells weui-cells_after-title">
      <div class="" style="padding-bottom:50rpx;">
        <div class="prl30">
          <div class="circle_describe" style="border: 0PX;">
            <textarea class="" placeholder="请输入文本" @input="descInput" cursor-spacing="30" auto-height="true"  v-model="Comments.content" style="height:3.3rem;width:100%;padding:0 20rpx;box-sizing: border-box;" />
            <div class="weui-textarea-counter">{{Comments.content.length}}/140 &nbsp;&nbsp;</div>
          </div>
        </div>
        </div>
        <button class="weui-btn" type="primary" @click="sendissue()" style="margin-top: 100rpx;background: #d61518;border-radius:5rpx;padding:0px 30rpx;box-sizing: border-box;width: 680rpx;">发送</button>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Comments: {
        circle_id: "",
        circle_topic_comments_id:"",
        circle_topic_id:"",
        content:"",
        circle_clockin_id:"",
        superior_id:""
      },
    };
  },

  onLoad(e) {
    Object.assign(this.$data, this.$options.data())
    this.Comments.circle_id = e.circle_id;
    this.Comments.circle_topic_id = e.topic_id;
    this.Comments.circle_topic_comments_id = e.comment_id;
    this.Comments.circle_clockin_id = e.clock_id
    this.Comments.superior_id = e.superior_id
  },
  methods: {
    sendissue() {
      if(this.Comments.content==''){
          wx.showToast({
          title:"标题不可以为空",
          icon:'none'
        })
        }else{
      this.$http.post("circle/commentsClockIn", this.Comments).then(res => {
        if (res.data.status == "1") {
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
      });
    }
    },
    descInput() {
      if (this.Comments.content.length >= 120) {
        this.Comments.content = this.Comments.content.slice(0, 120);
      }
    },
  },
  created() {}
};
</script>

<style scoped>
.weui-cells_after-title{
  margin:100rpx 0;
}
</style>
