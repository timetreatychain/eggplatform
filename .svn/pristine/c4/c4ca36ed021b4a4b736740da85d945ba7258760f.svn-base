<template>
  <div class="applyReg">
    <heador>
      <h3>区块身份注册申请</h3>
    </heador>
    <div class="content">
      <div class="logo">
        <img src="../../common/img/blockidenty/logo.png" alt="">
        <p class="tip">一个区块身份</p>
        <p class="tip">畅行整个区块链生态</p>
        <!-- <p class="tip1">您还未绑定您的区块身份，请登录并绑定</p> -->
      </div>
      <div class="qkid">
        <p class="inp">
          <i></i><input type="text" v-model="phone1" placeholder="请输入手机号码"></p>
        <p class="inp">
          <i></i><input type="text" v-model="code1" placeholder="请输入短信验证码">
          <span class="yzm" v-show="showewm"  @click="getcodenum">获取验证码</span>
          <em class="yzm" v-show="!showewm">{{second1}}s</em>
        </p>
        <div class="sub">
          <p class="login" @click="gosfrz">下一步</p>
          <em class="ljdl" @click="goindex">立即登录</em>
          <p class="login login2" @click="gosfrz1">使用蛋生的世界账号一键注册</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import heador from "./header";
export default {
  data() {
    return {
      showewm: true,
      second1: 60,
      phone1: "",
      code1:""
    };
  },
  components: {
    heador
  },
  methods: {
    gosfrz1 () {
      sessionStorage.mynum = JSON.parse(sessionStorage.egg_userData).phoneNum;
      setTimeout(() => {
        this.$router.push("/blockIdentityAuthentication");
      } , 100)
    },
    getcodenum() {
      if (this.phone1 == "") {
        mui.alert("请先输入手机号码");
        return false;
      }
      let vm = this;
      $.ajax({
        url: contextPath1 + "/api/banding/phoneCode",
        type: "post",
        async: true,
        dataType: "json",
        data: {
          phone: vm.phone1,
          token: sessionStorage.egg_token,
          project: 1
        },
        success: function(data) {
          if(data.state.code == 20000) {
            vm.getcode();
            // mui.toast("已发送")
          }
        }
      });
    },
    goindex() {
      this.$router.push("/blockIdentity");
    },
    getcode() {
      // if (this.phone1 == "") {
      //   mui.alert("请先输入手机号码");
      //   return false;
      // } else {
        if (this.showewm) {
          mui.toast("已发送")
          clearInterval(timer);
          this.showewm = false;
          // this.getcodenum();
          var timer = setInterval(() => {
            if (this.second1 == 0) {
              clearInterval(timer);
              this.showewm = true;
              this.second1 = 60;
            }
            this.second1--;
          }, 1000);
        }
      // }
    },
    regist () {
      let vm = this;
      $.ajax({
        url: contextPath1 + "/api/banding/affirmCode",
        type: "post",
        async: true,
        dataType: "json",
        data: {
          phone: vm.phone1,
          token: sessionStorage.egg_token,
          code: vm.code1,
          project: 1
        },
        success: function(data) {
          sessionStorage.mynum = data.data;
          vm.$router.push("/blockIdentityAuthentication");
        }
      });
    },
    gosfrz() {
      this.regist()
      // this.$router.push("/blockIdentityAuthentication");
    },
    // getcode() {
    //   if (this.showewm) {
    //     clearInterval(timer);
    //     this.showewm = false;
    //     var timer = setInterval(() => {
    //       if (this.second1 == 0) {
    //         clearInterval(timer);
    //         this.showewm = true;
    //         this.second1 = 60;
    //       }
    //       this.second1--;
    //     }, 1000);
    //   }
    // }
  }
};
</script>

<style scoped lang="less">
.applyReg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f7f7f7;
  overflow: hidden;

  .logo {
    width: 5rem;
    margin: 0.2rem auto;
    margin-top: 0.4rem;
    img {
      display: block;
      width: 1rem;
      height: 1.1rem;
      margin: 0 auto;
      margin-bottom: 0.1rem;
    }
    .tip {
      text-align: center;
      font-size: 0.28rem;
      line-height: 0.32rem;
      font-weight: 300;
      color: #666666;
    }
    .tip1 {
      margin-top: 0.6rem;
      text-align: center;
      font-size: 0.2rem;
      font-weight: 300;
      color: #999999;
    }
  }
  .qkid {
    width: 4.45rem;
    margin: 0 auto;
    .sub {
      clear: both;
      margin-top: 0.72rem;
      .login {
        width: 100%;
        height: 0.58rem;
        background: #169bd5;
        color: #fff;
        font-size: 0.3rem;
        text-align: center;
        line-height: 0.58rem;
        border-radius: 0.1rem;
        font-weight: 300;
      }
      .login2 {
        clear: both;
        background: #70bb52;
        border-radius: 0.1rem;
        font-weight: 300;
      }
      .ljdl {
        color: #169bd5;
        float: right;
        margin-top: 0.2rem;
        font-size: 0.2rem;
        margin-bottom: 0.5rem;
      }
      .apply1 {
        margin-top: 0.2rem;
        text-align: center;
        font-size: 0.2rem;
        font-size: 0.2rem;
        color: #333;
        em {
          color: #169bd5;
          font-style: normal;
        }
      }
    }

    .forgetpassword {
      display: block;
      float: right;
      font-size: 0.2rem;
      color: #999;
      margin-top: 0.15rem;
      font-weight: 300;
      margin-bottom: 1rem;
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
        background: #f7f7f7;
        height: 0.8rem;
        margin-bottom: 0;
        font-size: 0.25rem;
        color: #999;
      }
      &:nth-of-type(1) {
        i {
          background: url("../../common/img/blockidenty/person.png") no-repeat;
          background-size: 100%;
        }
      }
      &:nth-of-type(2) {
        i {
          width: 0.3rem;
          height: 0.35rem;
          background: url("../../common/img/blockidenty/yzm.png") no-repeat;
          background-size: 100%;
        }
        .yzm {
          // width: 1.5rem;
          display: inline-block;
          line-height: 0.4rem;
          font-size: 0.2rem;
          color: #169bd5;
          text-align: center;
          height: 0.4rem;
          border: 0.01rem solid #169bd5;
          padding: 0 0.1rem;
          border-radius: 0.1rem;
        }
      }
    }
  }
}
</style>