<template>
    <div class="video_model"  catchtouchmove="ture">
        <div class="video_tops" @click="hidevideo()">
        </div>  
        <video id="myVideo" :src="videoUrl" ></video>    
        <div class="video_tops" @click="hidevideo()">
        </div>
    </div>  
</template>
<script>
export default {
  props: {
    videoUrl: String,
    required: true
  },
  methods:{
      hidevideo(){
          this.$emit("hidevideo",'true')
      }
  }
};
</script>
<style scoped lang="less">
.video_model{
    position: fixed;
    height: 100vh;
    top:0px;
    right: 0px;
    width: 100vw;
    z-index: 111;
    display: flex;
    align-items: center;
    background: #333;
    flex-wrap: wrap;
    overflow-y: hidden;
    .video_tops{
        height: 30vh;
        width: 100vw;
    }
    #myVideo{
        width: 100vw;
        height: 40vh;
        z-index: 222;
        flex-grow: 1;
    }
}
</style>


