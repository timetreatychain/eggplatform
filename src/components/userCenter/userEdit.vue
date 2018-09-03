<template>
	<div class="context">
		<div class="title">
			<a href="javascript:history.go(-1)"><img src="../../common/img/userCenter/arrowsb.png" alt="" class="back" /></a> 基本资料
			<span class="submit" @click="save">保存</span>
		</div>
		<div class="userCenter">
			<li><span class="lable">设置头像</span><img class="fr" :src="userData.picPath||'data:image/jpeg;base64,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'" id="hit1" data-state="0" /></li>
			<li>
				<span class="lable">昵称</span>
				<input type="text" maxlength="8" class=" fr nickNameInput" id="nickName" placeholder="设置昵称" :value="userData.nickName" />
			</li>
			<li>
				<span class="lable">个性签名</span>
				<input type="text" maxlength="8" class=" fr nickNameInput" id="personalitysign" :value="userData.personalitysign" placeholder="编辑个性签名" />
			</li>
			<li>
				<span class="lable">生日</span>
				<input type="text" maxlength="8" class=" fr nickNameInput" id="birthday" :value="userData.birthday" placeholder="1999-01-01" />
			</li>
		</div>
		<div class="pic_edit pic_edit1">
			<div id="clipArea1" class="clipArea"></div>
			<input type="file" id="file1" class="file">
			<button id="choose1" class="choose">选择图片</button>
			<button id="clipBtn1" class="clipBtn">上传</button>
			<button id="cannel1" class="cannel">取消</button>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				isAuthentication: 0,
				userData: JSON.parse(sessionStorage.egg_userData),
			}
		},
		methods: {
			imgLoad: function(index) {
				let vm = this;
				new PhotoClip("#clipArea" + index, {
					size: [260, 260],
					outputSize: [640, 640],
					file: "#file" + index,
					view: "#hit" + index,
					ok: "#clipBtn" + index,
					loadStart: function() {
						$('.lazy_tip span').text('');
						$('.lazy_cover,.lazy_tip').show();
					},
					loadComplete: function() {
						$('.lazy_cover,.lazy_tip').hide();
					},
					clipFinish: function(dataURL) {
						$("#hit" + index).attr('src', dataURL);
						$("#hit" + index).attr('data-state', 1);
						$(".pic_edit" + index).css({
							"top": "-100rem"
						});
					}
				});

				$("#hit" + index).bind('touchstart', function() {
					$('.pic_edit' + index).css({
						"top": "0"
					});
				});
				$('#cannel' + index).bind('touchstart', function() {
					$(".pic_edit" + index).css({
						"top": "-100rem"
					});
				});
			},
			save: function() {
				let vm = this;
				$.ajax({
					type: "post",
					url: contextPath + "/api/userInfo/updateUserInfo",
					async: true,
					dataType: "json",
					data: {
						token: sessionStorage.egg_token,
						personalitysign: $("#personalitysign").val(),
						address: "",
						userHeadPicPath: $("#hit1").attr("src"),
						nickName: $("#nickName").val(),
						birthday: $("#birthday").val(),
					},
					success: function(data) {
						mui.alert("修改成功!");
						vm.$router.push({
							path: '/'
						});
					}
				})
				
			},
		},
		mounted: function() {
			let vm = this;
			vm.imgLoad(1);
		}

	}
</script>

<style lang="less" scoped>
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
				width: 3.2rem;
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