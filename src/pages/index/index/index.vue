<template>
  <div class="index_el">
       <!-- <image class="index_el_image" src="/static/image/index_index_back.png" /> -->
    <!-- <token></token> -->
    <div v-show="!getUserinfo" style="height:100%;z-index: 111">
      <get-login @getName="getes"></get-login>
    </div>
  </div>
</template>
<script>
import getLogin from '@/components/getLogin'
export default {
  data() {
    return {
      Userinfo: '',
      getUserinfo: false,
    };
  },
  components: {
    getLogin
  },
  methods: {
    getes(e) {
      this.Userinfo = e
      this.getUserinfo = true
      this.getToken()
    },
    getToken() {
      this.$http.post("users/getUserinfo", {}).then(res => {
        console.log(res.data.data)
        if (res.data.data.user_type == '0') {
          wx.redirectTo({
            url: "/pages/index/type/main?linkUrl=project"
          });
        } else {
          wx.switchTab({
            url: "/pages/index/project/main"
          });
        }
      })
    }
  }
};

</script>
<style scoped>

.index_el_image{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  z-index: 11
}

</style>
