<template>
	<div>
		<div class="header">
			<a href="javascript:history.go(-1)"><img src="../../common/img/userCenter/arrowsb.png" alt="" class="back" /></a>
			<span>谷歌验证器</span>
		</div>
		<div class="backups">
			<p>请备份好密钥以防丢失</p>
		</div>
		<div class="code">
			 <div id="qrcode" ref="qrcode"> </div>
		</div>
		<div class="copy clear">
			<input class="addressCode" type="text" id="addressCode" :value="keyData.secret" />
			<button class="copyAddress" data-clipboard-target="#addressCode">复制</button>
		</div>
		
		
		
		<div class="preservation">
			<p>保存二维码到手机或复制密钥到剪贴板可能会有安全风险</p>
		</div>
			<button class="btn" @click="addVerification">下一步</button>

	</div>
</template>

<script>
	import  "../../common/js/jqr.js";
	import Clipboard from 'clipboard';
	export default {
		data() {
			return {
				keyData: "",
				egg_token:this.$route.query.accessToken
			}
		},
		methods: {
			addVerification:function(){
				let vm =this;
				vm.$router.push({path:"verification",query:{vType:"0",accessToken:vm.egg_token}})
			},
			 _getQart: function(arg) {
                    var qrcode = new QRCode(document.getElementById("qrcode"), {
                        width : 150,//设置宽高  
                        height : 150
                    });
                    qrcode.makeCode(arg);
            },
			getkey: function() {
				let vm = this;
				$.ajax({
					type: "post",
					url: contextPath + "/api/googleauthenticator/getkey",
					async: true,
					dataType: "json",
					data: {
						token:vm.egg_token
					},
					success: function(data) {
						vm.keyData =data.data;
						vm._getQart(data.data.qrcode);
					}
				});
			}
		},
		mounted: function() {
			let vm = this;
			vm.getkey();
			const clipboard = new Clipboard('.copyAddress');
			clipboard.on('success', function(e) {
				mui.alert("复制成功");
			});
			clipboard.on('error', function(e) {
			  mui.alert("复制失败请尝试手动复制");
			});
		}
	}
</script>

<style scoped>
	 #qrcode{
        height: 150px;
        width:150px;
        margin: auto;
    }
	.header {
		width: 6.4rem;
		height: 0.88rem;
		background: #006b8d;
		position: fixed;
		top: 0;
		z-index: 9999;
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
	
	.backups {
		width: 6.4rem;
		height: 0.3rem;
		margin-top: 2.18rem;
	}
	
	.backups p {
		text-align: center;
		margin-top: 0;
		margin-bottom: 0;
		font-size: 0.3rem;
		color: #000;
		font-weight: 500;
	}
	
	.code {
		width: 6.4rem;
		height: 2.25rem;
		margin-top: 0.5rem;
	}
	
	.code img {
		width: 2.25rem;
		height: 2.25rem;
		margin: 0 auto;
		display: block;
	}
	
	.copy {
		width: 3.5rem;
		height: 0.3rem;
		margin: 0 auto;
		margin-top: 0.33rem;
	}
	
	.copy input {
		width: 2.5rem;
		color: #006b8d;
		font-size: 0.22rem;
		float: left;
		border: none;
		padding: 0;
		height: 0.6rem;
	}
	
	.copy button {
		width: 1rem;
		color: #006b8d;
		font-size: 0.26rem;
		float: right;
		border: none;
		padding: 0;
		height: 0.6rem;
	}
	
	.preservation p {
		width: 6.4rem;
		color: #999;
		font-size: 0.16rem;
		margin-top: 0;
		margin-bottom: 0;
		margin-top: 1.9rem;
		text-align: center;
		
		/*letter-spacing:0.01rem;*/
	}
	
	.btn {
		width: 6rem;
		height: 0.7rem;
		margin: 0 auto;
		display: block;
		background: #006b8d;
		border-radius: 0.08rem;
		color: #fff;
		font-size: 0.26rem;
		margin-top: 0.25rem;
		border: 0;
	}
	
	.btn:active {
		background: #006b8d;
	}
</style>