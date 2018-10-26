<template>
  <div>
    <!-- <web-sorket @getSorket="getSorket"></web-sorket> -->
    <!-- <navigator url="/pages/information/websorket/main">websorket</navigator> -->
    <div class="weui-flex information">
      <div class="weui-flex__item">
        <div class="information_text" :class="{active:type=='1'}" @click="btnclick('1')" style="position: relative;">私信
          <view class="is_read_el" v-if="directMessagesUnread!=''&& directMessagesUnread!='0' ">{{directMessagesUnread}}</view>
        </div>
      </div>
      <div class="weui-flex__item">
        <div class="information_text" :class="{active:type=='2'}" @click="btnclick('2')">通知</div>
      </div>
    </div>
    <!-- 私信 -->
    <div v-show="type=='1'">
      <div class="weui-cells weui-cells_after-title btn2em">
        <div class="weui-cell">
          <div class="weui-cell__bd">收到私信给我发送服务消息</div>
          <div class="weui-cell__ft">
            <switch :checked="service_state" color="#d61518" @change="switchChange" />
          </div>
        </div>
      </div>
      <div class="weui-cell weui-cell_access btn2em" @click="phonetel">
        <div class="weui-cell__bd">
          <div style="display: inline-block; vertical-align: middle">点击联系若邻汇客服</div>
        </div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </div>
      <div class="weui-cells weui-cells_after-title">
        <div class="infoAll" v-for="(item,index) in data" :key="index">
          <!-- {{item.img}} -->
          <ul v-if="!item.top">
            <li @touchstart="touchStart($event)" @touchend="touchEnd($event,index)" :data-type="item.type">
              <div class="imgInfo" @click="recover(index,item.receive_uid,item.user_avatar,item.user_nickname)">
                <img :src="item.user_avatar">
            </div>
                <div class="centerInfo" @click="recover(index,item.receive_uid,item.user_avatar,item.user_nickname)">
                  <div class="name">
                    <span>{{item.user_nickname}}</span>
                  </div>
                  <div class="sonName" v-if="item.content_type=='1'">
                    <span>{{item.content}}</span>
                  </div>
                    <div class="sonName"  v-if="item.content_type=='2'">
                    <span>[你收到一条语音消息]</span>
                  </div>
                    <div class="sonName"  v-if="item.content_type=='3'">
                    <span>[位置]</span>
                  </div>
                </div>
                <div class="timeInfo" @click="recover(index,item.receive_uid,item.user_avatar,item.user_nickname)">
                  <div class="time">
                    <text>{{item.time}}</text>
                  </div>
                  <view class="infoNum" v-if="item.is_read!='0'">{{item.is_read}}</view>
                </div>
                <div class="delect" @click="delect(index,item.receive_uid)">
                  删除
                </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="weui-loadmore" v-show="more1">
        <div class="weui-loading"></div>
        <div class="weui-loadmore__tips">正在加载</div>
      </div>
      <div class="weui-loadmore weui-loadmore_line" v-show="!more1">
        <div class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无数据</div>
      </div>
    </div>
    <div v-show="type=='2'">
      <div class="weui-panel__bd">
        <navigator url="" class="weui-media-box weui-media-box_appmsg" v-for="(list,indexs) in notiList" :key="indexs">
          <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
            <image class="weui-media-box__thumb" :src="list.user_avatar" />
          </div>
          <div class="weui-media-box__bd weui-media-box__bd_in-appmsg elname">
            <div class="weui-media-box__title el-btn">{{list.user_nickname}}
              <div class="el_time">{{list.add_time}}</div>
            </div>
            <div class="weui-media-box__desc">
              {{list.content}}
            </div>
          </div>
        </navigator>
      </div>
      <div class="weui-loadmore" v-show="more2">
        <div class="weui-loading"></div>
        <div class="weui-loadmore__tips">正在加载</div>
      </div>
      <div class="weui-loadmore weui-loadmore_line" v-show="!more2">
        <div class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无数据</div>
      </div>
    </div>
  </div>
