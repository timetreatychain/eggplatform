<template>
	<div class="shareActivity">
		<div class="content">
			<div class="con-top">
				<ul class="reward-list">
					<li>本期我的个人算力分红：
						<i v-if="state1!=2">{{dataobj.personl}}BIDT</i>
						<i v-if="state1==2">{{dataobj.personl}}BIDT&nbsp;(不可领取)</i>
					</li>
					<li>本期个人算力分红第一名，获得分红：
						<i>{{dataobj.firstpersonl}}BIDT</i>
					</li>
					<li>本期我的贡献算力分红：
						<i v-if="state1!=2">{{dataobj.tuijian}}BIDT</i>
						<i v-if="state1==2">{{dataobj.tuijian}}BIDT&nbsp;(不可领取)</i>
					</li>
					<li>本期贡献算力分红第一名，获得分红：
						<i>{{dataobj.firsttuijian}}BIDT</i>
					</li>
					<li>本期我的家族算力分红：
						<i v-if="state1!=2">{{dataobj.home}}BIDT</i>
						<i v-if="state1==2">{{dataobj.home}}BIDT&nbsp;(不可领取)</i>
					</li>
					<li>本期家族分红第一名，获得分红：
						<i>254123.1BIDT</i>
					</li>
				</ul>
			</div>
			<div class="getreward" v-if="state1 == 0" @click="getreward(0)">
			</div>
			<div class="getreward" v-if="state1 == 2" @click="getreward(2)">
			</div>
			<div class="getreward sharepic" v-if="state1 == 1" @click="shareposter">
			</div>
			<p class="tipinfo"></p>
		</div>
		<div class="footer">
			<p>&nbsp;</p>
			<p>1.分红奖励领取时间：9月16号~9月30号;</p>
			<p>
				2.没有在规定时间内领取的奖励将自动放入下期分红矿池;
			</p>
			<p>3.本活动最终解释权归蛋生的世界运营团队所有。</p>
		</div>
		<transition name="custom-classes-transition" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
			<div class="posterwraper" v-show="show1">
				<div class="poster">
					<p class="title">分享海报</p>
					<div class="posterInner">
						<p class="num1">{{dataobj.count}}</p>
						<p class="num2">{{Math.floor(dataobj.price)}}</p>
						<i id="qrcode1" ref="qrcode1"></i>
					</div>
					<p class="tip">推荐预览后使用系统截屏功能截图，分享给你的朋友。</p>
					<ul class="poster-b">
						<li @click="shareposter">取消</li>
						<li @click="downpic">预览</li>
					</ul>
				</div>
			</div>
		</transition>

		<transition name="custom-classes-transition" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
			<div class="posterwraper" v-show="show2">
				<div class="poster2" @click="hidebox">
					<p class="num3">{{dataobj.count}}</p>
					<p class="num4">{{Math.floor(dataobj.price)}}</p>
					<div class="bg5">
						<i id="qrcode2" ref="qrcode2"></i>
					</div>
				</div>
			</div>
		</transition>

		<img id='downImg' src='' style='display: none;' />
		<!-- <a class="downimg" style="display:none"></a> -->
		<!-- <a class="down" href="" download="downImg">下载</a> -->
	</div>
</template>

