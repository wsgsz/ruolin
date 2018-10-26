<template>
  <div>
    <div class="btn2em p5030">
      <div class="ul_list_ice">
        <div class="ul_list_left">
          <div class="w100 ul_list_left_level">
            {{user.user_level}}
          </div>
          <div class="w100">
            <progress :percent="baifen" show-info active color="#66c6af" />
          </div>
        </div>
        <div class="ul_list_ice_right">
          <image src="/static/image/ben_new0.png" v-if="user.level=='0'" />
          <image src="/static/image/ben_new1.png" v-if="user.level=='1'" />
          <image src="/static/image/ben_new2.png" v-if="user.level=='2'" />
          <image src="/static/image/ben_new3.png" v-if="user.level=='3'" />
          <image src="/static/image/ben_new4.png" v-if="user.level=='4'" />
          <image src="/static/image/ben_new5.png" v-if="user.level=='5'" />
        </div>
      </div>
      <div class="user_level">
        <div class="user_level_el1">累计能量豆：{{user.energy_bean}} </div>
        <div v-bind:class="'level'+user.level">{{user.user_energy}}</div>
      </div>
    </div>
    <!--  -->
    <div class="weui-cell" style="border-bottom:1px solid #e5e5e5">
      <div class="weui-cell__hd">
        <div class="detail_one"></div>
      </div>
      <div class="weui-cell__bd">今日任务</div>
    </div>
    <div class="weui-cells weui-cells_after-title" v-for="(items,index) in task.today" :key="index">
      <div class="weui-cell" style="border-bottom:1px solid #e5e5e5">
        <div class="weui-cell__bd">
          <div style="font-size:28rpx;">{{items.title}}</div>
          <div style="font-size: 13px;color: #888888;">{{items.bean}}</div>
        </div>
        <div class="weui-cell__hd lingqurw" @click="getList(items.status,items.id)">
          {{items.reward}}
        </div>
      </div>
    </div>
    <!--  -->
    <div class="weui-cell" style="border-bottom:1px solid #e5e5e5">
      <div class="weui-cell__hd">
        <div class="detail_one"></div>
      </div>
      <div class="weui-cell__bd">更多奖励</div>
    </div>
    <div class="weui-cells weui-cells_after-title" v-for="(item,index) in task.more" :key="index">
      <div class="weui-cell" style="border-bottom:1px solid #e5e5e5">
        <div class="weui-cell__bd">
          <div style="font-size:28rpx;">{{item.title}}</div>
          <div style="font-size: 13px;color: #888888;">{{item.bean}}</div>
        </div>
        <div class="weui-cell__hd lingqurw" @click="getList(item.status,item.id)">
          {{item.reward}}
        </div>
      </div>
    </div>
    <div style="width:100%;height:120rpx;"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      task: "",
      user: "",
      baifen: ''
    }
  },
  onLoad() {
    Object.assign(this.$data, this.$options.data())
    this.getUser()
    wx.setNavigationBarTitle({
      title: "能量豆"
    })

  },
  methods: {
    getUser() {
      this.$http.post("energyBean/resultsTheTaskList", {}).then(res => {
        if (res.data.status == '1') {
          this.task = res.data.data.task
          this.user = res.data.data.user
          console.log(parseInt(this.user.energy_bean))
          console.log(parseInt(this.user.user_energy_upgrade))
          this.baifen = parseInt(parseInt(this.user.energy_bean)*100 / parseInt(this.user.user_energy_upgrade)).toFixed(2)
          console.log(this.baifen)
        }
      })
    },
    getList(state, id) {
      const _this = this
      this.$http.post('energyBean/taskToGetRewards', { state: state, id: id }).then(res => {
        console.log(res.data)
        if (res.data.status == '0') {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 3000
          });
        } else {

          wx.showToast({
            title: '已完成',
            icon: 'success',
            duration: 3000
          });
          _this.getUser()
          // setTimeout(() => {
          //   wx.navigateBack({
          //     delta: 0
          //   })
          // }, 2000)
        }
      })
    }
  }
}

</script>
<style scoped>
.w100 {
  width: 100%;
}

.p5030 {
  padding: 50rpx 30rpx;
}

.ul_list_ice {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 140rpx;
  padding-top: 30rpx;
}

.ul_list_left_level {
  font-size: 36rpx;
  font-weight: 500;
}

.ul_list_left {
  width: 470rpx;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.ul_list_ice_right {
  width: 110rpx;
  height: 141rpx;
}

.ul_list_ice_right image {
  width: 100%;
  height: 100%
}

.user_level {
  width: 100%;
  font-size: 26rpx;
  line-height: 34rpx;
}






/*.user_level_el2 {
  color: #66c6af
}*/

.level0 {
  color: #66c6af
}

.level1 {
  color: #7c8992
}

.level2 {
  color: #ffb103
}

.level3 {
  color: #3b4664
}

.level4 {
  color: #db790e
}

.level5 {}

.level6 {}

.lingqurw {
  width: 130rpx;
  height: 50rpx;
  line-height: 50rpx;
  text-align: center;
  font-size: 24rpx;
  background: #d61518;
  color: #fff
}

</style>