</template>
<script>
import webSorket from '@/components/webSorket'
export default {
  data() {
    return {
      data: [],
      notiList: [],
      type: "1",
      page1: 1,
      page2: 1,
      last_id1: "",
      last_id2: "",
      service_state: "",
      more1: true,
      more2: true,
      type: 1,
      directMessagesUnread: ""
    }
  },
  // onShow() {
  //   this.page1=1
  //   this.page2 =2
  //   this.last_id1=''
  //   this.last_id2=""
  //   this.move1 = true
  //   this.move2 =true 
  //   this.type = "1"
  //   this.getState()
  // },
  // onLoad() {
  //   // this.data=[]
  //   // this.notiList=[]
  //   Object.assign(this.$data, this.$options.data())
  //   this.getState()
  //   this.getList(this.page1, this.last_id1)
  //   this.getNotice(this.page2, this.last_id2)
  // },
  onLoad() {

    this.getState()
    this.getSorket()
    // this.getList(this.page1, this.last_id1)
    this.getNotice(this.page2, this.last_id2)
  },
  onShow() {
    this.page1 = 1
    this.page2 = 2
    this.last_id1 = ''
    this.last_id2 = ""
    this.move1 = true
    this.move2 = true
    this.type = "1"
    this.data = []
    this.notiList = []
    // Object.assign(this.$data, this.$options.data())
    this.getList(this.page1, this.last_id1)
    this.getNotice(this.page2, this.last_id2)
    this.sendSocket()
  },
  components: {

    webSorket
  },

  methods: {
    getSorket(e) {
      wx.connectSocket({
        url: 'wss://m.ruolingroup.com/wss',
      })
      wx.onSocketOpen(function() {
        wx.sendSocketMessage({
          data: JSON.stringify({ token: wx.getStorageSync("token") }),
          success: function(res) {
            console.log("第一次链接成功")
          },
          fail: function(error) {
          }
        })
      })
    },
    sendSocket() {
      const _this = this
      wx.onSocketMessage(function(res) {
        let e = res.data
        let indexs
        if (JSON.parse(e).type == '2') {
          _this.directMessagesUnread += 1
          JSON.parse(e).is_read = 1
          _this.data.forEach(function(value, index) {
            if (value.receive_uid == JSON.parse(e).receive_uid) {
              indexs = index
            }
          })
          if (indexs != undefined) {
            const arrEntities = {
            lt: "<",
            gt: ">",
            nbsp: " ",
            amp: "&",
            quot: '"'
          };
          //  处理语音
            if(JSON.parse(e).content_type=='2'||JSON.parse(e).content_type=='3'){
              _this.data[indexs].content = JSON.stringify(JSON.parse(e).content)
           _this.data[indexs].content= JSON.parse(JSON.parse(e).content.replace(/&(lt|gt|nbsp|amp|quot);/gi, function(all,t) {
                   return arrEntities[t];
                 }))
            _this.data[indexs].content_type = JSON.parse(e).content_type
            }else{
                 _this.data[indexs].content = JSON.parse(e).content
                 _this.data[indexs].content_type ='1'
            }
            _this.data[indexs].time = '刚刚'
            _this.data[indexs].is_read = parseInt(_this.data[indexs].is_read) + 1
            _this.data[indexs].add_time = JSON.parse(e).add_time
    
            // _this.data.splice(indexs,'1',JSON.parse(e))
          } else {
            _this.data.splice(0, 0, JSON.parse(e))
          }
          console.log(_this.data)
          _this.data.sort(function(a, b) {
            return b.add_time - a.add_time 
          })
        }
        // _this.$emit('getSorket', res.data)
      })
    },
    // add_time:1539849872000
    // content:"。"
    // content_type:"1"
    // type:2.
    // user_avatar:"https://wx.qlogo.cn/mmopen/vi_32/nLBN4Pu8E0YHIjrrBImQUc5eXAgiaXTspJ8uauWU4cFJmA5cmOQqKfdH5TQuGsuufHamiaiau17icGY6cd72yytf1Q/132"
    // user_nickname:"我行我素"

    // },
    getState() {
      this.$http.post('users/getUserinfo', {}).then(res => {
        if (res.data.data.service_state == '0') {
          this.service_state = false
        } else {
          this.service_state = true
        }
      })
    },
    btnclick(obj) {
      this.type = obj
    },
    // 首页
    getList(page, last_id) {
      const _this = this
      this.$http.post('message/directMessages', { page: page, last_id: last_id }).then(res => {
        if (res.data.status == '0') {
          _this.more1 = false
        } else {
          if (res.data.data.data.length != 10) {
            this.more1 = false
          }
          this.directMessagesUnread = res.data.data.directMessagesUnread
          console.log(this.directMessagesUnread)

          this.last_id1 = res.data.data.lastId

          res.data.data.data.forEach(function(val, index, arr) {
            val.type = '2'
          });
          this.data = this.data.concat(res.data.data.data)
          console.log(Date.parse(this.data[0].add_time))
          this.data.forEach(function(value, index, arr) {
            value.add_time = Date.parse(value.add_time)
          })
        }
      })
    },
    getNotice(page, last_id) {
      const _this = this
      _this.$http.post('message/notificationList', { page: page, last_id: last_id }).then(res => {
        if (res.data.status == '0') {
          _this.more2 = false
        } else {
          if (res.data.data.data.length != 10) {
            _this.more2 = false
          }
          _this.last_id2 = res.data.data.lastId
          _this.notiList = _this.notiList.concat(res.data.data.data)
          // console.log(_this.notiList)
        }
      })
    },
    switchChange(e) {
      if (e.mp.detail.value == false) {
        this.$http.post('message/OpenService', { service_state: "0" }).then(res => {
          // console.log(res)
        })
      } else {
        this.$http.post('message/OpenService', { service_state: "1" }).then(res => {
          // console.log(res)
        })
      }
      // console.log("switch发生change事件，携带value值为：" + e.mp.detail.value);
    },
    phonetel() {
      wx.makePhoneCall({
        phoneNumber: "4000-191-168"
      })
    },

    touchStart(e) {
      // 获取移动距离，可以通过打印出e，然后分析e的值得出
      this.startX = e.mp.changedTouches[0].clientX;
    },
    // 滑动结束
    touchEnd(e, index) {
      console.log(e.mp.changedTouches[0].clientX)
      // 获取移动距离
      this.endX = e.mp.changedTouches[0].clientX;
      if (this.startX - this.endX > 10) {
        for (let i = 0; i < this.data.length; i++) {
          this.data[i].type = 2
        }
        this.data[index].type = 1
      } else if (this.startX - this.endX < -10) {
        for (let i = 0; i < this.data.length; i++) {
          this.data[i].type = 2
        }
      }

    },
    // 点击回复原状
    recover(index, receive_uid, user_avatar, user_nickname) {
      this.data[index].type = 0
      wx.navigateTo({
        url: '/pages/information/websorket/main?r_id=' + receive_uid + '&userAvatar=' + user_avatar + '&userNickname=' + user_nickname
      })
    },
    // 删除
    delect(index, receive_uid) {
      this.$http.post('message/deleteChat', { receive_uid: receive_uid }).then(res => {
        if (res.data.status == '1') {
          this.data.splice(index, 1);
        }
      })
    }
  },
  async onPullDownRefresh() {
    wx.stopPullDownRefresh();
  },
  onReachBottom() {
    const _this = this;
    if (_this.type == '1' && _this.more1 == true) {
      _this.page1 += 1;
      _this.getList(this.page1, _this.last_id1)
    }
    if (_this.type == '2' && _this.more2 == true) {
      _this.page2 += 1;
      _this.getNotice(_this.page2, _this.last_id2);
    }

  }
}

