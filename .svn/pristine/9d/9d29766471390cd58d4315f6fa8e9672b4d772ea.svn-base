<template>
  <div class="qksfrz">
    <heador>
      <h3>区块身份认证</h3>
    </heador>
    <div class="tip">
      为了您区块的信息及资金安全，需验证您的身份才可进行其他操作， 请务必如实填写。
    </div>
    <ul class="idinfo">
      <li>
        <i>姓名</i>
        <input type="text" v-model="username" placeholder="请输入真实姓名">
      </li>
      <li>
        <i>证件号码</i>
        <input type="text" v-model="idnum" placeholder="身份证号码/护照证件号码">
      </li>
    </ul>
    <p class="sub" @click="gosetpassword">提交申请</p>
  </div>
</template>

<script>
import heador from "./header";
export default {
  data() {
    return {
      username: "",
      idnum: ""
    };
  },
  components: {
    heador
  },
  methods: {
    qkrz() {
      let vm = this;
      if (this.username && this.idnum) {
        var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (!regIdNo.test(this.idnum)) {
          alert("身份证号填写有误");
          return false;
        }

        $.ajax({
          url: contextPath1 + "/api/banding/saveIdentityCard",
          type: "post",
          async: true,
          dataType: "json",
          data: {
            userName: vm.username,
            identityCard: vm.idnum,
            account: sessionStorage.mynum,
            token: sessionStorage.egg_token,
            project: 1
          },
          success: function(data) {
            console.log(data.data);
            sessionStorage.qkid = data.data.blockId;
            sessionStorage.lh_token = data.data.token;
            vm.$router.push("/setpassword");
          }
        });
      } else {
        mui.alert("请输入完整的信息");
      }
    },
    gosetpassword() {
      this.qkrz();
    }
  }
};
</script>

<style scoped lang="less">
.qksfrz {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f7f7f7;
  overflow: hidden;
  .tip {
    padding: 0.2rem;
    color: #ff8400;
    font-size: 0.2rem;
    line-height: 0.3rem;
  }
  .idinfo {
    li {
      background: #fff;
      border-bottom: 0.01rem solid #c3c3c3;
      line-height: 0.84rem;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      &:last-of-type {
        border-bottom: none;
      }
      i {
        display: inline-block;
        width: 1rem;
        font-size: 0.2rem;
        color: #333;
        font-style: normal;
        margin-left: 0.2rem;
      }
      input {
        position: relative;
        top: 0.08rem;
        flex: 1;
        border: none;
        margin-bottom: 0;
        font-size: 0.24rem;
      }
    }
  }
  .sub {
    width: 4.44rem;
    height: 0.58rem;
    line-height: 0.58rem;
    margin: 1rem auto;
    color: #fff;
    background: #169bd5;
    text-align: center;
    font-weight: 300;
    font-size: 0.2rem;
    border-radius: 0.08rem;
  }
}
</style>