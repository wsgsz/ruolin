<template>
<div class="page">
    <div class="page__bd">
        <div class="weui-article">
            <div class="weui-article__h1" style="text-align: center;margin-bottom: 0px;">{{data.title}}</div>
             <div class="weui-article__p" style="text-align: center;font-size: 12px;color: #92969c">{{data.createtime}}</div>

            <div class="weui-article__section">
                <div class="weui-article__section">
                    <div class="weui-article__p">
                       <!-- {{data.objcontent}} -->
                        <wxParse :content="data.objcontent" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
  import wxParse from "mpvue-wxparse";
export default {
  data() {
    return {
      data :""
    }
  },
    components: {
    wxParse
  },
  onLoad(e){
    this.data  = JSON.parse(e.link)
    console.log(this.data)
        wx.setNavigationBarTitle({
      title: this.data.obj_name
    })
  }
};

</script>
<style scoped>
</style>
