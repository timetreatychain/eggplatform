<template>
	<div class="inviteActivity">
		<div class="banner">
		</div>
		<p class="p1">
			TTC基金会为了奖励对TTC生态有贡献的社区成员，特推出开区分红奖励计划，只要参与游戏挖矿的社区成员每期成功邀请至少一名有效用户，即可参与分红。（在游戏中注册并完成KYC二级认证，且活跃使用Dapp的用户为有效用户）
		</p>
		<div class="box">
			<p class="title" v-if="state4 == 0">你未获得本期矿池分红资格</p>
			<p class="title4" v-else>您已获得本期矿池分红资格</p>
			<!--<p class="title5" >（至少一名邀请用户完成KYC二级认证即可参与）</p>-->
			<p class="title2" v-if="state4 == 0">（至少一名邀请用户完成KYC二级认证即可参与）</p>
			<div class="box2">
				<p class="p1">邀请小伙伴加入矿池分红(人数越多，分红矿池奖励越高)</p>
				<p class="p2"><input type="text" v-model="link1"></p>
				<div class="box2_inner">
					<span class="copy1" v-clipboard:copy="link1" v-clipboard:success="onCopy" v-clipboard:error="onError"></span>
					<span class="poster" @click="showposter($event)"></span>
					<div class="info">
						<span>查询本期我的个人算力</span>
						<a href="http://block.liyugame.com/#/" class="gottc">前往生态浏览器官网》</a>
					</div>
				</div>
			</div>
		</div>

		<ul class="footer">
			<li><img src="../../common/img/activity/inviteActivity/dxm.png" alt="">
			</li>
			<li><img src="../../common/img/activity/inviteActivity/dxd.png" alt="">
			</li>
		</ul>
		<div class="warn">
			<p> 活动规则：</p>
			<p>1.恶意刷量的人将无法获得分红奖励。</p>
			<p>2.本期没有被领取的分红将累积到下一期矿池按规则分配。</p>
			<p>3.活动最终解释权归蛋生运营团队所有。</p>
		</div>

		<transition name="custom-classes-transition" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
			<tc v-if="show" class="tc" v-on:hide="hide1" :link1="message" @hidett="haha"></tc>
		</transition>
		<transition name=" custom-classes-transition" enter-active-class="animated zoomIn " leave-active-class="animated zoomOut ">
			<tc2 v-if="show1 " class="tc1" :index0="cur" :url="url6" v-on:hide3="hide4"></tc2>
		</transition>
	</div>
</template>

<script>
	import tc from "./tc";
	import tc2 from "./tc2";
	export default {
		data() {
			return {
				link1: "defbekjs,fnksldfjlskf.dfmksd",
				show: false,
				show1: false,
				cur: 0,
				url6: "",
				dataNum: {},
				message: "",
				show2: false,
				state4: ""
			};
		},
		components: {
			tc,
			tc2
		},
		mounted() {
			this.getinit();
			this.getlink();
		},
		methods: {
			hide1(val) {
				console.log(val);
				this.show = val.show4;
				this.show1 = true;
				this.cur = val.index;
				this.url6 = val.url;
			},
			haha(val3) {
				this.show1 = val3;
				this.show = val3;
			},
			hide4() {
				this.show1 = false;
				document.documentElement.style.overflow = "scroll";
			},
			getinit() {
				let vm = this;
				if(sessionStorage.egg_isLogin == 1) {
					$.ajax({
						type: "post",
						url: contextPath + "/api/eggworldTwoActivity/invitingactivities",
						async: true,
						dataType: "json",
						data: {
							token: sessionStorage.egg_token || 1
						},
						success(res) {
							if(res.state.code === "20000") {
								// vm.message = res.data.url;
								vm.state4 = res.data
							}
						}
					});
				} else {
					sessionStorage.egg_isLogin = 1
					this.$router.push({
						path: "/userNormal",
						query: {
							bakUrl: location.href
						}
					});
				}
			},
			getlink() {
				let vm = this;
				$.ajax({
					type: "post",
					url: contextPath + "/api/eggworldTwoActivity/findopenid",
					async: true,
					dataType: "json",
					data: {
						token: sessionStorage.egg_token || 1
					},
					success(res) {
						if(res.state.code === "20000") {
							vm.message = res.data.url;
							vm.link1 = res.data.url;
						}
					}
				});
			},
			showposter(e) {
				if(sessionStorage.egg_isLogin == 1) {
					this.show = true;
					document.documentElement.style.overflow = "hidden";
				} else {
					this.$router.push({
						path: "/userNormal",
						query: {
							bakUrl: location.href
						}
					});
				}
			},
			onCopy: function(e) {
				mui.alert("复制成功");
			},
			onError: function(e) {
				if(this.showlink) {
					console.log("无法复制文本！");
					mui.alert("复制失败");
				}
			}
		}
	};
