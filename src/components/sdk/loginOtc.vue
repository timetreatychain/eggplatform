<template>
  <div class="loginOtc">
    <heador>
      <h3>登录OTC</h3>
    </heador>
    <div class="content">
      <div class="tip"><i class="sound"></i>绑定OTC账号即可在游戏内一键提币到OTC交易</div>
      <div class="tip2" v-if="otcBindStatus == 0">您还未绑定OTC账号，请登录并绑定</div>
      <div class="qkid">
        <p class="inp">
          <i></i><input type="text" v-model="username" placeholder="OTC账号"></p>
        <p class="inp">
          <i></i><input type="password" v-model="psd" placeholder="密码"></p>
        <!-- <em class="forgetpassword" @click="gofindword">忘记密码</em> -->
        <div class="sub">
          <p class="login" @click="gobdsf">登录</p>
          <p class="apply1" v-if="otcBindStatus == 0">
            <router-link to="manageOtc" tag="em">还没OTC账号？使用区块身份ID激活</router-link>
          </p>
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
      hasbd:0,
      username:"",
      psd:"",
      datainfo:"",
      otcBindStatus: 0
    }
  },
  components: {
    heador
  },
  mounted() {
    this.checkOtcBind();
  },
  methods :{
    mylogin () {
      let vm = this;
      $.ajax({
						url:  contextOtcPath+"/api/push/reg/login",
						type: "post",
						async: true,
						dataType: "json",
						data: {
              pwd: vm.psd,
              username:vm.username,
              languageType: "zh"
						},
						success: function(data) {
                sessionStorage.otcAcount = data.data.username;
                // sessionStorage.mynum = JSON.parse(sessionStorage.egg_userData).phoneNum;
                sessionStorage.otc_token = data.data.token;
								vm.$router.push("/bindOtc");
						}
					});
    },
    checkOtcBind () {
      let vm = this;
      $.ajax({
						url:  contextPath1+"/api/certification/whetherBandingOtc",
						type: "post",
						async: true,
						dataType: "json",
						data: {
							// token:sessionStorage.egg_token,
              // count:amount
              token: sessionStorage.lh_token,
              project: 2
						},
						success: function(data) {
                vm.otcBindStatus = data.data;
                if(vm.otcBindStatus != 0) {
                  sessionStorage.otcAcount = vm.otcBindStatus;
                  // vm.$router.push('/manageOtc')
                }
						}
					});
    },
    getinit () {
      let vm = this;
      $.ajax({
						url:  contextPath1+"/api/banding/judgeBanding",
						type: "post",
						async: true,
						dataType: "json",
						data: {
							// token:sessionStorage.egg_token,
              // count:amount
              token: sessionStorage.egg_token,
              project: 1
						},
						success: function(data) {
                vm.hasbd = data.data.status;
                if(vm.hasbd == 1) {
                  sessionStorage.lh_token = data.data.token;
                  vm.$router.push("/bindingBlockIdentity");
                }
						}
					});
    },
    gobdsf () {
      this.mylogin();
      //this.$router.push('/bindingBlockIdentity');
    },
    gofindword () {
      this.$router.push('/findpassword');
    }
  }
};
</script>

<style scoped lang="less">
.loginOtc {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  overflow: hidden;
  .content {
    background: #fff;
    .tip {
      height: 0.48rem;
      line-height: 0.48rem;
      font-size: 0.18rem;
      color: #333;
      background: #f7f7f7;
      i {
        display: inline-block;
        width: 0.16rem;
        height: 0.2rem;
        background: url('../../common/img/blockidenty/sound.png') no-repeat;
        background-size: 100%;
        margin-left: 0.2rem;
        margin-right: 0.2rem;
      }
    }
    .tip2 {
      margin:  0 auto;
      text-align: center;
      font-size: 0.2rem;
      color: #333;
      margin-top: 1rem;
    }
    .qkid {
    width: 4.45rem;
    margin: 0 auto;
    margin-top: 1rem;
    .sub {
      clear: both;
      margin-top: 0.5rem;
      .login {
        width: 100%;
        height: 0.58rem;
        background: #169bd5;
        color: #fff;
        font-size: 0.3rem;
        text-align: center;
        line-height: 0.58rem;
      }
      .apply1 {
        position: absolute;
        width: 100%;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0.4rem;
        // margin-top: 0.2rem;
        text-align: center;
        font-size: 0.2rem;
        font-size: 0.2rem;
        color: #333;
        em {
          color: #169BD5;
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
        // background: #f7f7f7;
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
          background: url("../../common/img/blockidenty/mima.png") no-repeat;
          background-size: 100%;
        }
      }
    }
  }

  }
}
</style>