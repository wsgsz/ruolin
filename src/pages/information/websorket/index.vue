<template>
  <div>
     <web-sorket></web-sorket>
    <scroll-view class="aui-chat" :scroll-y="true" @scrolltoupper="upper" @scrolltolower="lower" :scroll-top="datalength"  :style="{'white-space': 'nowrap','height': therehide ? 'calc(100vh - 50rpx)' : 'calc(100vh - 360rpx)'}">
      <div class="aui-chat-item " v-for="(item,index) in data" :key="index" v-bind:class="{ 'aui-chat-left': item.userState==0, 'aui-chat-right': item.userState==1 }" style="display: inline-block;">
        <!-- 文字 -->
        <div v-if="item.content_type=='1'">
  <div class="aui-chat-media">
          <image :src="item.user_avatar" />
        </div>
        <div class="aui-chat-inner">
          <div class="aui-chat-content">
            <div class="aui-chat-arrow"></div>
            {{item.content}}
          </div>
          <div class="aui-chat-name">&nbsp;<span class="aui-label aui-label-warning" style="display:inline-block;width:30vw;">&nbsp;{{item.time}}</span></div>
        </div>
        </div>
      <!-- 语音 -->
         <div v-if="item.content_type=='2'">
  <div class="aui-chat-media">
          <image :src="item.user_avatar" />
        </div>
        <div class="aui-chat-inner">
          <div class="aui-chat-content" @click="playAudio(index,item.content.content,item.content.is_audio)">
            <div class="aui-chat-arrow"></div>
            <image src="/static/image/webvoice.png" style="width:30rpx;height:30rpx;margin:0px 30rpx" v-if="item.content.is_audio=='0'" />
             <image src="/static/image/webvoice.gif" style="width:30rpx;height:30rpx;margin:0px 30rpx"  v-if="item.content.is_audio!='0'" />
            <!-- {{item.content}} -->
          </div>
          <div class="aui-chat-name">&nbsp;<span class="aui-label aui-label-warning" style="display:inline-block;width:30vw;">&nbsp;{{item.time}}</span></div>
        </div>
        </div>
        <!-- 位置 -->
           <div v-if="item.content_type=='3'">
  <div class="aui-chat-media">
          <image :src="item.user_avatar" />
        </div>
        <div class="aui-chat-inner">
          <div class="aui-chat-content" style="padding:0px border:10rpx solid #fff" @click="checkcity(item.content.latitude,item.content.longitude)">
            <div class="aui-chat-arrow"></div>
            <div class="mp_3">
              <div class="ellopsis-1 mp_3_address ellipsis-1">{{item.content.address}}</div>
              <div class="ellopsis-1 mp_3_name ellipsis-1">{{item.content.name}}</div>
              <image src="/static/image/map.png" />
            </div>
          </div>
          <div class="aui-chat-name">&nbsp;<span class="aui-label aui-label-warning" style="display:inline-block;width:30vw;">&nbsp;{{item.time}}</span></div>
        </div>
        </div>
      </div>
    </scroll-view>
    <div style="height:2em;width:100%"></div>
    <div class="page__bd" style="position:fixed;bottom:0px;width:100%;">
      <div class="weui-search-bar">
        <div class="weui-search-bar__form">
          <label>
            <div class="weui-search-bar__box">
              <input type="text" @confirm="setLoading(content,'1')" confirm-type="send" confirm-hold="" class="weui-search-bar__input" v-model="content" cursor-spacing="10" placeholder="请输入内容" />
            </div>
          </label>
        </div>
        <image  src="/static/image/add.png" style="width:50rpx;height:50rpx;margin:0px 20rpx" @click="therehide =!therehide" /> 
        <!-- <div class="weui-search-bar__cancel-btn" @click="setLoading($event)">发送</div> -->
      </div>
       <div v-if="therehide==false">
      <websorket-top @getContent = "getContent"></websorket-top>
    </div>
    </div>
  </div>
</template>
<script>
import webSorket from "@/components/webSorket";
import websorketTop from "@/components/websorketTop";

