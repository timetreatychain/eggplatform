<template>
  <div class="findpassword">
    <heador>
      <h3>找回登录密码</h3>
    </heador>
    <div class="content">
      <div class="top">
        <ul class="passworpic">
          <li>
            <div class="qkwrapper">
              <p>
                <img src="../../common/img/blockidenty/yzsf.png" alt="">
                <i class="page cur">验证身份</i>
              </p>
              <em class="border1"></em>
              <p v-if="status == 0">
                <img src="../../common/img/blockidenty/czmm.png" alt="">
                <i class="page">重置密码</i>
              </p>
              <p v-if="status == 1">
                <img src="../../common/img/blockidenty/czmm2.png" alt="">
                <i class="page cur">重置密码</i>
              </p>
            </div>
          </li>
          <li v-if="status == 0" class="qkid">
            <i class="title1">区块ID</i>
            <input type="text" v-model="qkid" class="" placeholder="请输入区块ID">
          </li>
          <li v-if="status == 1" class="yzmtip">
            <span>验证码将发送至绑定手机：{{phonenum}}</span>
          </li>
          <li v-if="status == 1" class="yzmtip">
            <i>验证码</i> <input type="text" v-model="phone1">
            <em class="yzm1" v-if="showewm" @click="getcodenum">获取验证码</em>
            <em class="yzm1" v-if="!showewm">{{second1}}s</em>
          </li>
          <li v-if="status == 1" class="yzmtip">
            <i>新密码</i> <input v-model="psd1" type="password">
          </li>
          <li v-if="status == 1" class="yzmtip">
            <i>确认密码</i> <input v-model="psd2" type="password">
          </li>

        </ul>
      </div>
      <ul class="nextstep">
        <li @click="gonext" v-if="status == 0">下一步</li>
        <li @click="sub" v-if="status == 1">确认修改</li>
        <li v-if="status == 0" @click="goforgetqkid">忘记区块ID</li>
      </ul>
    </div>
  </div>
</template>

<script>
import heador from "./header";
export default {
  data() {
    return {
      status: 0,
      showewm: true,
      second1: 60,
      qkid: "",
      phone1: "",
      psd1: "",
      psd2: ""
    };
  },
  components: {
    heador
  },
  methods: {
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
      let vm = this;
      $.ajax({
        url: contextPath1 + "/api/banding/blockIdPhoneCode",
        type: "post",
        async: true,
        dataType: "json",
        data: {
          // token: sessionStorage.egg_token,
          // project: 1
          blockId: vm.qkid,
        },
        success: function(data) {
          if(data.state.code == 20000) {
            vm.getcode();
          }
          
        }
      });
    },
    qrxg() {
      let vm = this;
      if (this.psd1 != "" && this.psd1 == this.psd2) {
        if(this.phone1 == "") {
          mui.alert("请输入验证码");
          return;
        }
        $.ajax({
          url: contextPath1 + "/api/banding/findPwd",
          type: "post",
          async: true,
          dataType: "json",
          data: {
            pwd: vm.psd1,
            code:vm.phone1,
            blockId: vm.qkid,
            // token: sessionStorage.egg_token,
            // project: 1
          },
          success: function(data) {
            mui.toast("修改成功");
            vm.$router.push("/blockIdentity");
          }
        });
      } else {
        mui.alert("输入的号码不一致，请重新输入");
        return;
      }
    },
    getinit() {
      let vm = this;
      $.ajax({
        url: contextPath1 + "/api/banding/judgeBlockId",
        type: "post",
        async: true,
        dataType: "json",
        data: {
          blockId: vm.qkid
        },
        success: function(data) {
          vm.phonenum = data.data;
          vm.status = 1;
        }
      });
    },
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
    gonext() {
      this.getinit();
    },
    sub() {
      this.qrxg();
    },
    goforgetqkid() {
      this.$router.push("/findBlockId");
    }
  }
};
</script>

<style scoped lang="less">
.findpassword {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f7f7f7;
  overflow: hidden;
  .content {
    .top {
      position: relative;
      display: flex;
      justify-content: space-between;
      // align-items: center;
      // height: 1.39rem;
      background: #fff;
      // &::after {
      //   content: "";
      //   position: absolute;
      //   height: 0.2rem;
      //   background: #f7f7f7;
      //   width: 100%;
      //   left: 0;
      //   bottom:1.2rem;
      // }
      .passworpic {
        margin: 0 auto;
        li {
          display: flex;
          width: 6.4rem;
          border-bottom: 0.01rem solid #e3e3e3;
          flex-wrap: wrap;
          align-items: center;
          .qkwrapper {
            width: 5rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            align-items: center;
            margin: 0 auto;
          }
          &:nth-of-type(1) {
            margin-top: 0.3rem;
            // margin-bottom: 1rem;
            padding-bottom: 0.4rem;
            border-bottom: 0.2rem solid #f7f7f7;
          }

          &.qkid {
            padding: 0.1rem 0.2rem;
            justify-content: space-between;
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
          p {
            width: 1rem;
            img {
              margin: 0 auto;
              width: 0.69rem;
              height: 0.7rem;
              display: block;
              margin-bottom: 0.1rem;
            }
            i.page {
              font-size: 0.2rem;
              display: inline-block;
              font-style: normal;
              text-align: center;
              font-weight: 300;
              &.cur {
                color: #169bd5;
              }
            }
          }
          em.border1 {
            display: inline-block;
            height: 0;
            border-bottom: 0.02rem dashed #dbdfe2;
            width: 3rem;
            margin-top: -0.3rem;
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
          }
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
        &:nth-of-type(1) {
          background: #169bd5;
          color: #fff;
          font-size: 0.2rem;
          box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.3);
        }
        &:nth-of-type(2) {
          color: #169bd5;
        }
      }
    }
  }
}
</style>