<template>
  <div>
    <div style="padding-bottom: 50rpx;">
      <div class="weui-toptips weui-toptips_warn" v-if="showTopTips">{{errortext}}</div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input weui-cell_vcode">
          <div class="weui-cell__hd">
            <div class="weui-label">手机号</div>
          </div>
          <div class="weui-cell__bd">
        <!--     <input class="weui-input" placeholder="请输入手机号" placeholder-style="color:#1a1a1a" v-model="form.user_mobile" /> -->
            <div  class="weui-input">
              {{form.user_mobile}}
            </div>
          </div>
         <!--  <div class="weui-cell__ft" style="margin-right:15px;">
            <div class="weui-vcode-btn" v-show="sendAuthCode" @click='hadCode'>获取验证码</div>
            <div class="weui-vcode-btn" v-show="!sendAuthCode">{{auth_time}}秒</div>
          </div> -->
        </div>
       <!--  <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">验证码</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入验证码" placeholder-style="color:#1a1a1a" v-model="form.code" />
          </div>
        </div> -->
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">签名</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入签名" placeholder-style="color:#1a1a1a" v-model="form.user_signature" />
          </div>
        </div>
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">性别</div>
          </div>
          <div class="weui-cell__bd">
            <div class="weui-input" @click="openSex">{{form.user_sex}}</div>
          </div>
        </div>
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">生日</div>
          </div>
          <div class="weui-cell__bd">
            <picker mode="date" value="date" start="1950-09-01" end="2022-09-01" @change="bindDateChange">
              <div class="weui-input">{{form.user_birthday}}</div>
            </picker>
          </div>
        </div>
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">所在地</div>
          </div>
          <div class="weui-cell__bd">
            <picker mode="region" @change="bindRegionChange" :value="user_address" >
              <div class="picker">
                {{user_address[0]}},{{user_address[1]}},{{user_address[2]}}
              </div>
            </picker>
          </div>
        </div>
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">您的身份</div>
          </div>
          <div class="weui-cell__bd">
            <picker @change="bindyourIdentitys" :value="form.your_identity" :range="your_identitys">
              <view class="picker">
                {{form.your_identity}}
              </view>
            </picker>
          </div>
        </div>
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">感兴趣的行业</div>
          </div>
          <div class="weui-cell__bd">
            <picker @change="interestedInIndustrys" :value="form.interested_in_industry" :range="interested_in_industrys">
              <view class="picker">
                {{form.interested_in_industry}}
              </view>
            </picker>
          </div>
        </div>
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">准备什么时候创业</div>
          </div>
          <div class="weui-cell__bd">
            <picker @change="whenReadyToEntrepreneurships" :value="form.when_ready_to_entrepreneurship" :range="when_ready_to_entrepreneurships">
              <view class="picker">
                {{form.when_ready_to_entrepreneurship}}
              </view>
            </picker>
          </div>
        </div>
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">计划投资加盟规模</div>
          </div>
          <div class="weui-cell__bd">
            <picker @change="plansToInvests" :value="form.plans_to_invest" :range="plans_to_invests">
              <view class="picker">
                {{form.plans_to_invest}}
              </view>
            </picker>
          </div>
        </div>
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">计划在哪里创业</div>
          </div>
          <div class="weui-cell__bd">
            <picker @change="whereBusinessPlan" :value="form.where_business_plan" :range="where_business_plans">
              <view class="picker">
                {{form.where_business_plan}}
              </view>
            </picker>
          </div>
        </div>
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">计划做成多大规模</div>
          </div>
          <div class="weui-cell__bd">
            <picker @change="plansToMakeEoreMassive" :value="form.plans_to_make_more_massive" :range="plans_to_make_more_massives">
              <view class="picker">
                {{form.plans_to_make_more_massive}}
              </view>
            </picker>
          </div>
        </div>
        <!--  <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">所在地</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入所在地" v-model="form.user_address" />
          </div>
        </div> -->
        <!--  <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">学校</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入学校" v-model="form.user_school" />
          </div>
        </div> -->
        <!--      <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">行业</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入行业" v-model="form.user_industry" />
          </div>
        </div> -->
        <div style="padding:0px 15px;margin-top:30px">
          <button class="weui-btn bagred" type="primary" @click="clickBtn">修改</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import getLogin from "@/components/getLogin"
