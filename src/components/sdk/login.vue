<template>
	<div id="app1">
		<div class="back">
			<!--<img src="../../common/img/sdk/close.png" @click="backLogin()" />-->
		</div>
		<div class="logo">
			<img src="../../common/img/sdk/logo.png" />
		</div>
		<div class="form">
			<div class="msg">
				<div class="username">
					<img src="../../common/img/sdk/login_user.png" />
					<input class="form_input" type="text" name="username" id="username" value="" placeholder="手机号/区块ID" />
				</div>
				<div class="password">
					<img src="../../common/img/sdk/login_pwd.png" />
					<input class="form_input" type="password" name="password" id="password" value="" placeholder="密码" />
				</div>
			</div>

			<input class="submit" type="button" @click="log_submit" value="登录" />
			<div class="yhxy">
				<span class="yhxys" @click="changePage(1)">注册账号</span>
				<span class="findPwd" @click="changePage(2)">忘记密码?</span>
			</div>
		</div>

		<div class="googleVen" v-show="isshow">
			<div class="title">
				<span class="name">输入谷歌验证码</span>
				<span class="cannel" @click="log_submit">取消</span>
			</div>
			<div class="input">
				<input type="number" pattern="[0-9]*" class="input-juli" maxlength="1" placeholder="-" />
				<input type="number" pattern="[0-9]*" class="input-juli" maxlength="1" placeholder="-" />
				<input type="number" pattern="[0-9]*" class="input-juli" maxlength="1" placeholder="-" />
				<input type="number" pattern="[0-9]*" class="input-juli" maxlength="1" placeholder="-" />
				<input type="number" pattern="[0-9]*" class="input-juli" maxlength="1" placeholder="-" />
				<input type="number" pattern="[0-9]*" class="input-juli" maxlength="1" placeholder="-" />
			</div>
			<div class="help">
				联系客服:QQ群 373494791
			</div>
		</div>

	</div>
</template>

