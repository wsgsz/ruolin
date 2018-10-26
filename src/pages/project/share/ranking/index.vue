<template>
  <div>
    <ul v-if="!kong">
      <li class="ranking_top ranking_top_w" >
        <div class="ranking_top_index" style="width:88rpx;">
          排名
        </div>
        <div class="user_nickname" style="width:105rpx;">
          用户名
        </div>
        <div class="ranking_pu" style="width:175rpx;">
          有效分享（次）
        </div>
        <div class="ranking_dian" style="width:180rpx;">
          点对点分享（次）
        </div>
        <div class="ranking_cj" style="width:91rpx;">
          成交
        </div>
        <div class="ranking_jf" style="width:71rpx;">
          积分
        </div>
      </li>
    </ul>
    <ul class="el_list">
      <li class="ranking_top ranking_top_el" v-for="(item,index) in data" :key="index" style="text-align:center">
        <div class="ranking_top_index" :class="{active1:index=='0',active2:index=='1',active3:index=='2'}" style="width:88rpx;">
         <p> {{index+1}}</p>
        </div>
        <div class="user_nickname" style="width:105rpx;">
          {{item.user_nickname}}
        </div>
        <div class="ranking_pu" style="width:175rpx;">
          {{item.pu}}
        </div>
        <div class="ranking_dian" style="width:180rpx;">
          {{item.dian}}
        </div>
        <div class="ranking_cj" style="width:91rpx;">
          {{item.cj}}
        </div>
        <div class="ranking_jf" style="width:71rpx;">
          {{item.jf}}
        </div>
      </li>
    </ul>
    <div class="weui-loadmore weui-loadmore_line" v-if="kong">
      <div class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无数据</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: "",
      kong: false
    }
  },
  onLoad() {
    Object.assign(this.$data, this.$options.data())
    this.getList()
  },
  methods: {
    getList() {
      this.$http.post('users/objrankings', {}).then(res => {

        if (res.data.status == '1') {
          this.data = res.data.data
        } else {
          this.kong = true
        }
      })

    }
  },
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
.ranking_top_w{
text-align:left;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;
}
.ranking_top_w div{
  font-weight:600 !important
  }
.ranking_top {
  height: 44px;
  line-height: 44px;
  padding: 0px 15px;
}

.ranking_top div {
  float: left;
  font-size: 12px;
  flex-grow: 1;
  font-weight: 600;
  /*text-align: center*/
}

.active1 {
  color: red;
  background: url(../image/rankingone.png);
  background-size: 25rpx 42rpx;
  background-repeat: no-repeat;
  background-position: center;
  content:'';
}

.active2 {
  color: yellow;
  background: url(../image/rankingtwo.png);
  background-size: 25rpx 42rpx;
  background-repeat: no-repeat;
  background-position: center;
   content:'';
}

.active3 {
  color: red;
  background: url(../image/rankingthere.png);
  background-size: 25rpx 42rpx;
  background-repeat: no-repeat;
  background-position: center;
   content:'';
}
.active1 p ,.active2 p ,.active3 p{
  visibility: hidden;
}
</style>
