<template>
	<div class="context">
		<div class="title">
			<a href="javascript:history.go(-1)"><img src="../../common/img/userCenter/arrowsb.png" alt="" class="back" /></a>提币到OTC交易
		</div>
		<div class="otcCenter otcCenter_login" v-if="view==0">
			<div class="lable">绑定OTC账号即可在游戏内一键提币到OTC交易</div>
			<div class="lable2">您还未绑定OTC账号,请登录并绑定</div>
			<div class="form">
				<div class="msg">
					<div class="username">
						<input class="form_input" type="text" name="username" id="otcloginusername" value="" placeholder="用户名" />
					</div>
					<div class="password">
						<input class="form_input" type="password" name="password" id="otcloginpassword" value="" placeholder="密码" />
					</div>
				</div>

				<input class="submit" type="button" @click="otclogin" value="登录" />
				<div class="yhxy">
					<span class="yhxys" @click="changePage(1)">注册OTC账号</span>
					<span class="findPwd">忘记密码?</span>
				</div>
			</div>

		</div>
		<div class="otcCenter otcCenter_regist" v-if="view==1">
			<div class="lable">绑定OTC账号即可在游戏内一键提币到OTC交易</div>
			<div class="lable2">注册OTC</div>

			<div class="onekeylogin">
				<div class="onekeyloginbtn" @click="onkeybind">使用蛋生的世界账号一键注册</div>
			</div>

			<div class="form">
				<div class="msg">
					<div class="username">
						<input class="form_input" type="text" name="username" id="otcregistusername" value="" placeholder="邮箱账号" />
					</div>
					<div class="password">
						<input class="form_input" type="password" name="password" id="otcregistpassword" value="" placeholder="密码(8-20)位字母数字组合" />
					</div>
					<div class="validate">
						<input class="form_input" type="text" name="validate" id="validate" value="" placeholder="验证码" />
						<div class="verification" id="verification" @click="otcGetCode">发送验证码</div>
					</div>

				</div>

				<div class="submit" id="submit" @click="otcregister">注册</div>
				<div class="yhxy">
					<span class="yhxys" @click="changePage(0)">登录</span>
				</div>
			</div>
		</div>
		<div class="otcCenter otcCenter_binded" v-if="view==2">
			<div class="lable">绑定OTC账号即可在游戏内一键提币到OTC交易</div>
			<div class="lable2">登陆成功</div>

			<div class="logined">
				<div class="lable3">请确认现在就绑定OTC账号:</br>{{otcusername}}</div>
				<div class="submit" @click="otcBindEgg">确定绑定</div>
			</div>
		</div>
		<div class="otcCenter otcCenter_setMes" v-if="view==3">
			<img src="../../common/img/mes.jpg" class="messagelogo" />
			<div class="otcAccount">已绑定OTC账号:&nbsp;{{otcusername}}</div>
			<div class="priceSetting">
				<div class="lable">输入提交到OTC交易的单价</div>
				<div class="price clear">
					<span>交易单价:</span>
					<input type="text" name="" id="price" placeholder="单价" value="" />
					<span>元</span>
				</div>
				<div class="tips">市场指导价:{{bidtprice}}元</div>
			</div>
			<div class="rmbWeys">
				<div class="lable">设置您的收款方式</div>
				<div class="sublable">交易金额会转入您设置的收款账号</div>
				<ul>
					<li class="clear">
						<input class="radio" id="r1" type="radio" value="0" name="gender">支付宝</input>
						<span class="qrbtn" id="hit1" data-state="0">上传收款码</span>
						<input class="aliPayInfo" type="text" id="zfbnum" placeholder="填写您的支付宝账号" />
					</li>
					<li class="clear">
						<input class="radio" id="r2" type="radio" value="1" name="gender">微信</input>
						<span class="qrbtn" id="hit2" data-state="1">上传收款码</span>
						<input class="aliPayInfo" type="text" id="wxnum" placeholder="填写您的微信账号" />
					</li>
				</ul>
			</div>
			<div class="phone">
				<li class="clear">
					<input type="checkbox" name="phone" id="checkbox" value="1"></input>开启交易信息手机短信通知
				</li>
				<div class="sublable">勾选后，交易信息将通过手机短信通知于您</div>
				<div class="warn">温馨提示</div>
				<div class="sublable">1.游戏里提币交易后，请留意查收交易信息；</div>
				<div class="sublable">2.您可用当前账号登录TTC-OTC官网http://otc.timetreaty.com/查看 </div>
			</div>

			<div class="submit subOTC" @click="setupOTC">保存</div>
		</div>

		<div class="pic_edit pic_edit1">
			<div id="clipArea1" class="clipArea"></div>
			<input type="file" id="file1" class="file">
			<button id="choose1" class="choose">选择图片</button>
			<button id="clipBtn1" class="clipBtn">上传</button>
			<button id="cannel1" class="cannel">取消</button>
		</div>
		<div class="pic_edit pic_edit2">
			<div id="clipArea2" class="clipArea"></div>
			<input type="file" id="file2" class="file">
			<button id="choose2" class="choose">选择图片</button>
			<button id="clipBtn2" class="clipBtn">上传</button>
			<button id="cannel2" class="cannel">取消</button>
		</div>
	</div>
