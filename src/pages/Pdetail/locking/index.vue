<template>
  <div class="page">
    <div class="weui-article" >
      <div class="weui-article__section" style="padding:30rpx;background: #f6f6f6">
        <!-- <div class="weui-article__title"></div> -->
          <div class="weui-cell" style="padding-left: 0px;">
        <div class="weui-cell__hd">
          <div class="detail_one"></div>
        </div>
        <div class="weui-cell__bd cricle_index_guanzhu">
          <div class="fw500" style="font-weight: 600">锁定项目说明：</div>
        </div>
      </div>

        <div class="weui-article__section">
          <div class="weui-article__h3"></div>
          <div class="weui-article__p">
            1.您需要向平台支付一笔金额进行项目锁定，锁定某项目在某一区域内15天的成交权，只要项目在区域内成交你都可以参与获得佣金。
          </div>
          <div class="weui-article__p">
            2.“项目锁定”分为“单店锁定”和“代理锁定”。单店锁定在项目成交后可以获得项目佣金，代理锁定获得项目佣金。佣金池的余额由分享者们平分。
          </div>
          <div class="weui-article__p">
            3.若项目被“单店锁定”依然可以被“代理锁定”。但如果项目先被“代理锁定”则无法被单店锁定。（用户进行“代理锁定之后再促成交易即可独吞佣金池）
          </div>
          <div class="weui-article__p">
            4.锁定费用需要上税，若项目成交所折返的佣金也需要锁定者自行缴纳。
          </div>
          <div class="weui-article__p">
            5.若项目下架，锁定费用会予以返还，来回的税点需要锁定者自行缴纳。
          </div>
          <div class="weui-article__p">
            6.若在“项目锁定”期间，被锁定的项目于平台下架，平台会全额退还用户锁定项目所支付的金额。
          </div>
        </div>
      </div>
    </div>
    <div class="weui-toptips weui-toptips_warn" v-if="error">{{errortext}}</div>
    <div :class="{'pickerMask':isShowMask}" @click="maskClick" catchtouchmove="true"></div>
    <div class="lock_bdcity">
      <div class="lock_bdcity_left"> 选择您的绑定区域：</div>
      <div class="lock_bdcity_right" @click="showPickerView">{{listcity}}</div>
    </div>
    <div class="weui-picker" :class="{'weui_picker_view_show':pickerShow}">
      <div class="weui-picker__hd">
        <div href="javascript:;" class="weui-picker__action" @click="pickerCancel">取消</div>
        <div href="javascript:;" class="weui-picker__action" @click="pickerConfirm">确定</div>
      </div>
      <picker-view indicator-style="height: 40px;" :value="pickerValue" class="weui_picker_view" @change="pickerChange">
        <picker-view-column>
          <div class="picker-item" v-for="(item,index) in columuOne" :key="index">{{item}}</div>
        </picker-view-column>
        <picker-view-column>
          <div class="picker-item" v-for="(item,index) in columnTwo" :key="index">{{item}}</div>
        </picker-view-column>
      </picker-view>
    </div>
    <!-- <div class="weui-cells__title">单选列表项</div> -->
    <div class="weui-cells lock_type weui-cells_after-title">
      <radio-group @change="radioChange" style="display:flex;font-size:14px;">
        <label class="weui-cell weui-check__label" v-for="item in radioItems" style="width:50%" v-bind:key="item.index">
          <radio class="weui-check" color="#d61518" :value="item.value" :disabled='item.disabled' :checked="item.checked" />
          <div class="weui-cell__bd">{{item.name}}</div>
          <div class="weui-cell__ft weui-cell__ft_in-radio" v-if="item.checked">
            <icon class="weui-icon-radio" color="#d61518" type="success_no_circle" size="16"></icon>
          </div>
        </label>
      </radio-group>
    </div>
    
        <checkbox-group @click="bindAgreeChange">
      <label class="weui-agree" for="weuiAgree">
        <div class="weui-agree__text">
          <checkbox class="weui-agree__checkbox" id="weuiAgree" value="agree" checked="isAgree" />
          <div class="weui-agree__checkbox-icon">
            <icon class="weui-agree__checkbox-icon-check" color="#d61518" type="success_no_circle" size="9" v-if="isAgree"></icon>
          </div>
          阅读并同意
          <navigator url="" class="weui-agree__link" style="color:#d61518">《法律文书》</navigator>
        </div>
      </label>
    </checkbox-group>

    <div class="send_click">
     &nbsp;
    </div>

    <button class="weui-btn" type="primary" @click="btnClick()" style="background:#1a1a1a;margin:15px">立即支付</button>
    <div style="color:#999999;font-size:13px;text-align:center">
      投资有风险，锁定需谨慎
    </div>
  </div>
