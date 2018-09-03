<template>
	<div class="context">
		<div class="title">
			<a href="javascript:history.go(-1)"><img src="../../common/img/userCenter/arrowsb.png" alt="" class="back" /></a>区块地址
			<button class="copyAddress" data-clipboard-target="#addressCode">复制</button>
		</div>
		<div class="userCenter">
			<li>
				<span class="lable">区块地址</span>
				<input type="text" maxlength="42" class=" fr nickNameInput addressCode"  id="addressCode"  placeholder="区块地址"  :value="userData.tokenaddress" />
			</li>
			
			<div class="help">
				<p style="color: red;">温馨提示</p> 每位蛋生用户拥有唯一区块地址,用户通过本地址可在电脑pc端访问区块链浏览器,查询所有挖矿交易记录 <br><br> 区块链浏览器地址:<a>http://block.timetreaty.com</a>
			</div>
		</div>
	</div>
</template>

<script>
	import  "../../common/js/jqr.js";
	import Clipboard from 'clipboard';
	export default {
		data: function() {
			return {
				isAuthentication: 0,
				userData: JSON.parse(sessionStorage.egg_userData),
			}
		},
		mounted: function() {
			let vm = this;
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

<style lang="less" scoped>
.copyAddress{
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
		background: none;
		color: #ffffff;
}
.help{
	position: fixed;
	top: 5rem;
	text-align: left;
	width: 100%;
	margin-left: 50%;
	transform:  translateX(-50%) scale(0.7);
	
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
				width: 4.6rem;
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