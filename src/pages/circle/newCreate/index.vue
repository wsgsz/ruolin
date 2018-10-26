<template>
  <div class="page">
    <div class="page__hd">
      <div class="page__title">创建</div>
      <div class="page__desc">创建</div>
    </div>
    <!--  -->
<div class="weui-toptips weui-toptips_warn" v-if="showTopTips">{{error}}</div>
    <div class="weui-uploader__bd">
       <div class="weui-cells__title">圈子展示图地址</div>
      <div class="weui-uploader__files" id="uploaderFiles">
          <div class="weui-uploader__file">
            <image class="weui-uploader__img" :src="circle_image" mode="aspectFill" @click="predivImage"  />
            <div class="delete-icon" @click="deleteImg" ></div>
          </div>
      </div>
      <div class="weui-uploader__input-box">
        <div class="weui-uploader__input" @click="chooseImage('circle_image')"></div>
      </div>
    </div>
      <div class="weui-uploader__bd">
         <div class="weui-cells__title">圈子图标地址</div>
      <div class="weui-uploader__files" id="uploaderFiles">
          <div class="weui-uploader__file">
            <image class="weui-uploader__img" :src="circle_icon" mode="aspectFill" @click="predivImage"  />
            <div class="delete-icon" @click="deleteImg" ></div>
          </div>
      </div>
      <div class="weui-uploader__input-box">
        <div class="weui-uploader__input" @click="chooseImage('circle_icon')"></div>
      </div>
    </div>
    <!--  -->
      <div class="page__bd">      
        <div class="weui-cells weui-cells_after-title">
         <div class="weui-cell weui-cell_input weui-cell_vcode">
          <div class="weui-cell__hd">
            <div class="weui-label">圈名</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入quanming" @input="namechange" v-model="form.circle_name" />
          </div>
          <div class="weui-cell__ft">
             <div class="weui-vcode-btn" @click="namechange">查看是否管用</div>
          </div>
         </div>
         <!--  -->
              <div class="weui-cells__title">圈子描述</div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <textarea class="" placeholder="请输入文本" style="height: 3.3em" v-model="form.circle_describe" />
            <div class="weui-textarea-counter">0/200</div>
          </div>
        </div>
      </div>
      <!--  -->
          <div class="weui-cells__title">添加圈子标签</div>


      <div class="weui-cells weui-cells_after-title">
        <radio-group @change="biaoqianchange">
          <label class="weui-cell weui-check__label" v-for="(item,index) in biaoqianitem" :key="index">
            <radio class="weui-check" :value="item.value" :checked="item.checked" />
            <div class="weui-cell__bd">{{item.name}}</div>
            <div class="weui-cell__ft weui-cell__ft_in-radio" v-if="item.checked">
              <icon class="weui-icon-radio" type="success_no_circle" size="16"></icon>
            </div>
          </label>
        </radio-group>
        <div class="weui-cell weui-cell_link">
          <div class="weui-cell__bd">添加更多</div>
        </div>
      </div>
   
              <div class="weui-cells__title">圈子规则</div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <textarea class="" placeholder="请输入文本" v-model="form.circle_rules" style="height: 3.3em" />
            <div class="weui-textarea-counter">0/200</div>
          </div>
        </div>
      </div>
   <!--  --> <div class="weui-cells__title">选择行业分类</div>

      <div class="weui-cells weui-cells_after-title">
        <radio-group @change="leichange">
          <label class="weui-cell weui-check__label" v-for="(item,index) in leiitem" :key="index">
            <radio class="weui-check" :value="item.value" :checked="item.checked" />
            <div class="weui-cell__bd">{{item.name}}</div>
            <div class="weui-cell__ft weui-cell__ft_in-radio" v-if="item.checked">
              <icon class="weui-icon-radio" type="success_no_circle" size="16"></icon>
            </div>
          </label>
        </radio-group>
        <div class="weui-cell weui-cell_link">
          <div class="weui-cell__bd">添加更多</div>
        </div>
      </div>
      <!--  -->
          <checkbox-group @click="bindAgreeChange">
        <label class="weui-agree" for="weuiAgree">
          <div class="weui-agree__text">
            <checkbox class="weui-agree__checkbox" id="weuiAgree" value="agree" checked="isAgree" />
            <div class="weui-agree__checkbox-icon">
              <icon class="weui-agree__checkbox-icon-check" type="success_no_circle" size="9" v-if="form.is_agreed"></icon>
            </div>
            进入圈子是否需要圈主同意
          
          </div>
        </label>
      </checkbox-group>
      <!--  -->
        </div>
      </div>

       <button class="weui-btn" type="primary" @click="Tipclick">确定</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showTopTips:false,
      error:"",
      circle_image: "",
      circle_icon: "",
      leiitem: [
        { name: "cell standard", value: "0" },
        { name: "cell standard", value: "1" }
      ],
      biaoqianitem: [
        { name: "cell standard", value: "0" },
        { name: "cell standard", value: "1" }
      ],
      form:{
        circle_name:"",
        circle_describe:"",
        circle_rules:"",
        token:"",
        label_id:"",
        type_id:"",
        is_agreed:false,
        circle_image:"",
        circle_icon:""
      }
    };
  },
  onLoad() {
     Object.assign(this.$data, this.$options.data());
    this.form.token = wx.getStorageSync("token");
  },
  methods: {
    namechange(){
     this.$http.post('circle/circleNameCheck',{circle_name:this.form.circle_name}).then(res=>{
      if(res.data.status=='1'){
          this.error = ''
        this.showTopTips = false
      }else{
           this.error = '名字已经存在'
          this.showTopTips = true
      }
     })
    },
       bindAgreeChange(e) {
      this.form.is_agreed = !this.form.is_agreed;
    },
    chooseImage(oc) {
      let _this = this;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          if (oc == "circle_image") {
            _this.circle_image = res.tempFilePaths[0];
          } else {
            _this.circle_icon = res.tempFilePaths[0];
          }
          var tempFilePaths = res.tempFilePaths;
          wx.uploadFile({
            url: "https://m.ruolingroup.com/api/upload",
            header: {
              "Content-Type": "multipart/form-data"
            },
            filePath: tempFilePaths[0],
            name: "image",
            success: function(res) {
              console.log(JSON.parse(res.data).data.imgUrl)
              if (oc == "circle_image") {
                _this.form.circle_image = JSON.parse(res.data).data.imgUrl;
              } else {
                _this.form.circle_icon = JSON.parse(res.data).data.imgUrl;
              }
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
    // yulan
    predivImage(e) {
      console.log(e);
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.files // 需要预览的图片http链接列表
      });
    },
    // 分类
    leichange(e) {
      console.log("radio发生change事件，携带value值为：" + e.mp.detail.value);
      this.form.type_id = e.mp.detail.value
      let leiitem = this.leiitem;
      for (let i = 0; i < leiitem.length; ++i) {
        leiitem[i].checked = leiitem[i].value === e.mp.detail.value;
      }
      this.leiitem = leiitem;
    },
    // 圈子
    biaoqianchange(e) {
      this.form.label_id = e.mp.detail.value
      console.log("radio发生change事件，携带value值为：" + e.mp.detail.value);
      let biaoqianitem = this.biaoqianitem;
      for (let i = 0; i < biaoqianitem.length; ++i) {
        biaoqianitem[i].checked = biaoqianitem[i].value === e.mp.detail.value;
      }
      this.biaoqianitem = biaoqianitem;
    },
    Tipclick(){
      if(this.showTopTips==true){

      }else{
        this.$http.post('circle/Add',this.form).then(res=>{
          console.log(res.data)
        if(res.data.status=="1"){
          wx.redirectTo({
            url: '/pages/circle/index/main'
          })
        }
        })
      }
     
    }
  }
};
</script>

<style>
</style>
