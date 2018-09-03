<template>
  <div class="resetPassword">
    <heador>
      <h3>重置密码</h3>
    </heador>
    <ul class="passworpic">
      <li class="yzmtip">
        <i>新密码</i> <input v-model="psd1" type="password">
      </li>
      <li class="yzmtip">
        <i>确认密码</i> <input v-model="psd2" type="password">
      </li>
    </ul>
    <ul class="nextstep">
      <li @click="sub">确认修改</li>
    </ul>
  </div>
</template>

<script>
import heador from "./header";
export default {
  data() {
    return {
      psd1:"",
      psd2:"",
    }
  },
  components: {
    heador
  },
  methods: {
    qrxg() {
      let vm = this;
      if (this.psd1 != "" && this.psd1 == this.psd2) {
        if(this.phone1 == "") {
          mui.alert("请输入验证码");
          return;
        }
        $.ajax({
          url: contextPath1 + "/api/banding/updatePwd",
          type: "post",
          async: true,
          dataType: "json",
          data: {
            pwd: vm.psd1,
            token: sessionStorage.lh_token,
            blockId: sessionStorage.qkid
          },
          success: function(data) {
             mui.toast("重置成功");
            vm.$router.push("/blockIdentity");
            // mui.toast("修改成功");
            // vm.$router.push("/blockIdentity");
          }
        });
      } else {
        mui.alert("输入的密码有误，请重新输入");
        return;
      }
    },
    sub() {
      this.qrxg();
      // mui.toast("重置成功");
      // this.$router.push("/blockIdentity");
    }
  }
};
</script>

<style scoped lang="less">
.resetPassword {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f7f7f7;
  overflow: hidden;

  .passworpic {
    margin: 0 auto;
    li {
      display: flex;
      width: 6.4rem;
      border-bottom: 0.01rem solid #e3e3e3;
      flex-wrap: wrap;
      align-items: center;
      background: #fff;
      &.qkid {
        height: 1.9rem;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 0;
        border-bottom: none;
      }
      &.yzmtip {
        padding: 0.1rem 0.2rem;
        .yzm1 {
          font-weight: 300;
          color: #8fc8f4;
          font-size: 0.28rem;
          display: inline-block;
          font-style: normal;
          width: 1.4rem;
        }
        i {
          font-style: normal;
          display: inline-block;
          width: 1.4rem;
          font-size: 0.2rem;
        }
        span {
          color: #ffc321;
          font-size: 0.24rem;
          display: inline-block;
          line-height: 0.9rem;
          height: 0.9rem;
        }
        &:last-of-type {
          border-bottom: none;
        }
      }
      .title1 {
        display: inline-block;
        width: 1rem;
        color: #333;
        font-style: normal;
        height: 0.9rem;
        line-height: 0.9rem;
        font-size: 0.26rem;
      }
      input {
        flex: 1;
        color: #999;
        line-height: 0.9rem;
        height: 0.9rem;
        border: none;
        margin-bottom: 0;
        padding: 0;
        font-size: 0.26rem;
        font-weight: 300;
        margin-right: 0.1rem;
      }
    }
  }
  .nextstep {
    width: 4.44rem;
    margin: 1rem auto;
    li {
      height: 0.58rem;
      line-height: 0.58rem;
      text-align: center;
      border-radius: 0.1rem;
      font-weight: 300;
      &:nth-of-type(1) {
        background: #169bd5;
        color: #fff;
        font-size: 0.2rem;
        box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.3);
        margin-bottom: 0.2rem;
      }
      &:nth-of-type(2) {
        color: #169bd5;
        border: 0.01rem solid #169bd5;
      }
    }
  }
}
</style>