</script>
<style scoped lang="less">
.information {
  height: 80rpx;
  border-bottom: 1px solid #e6e6e6
}

.information .weui-flex__item {
  text-align: center;
  justify-content: space-between;
  z-index: 11
}

.information .information_text {
  font-size: 36rpx;
  font-weight: 500;
  line-height: 80rpx;
  color: #1a1a1a;
  width: 90rpx;
  /*border-bottom: 2px solid #fff;*/
  margin: auto;
  box-sizing: border-box;
}

.information .information_text.active {
  border-bottom: 2px solid #1a1a1a;
  font-weight: 600;
}

.el-btn {
  margin-bottom: 20rpx;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
}

.el_notice {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
}

.el_time {
  font-size: 24rpx;
}

.is_read {
  position: absolute;
  top: -.4em;
  right: -.4em;
  display: inline-block;
  padding: .15em .4em;
  min-width: 8px;
  border-radius: 18px;
  background-color: #e64340;
  color: #fff;
  line-height: 1.2;
  text-align: center;
  font-size: 12px;
  vertical-align: middle;

}

.is_read_el {
  top: 0rpx;
  right: -5rpx;
  padding: .15em .4em;
  min-width: 8px;
  border-radius: 18px;
  border-radius: 20rpx;
  position: absolute;
  background: #d61518;
  font-size: 11px;
  line-height: 1;
  color: #fff;

}

