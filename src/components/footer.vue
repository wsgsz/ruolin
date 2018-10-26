<template>
  <div class="page__bd" >
  <div style="width:100%;height:90rpx"> </div>
    <div class="weui-grids_idnex">
      <block v-for="(item,index) in grids" :key="index">
        <div class="weui-grid" @click="linkTo(item.link,index)">
          <image class="weui-grid__icon" :src="item.actsrc" v-if="index==zindex" />
          <image class="weui-grid__icon" :src="item.src" v-if="index!=zindex" />
          <div class="weui-grid__label" :class="{red:index==zindex}">{{item.name}}</div>
        </div>
      </block>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      grids: [
        { src: '/static/image/index_1_un.png', actsrc: '/static/image/index_1_act.png', name: '项目', link: '/pages/index/project/main' },
        { src: '/static/image/index_3_un.png', actsrc: '/static/image/index_3_act.png', name: '圈子', link: '/pages/index/circle/main' },        
        { src: '/static/image/index_2_un.png', actsrc: '/static/image/index_2_act.png', name: '消息', link: '/pages/index/information/main' },
        { src: '/static/image/index_4_un.png', actsrc: '/static/image/index_4_act.png', name: '我的', link: '/pages/index/userinfo/main' }
      ]
    }
  },
  props: ["zindex"],
  methods: {
    linkTo(link, index) {
      if (this.zindex != index) {
        wx.redirectTo({ url: link })
      }
    }
  }
}

</script>
<style scoped>
.weui-grid {
  width: 25%
}
.weui-grid__icon{
  width:38rpx;
  height:38rpx;
}
.weui-grid__label{
  font-size:24rpx;
  line-height: 24rpx
}

.weui-grid{
  padding:12rpx 20rpx 12rpx 20rpx;
}
.weui-grids_idnex{
  position: fixed;
  bottom:0px;
  left:0px;
  width:100%;
background:#fff;
border-top: 1px solid  #d9d9d9

}
</style>
