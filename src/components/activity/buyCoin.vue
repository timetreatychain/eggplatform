<template>
	<div class="buyCoin">
		<ul class="box">
			<li :class="{ active: index == 0 }" @click="selectItem(0,1)">
				<p>1次</p>
				<p>20BIDT</p>
				<span>￥{{Mul(20,Bidtmoney)}}</span>
			</li>
			<li :class="{ active: index == 1 }" @click="selectItem(1,5)">
				<p>5次</p>
				<p>100BIDT</p>
				<span>￥{{Mul(100,Bidtmoney)}}</span>
			</li>
			<li :class="{ active: index == 2 }" @click="selectItem(2,10)">
				<p>10次</p>
				<p>200BIDT</p>
				<span>￥{{Mul(200,Bidtmoney)}}</span>
			</li>
			<li :class="{ active: index == 3 }" @click="selectItem(3,20)">
				<p>20次</p>
				<p>400BIDT</p>
				<span>￥{{Mul(400,Bidtmoney)}}</span>
			</li>
			<li :class="{ active: index == 4 }" @click="selectItem(4,50)">
				<p>50次</p>
				<p>1000BIDT</p>
				<span>￥{{Mul(1000,Bidtmoney)}}</span>
			</li>
			<li :class="{ active: index == 5 }" @click="selectItem(5,100)">
				<p>100次</p>
				<p>2000BIDT</p>
				<span>￥{{Mul(2000,Bidtmoney)}}</span>
			</li>
		</ul>
		<div class="paytype">
			<p @click="changePayWay(0)" id="1"></p>
			<p @click="changePayWay(1)" id="2" v-if="isWx==0"></p>
			<p @click="changePayWay(2)" id="3" v-if="isWx==1"></p>
		</div>
		<div class="close" @click="hideBuyCoin"></div>
		<div class="aliPay" v-html="aliPayForm"></div>
	</div>
</template>

<script>
	export default {
		data() {
			let vm = this;

			return {
				Bidtmoney:"",
				index: 0,
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
				psotttcdata: "",
				count:1
			};
		},
		methods: {
			selectItem(val,arg2) {
				this.index = val;
				this.count=arg2;
			},
			hideBuyCoin() {
				eventBus.$emit("hideBuyCoin", false);
			},
			init: function() {
				let vm = this;
				vm.findMorePackageList();
			},
			changePayWay: function(arg) {
				let vm = this;
				vm.payWay = arg;
//				eventBus.$emit("hideBuyCoin", false);
				
				 $.ajax({
              type: "get",
              url: contextPath + "/api/luckDrow/luckDrowOrder",
              async: true,
              data: {
                token: sessionStorage.egg_token,
                num: vm.count
              },
              dataType: "json",
              success: function(data) {
                vm.payFn(JSON.stringify(data.data));
              }
            });
			},
			Mul(arg1, arg2) {
			var r1 = arg1.toString(),
				r2 = arg2.toString(),
				m, resultVal, d = arguments[2];
			m = (r1.split(".")[1] ? r1.split(".")[1].length : 0) + (r2.split(".")[1] ? r2.split(".")[1].length : 0);
			resultVal = Number(r1.replace(".", "")) * Number(r2.replace(".", "")) / Math.pow(10, m);
			return typeof d !== "number" ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)));
		},
			changeCoinAcount() {
				let vm = this;
				 $.ajax({
              type: "get",
              url: contextPath + "/api/eggworld/findorgprice",
              async: true,
              data: {
                token: sessionStorage.egg_token,
              },
              dataType: "json",
              success: function(data) {
                vm.Bidtmoney = data.data;
              }
            });
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
				}

			},
			payFn: function(e) {
				let vm = this;
				vm.orderData = JSON.parse(e);
				vm.payState = 1;
				vm.payEvent();
			}
		},
		mounted: function() {
			this.changeCoinAcount();
			let vm = this;
			let ua = navigator.userAgent.toLowerCase();
			if(ua.match(/MicroMessenger/i) == "micromessenger") {
				vm.isWx = 1;
			} else {
				vm.isWx = 0;
			}

		}
	};
</script>

<style scoped lang="less">
	.buyCoin {
		position: absolute;
		width: 5.81rem;
		height: 8.48rem;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background: url("../../common/img/lottery/buyCoin.png") no-repeat;
		background-size: 100% 100%;
		.close {
			position: absolute;
			width: 0.8rem;
			height: 0.8rem;
			left: 51%;
			border-radius: 50%;
			bottom: 0rem;
			transform: translateX(-50%);
			// background: #fff;
		}
		.paytype {
			position: absolute;
			left: 50%;
			bottom: 1.45rem;
			// background: #fff;
			width: 4.7rem;
			height: 0.7rem;
			transform: translateX(-48%);
			display: flex;
			justify-content: space-around;
			flex-wrap: nowrap;
			p {
				height: 0.64rem;
				width: 2rem;
			}
		}
		.box {
			position: absolute;
			left: 50%;
			width: 5rem;
			height: 2.5rem;
			bottom: 2.2rem;
			transform: translateX(-48%);
			// background: red;
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			padding-top: 0.1rem;
			box-sizing: border-box;
			li {
				position: relative;
				width: 1.46rem;
				box-shadow: 0 0 5px #445adf;
				margin-bottom: 0.2rem;
				height: 1rem;
				background: #fff;
				font-size: 0.18rem;
				box-sizing: border-box;
				padding-top: 0.1rem;
				border-radius: 0.08rem;
				span {
					position: absolute;
					right: 0;
					bottom: 0;
					// width: 0.8rem;
					padding:  0 0.1rem;
					line-height: 0.28rem;
					height: 0.28rem;
					text-align: center;
					background: #707fe8;
					color: #fff;
					border-top-left-radius: 0.1rem; 
					box-shadow: 0 0 0.1rem rgba(0,0,0,0.3);
					font-size: 0.17rem;
				}
				p {
					text-align: center;
					line-height: 0.3rem;
					color: #2c46da;
					font-size: 0.17rem;
				}
				&.active {
					background: #707fe8;
					p {
						color: #fff;
					}
					span {
						background: #fff;
						color: #7D8AEB;
					}
				}
			}
		}
	}
</style>