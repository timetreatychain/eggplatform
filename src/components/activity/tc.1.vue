<template>
	<div class="choice_pic" ref="wrapper">
		<div class="choice_pic_inner content">

			<p class="title">选择你喜欢的海报样式</p>
			<ul class="down_pto">
				<li @click="selectpic(0)" :class="{'cur' : cur == 0}">
					<span class="choice"></span>
					<div class="bg">
						<i id="qrcode1" ref="qrcode1"></i>
					</div>
					<!-- <div class="info">
                        <div class="info_l">
                            <p>立即注册即送20BIDT</p>
                            <p>首款休闲养成+</p>
                            <p>模拟经营区块链游戏</p>
                        </div>
                        <span class="info_r"></span>
                    </div> -->
				</li>
				<li @click="selectpic(1)" :class="{'cur' : cur == 1}">
					<span class="choice"></span>
					<div class="bg">
						<i id="qrcode2" ref="qrcode2"></i>
					</div>
					<!-- <div class="info">
                        <div class="info_l">
                            <p>立即注册即送20BIDT</p>
                            <p>首款休闲养成+</p>
                            <p>模拟经营区块链游戏</p>
                        </div>
                        <span class="info_r"></span>
                    </div> -->
				</li>
				<li @click="selectpic(2)" :class="{'cur' : cur == 2}">
					<span class="choice"></span>
					<div class="bg">
						<i id="qrcode3" ref="qrcode3"></i>
					</div>
					<!-- <div class="info">
                        <div class="info_l">
                            <p>立即注册即送20BIDT</p>
                            <p>首款休闲养成+</p>
                            <p>模拟经营区块链游戏</p>
                        </div>
                        <span class="info_r"></span>
                    </div> -->
				</li>
			</ul>
			<!-- <img style="display: none" src="" class="showimg">
			<a href="" style="display: none" class="downimg1"></a>
			<canvas style="display: none" id="mycanvas"></canvas> -->
			<p class="poster_tip">推荐预览后使用系统截屏功能截图，分享给你的朋友。</p>
			<div class="btn">
				<span @click="hidetc">取消</span>
				<span @click="downphone">预览选中海报</span>
			</div>

		</div>
	</div>
</template>

<script>
	import BScroll from "better-scroll";
	// import domtoimage from "dom-to-image";
	import "../../common/js/jqr.js";
	export default {
		data() {
			return {
				cur: 0,
				imgUri: "",
				link3: ""
			};
		},
		mounted() {
			setTimeout(() => {
				this._initScroll();
			}, 20);
			this.getlink();
		},

		methods: {
			_initScroll() {
				if(!this.$refs.wrapper) {
					return;
				}
				// better-scroll的初始化
				this.scroll = new BScroll(this.$refs.wrapper, {
					probeType: this.probeType,
					click: true,
					scrollY: true
				});

				// 是否派发滚动事件
				if(this.listenScroll) {
					this.scroll.on("scroll", pos => {
						this.$emit("scroll", pos);
					});
				}

				// 是否派发滚动到底部事件，用于上拉加载
				if(this.pullup) {
					this.scroll.on("scrollEnd", () => {
						// 滚动到底部
						if(this.scroll.y <= this.scroll.maxScrollY + 50) {
							this.$emit("scrollToEnd", "当前状态：上拉加载");
						}
					});
				}

				// 是否派发顶部下拉事件，用于下拉刷新
				if(this.pulldown) {
					this.scroll.on("touchend", pos => {
						// 下拉动作
						if(pos.y > 50) {
							this.$emit("pulldown", "当前状态：下拉加载更多");
						}
					});
				}

				// 是否派发列表滚动开始的事件
				if(this.beforeScroll) {
					this.scroll.on("beforeScrollStart", () => {
						this.$emit("beforeScroll");
					});
				}
			},

			_getQart: function(dom, arg) {
				var qrcode = new QRCode(document.getElementById(dom), {
					width: 0.5 * fontSizes, //设置宽高  
					height: 0.5 * fontSizes
				});
				qrcode.makeCode(arg);
			},

			getlink() {
				let vm = this;
				if(sessionStorage.egg_isLogin == 1) {
					$.ajax({
						type: "get",
						url: contextPath + "/api/eggworldTwoActivity/findopenid",
						async: true,
						data: {
							token: sessionStorage.egg_token ? sessionStorage.egg_token : 1
						},
						dataType: "json",
						success: function(data) {
							if(data.state.code == 20000) {
								// vm.twottcid = 1;
								// mui.alert(data.state.msg);
								// vm.invitefriends = data.data.peoplenum;
								// vm.jf = data.data.TTCnum;
								vm.link3 = data.data.url;
								// console.log(vm.link3)
								vm._getQart("qrcode1", data.data.url);
								vm._getQart("qrcode2", data.data.url);
								vm._getQart("qrcode3", data.data.url);
							}
						}
					});
				} else {
					this.showlink = true;
					this.$router.push({
						path: "/userNormal",
						query: {
							bakUrl: location.href
						}
					});
				}
			},

			hidetc() {
				this.$emit("hidett", false);
				document.documentElement.style.overflow = "scroll";
			},
			selectpic(val) {
				this.cur = val;
				// console.log(this.cur);
			},
			downphone() {
				this.$emit("hide", {show4 : false , index: this.cur, url : this.link3});
				document.documentElement.style.overflow = "scroll";
			}
		}
	};
