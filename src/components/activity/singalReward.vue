<template>
  <div class="singaleward">
    <div  class="wrapper1">
    <img v-if="showIndex == 8" src="../../common/img/lottery/ipone.png" alt="">
    <img v-if="showIndex == 5" src="../../common/img/lottery/sb.png" alt="">
    <img v-if="showIndex == 3" src="../../common/img/lottery/333BIDT.png" alt="">
    <img v-if="showIndex == 2" src="../../common/img/lottery/33BIDT.png" alt="">
    <img v-if="showIndex == 4" src="../../common/img/lottery/bb.png" alt="">
    <img v-if="showIndex == 0" src="../../common/img/lottery/kld.png" alt="">
    <img v-if="showIndex == 1" src="../../common/img/lottery/fhx.png" alt="">
    <img v-if="showIndex == 7" src="../../common/img/lottery/lh.png" alt="">
    <img v-if="showIndex == 6" src="../../common/img/lottery/jm.png" alt="">
    <div class="restcount">今日剩余抽奖次数：{{lotteryCount}}</div>
    <div class="again" @click='lotteryAgain'></div>
    <div class="close" @click="hidesingal"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['id'],
    data() {
      return {
        showIndex:-1,
        lotteryCount:0,
      }
    },
    mounted () {
        this.showIndex = this.id;
        this.getLottery();
      
    },
    methods:{
      // 在抽奖一次
      lotteryAgain () {
        eventBus.$emit("lotterymore");
      },
      // 查询抽奖次数
    getLottery() {
      let vm = this;
      $.ajax({
        type: "get",
        url: contextPath + "/api/luckDrow/selectLuckDrowNum",
        async: true,
        data: {
          token: sessionStorage.egg_token
          // num: val
        },
        dataType: "json",
        success: function(data) {
          if (data.state.code == 20000) {
            vm.lotteryCount = data.data;
            // if(val){
            // 	if(vm.lotteryCount <= 0) {
            //     mui.confirm('您的抽奖次数已使用完', '', ["取消","购买"], function(e) {
            //         if (e.index == 1) {
            //         	vm.buy();
            //         } 
            //     });
            //   return;
            // }else  if(vm.lotteryCount < val){
            //    mui.confirm('您的抽奖次数不足此次抽奖', '', ["取消","购买"], function(e) {
            //         if (e.index == 1) {
            //         	vm.buy();
            //         } 
            //     });
            //   return;
            // }
            // }
            
          }
        }
      });
    },
      hidesingal () {
        eventBus.$emit("hide" , false);
        // document.body.style.overflow="hidden";
      }
    }
  }
</script>

<style scoped lang="less">
.singaleward {
  position: relative;
  height: 100%;
  .restcount {
    position: absolute;
    width: 100%;
    text-align: center;
    // width: 2.4rem;
    left: 50%;
    transform: translateX(-50%);
    bottom: 1.2rem;
    font-size: 0.18rem;
    color: #fff;
    // text-align: center;
  } 
  .wrapper1 {
    position: absolute;
     width: 6rem;
     height: 8.58rem;
      left: 50%;
    top: 50%;
    // transform: translateX(-50%);
    transform: translate(-50%, -50%);
  img {
    position: absolute;
     width: 6rem;
    //  height: 8.58rem;
    left: 50%;
    top: 50%;
    // transform: translateX(-50%);
    transform: translate(-50%, -50%);
    // width: 100%;
   
  }
  .again {
    position: absolute;
    // background: #fff;
    width: 2.86rem;
    height: 0.7rem;
    left: 50%;
    transform: translateX(-50%);
    bottom: 1.9rem;
  }
  .close {
    position: absolute;
    // background: #fff;
    border-radius: 50%;
    width: 0.6rem;
    height: 0.6rem;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0.2rem;
  }
  }
}
</style>