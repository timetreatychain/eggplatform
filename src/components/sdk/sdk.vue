<template>

	<div class="sdk">

		<div id="gameIframeDiv" style="-webkit-overflow-scrolling:touch;width:100%;height:100%;padding:0;margin:0;border:0;overflow:hidden;">
			<iframe id="game_iframe" src="../../src/common/html/H5Game.html" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" width="100%" height="100%"></iframe>
		</div>
		<div class="pay" v-if="payState==1">
			<div class="payHeader">
				<img src="../../common/img/sdk/back_game.png" alt="" @click="channelOrder" /> 提交订单
			</div>

			<div class="payMess">
				<span class="goodsPrice">¥{{Math.ceil(price_num_pay*100)/100}}</span>
				<span class="goodsName">{{orderData.goods_name}}</span>
			</div>
			<div class="payWays">
				<li @click="changePayWay(0)">
					<img class="imgL" src="../../common/img/sdk/payal.png" alt="" />
					<span>支付宝支付</span>
					<img class="imgR" src="../../common/img/sdk/paysel.png" alt="" v-if="payWay!=0" />
					<img class="imgR" src="../../common/img/sdk/payseled.png" alt="" v-if="payWay==0" />
				</li>

				<!--<li @click="changePayWay(3)">
					<img class="imgL" src="../../common/img/sdk/TTCPay.png" alt="" />
					<span>BIDT支付</span>
					<img class="imgR" src="../../common/img/sdk/paysel.png" alt="" v-if="payWay!=3" />
					<img class="imgR" src="../../common/img/sdk/payseled.png" alt="" v-if="payWay==3" />
				</li>-->

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

		<div class="controlBall" id="controlBall">
			 <img src="../../common/img/sdk/logo.png" /> 
			<!--<img src="../../common/img/lottery/enter3.png" />-->
		</div>
		<div class="slideBox2" @click="hideSlide" v-if="slideShow===1">

		</div>

		<div class="slideBox" v-if="slideShow===1">
			<div class="user">
				<router-link to="/userEdit"><img :src="userData.picPath" alt="" class="headerlogo" /></router-link>
				<div class="username">{{userData.nickName}}</div>
				<div class="userId">uid:73416{{userData.id}}</div>
				<div class="help" @click="changeGroup(4)">
					<img src="../../common/img/sdk/kefu.png" alt="" />
					<span>客服</span>
				</div>
			</div>
			<!-- <router-link to="/currency">  -->
			<div class="getBalance" @click="goqbye">
				<span class="balanceTitle">我的资产:(BIDT)</span>
				<!-- <span v-if="hasbd == 1" class="balanceValue">{{initdata1.account}}</span> -->
				<span v-if="hasbd == 1" class="balanceValue">{{total}}</span>
				<span v-if="hasbd == 0" class="balanceValue">请绑定区块身份</span>
				 <!--<span class="getbtn">提币</span>-->
			</div>
			<!-- </router-link> -->
			<div class="nav">
				<a href="http://ew.liyugame.com/officialWeb"><li>游戏官网</li></a>
				<!-- <router-link to="/getCoinSetting"> <li >提币设置</li></router-link> -->
				<router-link to="/blockIdentity"> <li >区块身份</li></router-link>
				<!--<router-link :to="{ path: 'walletSetting', query: { accessToken: accessToken }}" ><li>提币地址</li></router-link>-->
				<!-- <router-link to="/browser"> <li >区块地址</li></router-link> -->
				<!--<router-link :to="{ path: 'AdvancedSetting', query: { accessToken: accessToken }}" ><li>双重认证</li></router-link>-->
				<router-link to="/download"> <li >APP下载</li></router-link>
				<!--<router-link to="/newactivity"> <li >专属邀请链接</li></router-link>-->
				<router-link to="/inviteActivity"> <li >专属邀请链接</li></router-link>
				<!--<router-link to="/activityends"> <li >点赞送BIDT</li></router-link>-->
				<router-link to="/newsactivity"> <li >分红奖励</li></router-link>
				<!--<router-link to="/activityends"> <li >活动结束</li></router-link>-->
				<router-link to="/noticeList"> <li >系统公告</li></router-link>
				<router-link to="/notice?id=12"> <li >生态浏览器算法公示</li></router-link>
				<!--<router-link to="/lottery"> <li   class="lottery">中秋幸运大抽奖</li></router-link>-->
				<!--<router-link to="/coinActivity"> <li >TTC空投活动</li></router-link>-->

				
				
			<li class="refreash" @click="refFun" v-if="refreshBtn==1" ><img src="../../common/img/activity/newactivity/refreash.png"/></li>
			</div>
			<div class="contextBox">
				<div class="ly_wap_package clear" v-if="groupSel===1">
					<div class="packageTest">
					</div>

				</div>

				<div class="ly_wap_news" v-if="groupSel===2">
					<div class="platTest">
						
					</div>
				</div>
				<div class="ly_wap_help" v-if="groupSel===4">
					<img src="../../common/img/sdk/help.png" alt="" />
				</div>

			</div>
		</div>
	</div>