* {
  margin: 0px;
  padding: 0px;
}

.head {
  width: 100%;
  height: 130rpx;
  background-color: #38A7FA;
  margin-top: -195rpx;
  display: flex;
  align-items: center;

  .head-info {
    color: #fff;
    font-size: 30rpx;
    margin-left: 30%;
    margin-top: 20rpx;
    letter-spacing: 4rpx;
  }

  .userinfo-avatar {
    width: 80rpx;
    height: 80rpx;
    margin: 20rpx;
    border-radius: 50%;
    margin-top: 30rpx;

  }
}

.search {
  width: 90%;
  margin-top: 20rpx;
  margin-bottom: 20rpx;

  input {
    width: 100%;
    height: 20rpx;
    background-color: #F3F3F3;
    border-radius: 5rpx;
    z-index: 0;
  }

  span {
    position: absolute;
    color: #B5B5B5;
    font-size: 24rpx;
    margin-top: -44rpx;
    z-index: 999;
    margin-left: 42%;
    text-align: center;

  }
}

.infoAll {
  width: 100%;
  overflow-x: hidden;

  ul {
    width: 100%;

    // overflow-x: scroll;
    li {
      -webkit-transition: all 0.2s;
      transition: all 0.2s;
      width: 1100rpx;
      height: 150rpx;
      //   background-color: red;
      line-height: 150rpx;
      border-bottom: 1px solid #E0EEF1;
      //   垂直居中，  // 子div水平排列
      display: flex;
      //   justify-content:center;
      align-items: center;

      .imgInfo {
        width: 100rpx;
        height: 100rpx;

        border-radius: 50%;
        background-color: #38A7FA;
        margin-left: 2%;
        position: relative;

        .infoNum {
          position: absolute;
          top: -.4em;
          right: -.4em;
          display: inline-block;
          padding: .15em .4em;
          min-width: 8px;
          border-radius: 18px;
          background-color: #e64340;
          color: #fff;
          line-height: 1.2;
          text-align: center;
          font-size: 12px;
          vertical-align: middle;

        }

        img {
          width: 100rpx;
          height: 100rpx;
          border-radius: 50%;
          overflow: hidden;
        }
      }

      .centerInfo {
        width: 40%;
        height: 150rpx;
        margin-left: 2%;
        overflow-y: hidden;

        .name {
          margin-top: -20rpx;

          span {
            font-size: 35rpx;
          }

        }

        .sonName {
          margin-top: -110rpx;

          span {
            font-size: 24rpx;
            color: #7C8489;
          }

        }

      }

      .timeInfo {
        width: 15%;
        height: 150rpx;
        margin-left: 6%;

        .time {
          margin-top: -20rpx;
          color: #92A0A1;
          font-size: 25rpx;
          position: absolute;
          overflow-y: hidden
        }

        .infoNum {
          width: 40rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 30rpx;
          line-height: 30rpx;
          border-radius: 15rpx;
          font-size: 12px;
          background-color: #d61518;
          margin-left: 30rpx;
          margin-top: 80rpx;
          color: #fff;
        }
      }

      .top {
        width: 15%;
        height: 150rpx;
        background-color: #C4C7CD;
        color: #fff;
        font-size: 34rpx;
        text-align: center
      }

      .delect {
        width: 15%;
        height: 150rpx;
        background-color: #FF3B32;
        color: #fff;
        font-size: 34rpx;
        text-align: center
      }
    }
  }
}

li[data-type="2"] {
  transform: translate3d(0, 0, 0);
}

li[data-type="1"] {
  transform: translate3d(-200rpx, 0, 0);
}

</style>