</template>

<script>
export default {
  data: function() {
    return {
      view: 0,
      otcusername: "",
      zfburl: "",
      wxurl: "",
      upOTC: "",
      bidtprice: 0
    };
  },
  watch : {
    view (val) {
      
    }
  },
  methods: {
    getDefaultPrice: function() {
      let vm = this;
      $.ajax({
        type: "get",
        url: contextOtcPath + "/api/push/deal/getBIDTs",
        async: true,
        dataType: "json",
        success: function(data) {
          vm.bidtprice = data.data.fbt;
        }
      });
    },
    onkeybind: function() {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/OTCinfo/getuserinfo",
        async: true,
        dataType: "json",
        data: {
          token: sessionStorage.egg_token
        },
        success: function(data) {
          $.ajax({
            type: "post",
            url: contextOtcPath + "/api/certification/bandingAccount",
            async: true,
            dataType: "json",
            data: {
              account: data.data.username,
              pwd: data.data.pwd,
              languageType: "zh"
            },
            success: function(data) {
              vm.otcusername = data.data.username;
              sessionStorage.otcData = JSON.stringify(data.data);
              vm.view = 2;
            }
          });
        }
      });
    },

    getupOTC: function() {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/OTCinfo/getbindingOTCinfobytoken",
        async: true,
        dataType: "json",
        data: {
          token: sessionStorage.egg_token
        },
        success: function(data) {
          vm.otcusername = data.data.substitutes;
          $("#zfbnum").val(data.data.userzhifunum);
          $("#wxnum").val(data.data.userwxnum);
          $("#price").val(data.data.price);
          (vm.wxurl = data.data.userwximage),
            (vm.zfburl = data.data.userzhifuimage),
            $($("input[type=radio][name='gender']")[data.data.type - 1]).attr(
              "checked",
              "checked"
            );
          $("input[type='checkbox']").attr("value", data.data.openstate);
          if (data.data.openstate == 1) {
            $("#checkbox").prop("checked", true);
          } else {
            $("#checkbox").prop("checked", false);
          }
        }
      });
    },

    setupOTC: function() {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/OTCinfo/setupOTC",
        async: true,
        dataType: "json",
        data: {
          zfbnum: $("#zfbnum").val() || "",
          wxnum: $("#wxnum").val() || "",
          price: $("#price").val(),
          token: sessionStorage.egg_token,
          zfburl: vm.zfburl,
          wxurl: vm.wxurl,
          type: Number($('input[name="gender"]:checked').val()) + 1,
          openstate: $("#checkbox").prop("checked") ? 1 : 0
        },
        success: function(data) {
          mui.toast("保存成功");
          vm.$router.push({ path: "/" });
        }
      });
    },
    otcBindEgg: function() {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/OTCinfo/bindingOTC",
        async: true,
        dataType: "json",
        data: {
          account: vm.otcusername,
          token: sessionStorage.egg_token
        },
        success: function(data) {
          mui.toast("绑定成功");
          vm.view = 3;
          vm.getupOTC();
          setTimeout(function() {
            vm.imgLoad(1);
            vm.imgLoad(2);
          }, 100);
        }
      });
    },
    otcBindEggState: function() {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/OTCinfo/getbindingOTCstate",
        async: true,
        dataType: "json",
        data: {
          token: sessionStorage.egg_token
        },
        success: function(data) {
          if (data.data == 1) {
            vm.view = 3;
            vm.getupOTC();
            setTimeout(function() {
              vm.imgLoad(1);
              vm.imgLoad(2);
            }, 100);
          } else {
            vm.view = 0;
          }
        }
      });
    },
    otcGetCode: function() {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextOtcPath + "/api/push/reg/code",
        async: true,
        dataType: "json",
        data: {
          account: $("#otcregistusername").val(),
          languageType: "zh"
        },
        success: function(data) {
          mui.toast("发送成功");
        }
      });
    },
    otcregister: function() {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextOtcPath + "/api/push/reg/userReg",
        async: true,
        dataType: "json",
        data: {
          account: $("#otcregistusername").val(),
          code: $("#validate").val(),
          pwd: $("#otcregistpassword").val(),
          languageType: "zh"
        },
        success: function(data) {
          vm.otcusername = data.data.username;
          sessionStorage.otcData = JSON.stringify(data.data);
          vm.view = 2;
        }
      });
    },
    otclogin: function() {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextOtcPath + "/api/push/reg/login",
        async: true,
        dataType: "json",
        data: {
          username: $("#otcloginusername").val(),
          pwd: $("#otcloginpassword").val(),
          languageType: "zh"
        },
        success: function(data) {
          vm.otcusername = data.data.username;
          sessionStorage.otcData = JSON.stringify(data.data);
          vm.view = 2;
        }
      });
    },

    changePage: function(index) {
      this.view = index;
    },
    imgLoad: function(index) {
      let vm = this;
      new PhotoClip("#clipArea" + index, {
        size: [260, 260],
        outputSize: [640, 640],
        file: "#file" + index,
        view: "#hit" + index,
        ok: "#clipBtn" + index,
        loadStart: function() {
          $(".lazy_tip span").text("");
          $(".lazy_cover,.lazy_tip").show();
        },
        loadComplete: function() {
          $(".lazy_cover,.lazy_tip").hide();
        },
        clipFinish: function(dataURL) {
          mui.toast("上传成功");
          if (index == 1) {
            vm.zfburl = dataURL;
          }
          if (index == 2) {
            vm.wxurl = dataURL;
          }
          //						$("#hit" + index).attr('src', dataURL);
          $("#hit" + index).attr("data-state", 1);
          $(".pic_edit" + index).css({
            top: "-100rem"
          });
        }
      });

      $("#hit" + index).bind("touchstart", function() {
        $(".pic_edit" + index).css({
          top: "0"
        });
      });
      $("#cannel" + index).bind("touchstart", function() {
        $(".pic_edit" + index).css({
          top: "-100rem"
        });
      });
    }
  },
  mounted: function() {
    let vm = this;
    vm.otcBindEggState();
    vm.getDefaultPrice();
  }
};
</script>

