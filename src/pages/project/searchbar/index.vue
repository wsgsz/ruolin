<template>
  <div class="page">
    <div class="page__bd">
      <div class="weui-search-bar">
        <div class="weui-search-bar__form">
          <div class="weui-search-bar__box">
            <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
            <input type="text" class="weui-search-bar__input" placeholder="请您输入项目名称关键词" v-model="inputVal"  @confirm="inputTyping" confirm-type="done" />
            <div class="weui-icon-clear" v-if="inputVal.length > 0" @click="clearInput">
              <icon type="clear" size="14"></icon>
            </div>
          </div>
        </div>
        <div class="weui-search-bar__cancel-btn" @click="inputTyping">搜索</div>
      </div>
    </div>
    <!-- liebiao  -->
    <div class="weui-cells weui-cells_after-title">
      <ul>
        <li v-for="(list,index) in data" :key='index' class="weui-cells_li">
          <!--五星项目  -->
          <block v-if="list.hot=='2'">
            <div class="weui-cells" style="color:#d61518;margin-top:0px;">
              <div class="weui-cell">
                <div class="weui-cell__hd">
                  <image src="/static/image/wuxing_s.png" style="width:130rpx;height:33rpx;margin-right: 5px" />
                </div>
             <!--    <div class="weui-cell__bd weui-cell_primary">
                  <div>五星项目</div>
                </div>
                -->
              </div>
            </div>
            <navigator :url="'/pages/project/preheat/detail/main?objId='+list.obj_id" class="weui-cell">
              <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
                <image :src="list.objfirstimage" class="logo_index" />
              </div>
              <div class="weui-cell__bd right_bd" style="height:220rpx;">
                <div class="index_bd_name">{{list.obj_name}}</div>
                <div class="text2 index_bd_name c9296_content" style="margin-bottom:16rpx;">
                  <div class="industry_name_l1">{{list.industry_name}}</div>
                  {{list.introducecontent}}
                </div>
                <div class="fx_el" style="margin-bottom:7rpx">
                  <div>
                    <image src="/static/image/mbmd.png" class="iconimage" />现有门店:
                    <span class="red">{{list.target_stores}} </span>
                  </div>
                  <div>
                    <image src="/static/image/cjrs.png" class="iconimage" />分享人数:
                    <span class="red">{{list.browse}}人</span>
                  </div>
                </div>
                <div class="fx_el">
                  <div>
                    <image src="/static/image/yunying.png" class="iconimage" />运营面积:
                    <span class="red">{{list.operating_space}}</span>
                  </div>
                  <div>
                    <image src="/static/image/dianjun.png" class="iconimage" />投资金额:
                    <span class="red"> {{list.invest_money}}</span>
                  </div>
                </div>
              </div>
            </navigator>
          </block>
          <!-- 热点项目 -->
          <block v-if="list.checkdata=='4' && list.hot=='1'">
            <div class="weui-cells" style="color:#d61518;margin-top:0px;">
              <div class="weui-cell">
                <div class="weui-cell__hd">
                  <image src="/static/image/redian_s.png" style="width:130rpx;height:33rpx;margin-right: 5px" />
                </div>
                <!-- <div class="weui-cell__bd weui-cell_primary">
                  <div>热点项目</div>
                </div>
                -->
              </div>
            </div>
             <navigator :url="'/pages/project/preheat/detail/main?objId='+list.obj_id" class="weui-cell p50">
            <div class="weui-cell__hd pre_hds">
              <image :src="list.objfirstimage" class="logo_index" style="margin-right: 20rpx;" />
            </div>
            <div class="weui-cell__bd right_bd" style="height:220rpx;">
              <div class="index_bd_name" style="margin-bottom:15rpx;width: 200px">{{list.obj_name}}</div>
              <div class="zan_pre ellipsis-1" style="color: #d61518;margin-bottom: 0rpx;width: 200px">
               {{list.slogan}}
              </div>
              <div class="text2 index_bd_name c9296_content" style="margin-bottom:15rpx;width: 200px">
                <div class="industry_name_l1" sty>{{list.industry_name}}</div>
                {{list.introducecontent}}
              </div>
              <div class="prejun">
                <div style="width:45%">
                  <image src="/static/image/zan.png" class="iconimage" />已获点赞:
                  <span class="red">{{list.zan}} </span>个</div>
                <div style="width:55%">
                  <!-- <image src="/static/image/mbmd.png" class="iconimage" /> -->
                  {{list.createtime}}
                  <!-- 现有门店:<span class="red">{{list.target_stores}} </span> -->
                </div>
              </div>
            </div>
          </navigator>
          </block>
          <!-- 预热项目 -->
          <block v-if="list.checkdata=='2' && list.hot=='1'">
            <div class="weui-cells" style="color:#d61518;margin-top:0px;">
              <div class="weui-cell">
                <div class="weui-cell__hd">
                  <image src="/static/image/yure_s.png" style="width:130rpx;height:33rpx;margin-right: 5px" />
                </div>
                <!-- <div class="weui-cell__bd weui-cell_primary">
                  <div>预热项目</div>
                </div>
                -->
              </div>
            </div>
            <navigator :url="'/pages/project/preheat/detail/main?objId='+list.obj_id" class="weui-cell">
              <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
                <image :src="list.objfirstimage" class="logo_index" />
              </div>
              <div class="weui-cell__bd right_bd" style="height:220rpx;">
                <div class="index_bd_name">{{list.obj_name}}</div>
                  <div class="zan_pre ellipsis-1" style="color: #d61518;margin-bottom: 0rpx;width: 200px">
               {{list.slogan}}
              </div>
                <div class="text2 index_bd_name c9296_content" style="margin-bottom:16rpx;">
                  <div class="industry_name_l1">{{list.industry_name}}</div>
                  {{list.introducecontent}}
                </div>

                 <div class="fx_el" style="margin-bottom:7rpx">
                  <div style="width:45%">
                    <image src="/static/image/mbmd.png" class="iconimage" />现有门店:
                    <span class="red">{{list.target_stores}} </span>
                  </div>
                  <div style="width:45%">
                    <image src="/static/image/cjrs.png" class="iconimage" />分享人数:
                    <span class="red">{{list.browse}}人</span>
                  </div>
                </div> 
            
              </div>
            </navigator>
          </block>
        </li>
        <div class="weui-loadmore" v-if="!more">
          <div class="weui-loading"></div>
          <div class="weui-loadmore__tips">正在加载</div>
        </div>
        <div class="weui-loadmore weui-loadmore_line" v-if="more">
          <div class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无数据</div>
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputShowed: true,
      inputVal: "",
      data: "",
      more: true,
      last_id: "",
      page: 1
    }
  },
  onShow(){
      this.inputVal='',
      this.last_id="",
      this.page=1,
      this.data=[]
  },
  methods: {
    clearInput() {
      this.inputVal = '';
    },
    inputTyping(e) {
      // console.log(e);
      // this.inputVal = e.mp.detail.value;
      // console.log('输入信息为：' + e.mp.detail.value);
      this.data = []
      this.last_id = ""
      this.page = 1
      this.getList()
    },
    getList() {
      this.$http.post("obj/objselectlist", { field: this.inputVal, page: this.page, last_id: this.last_id }).then(res => {
        this.more = false
        this.data = this.data.concat(res.data.data);
        if (this.data.length > 0) {
          this.last_id = this.data[this.data.length - 1].obj_id
        }
        if (res.data.data.length < 10) {
          this.more = true
        }
      })
    }
  },
  onReachBottom() {
    const _this = this;
    if (_this.more == false) {
      _this.page += 1;
      _this.getList(this.page);
    }
  }
}

</script>
<style scoped>
.searchbar-result {
  margin-top: 0;
  font-size: 14px;
}

.searchbar-result:before {
  display: none;
}

.weui-cell {
  padding: 12px 15px 12px 35px;
}
.zan_pre {
  font-size: 24rpx;
  color: #888888;
  margin-bottom: 15rpx
}
.prejun {
  font-size: 24rpx;
  color: #888888;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  white-space:nowrap;
}
</style>
