<template>
  <div style="padding-bottom: 50rpx;">
    <!-- 圈子展示图 -->
    <div class="btn2em" style="padding-bottom:50rpx;">
      <div class="weui-cell" style="padding-top:50rpx;padding-bottom:50rpx;">
        <div class="weui-cell__hd">
          <div class="detail_one"></div>
        </div>
        <div class="weui-cell__bd cricle_index_guanzhu">
          <div class="fw500">圈子展示图</div>
        </div>
      </div>
      <div class="prl30 ">
        <image class="created_image" src="/static/image/created_image.png" v-if="form.circle_image==''" @click="chooseImage('circle_image')" />
        <image class="created_image" :src="circle_image" v-if="form.circle_image!=''" @click="chooseImage('circle_image')" />
        <p class="created_image_p">质量：500KB以内&nbsp;大小：680*380 </p>
      </div>
    </div>
    <!-- 圈子图标 -->
    <div class="btn2em" style="padding-bottom:50rpx;">
      <div class="weui-cell" style="padding-top:50rpx;padding-bottom:50rpx;">
        <div class="weui-cell__hd">
          <div class="detail_one"></div>
        </div>
        <div class="weui-cell__bd cricle_index_guanzhu">
          <div class="fw500">圈子图标</div>
        </div>
      </div>
      <div class="prl30 ">
        <image class="created_icon" src="/static/image/created_image1.png" v-if="form.circle_icon==''" @click="chooseImage('circle_icon')" />
        <image class="created_icon" :src="circle_icon" v-if="form.circle_icon!=''" @click="chooseImage('circle_icon')" />
      </div>
    </div>
    <!--  -->
    <!-- 圈名 -->
    <div class="btn2em" style="padding-bottom:50rpx;">
      <div class="weui-cell" style="padding-top:50rpx;padding-bottom:50rpx;">
        <div class="weui-cell__hd">
          <div class="detail_one"></div>
        </div>
        <div class="weui-cell__bd cricle_index_guanzhu">
          <div class="fw500">圈名</div>
        </div>
      </div>
      <div class="prl30 " style="overflow:hidden">
        <input type="text" v-model="form.circle_name" confirm-type="done" class="created_name" placeholder="请输入圈子名称">
        <div class="jianchaname" @click="chaname($event)">
          {{chanames}}
        </div>
      </div>
    </div>
    <!--  -->
    <!-- 圈子描述 -->
    <div class="btn2em" style="padding-bottom:50rpx;">
      <div class="weui-cell" style="padding-top:50rpx;padding-bottom:50rpx;">
        <div class="weui-cell__hd">
          <div class="detail_one"></div>
        </div>
        <div class="weui-cell__bd cricle_index_guanzhu">
          <div class="fw500">圈子描述</div>
        </div>
      </div>
      <div class="prl30">
        <div class="circle_describe">
          <textarea class="" placeholder="请输入文本" @input="circle_describeInput" confirm-type="done" v-model="form.circle_describe" style="height:3.3rem;width:100%" />
          <div class="weui-textarea-counter">{{form.circle_describe.length}}/30 &nbsp;&nbsp;</div>
          </div>
        </div>
        </div>
          <!-- 添加圈子标签 -->
    <div class="btn2em" style="padding-bottom:50rpx;">
     <div class="weui-cell" style="padding-top:50rpx;padding-bottom:50rpx;">
        <div class="weui-cell__hd">
          <div class="detail_one"></div>
        </div>
        <div class="weui-cell__bd cricle_index_guanzhu">
          <div class="fw500">添加圈子标签</div>
        </div>
      </div>
        <div class="prl30">
          <div class="weui-cells weui-cells_after-title ohidden">
          <radio-group class="group" @change="checklabel">
              <label :for="item.id"  v-for="(item,indexs) in labelList" :key="indexs">
                <radio class="created_chec" color="#d61518" :id="item.id" :value="item.id">
                </radio>
                <text class="label-1-text">{{item.label_name}}</text>
              </label>
                  <div class="add_created" @click.stop="openmodel('labelList')">
               自定义
             </div>
          </radio-group>
          <!-- <radio-group class="group" @change="checktypeList">
            <div class="checkbox" v-for="(items,index) in typeList" :key="index">
              <radio color="#d61518" :id="items.type_name" :value="items.type_name"></radio>
              <label class="add_created" :for="items.type_name">
                <text class="label-1-text">{{items.type_name}}</text>
              </label>
            </div>
          </radio-group> -->

        </div>
        </div>
        </div>
         <!-- 圈子规则 -->
    <div class="btn2em" style="padding-bottom:50rpx;">
     <div class="weui-cell" style="padding-top:50rpx;padding-bottom:50rpx;">
        <div class="weui-cell__hd">
          <div class="detail_one"></div>
        </div>
        <div class="weui-cell__bd cricle_index_guanzhu">
          <div class="fw500">圈子规则</div>
        </div>
      </div>
        <div class="prl30">
      <div class="circle_describe">
          <textarea class="" placeholder="请用一句话介绍你的圈子规则" confirm-type="done"  @input="circle_rulesinput" v-model="form.circle_rules" style="height:3.3rem;width:100%" />
          <div class="weui-textarea-counter">{{form.circle_rules.length}}/100 &nbsp;&nbsp;</div>
          </div>
        </div>
        </div>
               <!-- 添加圈子分类 -->
    <div class="p50" >
     <div class="weui-cell" style="padding-top:50rpx;padding-bottom:50rpx;">
        <div class="weui-cell__hd">
          <div class="detail_one"></div>
        </div>
        <div class="weui-cell__bd cricle_index_guanzhu">
          <div class="fw500">添加圈子分类</div>
        </div>
      </div>
        <div class="prl30 ">
          <div class="weui-cells weui-cells_after-title ohidden">
                <radio-group class="group" @change="checktypeList">
            <label class="checkbox" v-for="(items,index) in typeList" :key="index"  >
              <checkbox class="created_chec" :value="items.id"/>
              <text class="label-1-text">{{items.type_name}}</text>
            </label>
               <div class="add_created" @click.stop="openmodel('types')">
               自定义
             </div>
          </radio-group>

         <!-- <radio-group class="group" @change="checktypeList">
            <label  :for="items.id"  class="checkbox" v-for="(items,index) in typeList" :key="index"  >
              <radio class="created_chec" :id="items.id" :value="items.id"/>
              <text class="label-1-text">{{items.type_name}}</text>
            </label>
               <div class="add_created" @click.stop="openmodel('types')">
               自定义
             </div>
          </radio-group> -->
    
        </div>
        </div>
        </div>
    <!--  -->

      <div class="created_add_btn" @click="addbtncircle()">
        创建圈子
      </div>
      <div class="model_bacd"  v-if="is_model"  @click="removesendform()"></div>
      <div class="circle_created_model" v-if="is_model">
        <p class="circle_created_model_p">添加</p>
         <input type="text" @confirm="sendform()"  v-model="addcontent" focus=true confirm-type="send" confirm-hold=""/>
        <div class="circle_created_model_btn">
            <div class="circle_created_model_btn_el" @click="removesendform()">取消</div>
           <div class="circle_created_model_btn_el" @click="sendform()">发送</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      is_model:false,
      add_type:"",
      chanames:"检查名字是否可用",
      addcontent:"",
      labelList: [{
        label_name:"",
        id:""
      }],
      typeList: [{
         type_name:"",
        id:""
      }],
      circle_image:"",
      circle_icon:"",
      form: {
        circle_name: "", //圈主名称
        circle_describe: "", // 圈子描述
        circle_rules: "", // 圈子规则
        label_id: "", //  标签id
        type_id: "", //分类ID
        circle_image: "", //圈子展示图地址
        circle_icon: "", //圈子图标地址
        is_agreed:"1"
      }
    };
  },
  onLoad(){
     Object.assign(this.$data, this.$options.data())
    this.getTypeList()
    this.getlabelList()
  },
  methods: {
    chaname(e){
      this.$http.post("circle/circleNameCheck",{circle_name:this.form.circle_name}).then(res=>{
        if(res.data.status=='0'){
          this.chanames ='名字不可为空或已被注册'
        }else{
          this.chanames ='名字可用'
        }
      })
    },
    getTypeList(){
      this.$http.post('circle/typeList',{}).then(res=>{
        this.typeList = res.data.data
        console.log(res.data.data)
      })
    },
     getlabelList(){
      this.$http.post('circle/labelList',{}).then(res=>{
        this.labelList = res.data.data
       console.log(res.data.data)
      })
    },
    addbtncircle(){
      this.$http.post('circle/Add',this.form).then(res=>{
        if(res.data.status=='0'){
          wx.showToast({
            title:"添加失败,请保证所有都为必填",
            icon:'none'
          })
        }else{
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
      })
    },
    chooseImage(obj) {
      const _this = this;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          var tempFilePaths = res.tempFilePaths;
              wx.showLoading({
            title: "加载中"
          });
          wx.uploadFile({
            url: "https://m.ruolingroup.com/api/upload",
            header: {
              "Content-Type": "multipart/form-data"
            },
            filePath: tempFilePaths[0],
            name: "image", 
            complete: function(res) {
              wx.hideLoading();
            },
            success: function(res) {
              if(obj=='circle_image'){
                _this.form.circle_image = JSON.parse(res.data).data.imgUrl
                _this.circle_image = JSON.parse(res.data).data.uploadUrl
              }
               if(obj=='circle_icon'){
                _this.form.circle_icon = JSON.parse(res.data).data.imgUrl
                 _this.circle_icon = JSON.parse(res.data).data.uploadUrl
              }
            }
          });
        },
        fail: function() {
          console.log("fail");
        }
      });
    },
    //标签id
    checklabel(e) {
      const labelList = this.labelList,
        values = e.mp.detail.value;
      for (var i = 0, lenI = labelList.length; i < lenI; ++i) {
        labelList[i].checked = false;
        for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
          if (labelList[i].value == values[j]) {
            labelList[i].checked = true;
            break;
          }
        }
      }
      this.labelList = labelList;
      this.form.label_id = e.mp.detail.value
      console.log( e.mp.detail.value);
    },
    //分类ID
    checktypeList(e) {
      console.log("1");
      const typeList = this.typeList,
        values = e.mp.detail.value;
      for (var i = 0, lenI = typeList.length; i < lenI; ++i) {
        typeList[i].checked = false;
        for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
          if (typeList[i].value == values[j]) {
            typeList[i].checked = true;
            break;
          }
        }
      }
      this.typeList = typeList;
      this.form.type_id = e.mp.detail.value
      console.log(e.mp.detail.value);
    },

    circle_rulesinput(){
 if (this.form.circle_rules.length >= 100) {
        console.log( this.form.circle_rules.slice(0,100))
        this.form.circle_rules = this.form.circle_rules.slice(0,100);
      }
    },    
    circle_describeInput(){
 if (this.form.circle_describe.length >= 30) {
        console.log( this.form.circle_describe.slice(0,30))
        this.form.circle_describe = this.form.circle_describe.slice(0,30);
      }
    },
    sendform(e) {
      const _this = this
     if(this.add_type=='labelList'){
       this.$http.post("circle/labelAdd",{label_name:this.addcontent}).then(res=>{
         if(res.data.status=='0'){
          wx.showToast({
            title:"添加失败",
            icon:'none'
          })
         }else{
           console.log(res.data.data)
           this.labelList.push({
            label_name:_this.addcontent,
             id:res.data.data
           })
           this.removesendform()
         }

       })
     }
     if(this.add_type=='types'){
       this.$http.post("circle/typeAdd",{type_name:this.addcontent}).then(res=>{
         if(res.data.status=='0'){
            wx.showToast({
            title:"添加失败",
            icon:'none'
          })
         }else{
            this.typeList.push({
            type_name:_this.addcontent,
            id:res.data.data
           })
          this.removesendform()
         }
       })
     }
    },
    removesendform(){
        this.addcontent=''
           this.is_model = false
    },
    openmodel(obj){
     this.add_type = obj
      this.is_model = true
    }
  }
};
</script>