<style lang="less" scoped>
#hit1,
#hit2 {
  background-image: none !important;
}
.phone {
  li {
    padding: 0 0.25rem;
    input {
      float: left;
    }
    height: 0.52rem;
    line-height: 0.52rem;
  }
}

.rmbWeys {
  ul {
    margin: 0.24rem 0;
    border-bottom: 0.08rem #eeeeee solid;
    li {
      padding: 0 0.25rem;
      height: 0.58rem;
      line-height: 0.58rem;
      margin: 0.1rem 0;
      .radio {
        float: left;
        margin-right: 0.1rem;
      }
      .aliPayInfo {
        float: right;
        width: 3rem;
        background-color: #eeeeee;
      }
      .qrbtn {
        height: 0.41rem;
        line-height: 0.41rem;
        border-radius: 0.06rem;
        float: right;
        background-color: #71c6fe !important;
        color: #ffffff;
        padding: 0 0.1rem;
        margin: 0.05rem 0;
        margin-left: 0.05rem;
      }
    }
  }
}

.otcCenter_setMes {
  .subOTC {
    margin: 0.5rem 0.2rem 0.8rem 0.2rem;
    width: 6rem !important;
  }
  utext-align: left;
  .messagelogo {
    width: 6.4rem;
  }
  .rmbWeys {
    .lable {
      line-height: 0.63rem;
      padding: 0 0.25rem;
      text-align: left;
      color: #333333;
    }
  }
  .warn {
    color: #ff0808;
    line-height: 0.4rem;
    font-size: 0.24rem;
    margin-left: 0.25rem;
    margin-top: 0.22rem;
  }
  .sublable {
    font-size: 0.24rem;
    color: #999999;
    line-height: 0.31rem;
    -webkit-transform: scale(0.9);
    -moz-transform: scale(0.9);
    -ms-transform: scale(0.9);
    -o-transform: scale(0.9);
    transform: scale(0.9);
  }
  .priceSetting {
    .lable {
      line-height: 0.63rem;
      padding: 0 0.25rem;
      text-align: left;
      color: #333333;
    }
    .price {
      padding-left: 0.25rem;
      span {
        float: left;
        height: 0.52rem;
        line-height: 0.52rem;
      }
      input {
        width: 3.8rem;
        float: left;
        background-color: #eeeeee;
        margin: 0 0.2rem;
      }
    }
    .tips {
      color: #ff9b15;
      font-size: 0.4rem;
      line-height: 0.5rem;
      -webkit-transform: scale(0.5);
      -moz-transform: scale(0.5);
      -ms-transform: scale(0.5);
      -o-transform: scale(0.5);
      transform: scale(0.5);
    }
    padding-bottom: 0.2rem;
    border-bottom: 0.08rem solid #f7f7f7;
  }
  .otcAccount {
    padding: 0 0.25rem;
    line-height: 0.74rem;
    font-size: 0.26rem;
    border-bottom: 0.08rem solid #f7f7f7;
  }
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background: #ffffff;
  /* font: 13px/1.5em 'Open Sans', Helvetica, Arial, sans-serif; */
  text-align: center;
}