import city from '@/weui/city'
export default {
  data() {
    return {
      showTopTips: false,
      errortext: "",
      sendAuthCode: true /*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */ ,
      auth_time: 0 /*倒计时 计数器*/ ,
      form: {
        user_nickname: "",
        user_mobile: "",
        // user_email: "",
        user_avatar: "",
        user_signature: "",
        user_sex: "",
        user_birthday: "",
        user_address: "",
        your_identity: "",
        interested_in_industry: "",
        when_ready_to_entrepreneurship:"",
        plans_to_invest: "",
        where_business_plan: '',
        plans_to_make_more_massive: "",
        // user_school: "",
        // user_industry: "",
        // code: ""
      },
      user_address:"",
      Userinfo: "",
      your_identitys: [
        "A.项目方，来展示自己的项目",
        "B.创业者，来寻求好项目加盟",
        "C.分享者，来逛项目且分享项目赚取福利与佣金"
      ],
      interested_in_industrys: [
        "A.服装鞋包",
        "B.特色餐饮",
        "C.美容饰品",
        "D.家居环保",
        "E.教育网络",
        "F.生活服务",
        "G.其他"
      ],
      plans_to_invests: [
        " A.3万以下",
        "B.3~5万",
        "C.5~10万",
        "D.10~20万",
        "E.20万以上"
      ],
      when_ready_to_entrepreneurships:[
        "A.一个月内",
        "B.一年以内",
        "C.2~3年内",
        "E.5年以后",
      ],
      where_business_plans: [
        "A.北上广深",
        "B.省会城市",
        "C.三级城市",
        "D.县级市",
        "E.乡镇"
      ],
      plans_to_make_more_massives: [
        " A.0~5家门店",
        "B.5~20家门店",
        "C.20~50家门店",
        "D.50~100家门店",
        "E.100家以上"
      ]
    };
  },
  onLoad() {
    Object.assign(this.$data, this.$options.data())
    // console.log(city)
      wx.setNavigationBarTitle({
      title: "修改个人资料"
    })
  },
  onShow(){
    this.getData()
  },
  methods: {
      getData() {
      this.$http.post('users/getUserinfo', {}).then(res => {
        // console.log(res.data.data)
        this.form = res.data.data
        // this.form.user_address==''?this.form.user_address=["请选择","请选择","请选择"]:this.form.user_address=JSON.parse(res.data.data.user_address)
          this.form.user_address==''?this.user_address=["请选择","请选择","请选择"]:this.user_address=JSON.parse(res.data.data.user_address)
        console.log(this.form.user_address)
        this.form.your_identity==null?this.form.your_identity='暂无':this.form.your_identity
        console.log(this.form.your_identity)
        this.form.when_ready_to_entrepreneurship==null?this.form.when_ready_to_entrepreneurship='暂无':this.form.when_ready_to_entrepreneurship   
        this.form.plans_to_invest==null?this.form.plans_to_invest='暂无':this.form.plans_to_invest   
        this.form.plans_to_make_more_massive==null?this.form.plans_to_make_more_massive='暂无':this.form.plans_to_make_more_massive   
        this.form.where_business_plan==null?this.form.where_business_plan='暂无':this.form.where_business_plan
         this.form.interested_in_industry==null?this.form.interested_in_industry='暂无':this.form.interested_in_industry

         if (res.data.data.user_sex == 1) {
          this.form.user_sex = '男'
        }
        if (res.data.data.user_sex == 0) {
          this.form.user_sex = '女'
        }
      })
    },
    whenReadyToEntrepreneurships(e){
      console.log(e)
      this.form.when_ready_to_entrepreneurship = this.when_ready_to_entrepreneurships[e.mp.detail.value]
    },
    plansToMakeEoreMassive(e) {
      this.form.plans_to_make_more_massive = this.plans_to_make_more_massives[e.mp.detail.value]
    },
    whereBusinessPlan(e) {
      this.form.where_business_plan = this.where_business_plans[e.mp.detail.value]
    },
    plansToInvests(e) {
      this.form.plans_to_invest = this.plans_to_invests[e.mp.detail.value]
    },
    bindRegionChange: function(e) {
      this.user_address = e.mp.detail.value
      console.log(this.user_address)
    },
    interestedInIndustrys(e) {
      this.form.interested_in_industry = this.interested_in_industrys[e.mp.detail.value]
    },
    bindyourIdentitys(e) {
      this.form.your_identity = this.your_identitys[e.mp.detail.value]
    },
    bindDateChange(e) {
      this.form.user_birthday = e.mp.detail.value;
      console.log(e.mp.detail.value);
    },
    openSex() {
      const _this = this;
      wx.showActionSheet({
        itemList: ["女", "男"],
        success: function(res) {
          if (res.tapIndex == "0") {
            _this.form.user_sex = "女";
          } else {
            _this.form.user_sex = "男";
          }
        }
      });
    },
    // huoqu yanzhengma
    hadCode() {
      const _this = this;
      if (this.form.user_mobile == '') {
        wx.showToast({
          title: '请填写手机号',
          icon: 'none'
        })
      } else {
        _this.$http
          .post("users/sendVerificationCode", {
            user_mobile: _this.form.user_mobile
          })
          .then(res => {
            if (res.data.status == "1") {
              _this.sendAuthCode = false;
              _this.auth_time = 60;
              var auth_timetimer = setInterval(() => {
                _this.auth_time--;
                if (_this.auth_time <= 0) {
                  _this.sendAuthCode = true;
                  clearInterval(auth_timetimer);
                }
              }, 1000);
            } else {
              _this.showTopTips = true;
              _this.errortext = res.data.message;
              setTimeout(() => {
                _this.showTopTips = false;
              }, 2000);
            }
          });
      }
    },
    // queding
    clickBtn() {
       this.form.user_address = JSON.stringify(this.user_address)
      const _this = this;
      // this.form.user_nickname = this.Userinfo.nickName;
      // this.form.user_avatar = this.Userinfo.avatarUrl;
        this.$http
          .post("users/editUserinfo", _this.form)
          .then(res => {
            // console.log(res.data.message);
            // if (res.data)
              if (res.data.status == "1") {
                wx.setStorage({
                  key: "userMobile",
                  data: _this.form.user_mobile
                });
                wx.showToast({
                  title: '成功',
                  icon: 'success'
                })
                setTimeout(() => {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 2000);
              } else {
                // this.form.user_address = JSON.parse(this.form.user_address)
                _this.showTopTips = true;
                _this.errortext = res.data.message;
                setTimeout(() => {
                  _this.showTopTips = false;
                }, 2000);
              }
          })
          .catch(error => {
            // console.log(error);
          });
      }

  },
};

</script>
<style scoped>
.gethave {
  margin: 40vh 15px 0px 15px;
}

.weui-vcode-btn {
  width: 20vw;
  text-align: center;
  color: #d61518
}

.weui-cell {
  border-bottom: 1px solid #e5e5e5;
  height: 60px;
}

.weui-label {
  font-size: 14px;
  width: 240rpx;
}

.weui-cell__bd {
  font-size: 14px;
}

.weui-vcode-btn {
  font-size: 14px;
}

</style>
