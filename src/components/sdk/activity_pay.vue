<template>

	<div class="sdk">
		<div class="pay" v-if="payState==1">
			<div class="payHeader">
				<img src="../../common/img/sdk/back_w.png" alt="" @click="channelOrder" /> 提交订单
			</div>

			<div class="payMess">
				<span class="goodsPrice">¥{{orderData.total_fee}}</span>
				<span class="goodsName">{{orderData.goods_name}}</span>
			</div>
			<div class="payWays">
				<li @click="changePayWay(0)">
					<img class="imgL" src="../../common/img/sdk/payal.png" alt="" />
					<span>支付宝支付</span>
					<img class="imgR" src="../../common/img/sdk/paysel.png" alt="" v-if="payWay!=0" />
					<img class="imgR" src="../../common/img/sdk/payseled.png" alt="" v-if="payWay==0" />
				</li>
				<li @click="changePayWay(1)" v-if="isWx==0">
					<img class="imgL" src="../../common/img/sdk/paywx.png" alt="" />
					<span>微信支付</span>
					<img class="imgR" src="../../common/img/sdk/paysel.png" alt="" v-if="payWay!=1" />
					<img class="imgR" src="../../common/img/sdk/payseled.png" alt="" v-if="payWay==1" />
				</li>
				<li @click="changePayWay(2)" v-if="isWx==1">
					<img class="imgL" src="../../common/img/sdk/paywx.png" alt="" />
					<span>微信支付</span>
					<img class="imgR" src="../../common/img/sdk/paysel.png" alt="" v-if="payWay!=2" />
					<img class="imgR" src="../../common/img/sdk/payseled.png" alt="" v-if="payWay==2" />
				</li>

			</div>
			<div class="payOk" @click="payEvent">
				确认支付
			</div>
		</div>

		<div class="aliPay" v-html="aliPayForm"></div>

	</div>

</template>