export default {
  data() {
    return {
      list: "",
      data: [],
      current_page: 0,
      last_id: "",
      content: "",
      user: "",
      end: false,
      users: "",
      datalength: "",
      thekong: true,
      type: true,
      therehide: true
    };
  },
  components: {
    websorketTop,
    webSorket
  },
  onLaunch() {
    this.list = wx.getStorageSync("token");
  },

  onHide() {
    wx.onSocketOpen(function() {
      wx.closeSocket({});
    });
  },

  onLoad(e) {
    Object.assign(this.$data, this.$options.data());
    const _this = this;
    _this.users = e;
    _this.list = wx.getStorageSync("token");
    this.getUser();
    this.getList(this.last_id, this.current_page, "");
    wx.onBackgroundAudioStop(function(res){
      //  console.log(res)
     })
  },

  methods: {
    //  播放录音
    playAudio(index,url,isaudio){
       const _this = this
       const viode = wx.createInnerAudioContext()
      // if(isaudio=='0'){
        _this.data.forEach(element => {
          if(element.content_type=='2'){
            element.content.is_audio='0'
          }
        });
          viode.src=url
          viode.play()
       _this.data[index].content.is_audio='1'
           setTimeout(() => {
         _this.data[index].content.is_audio='0'
          }, 4000)
      // }else{
      //   wx.stopVoice()
      //     this.data[index].content.is_audio='0'
      // }
    },
    // /查看地图 位置
    checkcity(lat,lng){
      wx.openLocation({
        latitude:lat,
        longitude:lng
      })
    },
    getContent(e) {
      this.therehide = true
      this.setLoading(JSON.parse(e).content, JSON.parse(e).contentType);
    },
    upper() {
      const _this = this;
      if (this.end == false) {
        this.current_page += 1;
        if (_this.type == true) {
          this.getList(this.last_id, this.current_page, "uploader");
          _this.type = false;
        }
      } else {
        wx.showToast({
          title: "数据加载完成",
          icon: "none",
          duration: 3000
        });
      }
    },
    //  发送消息
    setLoading(content, type) {
      const _this = this;
      if (content == "") {
        wx.showToast({
          title: "发送内容不可为空",
          icon: "none"
        });
        return false;
      }
      wx.sendSocketMessage({
        data: JSON.stringify({
          type: "say",
          content: content,
          user_nickname: _this.user.user_nickname,
          user_avatar: _this.user.user_avatar,
          receive_uid: _this.user.id,
          token: this.list,
          receive_uid: this.users.r_id,
          add_time: Date.parse(new Date()),
          content_type: type
        }),
        success: function(res) {
       
          // console.log(_this.data)
            if (type == "3" ||type == "2") {
               _this.data.push({
            user_nickname: _this.user.user_nickname,
            user_avatar: _this.user.user_avatar,
            add_time: "",
            content_type: type,
            content: JSON.parse(content),
            userState: "1"
          });
          _this.datalength = _this.data.length * 300 + 4;
            _this.content = "";
            }else{
                 _this.data.push({
            user_nickname: _this.user.user_nickname,
            user_avatar: _this.user.user_avatar,
            add_time: "",
            content_type: type,
            content: content,
            userState: "1"
          });  _this.datalength = _this.data.length * 300 + 4;
            _this.content = "";
            }
    
         
        },
        fail: function(error) {
          wx.connectSocket({
            url: "wss://m.ruolingroup.com/wss"
          });
        }
      });
    },
    getUser() {
      this.$http.post("users/getUserinfo", {}).then(res => {
        this.user = res.data.data;
      });
    },
    getList(last_id, current_page, up) {
      const _this = this;
      _this.$http
        .post("message/instantMessaging", {
          last_id: last_id,
          page: current_page,
          receive_uid: _this.users.r_id
        })
        .then(res => {
          res.data.data.data == undefined
            ? (res.data.data.data = [])
            : (res.data.data.data = res.data.data.data);
          const arrEntities = {
            lt: "<",
            gt: ">",
            nbsp: " ",
            amp: "&",
            quot: '"'
          };
          res.data.data.data.forEach(element => {
            if (element.content_type == "3" ||element.content_type == "2") {
              element.content = JSON.parse(
                element.content.replace(/&(lt|gt|nbsp|amp|quot);/gi, function(all,t) {
                  return arrEntities[t];
                })
              );
            }
          });
          _this.data = _this.data.concat(res.data.data.data);
          _this.data.sort(function(x, y) {
            return x.id - y.id;
          });
          if (res.data.data.data.length < 10) {
            _this.end = true;
          }
          if (up == "uploader") {
            _this.datalength = 0;
          } else {
            _this.datalength = _this.data.length * 80 + 4;
          }
          _this.last_id = res.data.data.lastId;
          _this.type = true;
        });
    }
  }
  // async onPullDownRefresh() {
  //   wx.stopPullDownRefresh();
  //   const _this = this;
  //   if (this.end == false) {
  //     this.current_page += 1;
  //     this.getList(this.last_id, this.current_page, 'uploader');
  //   } else {
  //     wx.showToast({
  //       title: '数据加载完成',
  //       icon: 'none',
  //       duration: 3000
  //     });
  //   }
  // },
};
</script>
<style scoped>
.weui-search-bar {
  padding: 0px 6px;
  align-items: center;
}

.weui-search-bar__box {
  padding-right: 30rpx;
  padding-left: 30rpx;
}

.weui-search-bar__form {
  margin: 4px;
  box-sizing: border-box;
}

.weui-search-bar__input {
  margin: 4px 0px;
}

.weui-search-bar__cancel-btn {
  background: #d61518;
  font-size: 13px;
  color: #fff;
  width: 50px;
  border-radius: 5px;
  text-align: center;
}
.mp_3{
  width:400rpx;

}
.mp_3_address{
  line-height: 21px;
  font-size: 13px;
}
.mp_3_name{
  font-size: 12px;
   line-height: 21px;
}
.mp_3 image{
  width:100%;
  height: 190rpx;
}
</style>
