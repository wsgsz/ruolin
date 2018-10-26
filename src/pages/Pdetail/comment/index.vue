<template>
  <div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell"  >
        <div class="weui-cell__bd">
          <textarea class="" placeholder="请输入文本" @input="descInput" v-model="Comments.content" style="height:4.3rem;width:100%" />
          <div class="weui-textarea-counter">{{Comments.content.length}}/120</div>
          <div class="weui-uploader__files" id="uploaderFiles" style="margin-top:25rpx;"  >
            <div v-for="(item ,index) in files" :key="index">
              <div class="weui-uploader__file el_uploader">
                <image class="weui-uploader__img" :src="item" mode="aspectFill" @click="predivImage" :id="item" />
                <image class="delete-icon" src="/static/image/dele.png" @click="deleteImg($event,index)" :id="item" />
              </div>
            </div>
          </div>
          <div class="weui-uploader__input-box" v-show="files.length<'3'"  v-if="sen!='send'">
            <div class="weui-uploader__input" @click="chooseImage"></div>
          </div>
        </div>
      </div>
      <button class="weui-btn" type="primary" @click="sendissue()" style="background:#d61518">发送</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      iamgepid: [],
      sen:'',
      Comments: {
        obj_id: "",
        content: "",
        compid: '',
        pic1: "",
        pic2: "",
        pic3: "",
        pid: ""
      },
      files: []
    };
  },

  onLoad(e) {
    Object.assign(this.$data, this.$options.data())
    this.Comments.obj_id = e.objId;
    if (e.userId == "undefined") {
      this.Comments.pid = "0"
    } else {
      this.Comments.pid = e.userId;
    }
    this.Comments.compid = e.comId
    this.sen = e.sen
  },
  methods: {
    sendissue() {
      const _this = this
      if (_this.Comments.content == '') {
        wx.showModal({
          title: "提示",
          content: "内容不可为空",
          showCancel: false
        })
      } else {
        wx.showLoading({
          title: "加载中",
          mask: true
        })
        console.log(_this.files.length)
        if (_this.files.length == "0") {
          _this.send()
        } else {
          _this.files.forEach(function(v, index) {
            let indexs = index + 1
            wx.uploadFile({
              url: "https://m.ruolingroup.com/api/upload",
              header: {
                "Content-Type": "multipart/form-data"
              },
              filePath: v,
              name: "image",
              success: function(res) {
                _this.Comments['pic' + indexs] = JSON.parse(res.data).data.imgUrl

                if (_this.files.length == indexs && _this.Comments['pic' + indexs] != "") {
                  _this
                    .send()
                }
              }
            });
          })
        }
      }
    },
    send() {
      const _this = this
      setTimeout(() => {
        _this.$http.post("comment/addcom", _this.Comments).then(res => {
          wx.hideLoading()
          if (res.data.status == "1") {
            // _this.Comments.obj_id = ""
            // _this.Comments.content = ""
            // _this.Comments.compid = ""
            // _this.Comments.pic1 = ""
            // _this.Comments.pic2 = ""
            // _this.Comments.pic3 = ""
            // _this.Comments.pid = ""
            wx.navigateBack({
              delta: 1
            })
          }
        });
      }, 2000);
    },
    chooseImage(e) {
      let _this = this;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: function(res) {
          var tempFilePaths = res.tempFilePaths;
          _this.files = _this.files.concat(tempFilePaths);
        },
        fail: function() {
          console.log("fail");
        },
        complete: function(e) {}
      });
    },
    predivImage(e) {
      console.log(e);
      wx.previewImage({
        current: e.currentTarget.id,
        urls: this.files
      });
    },
    deleteImg(e, index) {
      console.log(index)
      console.log(e.currentTarget);
      Array.prototype.indexOf = function(val) {
        for (let i = 0; i < this.length; i++) {
          if (this[i] === val) return i;
        }
        return -1;
      };
      Array.prototype.remove = function(val) {
        let index = this.indexOf(val);
        if (index > -1) {
          this.splice(index, 1);
        }
      };
      this.files.remove(e.currentTarget.id);

    },

    descInput() {
      if (this.Comments.content.length >= 120) {
        this.Comments.content = this.Comments.content.slice(0, 120);
      }
    },

  }
};

</script>
<style scoped>
.el_uploader {
  position: relative;
}

.delete-icon {
  width: 35rpx;
  height: 35rpx;
  position: absolute;
  top: -15rpx;
  right: -15rpx;
  z-index: 111;
}

.el_uploader .weui-uploader__img {
  width: 210rpx;
  height: 210rpx;
}

.weui-uploader__input-box {
  width: 210rpx;
  height: 210rpx;
}

</style>