<style scoped>
.created_image {
  width: 100%;
  height: 380rpx;
  border-radius: 10rpx;
}
.created_icon {
  width: 68rpx;
  height: 68rpx;
  border-radius: 50%;
}
.created_image_p {
  font-size: 11pt;
  text-align: right;
  color: #92969c;
}
.created_name {
  width: 100%;
  height: 90rpx;
  line-break: 90rpx;
  font-size: 14px;
  color: #92969c;
  padding-left: 30rpx;
  border: 1rpx solid #e5e5e5;
  border-radius: 5rpx;
  box-sizing: border-box;
}
.circle_describe {
  width: 100%;
  border: 1rpx solid #e5e5e5;
  padding-top: 20rpx;
  padding-bottom:20rpx;
  border-radius: 5rpx;
  line-height: 1;
  font-size: 13px;
  box-sizing: border-box;
}
.created_chec {
  display: none;
}
.created_chec[checked=""] {
  display: none;
}
.created_chec + .label-1-text {
  color: #333;
  font-weight: 500;
  padding: 10rpx 18rpx;
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
}
.ohidden{
  zoom:1;
  overflow: hidden;
}
.group {
  float: left;
  overflow: hidden;
  padding-top: 10rpx;
}
.group label {
  padding: 8rpx 18rpx;
  margin: 4rpx 2rpx 24rpx 0rpx;
  float: left;
  font-size: 13px;
}
.created_chec[checked=""] + .label-1-text {
  color: #d61518 !important;
  font-weight: 500;
  padding: 10rpx 18rpx;
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
}
.add_created {
  padding: 10rpx 18rpx;
  box-sizing: border-box;
  margin: 2rpx;
  color: #d61518;
  border: 1px solid #e5e5e5;
  float: left;
  font-size: 13px;
}
.created_add_btn {
  width: 130rpx;
  height: 50rpx;
  font-size: 12px;
  background: #d61518;
  color: #ffffff;
  line-height: 50rpx;
  text-align: center;
  margin: auto;
  margin-bottom: 50rpx;
}
.model_bacd{
  background: #e5e5e5;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  overflow: hidden
}
.circle_created_model {
  width: 550rpx;
  position: fixed;
  left: 100rpx;
  box-sizing: border-box;
  bottom: 50vh;
  background: #fff;
  padding: 30rpx 50rpx;
  border-radius: 8rpx;
  z-index: 11;
}
.circle_created_model_p {
  font-size: 16px;
  text-align: center;
}
.circle_created_model input {
  background: #fff;
  margin-bottom: 30rpx;
  margin-top:20rpx;
  padding-left: 10rpx;
  border: 1rpx solid #e5e5e5;
  line-height: 40rpx;
  font-size: 13px;
}
.circle_created_model_btn {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.circle_created_model_btn_el {
  width: 50%;
  font-size: 14px;
  text-align: center;
}
.jianchaname{
  display: block;
  padding: 8rpx 12rpx;
  margin-top:20rpx;
  font-size:13px;
  float: right;
  border:1px solid #1a1a1a;
  border-radius:5rpx;
}
</style>