<script>
export default {
  data: function() {
    return {
      loginData: "",
      updateData: "",
      isshow: false
    };
  },
  methods: {
    setCookie: function(name, value, expdays) {
      var expdate = new Date();
      //设置Cookie过期日期
      expdate.setDate(expdate.getDate() + expdays);
      //添加Cookie
      document.cookie =
        name + "=" + escape(value) + ";expires=" + expdate.toUTCString();
    },
    getCookie: function(name) {
      //获取name在Cookie中起止位置
      var start = document.cookie.indexOf(name + "=");

      if (start != -1) {
        start = start + name.length + 1;
        //获取value的终止位置
        var end = document.cookie.indexOf(";", start);
        if (end == -1) end = document.cookie.length;
        //截获cookie的value值,并返回
        return unescape(document.cookie.substring(start, end));
      }
      return "";
    },
    delCookie: function(name) {
      let vm = this;
      vm.setCookie(name, "", -1);
    },




    showQrCheck: function(code) {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/googleauthenticator/validation",
        async: true,
        dataType: "json",
        data: {
          token: vm.loginData.accessToken,
          code: code
        },
        success: function(arg) {
          vm.callBack();
        }
      });
    },
    back: function() {
      back();
    },
    changePage: function(id) {
      let vm = this;
      vm.$emit("changePage", id);
    },
    callBack: function() {
      let vm = this;
      window.sessionStorage.egg_token = vm.loginData.accessToken;
      window.sessionStorage.egg_openId = vm.loginData.openId;
      window.sessionStorage.egg_isLogin = "1";
      sessionStorage.egg_userData = JSON.stringify(vm.updateData);
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        location.href =
          "http://eggapi.liyugame.com/egg_game/view/wxauthorization/wx_open_authorization?redirect_url=" +
          encodeURIComponent(vm.bakurl) +
          "&token=" +
          sessionStorage.egg_token;
      } else {
        location.href = vm.bakurl;
      }
    },
    log_submit: function() {
      let vm = this;

      var username = $("#username").val();
      var password = $("#password").val();

      if (username == "") {
        mui.toast("请输入用户名");
      } else if (password == "") {
        mui.toast("请输入密码");
      } else {
        let utl2 = "/api/h5sdk/sdklogin";
        if (username.length > 6) {
          utl2 = "/api/h5sdk/sdklogin";
        } else {
          utl2 = "/api/h5sdk/blocklogin";
        }
        $.ajax({
          url: contextPath + utl2,
          type: "post",
          async: true,
          dataType: "json",
          data: {
            username: username,
            pwd: password
          },
          success: function(data) {
            var code = data.state.code;
            vm.loginData = data.data;
            window.sessionStorage.egg_token = data.data.accessToken;
            vm.setCookie("eggusername", username, 7);
            vm.setCookie(username, password, 7);

            $.ajax({
              url: contextPath + "/api/eggworld/checkLoginNum",
              type: "get",
              async: true,
              dataType: "json",
              data: {
                token: data.data.accessToken
              },
              success: function(datastate) {
                //第二次登录
                if (datastate.data.loginstatus != 0) {
                  //验证没通过
                  if (datastate.data.checkstatus != 0) {
                    vm.$router.push({
                      path: "realNameAuthentication"
                      //												,
                      //												query: {
                      //													accessToken: data.data.accessToken
                      //												}
                    });
                  } else {
                    if (data.data.isGoogleAuthenticator == 1) {
                      $.ajax({
                        type: "get",
                        url: contextPath + "/api/h5sdk/getUserById",
                        async: true,
                        data: {
                          token: data.data.accessToken
                        },
                        dataType: "json",
                        success: function(updateData) {
                          vm.updateData = updateData.data;
                          vm.isshow = !vm.isshow;
                        }
                      });
                    } else {
                      $.ajax({
                        type: "get",
                        url: contextPath + "/api/h5sdk/getUserById",
                        async: true,
                        data: {
                          token: data.data.accessToken
                        },
                        dataType: "json",
                        success: function(updateData) {
                          vm.updateData = updateData.data;
                          vm.callBack();
                        }
                      });
                    }
                  }
                } else {
                  $.ajax({
                    type: "get",
                    url: contextPath + "/api/h5sdk/getUserById",
                    async: true,
                    data: {
                      token: data.data.accessToken
                    },
                    dataType: "json",
                    success: function(updateData) {
                      vm.updateData = updateData.data;
                      vm.callBack();
                    }
                  });
                }
              }
            });
          }
        });
      }
      return false;
    }
  },
  mounted: function() {
    let vm = this;

    var username = vm.getCookie("eggusername");
    //如果用户名为空,则给表单元素赋空值
    if (username == "") {
      document.getElementById("username").value = "";
      document.getElementById("password").value = "";
    } else {
      //获取对应的密码,并把用户名,密码赋值给表单
      var password = vm.getCookie(username);
      document.getElementById("username").value = username;
      document.getElementById("password").value = password;
    }

    $(".input-juli").on("keyup", function(e) {
      if (e.keyCode == 46 || e.keyCode == 8) {
        var $input = $(this).prev("input");
        if ($input.length > 0 && $(this).val() == "") {
          $input.focus();
          $($input).val("");
        } else {
          $(this).val("");
        }
      } else {
        var $input = $(this).next("input");
        if ($input.length > 0) {
          $input.focus();
        } else {
          var numStr = "";
          var inputjulis = document.querySelectorAll(".input-juli");
          for (var i = 0; i < inputjulis.length; i++) {
            numStr = numStr + $(inputjulis[i]).val();
          }
          vm.showQrCheck(numStr);
        }
      }
    });
  },
  props: ["bakurl"]
};
</script>

<style lang="less" scoped>
.help {
  position: fixed;
  bottom: 0.5rem;
  text-align: center;
  width: 100%;
}

#app1 {
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
    font-size: 0.24rem;
    -webkit-transform: scale(0.91);
    width: 100%;
    margin-top: 0.15rem;
  }
  .yhxy {
    .yhxys {
      float: left;
      color: #ffffff;
    }
    .findPwd {
      float: right;
      color: #ffffff;
    }
  }
  .findPwd {
    float: right;
  }
}

.googleVen {
  width: 6.4rem;
  height: 100%;
  background: #eee;
  position: fixed;
  top: 0rem;
  left: 0;
}

.title {
  width: 6.4rem;
  height: 0.88rem;
  background: #006b8d;
}

.cannel {
  width: 1rem;
  height: 0.88rem;
  line-height: 0.88rem;
  color: #fff;
  float: right;
  text-align: center;
}

.name {
  height: 0.88rem;
  width: 4.4rem;
  text-align: center;
  margin-left: 1rem;
  line-height: 0.88rem;
  float: left;
  color: #fff;
}

.input {
  width: 5.6rem;
  margin: 0 auto;
  margin-top: 0.25rem;
}

.input input {
  width: 0.76rem !important;
  height: 0.55rem !important;
  float: left;
  border: none;
  border-bottom: 1px solid #cfcfcf;
  color: #006b8d;
  font-size: 0.34rem;
  margin-left: 0.14rem !important;
  text-align: center;
  border-radius: 0;
  background: #eee !important;
}
</style>