<script>
	import Vue from 'vue';
	export default({
		data: function() {
			let vm = this;
			return {
				openid: "",
				isWx: "0",
				currentX: 0,
				currentY: 0,
				changeX: 0,
				changeY: 0,
				startX: 0,
				startY: 0,
				payState: 0,
				payWay: 0,
				orderData: "",
				aliPayForm: "",
				slideShow: 0,
				id: "0",
				groupSel: 1,
				downloadShow: 1,
				recommendData: null,
				historyData: null,
				bannerData: null,
				hotGameData: null,
				MorePackageListData: null,
				FirstRaidersListData: null,
				OpenServiceListData: null,
				gameUrl: sessionStorage.appUrl,
				gameId: vm.$route.query.id,
				postTTCState: 0,
				psotttcdata: ""

			}
		},
		methods: {
			init: function() {
				let vm = this;
				vm.findMorePackageList();
			},
			changePayWay: function(arg) {
				let vm = this;
				vm.payWay = arg;
			},
			channelOrder: function() {
				this.payState = 0;
				mui.toast("订单已取消");
			},
			onBridgeReady: function(data) {
				//console.log(JSON.stringify(data));
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
						if(res.err_msg == "get_brand_wcpay_request:ok") {} // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
					}
				)
			},

			payEvent: function() {
				let vm = this;
				if(vm.payWay == 0) {
					$.ajax({
						type: "post",
						url: contextPath + "/api/h5sdk/alipay/h5pay",
						async: true,
						dataType: "json",
						data: {
							gameId: 119,
							app_id: vm.orderData.app_id,
							mch_id: vm.orderData.mch_id,
							timestampStr: vm.orderData.timestampStr,
							sign: vm.orderData.sign,
							shoppingPrice: vm.orderData.total_fee,
							shoppingNum: 1,
							subject: vm.orderData.goods_name,
							total_amount: vm.orderData.total_fee,
							passback_params: vm.orderData.bill_no,
							return_url: location.href,
							
							open_id: sessionStorage.egg_openId,
							access_token: sessionStorage.egg_token
						},
						success: function(data, data2, data3) {
							vm.aliPayForm = data.data;
							vm.payState = 0;
							setTimeout(function() {
								eval((data.data.split("<script>")[1]).replace("<\/script>"));
							}, 100)
						}
					});
				} else if(vm.payWay == 1) {
					$.ajax({
						type: "post",
						url: contextPath + "/api/sdkWxPay/getH5WxPaySign",
						async: true,
						dataType: "json",
						data: {
							gameId: 119,
							shoppingPrice: vm.orderData.total_fee,
							shoppingNum: 1,
							body: vm.orderData.goods_name,
							total_fee: vm.orderData.total_fee,
							passback_params: vm.orderData.bill_no,
							app_id: vm.orderData.app_id,
							open_id: sessionStorage.egg_openId,
							mch_id: vm.orderData.mch_id,
							access_token: sessionStorage.egg_token,
							timestampStr: vm.orderData.timestampStr,
							content: vm.orderData.sign
						},
						success: function(data) {
							location.href = data.data.mwebUrl;
						}
					})
				} else if(vm.payWay == 2) {

					$.ajax({
						type: "post",
						url: contextPath + "/api/sdkWxPay/getWxPaySign",
						async: true,
						dataType: "json",
						data: {
							gameId: 119,
							shoppingPrice: vm.orderData.total_fee,
							shoppingNum: 1,
							body: vm.orderData.goods_name,
							total_fee: vm.orderData.total_fee,
							passback_params: vm.orderData.bill_no
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
						},
						error: function(data) {

						}
					})
				} else if(vm.payWay == 3) {
					if(119 == 53) {
						mui.confirm("支付金额:" + vm.orderData.total_fee + "BIDT", "确认订单", ["取消", "确认"], function(e) {
							if(e.index == 1) {
								$.ajax({
									type: "post",
									url: contextPath + "/api/h5sdk/alipay/ttcH5Pay",
									async: true,
									dataType: "json",
									data: {
										gameId: 119,
										app_id: vm.orderData.app_id,
										mch_id: vm.orderData.mch_id,
										timestampStr: vm.orderData.timestampStr,
										sign: vm.orderData.sign,
										shoppingPrice: vm.orderData.total_fee / 0.3,
										shoppingNum: 1,
										subject: vm.orderData.goods_name,
										total_amount: vm.orderData.total_fee,
										passback_params: vm.orderData.bill_no,
										return_url: location.href,
										open_id: sessionStorage.egg_openId,
										access_token: sessionStorage.egg_token
									},
									success: function(data) {
										mui.alert("支付成功", function() {
											vm.payState = 0;
										});
									}
								});
							} else {
								mui.toast("支付已取消");
							}

						})
					} else {
						mui.confirm("支付金额:" + vm.orderData.total_fee / 0.3 + "BIDT", "确认订单", ["取消", "确认"], function(e) {
							if(e.index == 1) {
								$.ajax({
									type: "post",
									url: contextPath + "/api/h5sdk/alipay/ttcH5Pay",
									async: true,
									dataType: "json",
									data: {
										gameId: 119,
										app_id: vm.orderData.app_id,
										mch_id: vm.orderData.mch_id,
										timestampStr: vm.orderData.timestampStr,
										sign: vm.orderData.sign,
										shoppingPrice: vm.orderData.total_fee / 0.3,
										shoppingNum: 1,
										subject: vm.orderData.goods_name,
										total_amount: vm.orderData.total_fee,
										passback_params: vm.orderData.bill_no,
										return_url: location.href,
										open_id: sessionStorage.egg_openId,
										access_token: sessionStorage.egg_token
									},
									success: function(data) {
										mui.alert("支付成功", function() {
											vm.payState = 0;
										});
									}
								});
							} else {
								mui.toast("支付已取消");
							}

						})
					}
				}

			},
			payFn: function(e) {
				let vm = this;
				vm.orderData = JSON.parse(e);
				vm.payState = 1;
			}

		},
		mounted: function() {
			let vm = this;
			let ua = navigator.userAgent.toLowerCase();
			if(ua.match(/MicroMessenger/i) == "micromessenger") {
				vm.isWx = 1;
			} else {
				vm.isWx = 0;
			}

		}
	})
</script>

<style lang="less">
	@import '../../common/css/reset.css';
	@import '../../common/less/sdk.less';
</style>