</script>

<style scoped lang="less">
	.inviteActivity {
		/*background: #fcc01e;*/
		/*padding-bottom: 0.8rem;*/
		background: url("../../common/img/activity/inviteActivity/bg.png") no-repeat;
		background-size: 100%;
		padding-bottom: 0.2rem;
		.tc {
			position: fixed;
			-webkit-overflow-scrolling: touch;
			top: 0;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.2);
			overflow: auto;
		}
		.banner {
			height: 4.3rem;
			/*background: url("../../common/img/activity/inviteActivity/bg.png") no-repeat;*/
			/*background-size: 100%;*/
		}
		.p1 {
			padding: 0.2rem;
			padding-top: 0rem;
			font-size: 0.24rem;
			color: #44433b;
			margin-bottom: 0;
			line-height: 0.3rem;
			margin-bottom: 0.35rem;
		}
		.box {
			padding: 0.2rem;
			p {
				margin-bottom: 0;
			}
			.title {
				color: #fc4d1e;
				font-size: 0.3rem;
				font-weight: bold;
				text-align: center;
				line-height: 0.4rem;
			}
			.title4 {
				color: #FC4D1E;
				font-size: 0.36rem;
				font-weight: bold;
				text-align: center;
				line-height: 0.4rem;
			}
			.title5 {
				color: #3D454B;
				font-size: 0.18rem;
				font-weight: bold;
				text-align: center;
				line-height: 0.3rem;
			}
			.title2 {
				text-align: center;
				line-height: 0.25rem;
				font-size: 0.18rem;
				color: #44433b;
				margin-bottom: 0.2rem;
			}
			.box2 {
				height: 3.75rem;
				background: url("../../common/img/activity/inviteActivity/border.png") no-repeat;
				background-size: 100%;
				padding: 0.2rem 0.1rem 0.2rem 0.45rem;
				overflow: hidden;
				.p1 {
					font-size: 0.2rem;
					color: #44433b;
					margin-top: 0.1rem;
				}
				.p2 {
					width: 5rem;
					margin-left: 0.2rem;
					display: block;
					outline: none;
					margin-bottom: 0.2rem;
					input {
						width: 100%;
						height: 100%;
						border: 0.01rem dotted #000;
						font-weight: 300;
						margin-bottom: 0.1rem;
						padding: 0;
						padding: 0.1rem;
						font-size: 0.2rem;
					}
				}
			}
			.box2_inner {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				width: 5rem;
				margin-left: 0.2rem;
				.copy1 {
					width: 1.52rem;
					height: 0.54rem;
					background: url("../../common/img/activity/inviteActivity/copy.png") no-repeat;
					background-size: 100%;
				}
				.poster {
					width: 3.39rem;
					height: 0.54rem;
					background: url("../../common/img/activity/inviteActivity/sc.png") no-repeat;
					background-size: 100%;
				}
				.info {
					width: 5.5rem;
					margin-top: 0.8rem;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					span {
						width: 2.39rem;
						height: 0.25rem;
						font-size: 0.2rem;
						color: #44433b;
						line-height: 0.25rem;
					}
					.gottc {
						color: #2ab1f0;
						font-size: 0.2rem;
						width: 2.5rem;
						line-height: 0.25rem;
					}
				}
			}
		}
		.warn {
			-webkit-transform: scale(0.8);
			-moz-transform: scale(0.8);
			-ms-transform: scale(0.8);
			-o-transform: scale(0.8);
			transform: scale(0.8);
			width: 3.2rem;
			position: relative;
			left: 3rem;
			font-size: 0.2rem;
			p {
				color: #FFFFFF;
			}
		}
		.footer {
			width: 2.8rem;
			height: 1.3rem;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			position: absolute;
			margin-left: 0.2rem;
			li {
				width: 1.25rem;
				img {
					width: 1.25rem;
				}
				p {
					margin-bottom: 0;
					text-align: center;
					line-height: 0.2rem;
					font-size: 0.2rem;
					color: #44433b;
				}
			}
		}
	}
</style>