<template>
	<div id="app2">
		<div class="back">
			<img src="../../common/img/sdk/close.png" @click="backLogin()" />
		</div>
		<div class="logo">
			<img src="../../common/img/sdk/logo.png" />
		</div>
		<div class="form">
			<div class="msg">
				<div class="username">
					<img src="../../common/img/sdk/login_user.png" />
					<input class="form_input" type="text" name="username" id="username" value="" placeholder="手机号" />
				</div>
				<div class="validate">
					<img src="../../common/img/sdk/email.png" />
					<input class="form_input" type="text" name="validate" id="validate" value="" placeholder="验证码" />
					<div class="verification" id="verification" @click="getVerification">发送验证码</div>
				</div>
				<div class="password">
					<img src="../../common/img/sdk/login_pwd.png" />
					<input class="form_input" type="password" name="password" id="password" value="" placeholder="密码(8-20)位字母数字组合" />
				</div>
			</div>

			<div class="submit" id="submit" @click="form_check">注册</div>
		</div>
	</div>
</template>

<script>
export default {
  data: function() {
    return {
      loginData: []
    };
  },
  mounted() {
    let val6 = this.GetQueryString("openid");
    // console.log(val6);
    //sessionStorage.egg_setItem("eggtoken" , val6);
  },
  methods: {
    backLogin: function() {
      this.changePage(0);
    },
    changePage: function(id) {
      let vm = this;
      vm.$emit("changePage", id);
    },
    form_check: function() {
      var username = document.getElementById("username").value;
      if (!/^[1][0-9][0-9]{9}$/.test(username)) {
        mui.toast("用户名必须为手机号");
      } else {
        this.checkPass();
      }
    },
    checkPass: function() {
      let vm = this;
      var password = document.getElementById("password").value;
      var regu = /(?=.*\d)(?=.*[a-zA-Z]).{8,20}/;
      var re = new RegExp(regu);
      if (re.test(password)) {
        var userName = document.getElementById("username").value;
        var pwd = document.getElementById("password").value;
        var invitationCode = document.getElementById("validate").value;
        // let val8 = sessionStorage.egg_getItem("eggtoken");
        // console.log(val8)
        var val7 = vm.GetQueryString("openid");
        if (val7) {
          $.ajax({
            url: contextPath + "/api/eggworldactivity/sdkReg",
            type: "POST",
            dataType: "json",
            data: {
              account: userName,
              pwd: pwd,
              code: invitationCode,
              token: encodeURIComponent(val7)
            },
            success: function(data) {
              if (data.state.code == "20000") {
//              window.sessionStorage.egg_token = data.data.accessToken;
//              window.sessionStorage.egg_openId = data.data.openId
//              window.sessionStorage.egg_isLogin = "1";
                // console.log(data)

                mui.alert(
                  "进入游戏领取20BIDT!",
                  "恭喜您注册成功",
                  "立即登录",
                  function(e) {
                     vm.backLogin();
                  },
                  "div"
                );
              } else {
                mui.toast(data.state.msg);
              }
            }
          });
        } else {
          $.ajax({
            url: contextPath + "/api/h5sdk/sdkReg",
            type: "POST",
            dataType: "json",
            data: {
              account: userName,
              pwd: pwd,
              code: invitationCode
            },
            success: function(data) {
              if (data.state.code == "20000") {
//              window.sessionStorage.egg_token = data.data.accessToken;
//              window.sessionStorage.egg_isLogin = "1";
//              window.sessionStorage.egg_openId = data.data.openId

                mui.alert(
                  "进入游戏领取20BIDT!",
                  "恭喜您注册成功",
                  "立即登录",
                  function(e) {
                    vm.backLogin();
                  },
                  "div"
                );
              } else {
                mui.toast(data.state.msg);
              }
            }
          });
        }
      } else {
        mui.toast("密码中必须包含字母、数字，至少8个字符，最多20个字符。");
      }
    },

    GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      console.log(r)
      if (r != null) return unescape(r[2]);
      return null;
    },
    getVerification: function() {
      var username = document.getElementById("username").value;
      if (!/^[1][0-9][0-9]{9}$/.test(username)) {
        mui.toast("用户名必须为手机号");
      } else {
        $("#verification").html("发送中");
        $.ajax({
          url: contextPath + "/api/h5sdk/sdkcode",
          type: "POST",
          dataType: "json",
          data: {
            account: $("#username").val()
          },
          success: function(data) {
            if (data.state.code == "20000") {
              mui.toast("发送成功");
              var i = 60;
              $("#verification").addClass("verificated");
              var timer1 = setInterval(function() {
                $("#verification").html("重新发送(" + i + ")");
                if (i == 0) {
                  window.clearInterval(timer1);
                  $("#verification").html("重新发送");
                  $("#verification").removeClass("verificated");
                }
                i--;
              }, 1000);
            } else {
              $("#verification").html("重新发送");
            }
          },
          error: function(data) {
            $("#verification").html("重新发送");
          }
        });
      }
    }
  }
};
</script>

<style lang="less">
body {
  background-color: #ffffff;
}

#app2 {
  .forget {
    display: block;
    height: 0.58rem;
    width: 100%;
    color: #909090;
    text-align: left;
    line-height: 0.58rem;
    -webkit-transform: scale(0.75) translateX(-0.8rem);
  }
  .yhxy {
    position: absolute;
    color: #909090;
    -webkit-transform: scale(0.91) translate(-0.1rem, 0.1rem);
  }
  .yhxy a {
    color: #909090;
    text-decoration: underline;
  }
  #validate {
    width: 1.5rem;
  }
}
</style>