</script>

<style scoped lang="less">
	.downLoadImg {
		li {
			width: 6.4rem;
			height: 11.36rem;
			border: 0.01rem solid rgb(187, 255, 0);
			border-radius: 0.08rem;
			position: relative;
			box-sizing: border-box;
			.bg {
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				background: url("../../common/img/activity/activity2/pto2.png") no-repeat;
				background-size: 100% 100%;
				height: 4.6rem;
				i {
					position: absolute;
					z-index: 999;
					right: 0.03rem;
					bottom: 0.18rem;
					font-style: normal;
					width: 0.5rem;
					height: 0.5rem;
					// border: 0.01rem solid red;
				}
			}
			.choice {
				position: absolute;
				width: 0.28rem;
				height: 0.28rem;
				border-radius: 50%;
				right: 0.08rem;
				top: 0.08rem;
				z-index: 3;
				background: rgba(14, 19, 48, 0.5);
				border: 0.01rem solid #fdab04;
			}
			&.cur .choice {
				background: url("../../common/img/activity/activity2/selectico.png") no-repeat -0.01rem;
				background-size: 0.28rem;
			}
			.info {
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				height: 1rem;
				.info_l {
					width: 2rem;
					p {
						transform: scale(0.5) translate(-50%, -50%);
						font-size: 0.2rem;
						width: 200%;
						margin-bottom: 0;
						margin-top: 0.2rem;
						&:nth-of-type(2) {
							margin-top: -0.2rem;
						}
						&:nth-of-type(3) {
							margin-top: -0.2rem;
						}
					}
				}
				.info_r {
					position: absolute;
					top: 0.25rem;
					right: 0.1rem;
					width: 0.6rem;
					height: 0.6rem;
					border: 0.01rem solid rgba(0, 0, 0, 0.2);
				}
			}
			&:nth-of-type(1) {
				// background: url("../../common/img/activity/activity2/pto2.png")
				//   no-repeat;
				// background-size: 100% 100%;
			}
			&:nth-of-type(2) {
				// background: url("../../common/img/activity/activity2/pto3.png")
				//   no-repeat;
				// background-size: 100% 100%;
				.bg {
					position: absolute;
					left: 0;
					right: 0;
					top: 0;
					background: url("../../common/img/activity/activity2/pto3.png") no-repeat;
					background-size: 100% 100%;
					height: 4.6rem;
				}
			}
			&:nth-of-type(3) {
				// background: url("../../common/img/activity/activity2/pto4.png")
				//   no-repeat;
				// background-size: 100% 100%;
				.bg {
					position: absolute;
					left: 0;
					right: 0;
					top: 0;
					background: url("../../common/img/activity/activity2/pto4.png") no-repeat;
					background-size: 100% 100%;
					height: 4.6rem;
				}
			}
		}
	}
	
	.choice_pic {
		position: relative;
		.choice_pic_inner {
			-webkit-overflow-scrolling: touch;
			position: absolute;
			left: 0%;
			top: 0%;
			right: 0%;
			bottom: 0%;
			margin: auto;
			width: 6rem;
			height: 5.55rem;
			background: #fff;
			border-radius: 0.2rem;
			box-sizing: border-box;
			padding: 0.12rem;
			overflow: hidden;
			p.title {
				height: 0.2rem;
				font-size: 0.2rem;
				font-family: MicrosoftYaHei;
				color: rgba(105, 27, 27, 1);
				line-height: 0.2rem;
				margin-top: 0.1rem;
				text-align: center;
				margin-bottom: 0.2rem;
			}
			ul {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				li {
					width: 1.88rem;
					width: 1.88rem;
					height: 3.4rem;
					border: 0.01rem solid rgb(187, 255, 0);
					border-radius: 0.08rem;
					position: relative;
					box-sizing: border-box;
					.bg {
						position: absolute;
						left: 0;
						right: 0;
						top: 0;
						background: url("../../common/img/activity/activity2/pto2.png") no-repeat;
						background-size: 1.88rem 3.33rem;
						height: 3.4rem;
						i {
							position: absolute;
							z-index: 999;
							right: 0.03rem;
							bottom: -0.7rem;
							font-style: normal;
							width: 0.5rem;
							height: 1.3rem;
							// border: 0.01rem solid red;
						}
					}
					.choice {
						position: absolute;
						width: 0.28rem;
						height: 0.28rem;
						border-radius: 50%;
						right: 0.08rem;
						top: 0.08rem;
						z-index: 3;
						background: rgba(14, 19, 48, 0.5);
						border: 0.01rem solid #fdab04;
					}
					&.cur .choice {
						background: url("../../common/img/activity/activity2/selectico.png") no-repeat -0.01rem;
						background-size: 0.28rem;
					}
					.info {
						position: absolute;
						left: 0;
						right: 0;
						bottom: 0;
						height: 1rem;
						.info_l {
							width: 2rem;
							p {
								transform: scale(0.5) translate(-50%, -50%);
								font-size: 0.2rem;
								width: 200%;
								margin-bottom: 0;
								margin-top: 0.2rem;
								&:nth-of-type(2) {
									margin-top: -0.2rem;
								}
								&:nth-of-type(3) {
									margin-top: -0.2rem;
								}
							}
						}
						.info_r {
							position: absolute;
							top: 0.25rem;
							right: 0.1rem;
							width: 0.6rem;
							height: 0.6rem;
							border: 0.01rem solid rgba(0, 0, 0, 0.2);
						}
					}
					&:nth-of-type(1) {
						// background: url("../../common/img/activity/activity2/pto2.png")
						//   no-repeat;
						// background-size: 100% 100%;
					}
					&:nth-of-type(2) {
						// background: url("../../common/img/activity/activity2/pto3.png")
						//   no-repeat;
						// background-size: 100% 100%;
						.bg {
							position: absolute;
							left: 0;
							right: 0;
							top: 0;
							background: url("../../common/img/activity/activity2/pto3.png") no-repeat;
							background-size: 1.88rem 3.33rem;
							height: 3.4rem;
						}
					}
					&:nth-of-type(3) {
						// background: url("../../common/img/activity/activity2/pto4.png")
						//   no-repeat;
						// background-size: 100% 100%;
						.bg {
							position: absolute;
							left: 0;
							right: 0;
							top: 0;
							background: url("../../common/img/activity/activity2/pto4.png") no-repeat;
							background-size: 1.88rem 3.33rem;
							height: 3.4rem;
						}
					}
				}
			}
			p.poster_tip{
				margin-top: 0.2rem;
				font-size: 0.24rem;
				color: #898989;
			}
			.btn {
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				height: 0.76rem;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				box-sizing: border-box;
				border-top: 0.01rem solid rgb(255, 208, 114);
				span {
					display: inline-block;
					width: 50%;
					text-align: center;
					line-height: 0.76rem;
					font-size: 0.26rem;
					box-sizing: border-box;
					color: #999999;
					&:nth-of-type(1) {
						border-right: 0.01rem solid rgb(255, 208, 114);
					}
					&:nth-of-type(2) {
						color: rgb(255, 208, 114);
					}
				}
			}
		}
	}
</style>