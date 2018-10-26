<template>
  <div class="Socket"></div>
</template>
<script>
export default {
  onReady() {
    this.SocketOpen()
    this.sendSocket()
  },
  methods: {
    SocketOpen() {
      wx.connectSocket({
        url: 'wss://m.ruolingroup.com/wss',
      })
      wx.onSocketOpen(function() {
        wx.sendSocketMessage({
          data: JSON.stringify({ token: wx.getStorageSync("token") }),
          success: function(res) {
            console.log("第一次链接成功")
          },
          fail: function(error) {
            // console.log("第一次链接fail")
          }
        })
      })
    },
    sendSocket() {
    	const _this = this
      wx.onSocketMessage(function(res) {
        console.log(res.data)
        _this.$emit('getSorket', res.data)
      })
    },

  }

}

</script>
</style>
