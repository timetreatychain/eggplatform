<template>
	<div class="content">
		<div class="header">
			<a href="javascript:history.go(-1)"><img src="../../common/img/userCenter/arrowsb.png" alt="" class="back" /></a>
			<span>充值 BIDT</span>
		</div>
		<div class="payNumBox">
			<div class="payNumBox person_wallet_recharge">
				<ul class="ul">
					<li :class="'ttcnum ttcnum'+index" v-for="(items,index) in numTTcArr" @click="selTTCNum(index)">
						{{items}}
					</li>
					<div style="clear: both;"></div>
				</ul>
				<input type="text" id="customizedTTC1" placeholder="自定义金额" :value="customizedTTC" />
				<div class="text">
					<span>价值：<a>{{customizedTTC* 0.3 }} ¥</a></span>
					<span>1BIDT= 0.3 元</span>
				</div>
			</div>

			<div class="payment">
				<div class="recharge0" @click="morePay(0)">
					<ul>
						<span>支付宝支付</span>
						<img class="img1" src="../../common/img/userCenter/alipay.png" alt="" /></br>
						<img class="img2" v-if="payWay!=0" src="../../common/img/sdk/select.png" alt="" />
						<img class="img2" v-if="payWay==0" src="../../common/img/sdk/pitch.png" alt="" />
					</ul>
				</div>
				<div class="recharge1" @click="morePay(2)">
					<ul>
						<span>微信支付</span>
						<img class="img1" src="../../common/img/sdk/paywx.png" alt="" /></br>
						<img class="img2" v-if="payWay!=2" src="../../common/img/sdk/select.png" alt="" />
						<img class="img2" v-if="payWay==2" src="../../common/img/sdk/pitch.png" alt="" />
					</ul>
				</div>
				<div class="recharge2" @click="morePay(1)">
					<ul>
						<span>BIDT汇算</span>
						<img class="img1" src="../../common/img/sdk/settleaccountssmall.png" alt="" /></br>
						<img class="img2" v-if="payWay!=1" src="../../common/img/sdk/select.png" alt="" />
						<img class="img2" v-if="payWay==1" src="../../common/img/sdk/pitch.png" alt="" />
					</ul>
				</div>
				<div class="buyTTC" @click="submitPay">提交支付</div>
				<label class="tip" v-if="payWay==0">提示:  支付宝充值实时到账</label>
				<label class="tip" v-if="payWay==2">提示:  微信充值实时到账</label>
				<label class="tip" v-if="payWay==1">提示:  BIDT汇算1个工作日内到账</label>
			</div>

		</div>

		<div class="aliPay" v-html="aliPayForm"></div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				aa: "",
				view: "",
				numTTcArr: [5, 10, 50, 100, 500, 1000],
				numIndex: "-1",
				accountBalance: "0",
				customizedTTC: "",
				aliPayForm: "",
				payWay: "0",
				isWx: ""
			}
		},
		methods: {
			morePay: function(id) {
				let vm = this;
				vm.payWay = id;
			},
			onBridgeReady: function(data) {
				let vm = this;
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						"appId": data.appId, //公众号名称，由商户传入     
						"timeStamp": data.timestamp, //时间戳，自1970年以来的秒数     
						"nonceStr": data.noncestr, //随机串     
						"package": data.packageStr,
						"signType": "MD5", //微信签名方式：     
						"paySign": data.sign //微信签名 
					},
					function(res) {
						if(res.err_msg == "get_brand_wcpay_request:ok") {
							vm.$router.push({
								"path": "/userCenter"
							});
						} // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
					}
				)
			},
			buyTTC: function() {
				let vm = this;
				if(vm.payWay == 0) {
					$.ajax({
						type: "post",
						url: contextPath + "/api/h5sdk/alipay/rechargeTTC",
						async: true,
						ataType: "json",
						data: {
							shoppingPrice:  0.3 ,
							shoppingNum: vm.customizedTTC,
							subject: "BIDT游戏充值" + vm.customizedTTC,
							total_amount: vm.customizedTTC *  0.3 ,
							return_url: location.href,
							access_token: sessionStorage.egg_token
						},
						success: function(data, data2, data3) {

							vm.aliPayForm = data.data;
							setTimeout(function() {
								eval((data.data.split("<script>")[1]).replace("<\/script>"));
							}, 100)
						}
					});
				} else if(vm.payWay == 1) {

					mui.confirm("转入数量:" + vm.customizedTTC + "BIDT</br>价值:" + vm.customizedTTC *  0.3  + "¥", "BIDT数字资产转入到中国区鲤鱼轻游戏平台", ["取消", "确认"], function(e) {
						if(e.index == 1) {
							vm.$router.push({
								"path": "/ttctransfer",
								query: {
									"ttcNum": vm.customizedTTC
								}
							})
						} else {
							mui.toast("订单已取消")
						}
					})

				} else if(vm.payWay == 2) { //微信支付	
					if(vm.isWx == 1) { //微信公众号
						$.ajax({
							type: "post",
							url: contextPath + "/api/sdkWxPay/getWxTTCPaySign",
							async: true,
							ataType: "json",
							data: {
								shoppingPrice:  0.3 ,
								shoppingNum: vm.customizedTTC,
								total_fee: vm.customizedTTC *  0.3 ,
								payType: "1",
								body: "BIDT充值",
								passback_params: "1"
							},
							success: function(data) {
								if(typeof WeixinJSBridge == "undefined") {
									if(document.addEventListener) {
										document.addEventListener('WeixinJSBridgeReady', vm.onBridgeReady(data.data), false);
									} else if(document.attachEvent) {
										document.attachEvent('WeixinJSBridgeReady', vm.onBridgeReady(data.data));
										document.attachEvent('onWeixinJSBridgeReady', vm.onBridgeReady(data.data));
									}
								} else {
									vm.onBridgeReady(data.data);
								}
							}
						});
					} else { //微信H5支付
						$.ajax({
							type: "post",
							url: contextPath + "/api/sdkWxPay/getH5TTCWxPaySign",
							async: true,
							dataType: "json",
							data: {
								shoppingPrice:  0.3 ,
								shoppingNum: vm.customizedTTC,
								payType: "1",
								body: "BIDT充值",
								trade_type: "MWEB",
								total_fee: vm.customizedTTC *  0.3 ,
								access_token: sessionStorage.egg_token
							},
							success: function(data) {
								location.href = data.data.mwebUrl;
							}
						})

					}
				}

			},
			selTTCNum: function(itemId) {
				let vm = this;
				vm.numIndex = itemId;
				vm.customizedTTC = vm.numTTcArr[vm.numIndex];
				$(".ttcnum").removeClass("current");
				$(".ttcnum" + itemId).addClass("current");
			},
			submitPay: function() {
				let vm = this;

				vm.customizedTTC = $("#customizedTTC1").val();
				if($("#customizedTTC1").val() >= 1 && $("#customizedTTC1").val() != "" && $("#customizedTTC1").val() != undefined) {
					mui.confirm("支付金额:" + vm.customizedTTC *  0.3  + "元", "充值金额:" + vm.customizedTTC + "BIDT", ["取消", "确认"], function(e) {
						if(e.index == 1) {
							vm.buyTTC();
						} else {
							mui.toast("订单已取消")
						}
					})
				} else if(vm.numIndex != -1) {
					mui.confirm("支付金额:" + vm.customizedTTC *  0.3  + "元", "充值金额:" + vm.customizedTTC + "BIDT", ["取消", "确认"], function(e) {
						if(e.index == 1) {
							vm.buyTTC();
						} else {
							mui.toast("订单已取消")
						}
					})
				} else {
					mui.alert("请输入有效金额");
				}

			}
		},
		mounted: function() {
			var uaa = navigator.userAgent.toLowerCase();
			let vm = this;
			if(uaa.match(/MicroMessenger/i) == "micromessenger") {
				vm.isWx = 1;
			} else {
				vm.isWx = 0;
			}
		}
	}
