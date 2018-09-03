<template>
	<div class="body">
		<div class="currency">
			<div class="header">
				<a href="javascript:history.go(-1)"><img src="../../common/img/userCenter/arrowsb.png" /></a>
				<span class="cur">提币</span>
				<div class="box"><span>
					<router-link class="tibi" to="/currencyRecord">提币记录</router-link>
				</span></div>
			</div>
			<div class="content">
				<div class="type">
					<span class="t_t">币种</span>
					<span class="t_ttc">BIDT</span>
				</div>
			</div>
			<div class="content">
				<div class="type">
					<span class="t_t">可用</span>
					<span id="available" class="t_ttc">{{initdata1.account}}</span>
				</div>
			</div>
			<div class="contentbox">
				<div class="contentNum">
					<div class="cont_num">
						<span class="t_num">提币数量</span>
						<input id="currencyttc" class="t_write" type="number" value="" @keyup="NumberCheck" placeholder="输入">
					</div>
					<div class="explain">手续费：100BIDT (注:到账 = 提币数量 - 手续费)<span></span></div>
				</div>
			</div>
			<div class="content address">
				<div class="type">
					<span class="t_t">提币地址</span>
					<router-link :to="{ path: 'walletSetting', query: { accessToken: accessToken }}"> <input id="edit" :value="initdata1.address" placeholder="提币地址" class="bianji" type="text"></router-link>
				</div>
			</div>
			<div class="btn">
				<div class="btns" @click="tibi">提币</div>
			</div>
			<div class="prompt">
				<p>温馨提示</p>
				<p class="m20">1.提币手续费100BIDT,系统将自动将手续费从提取数量中扣除</p>
				<p class="m20">2.为保障资金安全，当您账户安全策略变更、密码修改、使用新地址提币，我们会对提币进行人工审核，请耐心等待工作人员联系</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				userInfo: "",
				flag: true,
				initdata1: {},
				accessToken:sessionStorage.egg_token
			};
		},
		methods: {
			tibi() {
				let vm = this;
				var amount = Math.floor($(".t_write").val() * 10) / 10 || 0;
				var address = $(".bianji").val();
				if(amount > vm.initdata1.number) {
					mui.alert("提币金额不足！请重新填写");
					return;
				} else if(amount == 0) {
					mui.alert("抱歉,请您填写提币金额");
					return;
				} else if(address == "") {
					mui.alert("抱歉，需要您填写提币地址");
					return;
				} else if(amount <= 100) {
					mui.alert("提币金额需要大于100！");
					return;
				}else{
					vm.postData(amount);
				}
			},
			NumberCheck() {
				var val1 = parseFloat($("#currencyttc").val()) || 0;
				$("#currencyttc").val(Math.floor(val1 * 10) / 10);
			},
			postData(amount, address) {
				let vm = this;
				if(sessionStorage.egg_isLogin == 1) {
					$.ajax({
						url:  contextPath+"/api/eggworld/curreBIDT",
						type: "post",
						async: true,
						dataType: "json",
						data: {
							token:sessionStorage.egg_token,
							count:amount
						},
						success: function(data) {
								vm.$router.push("/currencyRecord");
						}
					});
				}
			},
			initdata() {
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
			}
		},
		mounted: function() {
			this.initdata();
		}
	};
</script>

<style lang="less" scoped>
	.body {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
		background-color: #eeeeee;
		.currency {
			.header {
				width: 100%;
				height: 0.8rem;
				background: #006b8d;
				position: relative;
				img {
					position: absolute;
					width: 0.16rem;
					height: 0.3rem;
					top: 0.25rem;
					left: 0.2rem;
				}
				.cur {
					position: absolute;
					left: 0.7rem;
					right: 0.7rem;
					text-align: center;
					line-height: 0.8rem;
					color: white;
				}
				.box {
					position: absolute;
					right: 0;
					width: 0.7rem;
					height: 0.8rem;
					span a {
						float: right;
						width: 1rem;
						background-color: #006b8d;
						color: #ffffff;
						height: 0.38rem;
						line-height: 0.38rem;
						font-size: 0.22rem;
						border-radius: 0.1rem;
						border: 1px solid #ffffff;
						margin: 0.25rem;
						position: absolute;
						right: 0;
						text-align: center;
					}
				}
			}
			.content {
				border-bottom: 1px solid #dddddd;
				height: 0.87rem;
				line-height: 0.87rem;
				background: #ffffff;
				position: relative;
				.type {
					padding: 0 0.22rem;
				}
				.t_t {
					font-size: 0.22rem;
					float: left;
					display: block;
				}
				.t_ttc {
					font-size: 0.22rem;
					color: #006b8d;
					float: right;
					display: block;
				}
				.bianji {
					position: absolute;
					width: 4.6rem;
					left: 1.5rem;
					top: 0.15rem;
					border: none;
					text-align: right;
				}
			}
			.contentbox {
				background: #ffffff;
				border-bottom: 1px solid #dddddd;
				.contentNum {
					//padding: 0 0.22rem;
					.cont_num {
						clear: both;
						height: 0.87rem;
						line-height: 0.87rem;
						border-bottom: 1px solid #dddddd;
						.t_num {
							font-size: 0.22rem;
							float: left;
							//display: block;
							padding-left: 0.22rem;
						}
						.t_write {
							width: 4rem;
							//margin-top: 0.2rem;
							position: relative;
							top: 0.1rem;
							font-size: 0.22rem;
							color: #999999;
							float: right;
							//display: block;
							margin-bottom: 0;
							border: none;
							text-align: right;
						}
					}
					.explain {
						font-size: 0.15rem;
						color: #999999;
						line-height: 0.47rem;
						text-indent: 0.22rem;
						span {
							color: #006b8d;
						}
					}
				}
			}
			.address {
				margin-top: 0.2rem;
				box-shadow: 4px 4px 4px #cbcbcb;
				.color {
					color: #777777;
				}
			}
			.btn {
				text-align: center;
				line-height: 0.8rem;
				margin-top: 0.61rem;
				padding: 0 0.22rem;
				.btns {
					background: #006b8d;
					border-radius: 0.1rem;
					color: white;
				}
			}
			.prompt {
				margin-top: 0.2rem;
				font-size: 0.15rem;
				padding: 0 0.22rem;
				color: #666666;
				.m20 {
					margin-top: 0.2rem;
				}
			}
		}
	}
</style>