import Vue from 'vue'
import App from './App'
import store from './store';
import Fly from "flyio/dist/npm/wx";
// import global from './weui/utils' //全局变量
// Vue.prototype.GLOBAL = global;  //绑定到vue原型上

Vue.prototype.$store = store;
var fly = new Fly;
fly.interceptors.request.use((config, promise) => {
  if (config.body.token == undefined) {
    config.body.token = wx.getStorageSync('token')
  }
  if (config.body.sss == 'sss') {
    wx.showLoading({
      title: "生成长图中",
      mask: true
    })
  } else {
    wx.showLoading({
      title: "数据加载中",
      mask: true
    })
  }

  //给所有请求添加自定义header
  config.headers["X-Tag"] = "multipart/form-data";
  return config;
})
fly.interceptors.response.use(
  (response) => {
    wx.hideLoading()
    // if (response.data.status == "21") {
    //   wx.redirectTo({
    //     url: '/pages/index/index/main'
    //   })
    // }
    // console.log(response.data.status)

    // console.log(response.data.status)

    if(response.data.message=='token不能为空'){
      wx.reLaunch({
        url: '/pages/index/index/main'
      });
    }

    switch (response.data.status) {
      case 1:
        break;
      case '21':
      console.log("111")
        wx.redirectTo({
          url: '/pages/index/index/main'
        });
        break;
      case 500:
        wx.showModal({
          content: '服务器错误',
          showCancel: false
        });
        break;
      case 0:
        wx.showModal({
          content: '请求失败',
          showCancel: false
        });
        break;

      default:
        return response;
    }

    // if (response.data.message == "token不能为空") {
    //   wx.redirectTo({
    //     url: '/pages/index/index/main'
    //   })
    // }
    // return response;
  },
  (error) => {
    wx.hideLoading()
    switch (error.status) {
      case 0:
        break;
      case 500:
        wx.showModal({
          content: '服务器错误',
          showCancel: false
        });
        break;
      case 1:
        wx.showModal({
          content: '请求失败',
          showCancel: false
        });
        break;

      default:
        wx.showModal({
          content: '未知错误',
          showCancel: false
        });
        return Promise.reject(error.response)
    }
  }
)
import '@/weui/weui.css'
//配置请求基地址
fly.config.baseURL = 'https://m.ruolingroup.com/api/v1/';
Vue.prototype.$http = fly;

Vue.config.productionTip = false;
App.mpType = 'app';

const app = new Vue({ App })
app.$mount();
