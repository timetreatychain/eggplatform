<template>
	<div class="context">
		<div class="title">
			<router-link to ="/egg"><img src="../../common/img/userCenter/arrowsb.png" alt="" class="back" /></router-link>KYC认证
		</div>
		<div class="userCenter">
			<router-link to='/realNameAuthentication'>
				<li  v-if="antiAddictionState!=1">
					<span class="lable">账户认证</span>
					<span class="point"></span>
				</li>
			</router-link>
			<li v-if="antiAddictionState==1">
					<span class="lable">账户认证</span>
					<span class="pointOk">已认证</span>
				</li>
			<li  v-if="antiAddictionTwoState!=1" @click="realVip">
					<span class="lable">实名认证</span>
					<span class="point"></span>
			</li>
			<li v-if="antiAddictionTwoState==1">
					<span class="lable">实名认证</span>
					<span class="pointOk">已认证</span>
				</li>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				isAuthentication: 0,
				TTCAddress: "",
				antiAddictionState: "",
				antiAddictionTwoState: "",
				googleAuthenticatorInfoState: "0",
				updateData:"",
				accessToken:"",
				loginData:"",
				bakurl:"http://egg.liyugame.com"
				
			}
		},
		methods: {
			realVip:function(){
				let vm =this;
				if(vm.antiAddictionState==1){
					vm.$router.push({path:"realNameAuthenticationVip"})
				}else{
					mui.alert("请优先完成账户认证");
				}
			},
			callBack: function(data) {
				let vm = this;
				window.sessionStorage.egg_token =vm.accessToken;
				window.sessionStorage.egg_openId = data.openId;
				window.sessionStorage.egg_isLogin = "1";
				sessionStorage.egg_userData =JSON.stringify(data);
				
				var ua = window.navigator.userAgent.toLowerCase();
				if(ua.match(/MicroMessenger/i) == 'micromessenger') {
					
					location.href = "http://eggapi.liyugame.com/egg_game/view/wxauthorization/wx_open_authorization?redirect_url=" + encodeURIComponent(vm.bakurl) + "&token=" + sessionStorage.egg_token;
				} else {
					location.href = vm.bakurl;
				}
				
			},
			openGame:function(){
				let vm =this;
				if(vm.antiAddictionState==1&&vm.googleAuthenticatorInfoState!=0){
					$.ajax({
						type: "get",
						url: contextPath + "/api/h5sdk/getUserById",
						async: true,
						data: {
							token: vm.accessToken
						},
						dataType: "json",
						success: function(updateData) {
							
							vm.updateData=updateData.data;
							vm.callBack(vm.updateData);
						}
					});
				
				}else{
					mui.alert("请优先完成双重认证");
				}
				
				
			},
			closeVerification:function(){
				let vm =this;
				vm.$router.push({path:"verification",query:{vType:"1",accessToken:vm.accessToken}})
			},
			openVerification:function(){
				let vm =this;
				vm.$router.push({path:"verification",query:{vType:"2",accessToken:vm.accessToken}})
			},
			getAddress: function() {
				let vm = this;
				$.ajax({
					type: "post",
					url: contextPath + "/api/googleauthenticator/getAdvancedSettings",
					async: true,
					dataType: "json",
					data: {
						token: vm.accessToken
					},
					success: function(data) {
						vm.TTCAddress = data.data.walletAddress;
						vm.antiAddictionState = data.data.antiAddictionState;
						vm.antiAddictionTwoState = data.data.antiAddictionTwoState;
//						vm.googleAuthenticatorInfoState = data.data.googleAuthenticatorInfoState;
					}
				});
			},
			getCoogleState:function(){
				let vm = this;
				$.ajax({
					type: "post",
					url: contextPath + "/api/googleauthenticator/getgoogleAntiAddictionstate",
					async: true,
					dataType: "json",
					data: {
						token: vm.accessToken
					},
					success: function(data) {
						// 当前状态  0 未绑定 1已开启 2已关闭
						vm.googleAuthenticatorInfoState = data.data;
					}
				});
			},
			onBlur: function() {
				let vm = this;
				vm.TTCAddress = $("#TTCAddInput").val();
				if(vm.TTCAddress.length == 42) {
					$.ajax({
						type: "post",
						url: contextPath + "/api/googleauthenticator/setWalletAddress",
						async: true,
						dataType: "json",
						data: {
							walletAddress: vm.TTCAddress,
							token: vm.accessToken
						},
						success: function(data) {
							mui.toast("绑定成功!");
						}
					});
				} else {
					mui.toast("ETH地址不合法");
				}

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
						$('.lazy_tip span').text('');
						$('.lazy_cover,.lazy_tip').show();
					},
					loadComplete: function() {
						$('.lazy_cover,.lazy_tip').hide();
					},
					clipFinish: function(dataURL) {
						$("#hit" + index).attr('src', dataURL);
						$("#hit" + index).attr('data-state', 1);
						$(".pic_edit" + index).css({
							"top": "-100rem"
						});
					}
				});

				$("#hit" + index).bind('touchstart', function() {
					$('.pic_edit' + index).css({
						"top": "0"
					});
				});
				$('#cannel' + index).bind('touchstart', function() {
					$(".pic_edit" + index).css({
						"top": "-100rem"
					});
				});
			},
			save: function() {
				let vm = this;
			},
		},
		mounted: function() {
			let vm = this;
			vm.imgLoad(1);
			vm.accessToken= vm.$route.query.accessToken||sessionStorage.egg_token;
			vm.getAddress();
			vm.getCoogleState();
		}

	}
