<template>
  <div class="findBlockId">
    <heador>
      <h3>找回区块身份ID</h3>
    </heador>
    <ul class="passworpic">
      <li v-if="status == 0" class="qkid">
        <div class="info3">
          <p>以下为该手机号绑定的区块ID</p>
          <p>区块身份ID：
            <i>{{datainfo.blockId}}</i>
          </p>
        </div>
      </li>
      <li v-if="status == 1" class="yzmtip">
        <span>通过区块身份ID绑定的手机号找回</span>
      </li>
      <li v-if="status == 1" class="yzmtip">
        <i>姓名</i> <input type="text" v-model="username">
      </li>
      <li v-if="status == 1" class="yzmtip">
        <i>证件号</i> <input type="text" v-model="sfz">
      </li>
      <li v-if="status == 1" class="yzmtip">
        <i>手机号</i> <input type="text" v-model="phone1">
      </li>
      <li v-if="status == 1" class="yzmtip">
        <i>验证码</i> <input type="text" v-model="code1">
        <em class="yzm1" v-if="showewm" @click="getcodenum">获取验证码</em>
        <em class="yzm1" v-if="!showewm">{{second1}}s</em>
      </li> 
    </ul>
    <ul class="nextstep">
      <li @click="gonext" v-if="status == 0">返回登录</li>
      <li @click="sub" v-if="status == 1">下一步</li>
      <li v-if="status == 0" @click="goresetpassword">重置密码</li>
    </ul>
  </div>
</template>

<script>
import heador from "./header";
export default {
  data() {
    return {
      status: 1,
      showewm: true,
      second1: 60,
      phone1: "",
      code1: "",
      sfz:"",
      datainfo:"",
      username:""
    };
  },
  methods: {
    // getcode () {
    //   if(this.showewm) {
    //     clearInterval(timer);
    //     this.showewm = false;
    //     var timer =  setInterval(() => {
    //       if(this.second1 == 0) {
    //         clearInterval(timer);
    //         this.showewm = true;
    //         this.second1 = 60;
    //       }
    //       this.second1--;
    //     }, 1000)

    //   }
    // },
    getback() {
      let vm = this;
      if(this.username =="") {
        mui.alert("请输入姓名");
        return;
      }
      if (this.phone1 == "") {
        mui.alert("请输入手机号码");
        return;
      }
      if (this.code1 == "") {
        mui.alert("请输入验证码");
        return;
      }
      if(this.sfz =="") {
        mui.alert("请输入身份证号码");
        return;
      }
      
       var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (!regIdNo.test(this.sfz)) {
          mui.alert("身份证号填写有误");
          return false;
        }
      $.ajax({
        url: contextPath1 + "/api/banding/findBlockId",
        type: "post",
        async: true,
        dataType: "json",
        data: {
          code: vm.code1,
          phone: vm.phone1,
          token: sessionStorage.egg_token,
          project: 1,
          identityCard: vm.sfz,
          userName:vm.username
        },
        success: function(data) {
          sessionStorage.qkid = data.data.blockId;
                sessionStorage.mynum = JSON.parse(sessionStorage.egg_userData).phoneNum;
                sessionStorage.lh_token = data.data.token;
          vm.status = 0;
          vm.datainfo = data.data;
        }
      });
    },

    getcode() {
      // if (this.phone1 == "") {
      //   mui.alert("请先输入手机号码");
      //   return false;
      // } else {
        if (this.showewm) {
          mui.toast("已发送");
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
    getcodenum() {
      if (this.phone1 == "") {
        mui.alert("请先输入手机号码");
        return false;
      }
      let vm = this;
      $.ajax({
        url: contextPath1 + "/api/banding/findBlockIdCode",
        type: "post",
        async: true,
        dataType: "json",
        data: {
          phone: vm.phone1,
          // token: sessionStorage.egg_token,
          // project: 1
        },
        success: function(data) {
          if(data.state.code == 20000) {
             vm.getcode();
          }
          // mui.toast("已发送");
        }
      });
    },

    sub() {
      this.getback();
      // this.status = 0;
    },
    gonext() {
      this.$router.push("/blockIdentity");
    },
    goresetpassword() {
      this.$router.push("/resetPassword");
    }
  },
  components: {
    heador
  }
};
</script>

<style scoped lang="less">
.findBlockId {
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
        .info3 {
          width: 3.2rem;
          p {
            text-align: center;
            font-weight: 300;
            line-height: 0.4rem;
            &:nth-of-type(1) {
              color: #999;
            }
            &:nth-of-type(2) {
              color: #333;
            }
            i {
              font-style: normal;
              color: #fdbe00;
            }
          }
        }
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
          text-align: center;
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