.hide {
  display: none;
}

.show {
  display: block;
}

.pic_edit {
  position: fixed;
  top: -100rem;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999999;
  background: #e9e9e9;
  opacity: 1;
}

.clipArea {
  margin: 0 auto;
  height: 300px;
  background: #f2f2f2;
}

.clipBtn,
.cannel,
.choose {
  border: none;
  margin-bottom: 0.5rem;
  background-color: #3fa8ff;
  color: #fff;
  border-radius: 5px;
  width: 30%;
  font-size: 0.3rem;
  height: 0.6rem;
  bottom: 0;
  position: absolute;
}

.choose {
  left: 2.5%;
}

.clipBtn {
  left: 35%;
}

.cannel {
  left: 67.5%;
}

.file {
  border: none;
  margin-bottom: 0.5rem;
  padding: 0px;
  width: 33%;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 0.6rem;
  opacity: 0;
  z-index: 99;
}

.loading {
  display: none;
  position: absolute;
  top: 0;
  background-color: #e1e1e1;
  width: 6.4rem;
  height: 100%;
  -webkit-opacity: 0.7;
  color: #f0f0f0;
}

.con {
  width: 4rem;
  height: 1rem;
  background-color: #515352;
  margin-left: 50%;
  margin-top: 50%;
  border-radius: 0.1rem;
  -webkit-transform: translateX(-50%) translateY(100%);
}

.con_left {
  float: left;
  height: 100%;
  width: 1rem;
  margin-left: 0.2rem;
}

.con_right {
  text-align: center;
  line-height: 1rem;
  font-size: 0.3rem;
}

.clipTip {
  width: 100%;
  height: 2rem;
  line-height: 1rem;
  font-size: 0.4rem;
  color: #8f8585;
}

.title {
  position: relative;
  top: 0;
  z-index: 9;
  width: 6.4rem;
  height: 0.88rem;
  font-size: 0.3rem;
  text-align: center;
  line-height: 0.88rem;
  img {
    position: absolute;
    left: 0.2rem;
    height: 0.4rem;
    margin: 0.24rem 0;
  }
}

