<template>
  <div class="setpassword">
    <heador>
      <h3>设置密码</h3>
    </heador>
    <div class="banner">
      <div class="myinfo">
        <p>区块身份注册申请成功</p>
        <p>你的区块身份ID：{{qkid}}</p>
      </div>
    </div>
    <div class="qkidwrapper">
      <div class="qkid">
        <p class="tip2">请设置你的区块身份登录密码</p>
        <p class="inp">
          <i></i><input v-model="psd1" type="password" placeholder="请设置密码"></p>
        <p class="inp">
          <i></i><input v-model="psd2" type="password" placeholder="确认密码"></p>
      </div>
    </div>
    <div class="sub">
      <p class="login" @click="gobdsf">确认</p>
    </div>
  </div>
</template>

<script>
import heador from "./header";
export default {
  data() {
    return {
      psd1:"",
      psd2:"",
      qkid: sessionStorage.qkid
    }
  },
  components: {
    heador
  },
  methods :{
    setpsd () {
      let vm = this;
      if(this.psd1 != "" && this.psd1 != this.psd2) {
        mui.alert("两次输入不密码不一致，请重新输入");
        return;
      }
      $.ajax({
          url: contextPath1 + "/api/banding/updatePwd",
          type: "post",
          async: true,
          dataType: "json",
          data: {
            pwd:vm.psd1,
            token: sessionStorage.lh_token,
            blockId:sessionStorage.qkid
          },
          success: function(data) {
            vm.$router.push("/bindingBlockIdentity");
          }
        });
    },
    gobdsf () {
      this.setpsd();
      // this.$router.push("/bindingBlockIdentity");
    }
  }
};
</script>

<style scoped lang="less">
.setpassword {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f7f7f7;
  overflow: hidden;

  .banner {
    height: 2.36rem;
    background: url("../../common/img/blockidenty/banner.png") no-repeat;
    background-size: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .myinfo {
      width: 3rem;
      margin: 0 auto;
      p {
        text-align: center;
        font-weight: 300;
        line-height: 0.4rem;
        color: #fff;
        font-size: 0.2rem;
        border-radius: 0.1rem;
        &:nth-of-type(1) {
          margin-bottom: 0.1rem;
        }
        &:nth-of-type(2) {
          background: #f0a523;
          padding: 0 0.05rem;
        }
      }
    }
  }
  .qkidwrapper {
    background: #fff;
    overflow: hidden;
    padding-bottom: 0.4rem;
    .qkid {
      width: 4.45rem;
      margin: 0 auto;
      margin-top: 0.3rem;
      .tip2 {
        font-size: 0.3rem;
        color: #333;
        margin-bottom: 0.2rem;
        font-weight: 300;
      }
      .sub {
        clear: both;
      }
      .inp {
        height: 0.86rem;
        line-height: 0.86rem;
        border-bottom: 0.01rem solid #c3c3c3;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        i {
          display: inline-block;
          width: 0.35rem;
          height: 0.34rem;
        }
        input {
          flex: 1;
          display: inline-block;
          border: none;
          background: #fff;
          height: 0.8rem;
          margin-bottom: 0;
          font-size: 0.25rem;
          color: #999;
        }
        &:nth-of-type(2) {
          i {
            background: url("../../common/img/blockidenty/mima.png") no-repeat;
            background-size: 100%;
          }
        }
        &:nth-of-type(3) {
          i {
            width: 0.3rem;
            height: 0.35rem;
            background: url("../../common/img/blockidenty/mima.png") no-repeat;
            background-size: 100%;
          }
        }
      }
    }
  }
  .login {
    width: 4.44rem;
    height: 0.58rem;
    background: #169bd5;
    color: #fff;
    margin: 0 auto;
    font-size: 0.3rem;
    text-align: center;
    line-height: 0.58rem;
    margin-top: 1rem;
    border-radius: 0.08rem;
  }
}
</style>