</script>

<style lang="less" scoped>
.enterGame{
	margin: 2rem 0 1rem 0;
	    padding: 0.1rem 0.15rem;
    transform: translatex(-50%);
    margin-left: 50%;
    background: #006b8d;
    color: #ffffff;
    border: none;
}
.eggInfo{
	margin-top: 4rem;
	font-size: 0.24rem;
	transform: scale(0.8);
}
.pointOk{
	float: right;
		margin-right: 0.2rem;
		color: #3fa8ff;
		line-height: 0.9rem;
		font-size: 0.24rem;
		padding:0 0.2rem;
		
}
	.point {
		float: right;
		width: 0.2rem;
		height: 0.2rem;
		margin-right: 0.2rem;
		margin-top: 0.32rem;
		border-right: 2px solid #999999;
		border-bottom: 2px solid #999999;
		-webkit-transform: rotateZ(-45deg);
		-moz-transform: rotateZ(-45deg);
		-ms-transform: rotateZ(-45deg);
		-o-transform: rotateZ(-45deg);
		transform: rotateZ(-45deg);
	}
	
	input::-webkit-input-placeholder {
		color: #999999;
	}
	
	.title {
		color: #989898;
		background-color: #006b8d;
		color: #fff;
	}
	
	body {
		background-color: #f5f5f5;
	}
	/*.userCenter  li:nth-of-type(1){
		height: 1.8rem;
		line-height: 1.8rem;
	}
	.userCenter  li:nth-of-type(1) img{
		height: 0.9rem;
		width: 0.9rem;
		margin-top: 0.45rem;
		border-radius: 100%;
	}*/
	
	.userCenter li:nth-of-type(2) {
		color: #3fa8ff
	}
	
	.userCenter {
		li {
			width: 100%;
			border-bottom: #dfdfdf 1px solid;
			label {
				line-height: 0.9rem;
				color: #999999;
				font-size: 0.26rem;
				padding-right: 0.2rem;
			}
			img {
				height: 0.6rem;
				width: 0.6rem;
				margin: 0.15rem 0.2rem;
				border-radius: 100%;
			}
			input {
				border: none;
				width: 3.2rem;
				font-size: 0.22rem;
				float: right;
				height: 0.85rem;
				text-align: right;
				margin: 0;
				padding: 0;
				color: #494949;
				background-color: #FFFFFF;
				margin-right: 0.2rem;
			}
		}
	}
	
	.lable {
		line-height: 0.9rem;
		color: #000000;
		font-size: 0.24rem;
		padding: 0.2rem;
	}
	
	.title {
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
	
	.submit {
		display: inline-block;
		height: 0.32rem;
		padding: 0 0.1rem;
		border: 1px solid #FFFFFF;
		line-height: 0.32rem;
		margin-top: 0.28rem;
		position: absolute;
		right: 0.2rem;
		border-radius: 0.15rem;
		font-size: 0.24rem;
	}
	
	html,
	body {
		margin: 0;
		padding: 0;
		height: 100%;
		width: 100%;
		background: #FFFFFF;
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
		opacity: 1
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
		background-color: #E1E1E1;
		width: 6.4rem;
		height: 100%;
		-webkit-opacity: 0.7;
		color: #F0F0F0;
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
		-webkit-box-shadow: 0px 0.1rem 0.1rem #E8E8E8;
		box-shadow: 0px 0.1rem 0.1rem #E8E8E8;
	}
</style>