textarea {
  width: 100%;
  margin: 0;
  padding: 0.2rem;
  height: 2.84rem;
  border: none;
  resize: none;
  color: #999999;
  font-size: 0.2rem;
  margin-bottom: 0.1rem;
  -webkit-box-shadow: 0px 0.1rem 0.1rem #e8e8e8;
  box-shadow: 0px 0.1rem 0.1rem #e8e8e8;
}

input {
  margin: 0;
  padding: 0 0.1rem;
  height: 0.52rem;
  border: none;
  float: left;
}

#validate {
  width: 1.5rem;
}

.yhxy {
  position: relative;
  color: #909090;
  font-size: 0.24rem;
  -webkit-transform: scale(0.91);
  width: 100%;
  // margin-top: 0.15rem;
  top: 0.4rem;
}

.yhxy {
  .yhxys {
    float: left;
    color: #909090;
  }
  .findPwd {
    float: right;
    color: #909090;
  }
}

.findPwd {
  float: right;
}

.onekeylogin {
  position: relative;
  border-bottom: 0.05rem #f0f0f0 solid;
  padding: 0.5rem 0 0.4rem 0;
  .onekeyloginbtn {
    margin-left: 0.9rem;
    width: 4.6rem !important;
    height: 0.58rem !important;
    line-height: 0.58rem;
    background-color: #0099ff !important;
    border-radius: 0.1rem;
    border: none;
    color: #ffffff !important;
    text-align: center;
    font-size: 0.24rem !important;
    -webkit-appearance: none;
  }
}

.submit {
  width: 100% !important;
  height: 0.58rem !important;
  line-height: 0.58rem;
  background-color: #169bd5 !important;
  border-radius: 0.1rem;
  border: none;
  color: #ffffff !important;
  text-align: center;
  font-size: 0.3rem !important;
  -webkit-appearance: none;
}

.form,
.logined {
  width: 4.6rem;
  position: relative;
  left: 50%;
  margin-top: 0.2rem;
  -webkit-transform: translateX(-50%);
  .lable3 {
    font-size: 0.2rem;
    text-align: center;
  }
}

.logined {
  .submit {
    margin-top: 0.32rem;
  }
}

.msg {
  width: 4.6rem;
  border-radius: 0.1rem;
  overflow: hidden;
  margin-bottom: 0.3rem;
  background-color: transparent !important;
  img {
    width: 0.3rem;
    float: left;
    margin: 0.11rem 0.21rem;
  }
  .username,
  .validate,
  .password {
    border: 1px solid #eeeeee;
    border-radius: 0.1rem;
    height: 0.56rem;
    margin-bottom: 0.4rem;
    color: #333333;
    background-color: transparent !important;
  }
  .verification {
    width: 1.76rem;
    height: 0.56rem;
    float: right;
    text-align: center;
    color: #2aa2d8;
    text-align: center;
    line-height: 0.56rem;
    border-radius: 0.1rem;
    font-size: 0.24rem;
  }
}

.otcCenter {
  position: absolute;
  top: 0.88rem;
  .lable {
    font-size: 0.24rem;
    color: #006b8d;
    line-height: 0.8rem;
    text-align: center;
    width: 6.4rem;
  }
  .lable2 {
    font-size: 0.24rem;
    color: #333333;
    text-align: center;
    width: 6.4rem;
    margin-top: 0.4rem;
  }
}

input::-webkit-input-placeholder {
  color: #999999;
}

body {
  background-color: #f5f5f5;
}

.title {
  color: #989898;
  background-color: #006b8d;
  color: #fff;
  position: fixed;
  top: 0;
  z-index: 9;
  width: 6.4rem;
  height: 0.88rem;
  font-size: 0.3rem;
  text-align: center;
  line-height: 0.88rem;
  img {
    position: absolute;
    left: 0.2rem;
    height: 0.4rem;
    margin: 0.24rem 0;
  }
}

.context {
  height: 11rem;
}
</style>