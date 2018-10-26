<template>
  <div style="height:100%">
    <div class="transmit_index">
      <image :src="image" class="transmit_img" @click="preimage" />
      <button @click="saveImage" class="saveimage">保存</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      objId: "",
      image: ""
    };
  },
  onLoad(e) {
    Object.assign(this.$data, this.$options.data())

    wx.showLoading({
      title: "加载中",
      mask: true
    })
    this.getData(e.objId)
  },
  methods: {
    getData(objId) {
      this.$http.post('index/wc2dcode', { obj_id: objId, url: 'pages/project/details/main',sss:'sss'}).then(res => {
        if (res.data.status == "1") {
          this.image = res.data.data
          wx.hideLoading()
        } else {
          wx.hideLoading()
          wx.showLoading({
            title: "获取失败，请重新获取",
            mask: true
          })
          wx.navigateBack({
            delta: 1
          })
        }
      })
    },
    preimage() {
      wx.previewImage({
        urls: [this.image],
      })
    },
    saveImage() {
      wx.showLoading({
        title: "下载中",
        mask: true
      })
      wx.downloadFile({
        url: this.image,
        headers: { 'Content-Type': 'application/x-png' },
        success: function(e) {
          console.log(e)
          if (e.statusCode == 200) {
            wx.saveImageToPhotosAlbum({
              filePath: e.tempFilePath,
              success: function(e) {
                console.log(e)
                wx.hideLoading()
                wx.showToast({
                  title: "成功",
                  icon: "success"
                })
              },fail:function(){
                  wx.hideLoading()
                wx.showToast({
                  title: "下载失败",
                  icon: "loading"
                }) 
              }
            })

          }
        }
      })
      // wx.saveImageToPhotosAlbum({
      //   filePath:this.image,
      //   success:function(){
      //      console.log("'''111'''")
      //     wx.showToast({
      //       title:"成功",
      //       icon:"success"
      //     })
      //   }
      // })
    }
  }
};

</script>
<style scoped>
.transmit_index {
  background: rgba(178, 178, 178, .3);
  height: 100%
}

.transmit_img {
  width: 680rpx;
  height: 818rpx;
  display: block;
  margin: auto;
  padding: 100rpx 0;
}

.saveimage {
  width: 150rpx;
  height: 58rpx;
  line-height: 58rpx;
  font-size: 12px;
  background: #d61518;
  color: #fff;
  border-radius: 5px;
}

</style>
