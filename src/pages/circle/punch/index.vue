<template>
  <div class="page" style="padding-bottom: 100rpx;">
    <div class="weui-panel ranling_list_index btn2em">
      <div class="weui-media-box weui-media-box_appmsg ranling_list">
        <div class="weui-media-box__hd weui-media-box__hd_in-appmsg" style="width:270rpx;height:150rpx;">
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

        <div class="weui-cell__bd cricle_index_guanzhu">
          <div class="fw500">请选择一个话题进行打卡</div>
        </div>
      </div>
      <div class="prl30">
        <picker @change="bindPickerChange" :value="index" :range="listadd">
          <button class="created_name ellipsis-1" style="background: #fff;text-align: left;position: relative;">
            <div>{{listadd[index]}}</div>
            <image class="punch_topic_image" src="/static/image/down.png" />
          </button>
        </picker>
      </div>
    </div>
    <!-- 输入打卡内容 -->
    <div>
      <div class="weui-cell" style="padding-top:50rpx;padding-bottom:50rpx;">
        <div class="weui-cell__bd cricle_index_guanzhu">
          <div class="fw500">输入打卡内容</div>
        </div>
      </div>
        </div> 
<!-- 打卡图片 -->
     <div class="" style="border:1px solid #eeeeee;margin:0px 30rpx">
        <div class="prl30">
        <div class="circle_describe" style="border:0px;">
          <textarea class="" placeholder="请输入文本" cursor-spacing="30" @input="push_input" auto-height="true" v-model="form.content" style="height:3.3rem;width:100%" />
          <div class="weui-textarea-counter">{{form.content.length}}/140 &nbsp;&nbsp;</div>
          </div>
        </div>
        <div style="padding:30rpx 0;">
      <div class="prl30 push_img" >
      <div class="push_img_1"  v-show="push1==''">
           <image class="push_img_1_i"  src="/static/image/created_image.png" @click="chooseImage('0')" />
      </div>
        <div  class="push_img_1"  v-show="push1!=''" >
         <image class="push_img_1_i" :src="push1" @click="chooseImage('0')"/>
        <image class="push_img_1_del" src="/static/image/dele.png" @click="deleimage('0')" />
        </div>
       <div class="push_img_1"  v-show="push2==''" >
          <image class="push_img_1_i" src="/static/image/created_image.png" @click="chooseImage('1')"/>
       </div>
      <div class="push_img_1" v-show="push2!=''" >
        <image class="push_img_1_i" :src="push2" @click="chooseImage('1')"/>
           <image class="push_img_1_del" src="/static/image/dele.png" @click="deleimage('1')" />
      </div>
      <div class="push_img_1" v-show="push3==''">
           <image class="push_img_1_i" src="/static/image/created_image.png" @click="chooseImage('2')"/>
      </div>
        <div class="push_img_1" v-show="push3!=''">
          <image class="push_img_1_i" :src="push3" @click="chooseImage('2')"/>
          <image class="push_img_1_del" src="/static/image/dele.png"  @click="deleimage('2')" />
        </div>
        </div>
        </div> 
     </div>
        <!--  -->
    <button class="weui-btn push_btn" @click="Tipclick">确认打卡</button>
  </div>

</template>
<script>
export default {
  data() {
    return {
      circle_Id: "",
      circle: "",
      push1:"",
      push2:"",
      push3:"",
      image: ['','',''],
      form: {
        circle_topic_id: "",
        circle_id: "",
        image:[],
        content: ""
      },
      index: "0",
      listadd: [],
      topic_id: []
    };
  },
  onLoad(e) {
    Object.assign(this.$data, this.$options.data())
    this.circle_Id = e.circle_Id;
    this.circle = JSON.parse(e.circle)
    this.getAll()
  },
  methods: {
        chooseImage(etype) {
      let _this = this;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
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
                wx.hideLoading()
              if (etype == "0") {
                _this.push1 = JSON.parse(res.data).data.uploadUrl;
                _this.image[0] = JSON.parse(res.data).data.imgUrl
              }
              if (etype == "1") {
                _this.push2 = JSON.parse(res.data).data.uploadUrl;
                 _this.image[1] = JSON.parse(res.data).data.imgUrl
              }
               if (etype == "2") {
                _this.push3 = JSON.parse(res.data).data.uploadUrl;
                 _this.image[2] = JSON.parse(res.data).data.imgUrl
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
    deleimage(etype){
     if (etype == "0") {
        this.push1 = ''
        this.image[0] = ''
      }
      if (etype == "1") {
        this.push2 = ''
         this.image[1] = ''
      }
       if (etype == "2") {
        this.push3 = ''
         this.image[2] = ''
      }
    },
    // 所有的话题
    getAll() {
      const _this = this
      _this.$http.post("circle/nameTopic", { circle_id: this.circle_Id }).then(res => {
        console.log(res.data.data)
        res.data.data.forEach(function(element) {
          _this.listadd.push(element.topic_title);
          _this.topic_id.push(element.id);
        });
        this.form.circle_topic_id = res.data.data[0].id
        this.form.circle_id = this.circle_Id
      })
    },
    bindPickerChange(e) {
      this.index = e.mp.detail.value
      this.actname = this.listadd[e.mp.detail.value];
      this.form.circle_topic_id = this.topic_id[e.mp.detail.value];
    },
    push_input(){
      if (this.form.content.length >= 140) {
        this.form.content = this.form.content.slice(0, 140);
      }
    },
    Tipclick(){
      if(this.form.content ==''){
          wx.showToast({
          title:"内容不可以为空",
          icon:'none'
        })
      }else{
        this.form.image = this.image.filter(item => item!='')  
            this.$http.post("circle/clockIn",this.form).then(res=>{
          if(res.data.status=='1'){
                wx.showToast({
              title: "已完成",
              icon: "success",
              duration: 2000
            });
            setTimeout(() => {
             wx.navigateBack({
                delta:1
            })
            }, 2000);
          }else{
                 wx.showToast({
              title: "打卡失败",
              icon: "none",
              duration: 2000
            });
          }
      })
      }
  
    }

  }
};

</script>
<style scoped>
.weui-cells_after-title {
  padding: 0px 30rpx;
}

.created_name {
  font-size: 13px;
  padding-right: 60rpx;

}
.punch_topic_image{
  position:absolute;
width:40rpx;
height:40rpx;
top:25rpx;
right:25rpx;
}
.push_img{
  width: 100%;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;

}
.push_img_1{
  width: 30%;
  height: 28vw;
  position: relative;
}
.push_img_1_i{
  width: 100%;
  height: 100%;
  border:1px solid #eee;
}
.push_img_1_del{
  width: 30rpx;
  height: 30rpx;
  position: absolute;
  right:0;
  top: 0;
}
.push_btn{
  background: #d61518;
  color: #ffffff;
  font-size: 12px;
  line-height: 50rpx;
  height: 50rpx;
  width: 160rpx;
  text-align: center;
  border-radius:5rpx;
  margin-top:60rpx;
  margin-bottom: 60rpx;
}
</style>