</template>
<script>
// var util = require('../../utils/md5.js')
// import { util } from '@/utils/md5'
export default {
  data() {
    return {
      obj_id: "",
      pickerShow: false,
      isShowMask: false,
      mulLinkAgeArray: "",
      pickerValue: [0, 1],
      columuOne: [],
      columnTwo: [],
      listcity: "选择城市",
      radioItems: [
        {
          name: "单店锁定：1000元",
          total_fee: "1000",
          value: "1",
          checked: false
        },
        {
          name: "代理锁定：3500元",
          total_fee: "3500",
          value: "2",
          checked: false
        }
      ],
      form: {
        obj_id: "",
        area_id: "",
        lei: "",
        bidingtime: "",
        total_fee: ""
      },
      error: false,
      errortext: "",
      isAgree: false
    };
  },
  onShow() {
    this.isAgree = false;
    // this.getData(this.obj_id);
  },
  onLoad(e) {
    Object.assign(this.$data, this.$options.data());
    this.obj_id = e.obj_id;
    this.form.obj_id = "";
    this.form.area_id = "";
    this.form.lei = "";
    this.form.bidingtime = "";
    this.form.total_fee = "";
    this.form.obj_id = e.obj_id;
    this.getData(e.obj_id);
  },
  methods: {
    bindAgreeChange(e) {
      this.isAgree = !this.isAgree;
    },
    btnClick() {
      const _this = this;
      if (_this.form.area_id == "") {
        _this.error = true;
        _this.errortext = "请选择地区";
      } else if (_this.form.lei == "") {
        _this.error = true;
        _this.errortext = "当前地区已锁定";
      } else if (_this.isAgree == false) {
        _this.error = true;
        _this.errortext = "请确定已经阅读法律文书";
      } else {
        _this.form.bidingtime = new Date().getTime();
        _this.$http.post("wechatpay/wxlogin", _this.form).then(res => {
          wx.requestPayment({
            timeStamp: res.data.data.timeStamp,
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            signType: "MD5",
            paySign: res.data.data.paySign,
            success: function(res) {
              _this.form.bidingtime = Date.parse(new Date());
              _this.$http.post("obj/binding", _this.form).then(res => {
                if (res.data.status == "1") {
                  setTimeout(() => {
                    wx.showToast({
                      title: "已完成",
                      icon: "success",
                      duration: 3000
                    });
                  }, 2000);
                  wx.navigateBack({
                    delta: 1
                  });
                }
                // _this.getData(_this.form.obj_id);
              });
            },
            fail: function(res) {
              console.log(res);
            }
          });
        });
      }
    },
    radioChange(e) {
      this.form.lei = e.mp.detail.value;
      if (e.mp.detail.value == "1") {
        this.form.total_fee = "1000";
      } else {
        this.form.total_fee = "3000";
      }
      this.error = false;
      let radioItems = this.radioItems;
      for (let i = 0; i < radioItems.length; ++i) {
        radioItems[i].checked = radioItems[i].value === e.mp.detail.value;
      }
      console.log(radioItems);
      this.radioItems = radioItems;
    },
    maskClick() {
      this.pickerCancel();
    },
    showPickerView() {
      this.isShowMask = true;
      this.pickerShow = true;
    },
    pickerCancel() {
      this.isShowMask = false;
      this.pickerShow = false;
    },
    pickerConfirm() {
      this.isShowMask = false;
      this.pickerShow = false;
    },
    getData(obj_id) {
      const _this = this;
      this.$http.post("obj/objbind", { id: obj_id }).then(res => {
        // 处理
        var r = res.data.data.arealist.filter(function(element, index, self) {
          var flag = self;
          if (res.data.data.conarea[element.id] != undefined) {
            if (res.data.data.conarea[element.id].lei == "1") {
              flag[index].children = {
                lei: "1",
                value: "（单店绑定）"
              };
            } else {
              flag[index].children = {
                lei: "2",
                value: "（区域绑定）"
              };
            }
          } else {
            flag[index].children = {
              lei: "0",
              value: "未绑定"
            };
          }
          return flag;
        });
        r.unshift({
          agentmoney: "",
          areaname: "请选择",
          children: {
            lei: "",
            value: ""
          },
          danmoney: "",
          id: "",
          level: "0"
        });
        this.mulLinkAgeArray = r;
        console.log(r);
        this._initPicker();
      });
    },

    pickerChange(e) {
      let _this = this;
      this.error = false;
      this.form.lei = "";
      this.form.total_fee = "";
      let value = e.mp.detail.value;

      // 如果是第一列滚动
      if (value[0] !== _this.pickerValue[0]) {
        let columnTwoNew = _this.mulLinkAgeArray[value[0]].children.value || "";
        _this.columnTwo = [];
        _this.columnTwo.push(columnTwoNew);

        _this.pickerValue[0] = value[0];
        _this.pickerValue[1] = 0;
      }
      _this.listcity =
        _this.mulLinkAgeArray[value[0]].areaname +
        "-" +
        _this.mulLinkAgeArray[value[0]].children.value;
      console.log(
        "选中的值为：" +
          _this.mulLinkAgeArray[value[0]].areaname +
          "-" +
          _this.mulLinkAgeArray[value[0]].children.value
      );
      _this.form.area_id = _this.mulLinkAgeArray[value[0]].id;
      if (_this.mulLinkAgeArray[value[0]].children.lei == "0") {
        _this.form.lei = "1";
        _this.radioItems = [
          {
            name: "单店锁定：1000元",
            total_fee: "1000",
            value: "1",
            checked: false,
            disabled: false
          },
          {
            name: "代理锁定：3500元",
            total_fee: "3500",
            value: "2",
            checked: false,
            disabled: false
          }
        ];
      }
      if (_this.mulLinkAgeArray[value[0]].children.lei == "1") {
        _this.form.lei = "1";
        _this.radioItems = [
          {
            name: "单店锁定：已锁定",
            total_fee: "1000",
            value: "1",
            checked: false,
            disabled: true
          },
          {
            name: "代理锁定：3500元",
            total_fee: "3500",
            value: "2",
            checked: true,
            disabled: false
          }
        ];
      }
      if (_this.mulLinkAgeArray[value[0]].children.lei == "2") {
        _this.form.lei = "";
        _this.radioItems = [
          {
            name: "单店锁定：已锁定",
            total_fee: "1000",
            value: "1",
            checked: false,
            disabled: true
          },
          {
            name: "代理锁定：已锁定",
            total_fee: "3500",
            value: "2",
            checked: false,
            disabled: true
          }
        ];
      }
    },
    _initPicker() {
      let _this = this;
      let mulLinkAgeArray = this.mulLinkAgeArray;
      for (let i = 0; i < mulLinkAgeArray.length; i++) {
        _this.columuOne.push(mulLinkAgeArray[i].areaname);
      }
      // 渲染第二列

      let columnTwoArray = mulLinkAgeArray[_this.pickerValue[0]].children.value;
      _this.columnTwo.push(columnTwoArray);
    },
    bindAccountChange(e) {
      this.accountsIndex = e.mp.detail.value;
    }
  }
};
</script>
<style scoped>
.lock_bdcity {
  padding: 0 15px;
  height: 80rpx;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  line-height: 80rpx;
  color: #333;
}

.lock_bdcity_left {
  text-align: left;
}

.lock_bdcity_right {
  width: 390rpx;
  height: 80rpx;
  text-align: center;
  line-height: 80rpx;
  border: 1px solid #eeeeee;
  border-radius: 5rpx;
  box-sizing: border-box;
}

.send_click {
  display: block;
  text-align: center;
  margin-bottom: 50rpx;
  font-size: 15px;
  margin-top: 50rpx;
}

.lock_type {
  margin-top: 20rpx;
}
</style>
