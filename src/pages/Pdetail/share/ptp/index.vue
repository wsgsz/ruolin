<template>
  <div>
    <div class="weui-cells weui-cells_after-title ">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <div style="width:2px;height:20px;background:red;margin-right:15px;"></div>
        </div>
        <div class="weui-cell__bd fw500">分享项目</div>
      </div>
    </div>
    <div class="weui-cells_li btn2em">
      <navigator :url="'/pages/project/preheat/detail/main?objId='" class="weui-cell p50">
        <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
          <image :src="list.objfirstimage" class="logo_index" />
        </div>
        <div class="weui-cell__bd" style="height:220rpx;">
          <div style="margin-bottom:15rpx;line-height: 1">{{list.obj_name}}</div>
          <div class="text2" style="margin-bottom:14rpx;">
            <div class="industry_name_l1">{{list.industry_name}}</div>
            {{list.introducecontent}}
          </div>
          <div class="elfont26" style="width:100%;display:flex">
            <div style="width:50%">
              <image src="/static/image/mbmd.png" class="iconimage" />现有门店:
              <span class="red">{{list.target_stores}}</span>
            </div>
            <div style="width:50%">
              <image src="/static/image/cjrs.png" class="iconimage" /> 分享人数:
              <span class="red">{{list.browse}}人</span>
            </div>
          </div>
          <div class="elfont26" style="width:100%;display:flex;">
            <div style="width:50%">
              <image src="/static/image/yunying.png" class="iconimage" /> 运营面积:
              <span class="red">{{list.operating_space}}</span>
            </div>
            <div style="width:50%">
              <image src="/static/image/dianjun.png" class="iconimage" /> 投资金额:
              <span class="red">{{list.invest_money}}元</span>
            </div>
          </div>
          <!--    <div class="fx_el" style="margin-bottom:7rpx">
            <div>
              <image src="/static/image/dianjun.png" class="iconimage" /> 店均盈利:
              <span class="red">{{list.profit}} </span></div>
            <div>
              <image src="/static/image/mbmd.png" class="iconimage" />现有门店:<span class="red">{{list.target_stores}} </span>
            </div>
          </div>
          <div class="fx_el">
            <div>
              <image src="/static/image/cjrs.png" class="iconimage" />分享人数:
              <span class="red">{{list.browse}}人</span></div>
            <div>
              <image src="/static/image/guimo.png" class="iconimage" />规模:<span class="red">{{list.stores}}</span></div>
          </div> -->
        </div>
      </navigator>
    </div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell" style="padding-top:50rpx;padding-bottom:50rpx;">
        <div class="weui-cell__hd">
          <div style="width:2px;height:20px;background:red;margin-right:15px;"></div>
        </div>
        <div class="weui-cell__bd fw500">添加您分享项目的简介</div>
      </div>
    </div>
    <div class="weui-cells weui-cells_after-title ">
      <div class="weui-cell" style="padding-top:0px;padding-bottom:0px;">
        <div class="weui-cell__bd">
          <textarea class="weui-textarea" placeholder="请输入介绍" v-model="textcontent" style="height: 3.7em;border:1px solid #e5e5e5;padding:10rpx 30rpx 10rpx 30rpx ;box-sizing:border-box" />
          </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <button class="bagred" type="primary" open-type="share" @click="handleTapShareButton()">分享</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: "",
      textcontent: "",
      kong: false,
      objId:''
    }
  },
  onLoad(e) {
    Object.assign(this.$data, this.$options.data())
    this.objId = e.objId
    this.getList(e.objId)
  },
  onShareAppMessage: function() {
    const _this = this
    return {
      title: _this.list.name_company,
      desc: _this.textcontent,
      path: 'pages/project/details/main?objId='+_this.list.obj_id,
      success: function(res) {},
      fail: function(res) {}
    }
  },
  methods: {
    getList(objId) {
      this.$http.post('obj/details', { id: objId }).then(res => {
        if (res.data.status == '1') {
          this.list = res.data.data.list
          console.log(this.list)
        } else {
          this.kong = true
        }
      })
    },
  handleTapShareButton() {
    //  有效分享
    console.log("111111")
    this.$http.post('favorite/objsharesadd', { lei: 2, obj_id: this.objId }).then(res => {
      setTimeout(() => {
        wx.showToast({
          title: '已完成',
          icon: 'success',
          duration: 3000
        });
      }, 2000)
    })
  },
}
  }

</script>
<style scoped>
.ranking_top {
  zoom: 1;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  flex: 1
}

.ranking_top div {
  float: left;
  font-size: 14px;
  flex-grow: 1;
  text-align: center
}

.fx_el {
  font-size: 20rpx;
  color: #888888;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  white-space: nowrap;
}

.textbox {
  box-shadow: 0rpx 0rpx 4rpx 4rpx #f6f6f6;
}

</style>
