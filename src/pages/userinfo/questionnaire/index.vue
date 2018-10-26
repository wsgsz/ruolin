<template>
  <div class="page">
    <div class="page__bd">
      <div class="weui-toptips weui-toptips_warn" v-if="showTopTips">请保证所有题目都已选择</div>
      <div class="fw28" style="padding:45rpx 30rpx 48rpx 30rpx;">
        填写品牌名称以及官网地址：
      </div>
      <div class="weui-cell weui-cell_input" style="margin-bottom:30rpx;">
        <div class="weui-cell__hd">
          <div class="weui-label" style="width:140rpx;font-size:14px">品牌名称:</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="brandname" style="border:1px solid #e5e5e5;padding-left:10px;" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label" style="width:140rpx;font-size:14px">官网名称:</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="brandurl" style="border:1px solid #e5e5e5;padding-left:10px"/>
        </div>
      </div>
      <div v-for="(list,index) in data" :key="index" class="padding30">
        <div class="weui-media-box__title fw28">{{list.title}}</div>
        <div v-if="list.type=='radio'" style="width: 100%;overflow: hidden;">
          <radio-group class="group" @change="radioChange($event,index)">
            <div class="label-2 els" v-for="(item,indexs) in list.obj" :key="indexs">
              <radio color="#d61518" :id="item.name" :value="item.name"></radio>
              <label class="label-2-text" :for="item.name">
                <text>{{item.name}}</text>
              </label>
            </div>
          </radio-group>
        </div>
        <div v-if="list.type=='checked'" style="width: 100%;overflow: hidden;">
          <checkbox-group class="group" @change="checkboxChange($event,index)">
            <div class="label-1 els" v-for="(item,indexs) in list.obj" :key="indexs">
              <label>
                <checkbox color="#d61518" :value="item.name"></checkbox>
                <text class="label-1-text">{{item.name}}</text>
              </label>
            </div>
          </checkbox-group>
        </div>
      </div>
      <div class="weui-btn-area">
        <button class="weui-btn btnsend_shenhe" type="primary" @click="showTopTipsFun">确定</button>
      </div>
      <div style="padding:0px 30rpx 128rpx 30rpx;color:#92969c;font-size:12px;line-height:20px;">
        提交审核问卷后，平台将对您的品牌进行简单调查，预计一个工作日内回复。您可以在‘消息’界面查收，如果审核成功，平台将在第一时间为您上传项目详情。
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [{
        title: "1.是否拥有过硬的项目技术背书？",
        type: "radio",
        obj: [
          { name: '拥有稀缺的技术背书', value: '1' },
          { name: '拥有技术背书', value: '2' },
          { name: '没有技术背书', value: '3' }
        ]
      }, {
        title: "2.全国拥有多少家实体店？",
        type: "radio",
        obj: [
          { name: '5家以下', value: '1' },
          { name: '5~20家', value: '2' },
          { name: '20家以上', value: '3' }
        ]
      }, {
        title: "3.是否拥有比较成熟的商业模式？",
        type: "radio",
        obj: [
          { name: '还没有比较成熟的商业模式', value: '1' },
          { name: '拥有一套自己的商业模式', value: '2' },
          { name: '拥有异于其他品牌的创业商业模式', value: '3' }
        ]
      }, {
        title: "4.是否拥有销量可观的爆款产品/服务？",
        type: "radio",
        obj: [
          { name: '是', value: '1' },
          { name: '否', value: '2' },
          { name: '是，且产品拥有独特的销售卖点', value: '3' }
        ]
      }, {
        title: "5.是否拥有一定的产品/技术壁垒？",
        type: "radio",
        obj: [
          { name: '是', value: '1' },
          { name: '否', value: '2' }
        ]
      }, {
        title: "6.是否拥有成熟的招商经验？",
        type: "radio",
        obj: [
          { name: '没有经验', value: '1' },
          { name: '有一定经验', value: '2' },
          { name: '有相对成熟的经验', value: '3' }
        ]
      }, {
        title: "7.品牌是否有广告公司代理？",
        type: "radio",
        obj: [
          { name: '从没有过', value: '1' },
          { name: '从没有过', value: '2' },
          { name: '目前还没有广告公司代理', value: '3' }
        ]
      }, {
        title: "8.来若邻汇平台的目的是什么？（多选）",
        type: "checked",
        obj: [
          { name: '利用平台属性招商引资', value: '1' },
          { name: '利用平台玩法扩大品牌知名度', value: '2' },
          { name: '利用平台玩法扩大品牌知名度', value: '3' },
          { name: '其他', value: '4' }
        ]
      }],
      isAgree: {},
      brandname: "",
      brandurl: "",
      showTopTips: false
    }
  },
  onLoad() {
         Object.assign(this.$data, this.$options.data())
    wx.setNavigationBarTitle({
      title: "资质审核"
    })
  },
  methods: {
    getList() {
      this.$http.post('users/brandcheck', {}).then(res => {
        // console.log(res)
      })
    },
    checkboxChange: function(e, index) {
      this.isAgree[parseInt(index + 1)] = e.mp.detail.value
      this.showTopTips = false
    },
    radioChange(e, index) {
      this.isAgree[parseInt(index + 1)] = e.mp.detail.value
      this.showTopTips = false
    },
    showTopTipsFun() {
      console.log(this.isAgree)
      for (var i = this.data.length; i > 0; i--) {
        // console.log(this.isAgree[i])
        if (this.isAgree[i] == undefined) {
          this.showTopTips = true
        }
      }

      if (this.showTopTips == false) {
        this.$http.post('users/brandcheck', {
          json_answer:JSON.stringify(this.isAgree),
          brandname: this.brandname,
          brandurl: this.brandurl
        }).then(res => {
          if (res.data.status == "1") {
            wx.showModal({
              title: "成功",
              content: '提交审核问卷后，平台将对您的品牌进行简单调查，预计一个工作日内回复，您可以在“消息”界面查收，如果审核成功，平台将在第一时间为您上传项目详情。',
              showCancel: false,
              complete: function() {
                wx.switchTab({
                  url: "/pages/index/userinfo/main"
                })
              }
            });
          }
        })
      }
    }
  }
}

</script>
<style scoped>
.border_bottom {
  border-bottom: 1px solid #e5e5e5
}

.weui-media-box__title {
  padding-bottom: 8rpx;
}

.group .els {
  padding: 14rpx 0rpx;
  font-size: 13px;
  display: flex;
  align-items: center;
}

.padding30 {
  padding: 30rpx;
}

.btnsend_shenhe {
  width: 150rpx;
  height: 56rpx;
  line-height: 56rpx;
  background: #d61518 !important;
  font-size: 13px;
  border-radius: 5rpx !important;
  margin-bottom: 20rpx;
}
.fw28{
  font-size:14px;font-weight:600
}
label{
  width: 100%;
  display: block;
}
.group label {
  padding: 0 0 0 10rpx;
  margin: 0;
  float: none;
  font-size: 13px;
}
</style>