</script>

<style lang="less" scoped>
	.tip {
		line-height: 0.5rem;
		font-size: 0.18rem;
		color: #252525;
		float: left;
	}
	
	.header {
		width: 6.4rem;
		height: 0.88rem;
		background: #006b8d;
	}
	
	.header img {
		width: 0.2rem;
		height: 0.35rem;
		margin-left: 0.2rem;
		float: left;
		margin-top: 0.25rem;
	}
	
	.header span {
		width: 5.6rem;
		color: #fff;
		display: block;
		float: left;
		line-height: 0.88rem;
		font-size: 0.34rem;
		text-align: center;
	}
	
	.person_wallet_recharge {
		width: 6rem;
		height: 4.4rem;
		margin-top: 0.2rem;
		background: #fff;
	}
	
	.person_wallet_recharge h2 {
		font-size: 0.3rem;
	}
	
	.person_wallet_recharge .ul li {
		width: 0.90rem;
		height: 0.90rem;
		border-radius: 0.2rem;
		border: 1px solid #006b8d;
		float: left;
		color: #006b8d;
		margin-right: 0.68rem;
		text-align: center;
		line-height: 0.9rem;
		margin-top: 0.42rem;
		font-size: 0.3rem;
	}
	
	.person_wallet_recharge .sel {
		height: 1rem;
		width: 1rem;
		position: absolute;
		right: 0;
		bottom: 0;
		display: none;
	}
	
	.current {
		color: #FFFFFF!important;
		background: #006b8d;
		color: #fff;
		border: #006b8d 1px solid;
	}
	
	.person_wallet_recharge .ul li:nth-child(1) .sel {
		display: none;
	}
	
	.person_wallet_recharge .botton {
		text-align: center;
		background: #19b5ff;
		color: #fff;
		border-radius: 0.2rem;
		line-height: 2.4rem;
		height: 2.4rem;
		width: 91%;
		margin: 0 auto;
		font-size: 0.85rem;
	}
	
	.person_wallet_recharge .pic {
		background: #FFFFFF;
		padding-left: 3%;
		line-height: 2.2rem;
		height: 2.2rem;
		color: #333333;
		font-size: 0.75rem;
		margin-bottom: 0.5rem;
	}
	
	.person_wallet_recharge .pic input {
		border: none;
		padding-left: 1%;
		color: #CCCCCC;
		font-size: 0.75rem;
	}
	
	.person_wallet_recharge .agreement {
		height: 2rem;
		padding-left: 3%;
		line-height: 2rem;
	}
	
	.person_wallet_recharge .agreement p {
		color: #CCCCCC;
	}
	
	.content {
		height: 11.38rem;
		background: #eeeeee;
	}
	
	.mint-header {
		background: #006b8d;
	}
	
	.payNumBox {
		width: 94%;
		height: 5.85rem;
		margin: 0 auto;
	}
	
	.payNumBox {
		width: 6rem;
		height: 4.4rem;
		margin-top: 0.2rem;
		background: #fff;
	}
	
	.payNumBox ul {
		width: 4.2rem;
		height: 2.1rem;
		margin: 0 auto;
	}
	
	.payNumBox ul li {
		width: 0.90rem;
		height: 0.90rem;
		border-radius: 0.2rem;
		border: 1px solid #006b8d;
		float: left;
		margin-right: 0.68rem;
		text-align: center;
		line-height: 0.9rem;
		margin-top: 0.42rem;
		font-size: 0.3rem;
	}
	
	.payNumBox ul li:nth-of-type(3) {
		margin-right: 0rem;
	}
	
	.payNumBox ul li:nth-of-type(6) {
		margin-right: 0rem;
	}
	
	.payNumBox input {
		width: 4.1rem;
		height: 0.7rem;
		display: block;
		margin: 0 auto;
		margin-top: 0.9rem;
		border-radius: 0.1rem;
		border: 1px solid #006b8d;
		text-indent: 0.3rem;
	}
	
	.text {
		width: 4.1rem;
		margin: 0 auto;
		margin-top: 0.12rem;
	}
	
	.text span {
		width: 2rem;
		height: 0.3rem;
		display: block;
		float: left;
		color: #a4a5a5;
	}
	
	.text span:nth-of-type(2) {
		text-align: right;
	}
	
	.text span input {
		width: 0.5rem;
		height: 0.3rem;
		margin: 0;
	}
	
	.text span a {
		color: #ff0000 !important;
	}
	
	.recharge1,
	.recharge0,
	.recharge2 {
		width: 2rem;
		height: 1.8rem;
		float: left;
		background: #fff;
		margin-top: 0.1rem;
		ul {
			width: 2rem;
			margin: 0 auto;
			text-align: center;
			span {
				display: block;
				&:nth-of-type(1) {
					font-size: 0.22rem;
					font-weight: bold;
					color: #000;
					margin-top: 0.2rem;
					margin-bottom: 0.1rem;
				}
			}
			.img1 {
				width: 0.65rem;
				height: 0.65rem;
			}
			.img2 {
				width: 0.18rem;
				height: 0.18rem;
			}
		}
	}
	
	.recharge20 {
		width: 2.91rem;
		height: 1.8rem;
		float: right;
		background: #fff;
		margin-top: 0.1rem;
		border-radius: 0.1rem;
		ul {
			width: 1rem;
			margin: 0 auto;
			text-align: center;
			span {
				display: block;
				&:nth-of-type(1) {
					font-size: 0.22rem;
					font-weight: bold;
					color: #000;
					margin-top: 0.2rem;
					margin-bottom: 0.1rem;
				}
			}
			.img1 {
				width: 0.65rem;
				height: 0.65rem;
			}
			.img2 {
				width: 0.18rem;
				height: 0.18rem;
			}
		}
	}
	
	.buyTTC {
		width: 6rem;
		height: 0.77rem;
		background: #008d46;
		float: right;
		margin-top: 0.1rem;
		color: #fff;
		font-size: 0.3rem;
		text-align: center;
		line-height: 0.77rem;
		border-radius: 0.1rem;
	}
</style>