<script>
	import "../../common/js/jqr";
	// import domtoimage from 'dom-to-image'
	export default {
		data() {
			return {
				show: true,
				show1: false,
				imgsrc: "",
				show2: false,
				show5: true,
				messageurl: "",
				dataobj: "",
				dataobj1: "",
				state1: "2",
				num6: "",
				num7: ""
			};
		},
		mounted() {
			let vm = this;
			if(sessionStorage.egg_token) {
				this.getlink();
				this.getdata();
			} else {
				mui.confirm("登录后领取本期分红", "未登录", ["取消", "登录"], function(e) {
					if(e.index == 1) {
						vm.$router.push({
							path: "/user",
							query: {
								bakUrl: location.href
							}
						});
					}
				})
			}
		},
		methods: {
			hidebox() {
				this.show2 = false;
			},
			downpic() {
				this.show1 = false;
				this.show2 = true;
				// var link = document.createElement('a');
				//     link.download = 'my-image-name.jpeg';
				//     link.href = this.imgsrc;
				//     link.click();
				if(this.show5) {
					this._getQart2("qrcode2", this.messageurl);
					this.show5 = false;
				}
			},
			paintCanvas() {
				let vm = this;
				let node1 = document.querySelector(".posterInner");
				var canvas2 = document.createElement("canvas");
				let _canvas = document.querySelector(".node1");
				var w = parseInt($(".posterInner").width());
				var h = parseInt($(".posterInner").width());
				//将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
				canvas2.width = w * 2;
				canvas2.height = h * 2;
				canvas2.style.width = w + "px";
				canvas2.style.height = h + "px";
				//可以按照自己的需求，对context的参数修改,translate指的是偏移量
				//  var context = canvas.getContext("2d");
				//  context.translate(0,0);
				var context = canvas2.getContext("2d");
				context.scale(2, 2);
				html2canvas(document.querySelector(".node1"), {
					canvas: canvas2
				}).then(
					function(canvas) {
						document.body.appendChild(canvas);
						//canvas转换成url，然后利用a标签的download属性，直接下载，绕过上传服务器再下载
						document
							.querySelector(".down")
							.setAttribute("href", canvas.toDataURL());
					}
				);
			},
			getreward(st) {

				this.show = false;
				let vm = this;
				if(st == 0) {
					$.ajax({
						type: "post",
						url: contextPath + "/api/eggworldTwoActivity/receiveselectfenhong",
						async: true,
						dataType: "json",
						data: {
							token: sessionStorage.egg_token || 1
						},
						success(res) {
							if(res.state.code === "20000") {
								// vm.dataobj1=res.data;
							}
						}
					});
					mui.toast("分红领取成功!");
					vm.state1 = 1;
					vm.show1 = true;
				} else {
					mui.alert("您未获得本期分红奖励资格!");
				}

			},
			shareposter() {
				this.show1 = !this.show1;
				// setTimeout(() => {
				//   this.paintCanvas();
				// }, 0);
			},
			_getQart: function(dom, arg) {
				var qrcode = new QRCode(document.getElementById(dom), {
					width: 0.8 * fontSizes, //设置宽高
					height: 0.8 * fontSizes
				});
				qrcode.makeCode(arg);
			},
			_getQart2: function(dom, arg) {
				var qrcode = new QRCode(document.getElementById(dom), {
					width: 1.5 * fontSizes, //设置宽高
					height: 1.5 * fontSizes
				});
				qrcode.makeCode(arg);
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
							vm.messageurl = res.data.url;
							vm._getQart("qrcode1", res.data.url);
						}
					}
				});
			},
			getdata() {
				let vm = this;
				$.ajax({
					type: "post",
					url: contextPath + "/api/eggworldTwoActivity/selectfenhong",
					async: true,
					dataType: "json",
					data: {
						token: sessionStorage.egg_token || 1
					},
					success(res) {
						if(res.state.code === "20000") {
							vm.dataobj = res.data;
							if(res.data.fstate == 0) {
								vm.state1 = res.data.state;
							} else {
								vm.state1 = 2;
							}
						}
					}
				});
			}
		}
	};
</script>

