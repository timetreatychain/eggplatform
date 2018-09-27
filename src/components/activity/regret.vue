<template>
  <div class="reget">
    <div class="box">
      <span class="moneynum">{{money}} BIDT</span>
      <input v-model="acount" type="text" placeholder="0" class="inp">
      <span class="changemoney">{{bidtnum}}</span>
      <p class="qrdh" @click="changeCount"></p>

    </div>
    <p class="close" @click="hidesingal"></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      money: 0,
      acount: "",
      bidtnum: 0
    };
  },
  mounted() {
    this.getmoney();
  },
  watch: {
    acount(val) {
      if(val) {
      this.bidtnum = val * 20;
      // if (this.bidtnum > this.money) {
      //   eventBus.$emit("showBuyCoin", true);
      // }
      }
    }
  },
  methods: {
    hidesingal() {
      eventBus.$emit("hidereget", false);
      // document.body.style.overflow="hidden";
    },
    getmoney() {
      let vm = this;
      $.ajax({
        type: "get",
        url: contextPath + "/api/eggworld/findttcblance",
        async: true,
        data: {
          token: sessionStorage.egg_token
        },
        dataType: "json",
        success: function(data) {
          vm.money = data.data.account;
        }
      });
    },

    // 兑换
    changeCount() {
      
      if(!this.acount) {
        mui.alert("数字不能为空或者零");
        return;
      }
      if (this.bidtnum > this.money) {
        eventBus.$emit("showBuyCoin", true);
        return;
      }
      let vm = this;
      $.ajax({
        type: "get",
        url: contextPath + "/api/luckDrow/purchaseTimes",
        async: true,
        data: {
          token: sessionStorage.egg_token,
          num: vm.acount
        },
        dataType: "json",
        success: function(data) {
          // vm.money = data.data.account;
          eventBus.$emit("showChangeSuccessPage", true);
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.reget {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 5.81rem;
  height: 8.4rem;
  background: url("../../common/img/lottery/yh.png") no-repeat;
  background-size: 100% 100%;
  .close {
    position: absolute;
    width: 0.8rem;
    height: 0.8rem;
    left: 51%;
    border-radius: 50%;
    bottom: -0.1rem;
    transform: translateX(-50%);
    // background: #fff;
  }
  .box {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 4rem;
    width: 5rem;
    height: 3rem;
    // background: red;
    .changemoney {
      display: block;
      width: 1.5rem;
      margin-left: 3.4rem;
      margin-top: 0.1rem;
      height: 0.4rem;
      line-height: 0.4rem;
      font-weight: 200;
      font-size: 0.18rem;
      color: #fff;
      // background: red;
    }
    .qrdh {
      position: absolute;
      width: 3rem;
      height: 0.7rem;
      left: 50%;
      bottom: 1.1rem;
      transform: translateX(-50%);
      // background: #fff;
    }

    .moneynum {
      display: block;
      width: 2.5rem;
      margin-left: 2.2rem;
      height: 0.4rem;
      line-height: 0.4rem;
      font-weight: 200;
      font-size: 0.18rem;
      color: #fff;
    }
    .inp {
      position: absolute;
      top: 0.5rem;
      left: 1.3rem;
      width: 1.2rem;
      height: 0.4rem;
      line-height: 0.4rem;
      box-sizing: border-box;
      padding-left: 0.1rem;
    }
  }
}
</style>