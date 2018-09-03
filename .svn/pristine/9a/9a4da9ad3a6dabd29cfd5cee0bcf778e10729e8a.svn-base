<template>
  <div class="img_view" @click="selectpto">
    <div class="img_view_inner">
      <img v-show="index0 == 0" src="../../common/img/activity/activity2/pto2.png" alt="">
      <img v-show="index0 == 1" src="../../common/img/activity/activity2/pto3.png" alt="">
      <img v-show="index0 == 2" src="../../common/img/activity/activity2/pto4.png" alt="">
      <img v-show="index0 == 3" src="../../common/img/pic5.jpg" alt="">
      <span id="qrcode5" ref="qrcode5" :class="{'img4' : index0 == 3}"></span>
      <!-- <span id="qrcode4 img4" ref="qrcode4" v-show="index0 == 3"></span> -->
    </div>
  </div>
</template>

<script>
import "../../common/js/jqr.js";
  export default {
    props: {
      index0 : {
        type: Number,
        default : 0
      },
      url : {
        type: String,
        default : ""
      },
      
    },
    mounted() {
      console.log(this.url)
      mui.toast("截屏此图，分享给你的朋友,一起来玩游戏吧！")
      this._getQart("qrcode5", this.url);
    },
    methods:{
      selectpto() {
        this.$emit("hide3", false);
      },
      _getQart: function(dom, arg) {
				var qrcode = new QRCode(document.getElementById(dom), {
					width: 1.5* fontSizes, //设置宽高  
					height: 1.5 * fontSizes
				});
				qrcode.makeCode(arg);
			},
    }
  }
</script>

<style scoped lang="less">
.img_view {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  .img_view_inner{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    text-align: center;
    img{
      width: 100%;
      height: 100%;
    }
    span{
      position: absolute;
      right: 0.37rem;
      bottom: 0.30rem;
      // width: 1.4rem;
      // height: 1.4rem;
      z-index: 1000;
      // border: 0.01rem solid red;
    }
    .img4 {
      position: absolute;
      left: 0.4rem;
      bottom: 0.5rem;
    }
  }

}
</style>