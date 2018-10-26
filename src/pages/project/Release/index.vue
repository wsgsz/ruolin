<template>
  <div class="page">
    <div class="weui-toptips weui-toptips_warn" v-if="error">{{errortext}}</div>
    <div class="weui-cells weui-cells_after-title btn2em">
      <div class="page__bd_spacing release_btn2em">
        <div class="weui-cell release_list">
          <div class="weui-cell__hd">
            <div style="width:2px;height:20px;background:red;margin-right:15px;"></div>
          </div>
          <div class="weui-cell__bd fw500">项目名称</div>
        </div>
      </div>
      <div class="weui-cells weui-cells_after-title btn2em">
        <div class="weui-cell release_list" style="margin-bottom:50rpx;">
          <div class="weui-cell__bd release_border">
            <textarea class="weui-textarea" placeholder="项目名称" v-model="form.obj_name" style="height: 3.7em" />
          </div>
        </div>
      </div>
      <div class="page__bd_spacing release_btn2em">
        <div class="weui-cell release_list">
          <div class="weui-cell__hd">
            <div style="width:2px;height:20px;background:red;margin-right:15px;"></div>
          </div>
          <div class="weui-cell__bd fw500">项目标语</div>
        </div>
      </div>
      <div class="weui-cells weui-cells_after-title btn2em">
        <div class="weui-cell release_list" style="margin-bottom:50rpx;">
          <div class="weui-cell__bd release_border">
            <textarea class="weui-textarea" placeholder="slogan" v-model="form.slogan" style="height: 3.7em" />
          </div>
        </div>
      </div>
      <div class="page__bd_spacing release_btn2em">
        <div class="weui-cell release_list">
          <div class="weui-cell__hd">
            <div style="width:2px;height:20px;background:red;margin-right:15px;"></div>
          </div>
          <div class="weui-cell__bd fw500">项目简介</div>
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">项目介绍</div>
        </div>
        <div class="weui-cell__bd">
          <!-- <textarea class="weui-input" placeholder="项目介绍" v-model="form.introducecontent" style="height: 3.7em" /> -->
          <input class="weui-input" v-model="form.introducecontent" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd" style="height:170rpx">
          <div class="weui-label">项目简介</div>
        </div>
        <div class="weui-cell__bd">
          <textarea class="weui-textarea" v-model="form.user_signature" style="height: 170rpx;width:100%;box-sizing:border-box;border:1px solid #e5e5e5" />
          <!-- <input class="weui-input" v-model="form.user_signature" /> -->
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">公司名称</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.name_company" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">项目类型</div>
        </div>
        <div class="weui-cell__bd">
          <picker class="weui-input" @change="bindPickerChange" :value="index" :range="array">
            <div class="" style="margin:auto">{{textell}}</div>
            <!-- <button type="default"></button> -->
          </picker>
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">服务内容</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.service_content" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">全国门店</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.stores" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">现有门店</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.target_stores" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">总部地点</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.headquarters_location" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">盈利构成</div>
        </div>
         <div class="weui-cell__bd">
            <picker class="weui-input" @change="bingengry" :value="index" :range="tearningslis">
            <div class="" style="margin:auto">{{form.earnings}}</div>
            <!-- <button type="default"></button> -->
          </picker>
         </div>
      </div>
         <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">运营面积</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.operating_space" />
        </div>
      </div>
         <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">投资金额</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.invest_money" />
        </div>
      </div>
      <div class="page__bd_spacing release_btn2em">
        <div class="weui-cell release_list">
          <div class="weui-cell__hd">
            <div style="width:2px;height:20px;background:red;margin-right:15px;"></div>
          </div>
          <div class="weui-cell__bd fw500">项目展示</div>
        </div>
      </div>
      <div style="color:#96929c;display:block;padding:0px 30rpx;margin-bottom:20rpx;font-size:20rpx;text-align:right">
        50KB以内
      </div>
      <div class="page__bd page__bd_spacing">
        <div class="weui-flex">
          <div class="weui-flex__item  elw2" @click="chooseImage('brandimage')">
            <image :src="brandimage" />
            <!-- <div class="placeholder">品牌形象图</div> -->
          </div>
          <div class="weui-flex__item  elw2" @click="chooseImage('storeimage')">
            <image :src="storeimage" />
            <!-- <div class="placeholder">门店图</div> -->
          </div>
        </div>
        <div class="weui-flex">
          <div class="weui-flex__item  elw2" @click="chooseImage('productimage')">
            <image :src="productimage" />
            <!-- <div class="placeholder">产品图</div> -->
          </div>
          <div class="weui-flex__item  elw2" @click="chooseImage('investmentimage')">
            <image :src="investmentimage" />
            <!-- <div class="placeholder">其他等</div> -->
          </div>
        </div>
      </div>
      <div class="page__bd_spacing release_btn2em">
        <div class="weui-cell release_list">
          <div class="weui-cell__hd">
            <div style="width:2px;height:20px;background:red;margin-right:15px;"></div>
          </div>
          <div class="weui-cell__bd fw500">项目介绍：</div>
        </div>
      </div>
      <div class="page__hd" style="padding:20px;">
        <div class="page__title">招商详情</div>
        <div class="page__desc">只可以用文字，填写之后 PC端完整显示</div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">整体展示：</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.project_overall_display" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">广告语：</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.advertisement" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">项目优势</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.project_advantage" />
        </div>
      </div>
      <div class="page__bd_spacing release_btn2em">
        <div class="weui-cell release_list">
          <!--           <div class="weui-cell__hd">
            <div style="width:2px;height:20px;background:red;margin-right:15px;"></div>
          </div> -->
          <div class="weui-cell__bd" style="display:block;text-align:center">品牌宣传</div>
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">市场前景</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.market" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">招商优势</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.investment_advantage" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">品牌优势</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.brand_advantage" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">品牌故事</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.brand_story" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">品牌时间轴</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.brand_timeline" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">品牌DNA</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.brand_dna" />
        </div>
      </div>
      <div style="width:100%;height:90rpx;"></div>
      <div class="weui-grid btnsnavi" hover-class="weui-grid_active" style="z-index:111">
        <button class="weui-btn btns" type="primary" @click="subForm">提交审核</button>
      </div>
      <!-- <button class="weui-btn" type="submit" @click="subForm" style="background:#d61518;color:#fff">提交审核</button> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      brandimage: "/static/image/brandimage.png",
      storeimage: "/static/image/storeimage.png",
      productimage: "/static/image/productimage.png",
      investmentimage: "/static/image/investmentimage.png",
      index: 0,
      array: [],
      arrayId: [],
      textell: "请选择类型",
      bingengrytext:"",
      tearningslis: [],
      form: {
        obj_name: "",
        slogan: "",
        introducecontent: "",
        name_company: "",
        service_content: "",
        stores: "",
        industry_id: "",
        target_stores: "",
        headquarters_location: "",
        earnings: "请选择",
        brandimage: "",
        storeimage: "",
        productimage: "",
        investmentimage: "",
        project_overall_display: "",
        advertisement: "",
        project_advantage: "",
        market: "",
        investment_advantage: "",
        brand_advantage: "",
        brand_story: "",
        brand_timeline: "",
        brand_dna: "",
        operating_space: "",
        invest_money: ""
      },
      error: false,
      errortext: ""
    };
  },
  // onShow() {
  //   this.obj_name.slogan = ""
  //   this.obj_name.introducecontent = ""
  //   this.obj_name.name_company = ""
  //   this.obj_name.service_content = ""
  //   this.obj_name.stores = ""
  //   this.obj_name.industry_id = ""
  //   this.obj_name.target_stores = ""
  //   this.obj_name.headquarters_location = ""
  //   this.obj_name.earnings = ""
  //   this.obj_name.brandimage = ""
  //   this.obj_name.storeimage = ""
  //   this.obj_name.productimage = ""
  //   this.obj_name.investmentimage = ""
  //   this.obj_name.project_overall_display = ""
  //   this.obj_name.advertisement = ""
  //   this.obj_name.project_advantage = ""
  //   this.obj_name.market = ""
  //   this.obj_name.investment_advantage = ""
  //   this.obj_name.brand_advantage = ""
  //   this.obj_name.brand_story = ""
  //   this.obj_name.brand_timeline = ""
  //   this.obj_name.brand_dna = ""
  //   this.getLei()
  // },
  onLoad() {
    Object.assign(this.$data, this.$options.data());
    this.getLei();
    this.getearningslist();
  },
  methods: {
    getearningslist() {
      this.$http.post("obj/earningslist", {}).then(res => {
        this.tearningslis = res.data.data;
        console.log(res.data.data);
      });
    },
    bingengry(e) {
     console.log("选中的值为：" + this.tearningslis[e.mp.detail.value]);
      // this.form.earnings=this.tearningslis[e.mp.detail.value]
      this.form.earnings = this.tearningslis[e.mp.detail.value]
    },
    bindPickerChange(e) {
      // console.log('选中的值为：' + this.array[e.mp.detail.value]);
      this.textell = this.array[e.mp.detail.value];
      this.form.industry_id = e.mp.detail.value;
      console.log(this.array[e.mp.detail.value]);
    },
    getLei() {
      const _this = this;
      _this.$http.post("obj/industrylist", {}).then(res => {
        console.log(res);
        res.data.data.forEach(function(e) {
          _this.array.push(e.industry_name);
          _this.arrayId.push(e.id);
        });
        console.log(_this.array);
      });
    },
    subForm(e) {
      console.log("sss");
      // if (this.form.obj_name == "") {
      //   this.error = true;
      //   this.errortext = "请输入项目名称";
      // } else if ((this.form.introducecontent = "")) {
      //   this.error = true;
      //   this.error = "请输入项目介绍";
      // } else if ((this.form.user_signature = "")) {
      //   this.error = true;
      //   this.error = "请输入项目简介";
      // } else if ((this.form.name_company = "")) {
      //   this.error = true;
      //   this.error = "请输入公司名称";
      // } else if (this.form.service_content == "") {
      //   this.error = true;
      //   this.errortext = "请输入服务内容";
      // } else if (this.form.stores == "") {
      //   this.error = true;
      //   this.errortext = "请输入目标全国门店";
      // } else if (this.form.target_stores == "") {
      //   this.error = true;
      //   this.errortext = "请输入现有门店";
      // } else if (this.form.headquarters_location == "") {
      //   this.error = true;
      //   this.errortext = "请输入现有门店";
      // } else if (this.form.earnings == "") {
      //   this.error = true;
      //   this.errortext = "请输入盈利构成";
      // } else if (this.form.brandimage == "") {
      //   this.error = true;
      //   this.errortext = "请填写图片展示图";
      // } else if (this.form.storeimage == "") {
      //   this.error = true;
      //   this.errortext = "请填写门店图";
      // } else if (this.form.productimage == "") {
      //   this.error = true;
      //   this.errortext = "请填写品牌形象图";
      // } else if (this.form.investmentimage == "") {
      //   this.error = true;
      //   this.errortext = "请填写其他图";
      // } else if (this.form.project_overall_display == "") {
      //   this.error = true;
      //   this.errortext = "请填写其他展示";
      // } else if (this.form.advertisement == "") {
      //   this.error = true;
      //   this.errortext = "请填写广告语";
      // } else if (this.form.project_advantage == "") {
      //   this.error = true;
      //   this.errortext = "请填写项目优势";
      // } else if (this.form.market == "") {
      //   this.error = true;
      //   this.errortext = "请填写项目优势";
      // } else if (this.form.investment_advantage == "") {
      //   this.error = true;
      //   this.errortext = "请填写招商优势";
      // } else if (this.form.brand_advantage == "") {
      //   this.error = true;
      //   this.errortext = "请填写品牌优势";
      // } else if (this.form.brand_story == "") {
      //   this.error = true;
      //   this.errortext = "请填写品牌故事";
      // } else if (this.form.brand_timeline == "") {
      //   this.error = true;
      //   this.errortext = "请填写品牌时间轴";
      // } else if (this.form.brand_dna == "") {
      //   this.error = true;
      //   this.errortext = "请填写品牌DNA";
      // } else {
        console.log("成功");
        this.$http.post("obj/objadd", this.form).then(res => {
          if (res.data.status == "1") {
            wx.showToast({
              title: "已完成",
              icon: "success",
              duration: 3000
            });
            setTimeout(() => {
              wx.switchTab({
                url: "/pages/index/project/main"
              });
            }, 2000);
          } else {
            wx.showToast({
              title: res.data.message,
              icon: "none",
              duration: 3000
            });
          }
        });
  },
    chooseImage(ace) {
      let _this = this;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          let Cres = res;
          wx.showLoading({
            title: "加载中"
          });
          wx.uploadFile({
            url: "https://m.ruolingroup.com/api/upload",
            header: {
              "Content-Type": "multipart/form-data"
            },
            filePath: res.tempFilePaths[0],
            name: "image",
            complete: function(res) {
              wx.hideLoading();
            },
            success: function(res) {
              if (ace == "brandimage") {
                console.log(Cres);
                _this.brandimage = Cres.tempFilePaths[0];
                _this.form.brandimage = JSON.parse(res.data).data.imgUrl;
              }
              if (ace == "storeimage") {
                _this.storeimage = Cres.tempFilePaths[0];
                _this.form.storeimage = JSON.parse(res.data).data.imgUrl;
              }
              if (ace == "productimage") {
                _this.productimage = Cres.tempFilePaths[0];
                _this.form.productimage = JSON.parse(res.data).data.imgUrl;
              }
              if (ace == "investmentimage") {
                _this.investmentimage = Cres.tempFilePaths[0];
                _this.form.investmentimage = JSON.parse(res.data).data.imgUrl;
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
    predivImage(e) {
      console.log(e);
      wx.previewImage({
        current: e.currentTarget.id,
        urls: this.files
      });
    },
    deleteImg(e) {
      Array.prototype.indexOf = function(val) {
        for (let i = 0; i < this.length; i++) {
          if (this[i] == val) return i;
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
    }
  }
};
</script>
<style scoped>
.gethave {
  margin: 40vh 15px 0px 15px;
}

.weui-vcode-btn {
  /*width: 20vw;*/
  text-align: center;
}

.weui-flex__item image {
  width: 100%;
  height: 25vw;
  margin-bottom: 15rpx;
}

.weui-cell_input {
  margin-bottom: 20rpx;
}

.weui-input {
  border: 1px solid #eee;
  padding-left: 6rpx;
}

.page__desc {
  margin-top: 5px;
  color: #888888;
  text-align: center;
  font-size: 14px;
}

.page__title {
  text-align: center;
  font-size: 20px;
  font-weight: 400;
}

.elw2 {
  padding: 0px 30rpx;
}

.release_list {
  padding-bottom: 0px;
  padding-top: 0px;
}

.release_btn2em {
  padding-top: 50rpx;
  padding-bottom: 40rpx;
}

.release_border {
  border-radius: 5rpx;
  padding: 5rpx;
  border: 1px solid #e5e5e5;
}

.btnsnavi {
  width: 100%;
  position: fixed;
  bottom: 0px;
  left: 0px;
  padding: 0px;
  background: #fff;
}

.btns {
  width: 680rpx;
  height: 88rpx;
  line-height: 88rpx;
  margin: 20rpx 30rpx;
  text-align: center;
  background: #d61518;
  border-radius: 5rpx;
}
</style>
