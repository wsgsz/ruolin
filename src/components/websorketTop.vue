<template>
    <div style="height:300rpx;">
           <div class="weui-grids" v-show="hidethere">
                <div class="weui-grid" hover-class="weui-grid_active" @click="getAudio()">
                    <image class="weui-grid__icon" src="/static/image/wvoice.png" />
                    <div class="weui-grid__label">语音</div>
                </div>
                 <div class="weui-grid" hover-class="weui-grid_active" @click="getCity()">
                    <image class="weui-grid__icon" src="/static/image/wcity.png" />
                    <div class="weui-grid__label">定位</div>
                </div>
                  <div class="weui-grid" hover-class="weui-grid_active" @click="getcommon()">
                    <image class="weui-grid__icon" src="/static/image/wCommon.png" />
                    <div class="weui-grid__label">常用语</div>
                </div>
        </div>
        <!-- 录音 -->
        <div v-if="audio" class="audios" >
          
              <div class="weui-grid" hover-class="weui-grid_active"  @click="removeauidio()">
                    <image class="weui-grid__icon" src="/static/image/remove.png" />
                    <div class="weui-grid__label">删除</div>
                </div>
    <div class="weui-grid" hover-class="weui-grid_active" >
                    <image class="weui-grid__icon" src="/static/image/getvoice.png" />
                    <div class="weui-grid__label">录音中</div>
                </div>
                    <div class="weui-grid" hover-class="weui-grid_active"  @click="succaudio()">
                    <image class="weui-grid__icon" src="/static/image/wancheng.png" />
                    <div class="weui-grid__label">完成</div>
                </div>

        </div>
  <div v-if="common" class="common_div">
            <scroll-view scroll-y style="height: 300rpx"  >
    <div @click="clickcommon('您好')"> 您好</div>
          <div @click="clickcommon('认识你很高兴')"> 认识你很高兴</div>
           <div @click="clickcommon('在吗')"> 在吗</div>
            <div @click="clickcommon('早上好')"> 早上好</div>
             <div @click="clickcommon('晚上好')"> 晚上好</div>
              <div @click="clickcommon('谢谢')"> 谢谢</div>
               <div @click="clickcommon('再见')"> 再见</div>
                <div @click="clickcommon('好的')"> 好的</div>
  </scroll-view>
  </div>

   
    </div>
</template>
<script>
export default {
  data() {
    return {
      hidethere: true,
      audio: false,
      common: false,
      remove: false
    };
  },
  onLoad() {
    const _this = this;
    wx.getRecorderManager().onStop(function(res) {
      if (_this.remove == false) {
        console.log(res);
        wx.uploadFile({
          url: "https://m.ruolingroup.com/api/upload",
          header: {
            "Content-Type": "multipart/form-data"
          },
          filePath: res.tempFilePath,
          name: "image",
          success: function(res) {
            //  成功

            console.log(
              JSON.stringify({
                content: JSON.parse(res.data).data.uploadUrl,
                contentType: "2"
              })
            );
            _this.$emit(
              "getContent",
              JSON.stringify({
                content: JSON.stringify({
                  content: JSON.parse(res.data).data.uploadUrl,
                  is_audio: "0"
                }),
                contentType: "2"
              })
              //   JSON.stringify({
              //     content: JSON.parse(res.data).data.uploadUrl,
              //     contentType: "2"
              //   })
            );
          }
        });
      }
    });
  },
  methods: {
    // 常用语
    clickcommon(common) {
      this.$emit(
        "getContent",
        JSON.stringify({
          content: common,
          contentType: "1"
        })
      );
    },
    getcommon() {
      this.hidethere = false;
      this.common = true;
    },
    // 开始录音
    getAudio() {
      this.remove = false;
      this.hidethere = false;
      this.audio = true;
      wx.getRecorderManager().start({
        format: "mp3",
        duration: "30000"
      });
    },
    // 完成
    succaudio() {
      wx.getRecorderManager().stop();
    },
    removeauidio() {
      this.hidethere = true;
      this.remove = true;
      this.audio = false;
      this.common = false;
      wx.getRecorderManager().stop();
    },
    // 定位
    getCity() {
      const _this = this;
      wx.chooseLocation({
        success: function(res) {
          _this.$emit(
            "getContent",
            JSON.stringify({
              content: JSON.stringify({
                address: res.address,
                name: res.name,
                latitude: res.latitude,
                longitude: res.longitude
              }),
              contentType: "3"
            })
          );
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
.audios {
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
}
.common_div {

}
.common_div div {
  text-align: center;
  font-size: 13px;
  line-height: 30px;
}
</style>
