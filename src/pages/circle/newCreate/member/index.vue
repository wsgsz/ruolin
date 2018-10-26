<template>
  <div>
    <div class="page__bd">
      <div class="weui-cell btn2em">
        <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
          <image :src="circleMainIntroduction.user_avatar" style="width: 68rpx; height: 68rpx;border-radius:50%;display: block" />
        </div>
        <div class="weui-cell__bd">
          <div style="font-size:13px;">{{circleMainIntroduction.user_nickname}}</div>
          <div style="font-size: 12px;color: #888888;">ID: {{10000+circleMainIntroduction.id*1}}</div>
        </div>
      </div>
      <div class="page__bd_spacing" style="margin-top:30rpx;">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <div class="detail_one"></div>
          </div>
          <div class="weui-cell__bd fw500">统计信息</div>
        </div>
      </div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell">
          <div class="weui-cell__bd">加入日期</div>
          <div class="weui-cell__ft">{{data.joiningDate}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">已打卡天数</div>
          <div class="weui-cell__ft">{{data.hasClockInNumberDays}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">当月打卡天数</div>
          <div class="weui-cell__ft">{{data.clockDaysDuringMonth}}</div>
        </div>
      </div>
    </div>
    <div class="page__bd_spacing" style="margin-top:30rpx;">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <div class="detail_one"></div>
        </div>
        <div class="weui-cell__bd fw500">我的打卡日历</div>
      </div>
    </div>
    <Calendar @select="select" :events="events" clean="true" ref="calendar" :disabled="disabledarr" />
    <!-- <button @click="setToday">返回今日</button>
    <button @click="dateInfo">日期信息</button> -->
  </div>
</template>
<script>
import Calendar from "mpvue-calendar";
export default {
  data() {
    return {
      events: {},
      disabledarr: [],
      data: "",
      circle_id: "",
      circleMainIntroduction: ""
    };
  },
  components: {
    Calendar
  },
  onLoad(e) {
     Object.assign(this.$data, this.$options.data());
    console.log(e)
    this.circle_id = e.circle_id
    this.addclick(this.circle_id);
  },
  methods: {
    setToday() {
      this.$refs.calendar.setToday();
    },
    dateInfo() {
      const info = this.$refs.calendar.dateInfo(2018, 8, 23);
      console.log(info);
    },
    select(val, val2) {
      console.log(val);
    },
    addclick(circle_id) {
      this.$http.post("circle/clockCalendar", { circle_id: circle_id }).then(res => {
        console.log(res.data.data);
        this.data = res.data.data;
        this.circleMainIntroduction = res.data.data.circleMainIntroduction
        this.data.calendarRecord.forEach(element => {
          let year = element.day.substr(0, 4);
          let mount = element.day.substr(4, 2)
          let days = element.day.substr(6)
          if (element.day.substr(6, 1) == '0') {
            days = element.day.substr(7)
          }
          const array = new Array(year, mount, days).join('-')
          this.events[array] = array;
          this.disabledarr.push(array)
        });
        this.events = JSON.parse(JSON.stringify(this.events))
      });
    }
  }
};

</script>
