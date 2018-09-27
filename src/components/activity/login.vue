<template>
  <div class="login">
    <div class="box">
      <input type="text">
      <input type="text">
      <div class="login_btn"></div>
    </div>
    <div class="close" @click="hidebox"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  methods: {
    hidebox () {
      eventBus.$emit('hideMyreward' , false)
    }
  }
};
</script>

<style scoped lang="less">
.login {
  width: 5.51rem;
  height: 7.9rem;
  background: url("../../common/img/lottery/login.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  .close {
    position: absolute;
    bottom: 0rem;
    left: 50%;
    transform: translateX(-50%);
    width: 0.8rem;
    height: 0.66rem;
    // background: red;
  }
  .box {
    position: relative;
    top: 3.58rem;
    left: 50%;
    transform: translate(-50%);
    .login_btn {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 0.56em;
      width: 3.75rem;
      height: 0.66rem;
      // background: #fff;
    }

    input {
      position: relative;
      left: 1.6rem;
      width: 2.9rem;
      display: block;
      margin: 0;
      height: 0.6rem;
      line-height: 0.5rem;
      box-sizing: border-box;
      padding: 0 0.15rem;
      border: none;
      &:nth-of-type(1) {
        margin-bottom: 0.26rem;
      }
    }
  }
}
</style>