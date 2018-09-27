<template>
  <div class="myAllReward">
    <div class="content" ref="wrapper">
      <div>
        <ul>
          <li v-for="(item, index) in myreWards" :key="index">
            <img v-if="item.rid == 1" src="../../common/img/lottery/AllmyReward/kld.png" alt="">
            <img v-if="item.rid == 2" src="../../common/img/lottery/AllmyReward/fhx.png" alt="">
            <img v-if="item.rid == 3" src="../../common/img/lottery/AllmyReward/33.png" alt="">
            <img v-if="item.rid == 4" src="../../common/img/lottery/AllmyReward/333.png" alt="">
            <img v-if="item.rid == 5" src="../../common/img/lottery/AllmyReward/bb.png" alt="">
            <img v-if="item.rid == 6" src="../../common/img/lottery/AllmyReward/sb.png" alt="">
            <img v-if="item.rid == 7" src="../../common/img/lottery/AllmyReward/jm.png" alt="">
            <img v-if="item.rid == 8" src="../../common/img/lottery/AllmyReward/lh.png" alt="">
            <img v-if="item.rid == 9" src="../../common/img/lottery/AllmyReward/ipone.png" alt="">
            <div class="item_content">
              <p v-if="item.rid == 1">恐龙蛋</p>
              <p v-if="item.rid == 2">孵化箱</p>
              <p v-if="item.rid == 3">33BIDT</p>
              <p v-if="item.rid == 4">333BIDT</p>
              <p v-if="item.rid == 5">背包</p>
              <p v-if="item.rid == 6">手表</p>
              <p v-if="item.rid == 7">(真宠)金毛</p>
              <p v-if="item.rid == 8">靓号</p>
              <p v-if="item.rid == 9">iPhoneXS</p>
              <p>x {{item.count}}个</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="again" @click='lotteryAgain'></div>
    <div class="close" @click="hidesingal"></div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
export default {
  props: ["alltype", "rewardsArray"],
  data() {
    return {
      myreWards: ""
    };
  },
  mounted() {
    this.getInit();
    this.scroll = new Bscroll(this.$refs.wrapper, {
      click: true,
      scrollY: true
    });
  },
  methods: {
    lotteryAgain() {
      eventBus.$emit("lotterymore");
    },
    hidesingal() {
      eventBus.$emit("hide", false);
      // document.body.style.overflow="hidden";
    },
    getInit() {
      if (this.alltype == 0) {
        let vm = this;
        $.ajax({
          type: "get",
          url: contextPath + "/api/luckDrow/myluckdrawreward",
          async: true,
          data: {
            token: sessionStorage.egg_token
            // num: val
          },
          dataType: "json",
          success: function(data) {
            // vm.$refs.activityPay.payFn(JSON.stringify(data.data));
            if (data.state.code == 20000) {
              vm.myreWards = data.data;
              vm.scroll.refresh();
            }
          }
        });
      } else {
        if (this.rewardsArray) {
          console.log(this.rewardsArray);
          this.myreWards = this.rewardsArray;
          console.log(this.scroll);
          return;
          this.scroll.refresh();
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
.myAllReward {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 5.78rem;
  height: 9.64rem;
  background: url("../../common/img/lottery/rewardBg.png") no-repeat;
  background-size: 100% 100%;
  .content {
    position: absolute;
    left: 50%;
    top: 49.5%;
    transform: translate(-50%, -50%);
    width: 4.1rem;
    height: 4.7rem;
    // background: yellow;
    box-sizing: border-box;
    padding: 0.1rem 0.2rem;
    overflow: hidden;
    ul {
      li {
        height: 1.55rem;
        margin-bottom: 0.2rem;
        // background: #fff;
        background: url("../../common/img/lottery/AllmyReward/bg.png") no-repeat;
        background-size: 100% 100%;
        img {
          float: left;
          width: 1rem;
          height: 1rem;
          margin-left: 0.4rem;
          margin-top: 0.3rem;
          margin-right: 0.2rem;
        }
        .item_content {
          float: left;
          height: 1.2rem;
          width: 1.35rem;
          margin-top: 0.18rem;
          // background: red;
          // display: flex;
          // align-items: center;
          p {
            text-align: center;
            margin-top: 0.2rem;
            line-height: 0.3rem;
            font-size: 0.2rem;
            color: #231f1f;
          }
        }
      }
    }
  }

  .again {
    position: absolute;
    // background: #fff;
    width: 2.86rem;
    height: 0.7rem;
    left: 50%;
    transform: translateX(-50%);
    bottom: 1.48rem;
  }
  .close {
    position: absolute;
    // background: #fff;
    border-radius: 50%;
    width: 0.6rem;
    height: 0.6rem;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0rem;
  }
}
</style>