</template>

<script>
	import Vue from 'vue';
	export default({
		data: function() {
			let vm = this;
			return {
				price_num_pay:0,
				new_price:0,
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
				gameUrl: sessionStorage.egg_appUrl,
				gameId: 53,
				postTTCState:0,
				psotttcdata:"",
				accessToken:sessionStorage.egg_token,
				initdata1:"",
				refreshBtn:0,
				hasbd:"",
				total:"",

			}
		},
		methods: {
			getasset () {
      let vm = this;
      $.ajax({
						url:  contextPath1+"/app/api/content/getProperty",
						type: "post",
						async: true,
						dataType: "json",
						data: {
							// token:sessionStorage.egg_token,
              // count:amount
              token: sessionStorage.lh_token,
              // project: 1
						},
						success: function(data) {
              vm.total = data.data.total;
              // data.data.list.map((item) => {
              //   if(item.appName == 1) {
              //     vm.list[1] = item;
              //   }else  if(item.appName == 0) {
              //     vm.list[0] = item;
              //   }
              // })
              console.log(vm.list);

                // vm.status = data.data.status;
                // vm.datainfo = data.data;
                // if(vm.datainfo.blockId) {
                //   sessionStorage.qkid = data.data.blockId
                // }
                // sessionStorage.qkid = data.data.blockId
						}
					});
    },
			getinit () {
				if(!sessionStorage.egg_token) {
					return;
				}
      let vm = this;
      $.ajax({
						url:  contextPath1+"/api/banding/judgeBanding",
						type: "post",
						async: true,
						dataType: "json",
						data: {
							// token:sessionStorage.egg_token,
              // count:amount
              token: sessionStorage.egg_token,
              project: 1
						},
						success: function(data) {
                vm.hasbd = data.data.status;
                if(vm.hasbd == 1) {
									sessionStorage.lh_token = data.data.token;
									vm.getasset();
                  // vm.$router.push("/bindingBlockIdentity");
                }
						}
					});
    },
			goqbye () {
				// getinit () {
      let vm = this;
      $.ajax({
						url:  contextPath1+"/api/banding/judgeBanding",
						type: "post",
						async: true,
						dataType: "json",
						data: {
							// token:sessionStorage.egg_token,
              // count:amount
              token: sessionStorage.egg_token,
              project: 1
						},
						success: function(data) {
                let hasbd = data.data.status;
                if(hasbd == 1) {
                  sessionStorage.lh_token = data.data.token;
                  vm.$router.push("/myAssets");
                }else {
									vm.$router.push("/blockIdentity");
								}
						}
					});
    // },
			},
			refFun:function(){
				location.reload();
			},
			initBalance:function(){
				let vm = this;
				$.ajax({
					url: contextPath+"/api/eggworld/findttcblance",
					type: "get",
					async: true,
					dataType: "json",
					data: {
						token: sessionStorage.egg_token
					},
					success: function(data) {
						if(data.state.code == 20000) {
							vm.initdata1 = data.data;
						}
					}
				});
			},
			
			postTTCStatefn:function(){
				this.psotttcdata=1;
			},
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
			onBridgeReady:function(data){
			   WeixinJSBridge.invoke(
			       'getBrandWCPayRequest', {
			           "appId":data.appId,     //公众号名称，由商户传入     
			           "timeStamp":data.timestamp,         //时间戳，自1970年以来的秒数     
			           "nonceStr":data.noncestr, //随机串     
			           "package":data.packageStr,     
			           "signType":"MD5",         //微信签名方式：     
			           "paySign":data.sign //微信签名 
			       },
			       function(res){     
			           if(res.err_msg == "get_brand_wcpay_request:ok" ) {
			         location.href = "http://egg.liyugame.com";
			           }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
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
							gameId: sessionStorage.egg_eggId,
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
							gameId: sessionStorage.egg_eggId,
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
							gameId: sessionStorage.egg_eggId,
							shoppingPrice: vm.orderData.total_fee,
							shoppingNum: 1,
							body: vm.orderData.goods_name,
							total_fee: vm.orderData.total_fee,
							passback_params: vm.orderData.bill_no
						},
						success: function(data) {
							
							if (typeof WeixinJSBridge == "undefined"){
							   if( document.addEventListener ){
							       document.addEventListener('WeixinJSBridgeReady', vm.onBridgeReady(data.data), false);
							   }else if (document.attachEvent){
							       document.attachEvent('WeixinJSBridgeReady', vm.onBridgeReady(data.data)); 
							       document.attachEvent('onWeixinJSBridgeReady', vm.onBridgeReady(data.data));
							   }
							}else{
							   vm.onBridgeReady(data.data);
							}
						},
						error: function(data) {
							
						}
					})
				} else if(vm.payWay == 3) {
					if(sessionStorage.egg_eggId == vm.gameId) {
						mui.confirm("支付金额:" + vm.orderData.total_fee   + "BIDT", "确认订单", ["取消", "确认"], function(e) {
						if(e.index == 1) {
							$.ajax({
								type: "post",
								url: contextPath + "/api/h5sdk/alipay/ttcH5Pay",
								async: true,
								dataType: "json",
								data: {
									gameId: sessionStorage.egg_eggId,
									app_id: vm.orderData.app_id,
									mch_id: vm.orderData.mch_id,
									timestampStr: vm.orderData.timestampStr,
									sign: vm.orderData.sign,
									shoppingPrice: vm.orderData.total_fee /  0.3 ,
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
					}else{
						mui.confirm("支付金额:" + vm.orderData.total_fee /  0.3  + "BIDT", "确认订单", ["取消", "确认"], function(e) {
						if(e.index == 1) {
							$.ajax({
								type: "post",
								url: contextPath + "/api/h5sdk/alipay/ttcH5Pay",
								async: true,
								dataType: "json",
								data: {
									gameId: sessionStorage.egg_eggId,
									app_id: vm.orderData.app_id,
									mch_id: vm.orderData.mch_id,
									timestampStr: vm.orderData.timestampStr,
									sign: vm.orderData.sign,
									shoppingPrice: vm.orderData.total_fee /  0.3 ,
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
			touchstart: function(e) {
				let vm = this;
				vm.currentX = document.querySelector("#controlBall").offsetLeft;
				vm.currentY = document.querySelector("#controlBall").offsetTop;
				vm.startX = e.touches[0].clientX;
				vm.startY = e.touches[0].clientY;
			},
			touchmove: function(e) {
				let vm = this;
				vm.changeX = e.touches[0].clientX - vm.startX;
				vm.changeY = e.touches[0].clientY - vm.startY;
				let finX = vm.changeX + vm.currentX;
				let finY = vm.changeY + vm.currentY;
				document.querySelector("#controlBall").style.left = finX + "px";
				document.querySelector("#controlBall").style.top = finY + "px";
			},
			touchend: function(e) {
				let vm = this;
				let winWidth = document.body.clientWidth / 2;

				if(winWidth > Number(document.querySelector("#controlBall").style.left.replace("px", "")) + Number(document.querySelector("#controlBall").clientWidth / 2)) {
					document.querySelector("#controlBall").style.left = -document.querySelector("#controlBall").clientWidth + "px";
				} else {
					document.querySelector("#controlBall").style.left = document.body.clientWidth - document.querySelector("#controlBall").clientWidth + "px";
				}

				if(Number(document.querySelector("#controlBall").style.top.replace("px", "")) < 0) {
					document.querySelector("#controlBall").style.top = '0px';
				}
				if(Number(document.querySelector("#controlBall").style.top.replace("px", "")) > document.body.clientHeight - document.querySelector("#controlBall").clientWidth) {
					document.querySelector("#controlBall").style.top = document.body.clientHeight - document.querySelector("#controlBall").clientWidth + "px";
				};
				if(Math.abs(vm.changeX) < 10 && Math.abs(vm.changeY) < 10) {
					setTimeout(function() {
						if(vm.slideShow == 1) {
							vm.slideShow = 0;
						} else {
							vm.slideShow = 1;
						}
					}, 100)
				}
				vm.changeX = 0;
				vm.changeY = 0;

			},
			getFirstRaidersList: function() {
				let vm = this;
				$.ajax({
					type: "get",
					url: contextPath + "/api/recommend/getFirstRaidersList?f=sdk&gameId=" + vm.gameId,
					async: true,
					dataType: "json",
					data: {
						"page": 1,
						"rows": 30
					},
					success: function(data) {
						vm.FirstRaidersListData = data.data;
					}
				});
			},
			findMorePackageList: function() {
				let vm = this;
				$.ajax({
					type: "get",
					url: contextPath + "/api/h5/getPackageList?f=sdkGameInfo&gameId=" + vm.gameId,
					async: true,
					dataType: "json",
					data: {
						"page": 1,
						"rows": 30
					},
					success: function(data) {
						vm.MorePackageListData = data.data;
					}
				});
			},
			getPackage: function(pId) {
				location.href = 'http://www.liyugame.com/wap/src/package.html?contentType=7&resultType=5&objId=' + pId;
			},
			readNews: function(newsId) {
				location.href = 'http://www.liyugame.com/wap/src/message.html?contentType=2&resultType=3&objId=' + newsId;
			},
			changeGroup: function(groupId) {
				let vm = this;
				vm.groupSel = groupId;
				$(".nav").removeClass("nav_sel");
				$(event.currentTarget.childNodes[0]).addClass("nav_sel");
				switch(groupId) {
					case 1:
						vm.findMorePackageList();
						break;
					case 2:
						vm.$router.push("/tribe");
						break;
					case 3:
						vm.$router.push("/home");
						break;
					default:
						break;
				}

			},
			hideSlide: function() {
				let vm = this;
				vm.slideShow = 0;
			},
			payFn: function(e) {
				let vm = this;
				vm.payState = 1;
				vm.orderData = JSON.parse(e.data);
				vm.price_num_pay =  window.Calc.Mul(window.Calc.Mul(vm.orderData.total_fee,0.1),vm.new_price);
			},
			createRole: function(data) {
				let vm = this;
				$.ajax({
					type: "post",
					url: contextPath + "/api/h5sdk/createRoleInfo",
					async: true,
					dataType: "json",
					data: JSON.parse(data),
					success: function(data) {
						mui.toast("角色创建成功");
					}
				});
			},
			receiveMsg: function(e) {
				let vm = this;
				if(typeof(e.data.indexOf) == "function") {
					if(e.data.indexOf("bill_no") != -1) {
					$.ajax({
						type: "get",
						url: contextPath + "/api/eggworldTwoActivity/rechargelimit",
						async: true,
						data: {
							"token": sessionStorage.egg_token
						},
						dataType: "json",
						success: function(data) {
							if(data.data.state==1){
								vm.getPrice(function(){
									vm.payFn(e);
								})
							}else if(data.data.state==0){
								mui.alert("游戏内余额超过20W</br>请合理消费后继续充值");
							}else{
								mui.alert("充值功能暂时关闭</br>开启时间请关注官方公告");
							}
						}
					});
						
					} else if(e.data.indexOf("role_id") != -1) {
						vm.createRole(e.data);
					}else if(e.data.indexOf("tibi") != -1){
						vm.$router.push("/currencyRecord");
					}
				}

			},
			checkLogin: function(gameId) {
				let vm = this;
				if(sessionStorage.egg_isLogin == 1) {
					$.ajax({
						type: "get",
						url: contextPath + "/api/gameinfo/findGameUrlbyId",
						async: true,
						data: {
							"id": gameId
						},
						dataType: "json",
						success: function(data) {
							if(sessionStorage.egg_appUrl != data.data) {
								sessionStorage.egg_appUrl = data.data;
								sessionStorage.egg_eggId = gameId;
								location.reload();
							}
						}
					});
				} else {
					vm.$router.push({
						path: '/user',
						query: {
							bakUrl: location.href
						}
					});
				}
			},getWxAuth:function(){
				
				
//				$.ajax({
//						type: "get",
//						url: contextPath + "/liyu_game/wx_open_authorization",
//						async: true,
//						data: {
//							"redirect_url": location.href,
//							"token":sessionStorage.egg_token
//						},
//						dataType: "json",
//						success: function(data) {
//							sessionStorage.egg_wxAuth=1;
//							location.href=data.data;
//						}
//					});
		},
		getPrice:function(fn){
			let vm =this;
			$.ajax({
						type: "get",
						url: contextPath + "/api/eggworld/findorgprice",
						async: true,
						dataType: "json",
						success: function(data) {
							vm.new_price=data.data;
							fn();
						}
					});
		},check:function(){
				let vm=this;
				$.ajax({
					type:"get",
					url:contextPath+"/api/eggworld/systemtime",
					async:true,
					dataType:'json',
					success(res){
						if(res.data.status==='1'){
							vm.$router.push({
								path:'/update'
							})
						}else {
							vm.getinit();
						}
					}
				});
			}
			
		},
		watch: {
			gameId(val) {
			},
			psotttcdata(val1) {
				this.psotttcdata = val1;
			}
		},
		created(){
			if(contextBuild){
				this.check();
			}
		},
		mounted: function() {
			this.getinit();
			let vm = this;
			vm.getinit();
			document.addEventListener('plusready', function(){
     			vm.refreshBtn=1;
   			});
			
			
			if(sessionStorage.egg_token){
				vm.initBalance();
			}
			
			if(sessionStorage.egg_wxAuth!=1){
				vm.getWxAuth();
			}

			document.querySelector("#controlBall").addEventListener('touchstart', vm.touchstart, false);
			document.querySelector("#controlBall").addEventListener('touchmove', vm.touchmove, false);
			document.querySelector("#controlBall").addEventListener('touchend', vm.touchend, false);
			/*close packlist 2018 02 26*/
//			vm.init();
			vm.checkLogin(vm.gameId);
			vm.userData = JSON.parse(sessionStorage.egg_userData);

			if(window.addEventListener) {
				window.addEventListener('message', vm.receiveMsg, false);
			} else {
				window.attachEvent('message', vm.receiveMsg);
			}

			//			let toGameuserData={
			//				toGameuserData:"liyu",
			//				open_id:sessionStorage.egg_open_id,
			//				access_token:sessionStorage.egg_token
			//			};
			//			window.parent.postMessage(JSON.stringify(toGameuserData),"*");

			let ua = navigator.userAgent.toLowerCase();

			if(ua.match(/MicroMessenger/i) == "micromessenger") {
				vm.isWx = 1;
			} else {
				vm.isWx = 0;
			}

			//			$.ajax({
			//				type: "get",
			//				url: contextPath + "/api/sdkWxPay/GetCode",
			//				async: true,
			//				dataType: "json",
			//				success: function(data) {
			//					vm.openid = data.data;
			//				}
			//			});

		}
	})
</script>

<style lang="less">
	@import '../../common/css/reset.css';
	@import '../../common/less/sdk.less';
</style>