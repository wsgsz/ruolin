<template>
  <div class="detailTop">
    <div class="weui-panel ranling_list_index btn2em">
        <div class="weui-media-box weui-media-box_appmsg ranling_list">
          <div class="weui-media-box__hd weui-media-box__hd_in-appmsg"  style="width:270rpx;height:150rpx;">
            <image class="weui-media-box__thumb" :src="circle.circle_image" />
          </div>
          <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
            <div class="weui-media-box__title" style="font-size:15px;margin-bottom:15rpx;">{{circle.circle_name}}</div>
             <div class="weui-media-box__desc" style="font-size:14px;">
               <image src="/static/image/cjrs.png" style="width:26rpx;height:26rpx;" />
               {{circle.circleAttendance}}人已参加</div>
          </div>
        </div>
    </div>

    <div class="btn2em" style="padding-bottom:50rpx;">
     <div class="weui-cell" style="padding-top:50rpx;padding-bottom:50rpx;">
        <div class="weui-cell__hd">
          <div class="detail_one"></div>
        </div>
        <div class="weui-cell__bd cricle_index_guanzhu">
          <div class="fw500">要创建的话题</div>
        </div>
      </div>
      <div class="prl30 " style="overflow:hidden">
      <input type="text" v-model="form.topic_title" confirm-type="done" class="created_name" placeholder="请输入话题名称" style="color: #1a1a1a">
      </div>  
    </div>
    <!--  -->     <!-- 圈子描述 -->
    <div class="btn2em" style="padding-bottom:50rpx;">
     <div class="weui-cell" style="padding-top:50rpx;padding-bottom:50rpx;">
        <div class="weui-cell__hd">
          <div class="detail_one"></div>
        </div>
        <div class="weui-cell__bd cricle_index_guanzhu">
          <div class="fw500">话题详情描述</div>
        </div>
      </div>
        <div class="prl30">
      <div class="circle_describe">
          <textarea class="" placeholder="请输入话题详情描述" @input="topic_describes" confirm-type="done" v-model="form.topic_describes" style="height:3.3rem;width:100%;color:#1a1a1a" />
          <div class="weui-textarea-counter">{{form.topic_describes.length}}/140 &nbsp;&nbsp;</div>
          </div>
        </div>
        </div>
  <!-- 圈子描述 -->
    <div class="btn2em" style="padding-bottom:50rpx;">
     <div class="weui-cell" style="padding-top:50rpx;padding-bottom:50rpx;">
        <div class="weui-cell__hd">
          <div class="detail_one"></div>
        </div>
        <div class="weui-cell__bd cricle_index_guanzhu">
          <div class="fw500">话题内容</div>
        </div>
      </div>
      <div class="created_topic_image">
        <image src="/static/image/created_image.png" @click="chooseImage('1')" v-show="topic_file1==''" />
         <image :src="topic_file1" @click="chooseImage('1')"  v-show="topic_file1!=''" />
        <image src="/static/image/created_image.png" @click="chooseImage('2')" v-show="topic_file2==''" />
         <image :src="topic_file2" @click="chooseImage('2')" v-show="topic_file2!=''" />
      </div>
        </div>
    <button class="createTopic_btn"  @click="Tipclick">确定</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      circle: "",
      circle_id: "",
      circle_image: [],
      topic_file1: "",
      topic_file2: "",
      form: {
        topic_title: "",
        topic_describes: "",
        topic_file: [],
        circle_id: ""
      },
      user: {}
    };
  },
  onLoad(e) {
    Object.assign(this.$data, this.$options.data())
    this.circle_id = e.circle_Id;
    this.form.circle_id = e.circle_Id
    this.circle = JSON.parse(e.circle);
    console.log(this.circle);
    this.form.circle_id = e.uid;
  },
  methods: {
    topic_describes() {
      if (this.form.topic_describes.length >= 140) {
        console.log(this.form.topic_describes.slice(0, 140));
        this.form.topic_describes = this.form.topic_describes.slice(0, 140);
      }
    },
    chooseImage(etype) {
      let _this = this;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          _this.circle_image = _this.circle_image.concat(res.tempFilePaths);
          console.log(res.tempFilePaths);
          var tempFilePaths = res.tempFilePaths;
              wx.showLoading({
            title:"上传图片中",
            mask:true
          })
          wx.uploadFile({
            url: "https://m.ruolingroup.com/api/upload",
            header: {
              "Content-Type": "multipart/form-data"
            },
            filePath: tempFilePaths[0],
            name: "image",
            success: function(res) {
                wx.hideLoading()
              console.log(res.data)
              console.log(etype)
              if (etype == "1") {
                _this.topic_file1 = JSON.parse(res.data).data.uploadUrl;
                _this.form.topic_file[0] = JSON.parse(res.data).data.imgUrl
              }
              if (etype == "2") {
                _this.topic_file2 = JSON.parse(res.data).data.uploadUrl;
                 _this.form.topic_file[1] = JSON.parse(res.data).data.imgUrl
              }
            },
              fail: function() {
              console.log("fail");  
              wx.hideLoading()
            }
          });
        },
        fail: function() {
          console.log("fail");
        },
        complete: function() {
          console.log("commplete");
        }
      });
    },

    Tipclick() {
      const _this = this
       _this.form.circle_id = _this.circle_id
      if (_this.form.topic_title == '') {
        wx.showToast({
          title:"标题不可以为空",
          icon:'none'
        })
      } else if(_this.form.topic_describes == ''){
        wx.showToast({
          title:"描述不可以为空",
          icon:'none'
        }) 
      } else{
        _this.$http.post("circle/createTopic", _this.form).then(res => {
          console.log(res.data);
          if (res.data.status == "1") {
            wx.showToast({
              title: "已完成",
              icon: "success",
              duration: 3000
            });
            setTimeout(() => {
             wx.navigateBack({
                delta:1
            })
            }, 2000);
          }
        });
      }
    }
  }
};
</script>
<style>
.detailTop{
  padding-bottom:50rpx 
}
.ranling_list {
  padding: 20rpx 30rpx;
  box-sizing: border-box;
  margin-top: 50rpx;
  margin-bottom: 50rpx;
}
.ranling_list_index {
  margin: 30rpx;
  box-sizing: border-box;
}
.created_topic_image {
  width: 100%;
  padding: 0px 30rpx;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
}
.created_topic_image image {
  width: 326rpx;
  height: 182rpx;
}
.createTopic_btn {
  width: 130rpx;
  height: 50rpx;
  line-height: 50rpx;
  text-align: center;
  border-radius: 5rpx;
  font-size: 12px;
  background: #d61518;
  margin-bottom: 60rpx;
  margin-top: 50rpx;
  color: #ffffff;
}
</style>