<style scoped lang="less">
	.shareActivity {
		position: relative;
		width: 6.4rem;
		height: 11.36rem;
		background: url("../../common/img/activity/newsactivity/bg.png") no-repeat;
		background-size: 100% 100%;
		overflow: hidden;
		.posterwraper {
			position: fixed;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			z-index: 555;
			.poster2 {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background: #fff url("../../common/img/activity/newsactivity/bg3.png") no-repeat;
				background-size: 100%;
				z-index: 555555;
				.bg5 {
					height: 2.1rem;
					position: fixed;
					left: 0;
					bottom: 0;
					width: 100%;
					background: url('../../common/img/activity/newsactivity/tip.png') no-repeat;
					background-size: 100%;
					z-index: 999999;
				}
				.num3 {
					position: absolute;
					left: 0.1rem;
					top: 3rem;
					font-size: 0.7rem;
					margin-bottom: 0;
					color: #fff;
					width: 3rem;
					text-align: right;
					font-family: Benmo Jinhei;
					text-shadow: 0 0 10px #a19bf1;
					// text-align: center;
					// height: 0.5rem;
					// line-height: 0.5rem;
					// overflow: hidden;
				}
				.num4 {
					position: absolute;
					right: 1.5rem;
					text-align: right;
					font-family: Benmo Jinhei;
					text-shadow: 0 0 10px #a19bf1;
					/*// text-align: center;*/
					top: 4rem;
    font-size: 0.8rem;
					margin-bottom: 0;
					color: #fff;
					width: 2.5rem;
					// overflow: hidden;
					// height: 0.5rem;
					// line-height: 0.5rem;
				}
				#qrcode2 {
					position: absolute;
					right: 0.2rem;
					/* bottom: 0.43rem; */
					// top: 9.45rem;
					top: 0.2rem;
				}
			}
			.poster {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				width: 6rem;
				height: 8.21rem;
				background: #fff;
				border-radius: 0.1rem;
				z-index: 3;
				.title {
					height: 0.8rem;
					line-height: 0.8rem;
					font-size: 0.25rem;
					text-align: center;
					color: #1bd8fc;
				}
				.posterInner {
					width: 3.34rem;
					height: 5.9rem;
					background: url("../../common/img/activity/newsactivity/bg3.png") no-repeat;
					background-size: 100%;
					margin: 0 auto;
					position: relative;
					.num1 {
						position: absolute;
						left: 0.4rem;
						top: 1.56rem;
						font-size: 0.4rem;
						font-family: Benmo Jinhei;
						text-shadow: 0 0 10px #a19bf1;
						margin-bottom: 0;
						text-align: center;
						color: #fff;
						width: 1.4rem;
						height: 0.4rem;
					}
					.num2 {
						position: absolute;
						right: 0.7rem;
						top: 2.18rem;
						text-align: center;
						text-shadow: 0 0 10px #a19bf1;
						font-size: 0.3rem;
						margin-bottom: 0;
						color: #fff;
						width: 1.4rem;
						height: 0.4rem;
					}
					#qrcode1 {
						position: absolute;
						right: 0.1rem;
						bottom: 0.2rem;
					}
				}
				.tip {
					color: red;
					margin: 0 auto;
					font-size: 0.18rem;
					text-align: center;
				}
				.poster-b {
					position: absolute;
					left: 0;
					bottom: 0;
					right: 0;
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					li {
						height: 0.75rem;
						width: 50%;
						box-sizing: border-box;
						line-height: 0.75rem;
						text-align: center;
						font-size: 0.25rem;
						border-top: 0.01rem solid #1bd8fc;
						&:nth-of-type(1) {
							color: #999999;
							border-right: 0.01rem solid #1bd8fc;
						}
						&:nth-of-type(2) {
							color: #1bd8fc;
						}
					}
				}
			}
		}
		.content {
			margin-top: 2.15rem;
			.con-top {
				width: 6.05rem;
				height: 4.2rem;
				margin: 0 auto;
				/*background: url("../../common/img/activity/newsactivity/kuang.png") no-repeat;*/
				/*background-size: 100%;*/
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				justify-content: space-between;
				/*margin-bottom: 0.25rem;*/
				.reward-list {
					margin: 0 auto;
					li {
						font-family: ZHSRXT-GBK;
						font-size: 0.19rem;
						color: #fff;
						line-height: 0.42rem;
						text-align: center;
						i {
							font-style: normal;
							color: #faf331;
						}
					}
				}
			}
			.getreward {
				width: 4.6rem;
				height: 0.73rem;
				margin: 0 auto;
				background: url("../../common/img/activity/newsactivity/dj.png") no-repeat;
				background-size: 100%;
			}
			.sharepic {
				background: url("../../common/img/activity/newsactivity/share.png") no-repeat;
				background-size: 100%;
			}
			.tipinfo {
				margin: 0 auto;
				color: #fff;
				font-size: 0.25rem;
				text-align: center;
				width: 4.6rem;
				line-height: 1rem;
				height: 0.26rem;
			}
		}
		.footer {
			width: 4.86rem;
			margin: 0 auto;
			margin-top: 1rem;
			p {
				font-family: FZY3JW;
				font-size: 0.21rem;
				line-height: 0.5rem;
				color: #ffffff;
				margin-bottom: 0rem;7
				&:nth-of-type(1) {
					font-size: 0.3rem;
					color: #ffffff;
				}
			}
		}
	}
</style>