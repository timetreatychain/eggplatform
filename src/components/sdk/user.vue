<template>
	<div id="appUser">
			<img id="bg" src="../../common/img/bg.png" alt="" />
		<div class="loginContext">
			<component :is="view" :bakurl="bakurl" v-on:changePage="changeNav"></component>
		</div>
	</div>
</template>

<script>
	import Login from './login.vue';
	import Register from './register.vue';
	import Findpwd from './findpwd.vue';
	export default {
		data: function() {
			return {
				view: "login",
				title: '登录',
				bakurl: this.$route.query.bakUrl|| 'http://egg.liyugame.com/'
			}
		},
		created(){
			if(contextBuild){
				this.check()
			}
		},
		methods: {
			changeNav: function(i) {
				console.log(i);
				let vm = this;
				let viewList = ["login", "register", "findpwd"];
				vm.view = viewList[i];
			},
			check(){
				let vm=this;
				$.ajax({
					type:"get",
					url:contextPath+"/api/eggworld/systemtime",
					async:true,
					dataType:'json',
					success(res){
						console.log(0)
						console.log(res)
						if(res.data.status==='1'){
							vm.$router.push({
								path:'/update'
							})
						}
					}
				});
			}
		},
		components: {
			login: Login,
			register: Register,
			findpwd: Findpwd
		},
		mounted:function(){
			mui.init();
		}

	}
</script>

<style lang="less"  >
	body {
		/*background-image: url(../../release/img/game/hzgg.jpg);*/
	}
	#bg{
		position: absolute;
		top: 0;
		left: 0;
		width: 6.4rem;
		height: 100%;
		min-height: 10rem;
	}
	
	.loginContext {
		.back {
			position: absolute;
			right: 0;
			width: 0.4rem;
			transform: translate(0.16rem,-0.15rem);
			height: 0.4rem;
			img {
				width: 0.4rem;
				height: 0.4rem;
			}
		}
		width: 5.2rem;
		height: 6.46rem;
		border-radius: 0.2rem;
		background-color: transparent!important;
		position: absolute;
		top: 2.5rem;
		left: 0.6rem;
		/*public*/
		.logo {
			width: 2.4rem;
			height: 1rem;
			position: absolute;
			text-align: center;
			top: 0.2rem;
			left: 2.6rem;
			-webkit-transform: translateX(-1.2rem);
			span {
				display: block;
				color: #6bfffd;
				-webkit-transform: scale(0.9);
				margin-top: 0.1rem;
			}
			img {
				display: inline;
				width: 1.2rem;
				height: 1.2rem;
			}
		}
		.submit {
			width: 100%!important;
			height: 0.58rem!important;
			line-height: 0.58rem;
			background-color: #20b154!important;
			border-radius: 0.1rem;
			border: none;
			color: #ffffff!important;
			text-align: center;
			font-size: 0.3rem;
			-webkit-appearance: none;
		}
		.form {
			width: 4.6rem;
			position: relative;
			left: 2.6rem;
			top: 2rem;
			-webkit-transform: translateX(-2.3rem);
		}
		.msg {
			width: 4.6rem;
			border-radius: 0.1rem;
			overflow: hidden;
			margin-bottom: 0.3rem;
			background-color:  transparent!important;
			img {
				width: 0.3rem;
				float: left;
				margin: 0.11rem 0.21rem;
			}
			.username,
			.validate,
			.password {
				border: 1px solid #eeeeee;
				border-radius: 0.1rem;
				height: 0.56rem;
				margin-bottom: 0.16rem;
				color: #ffffff;
				background-color: transparent!important;
			}
			.verification {
				width: 1.76rem;
				height: 0.56rem;
				float: right;
				text-align: center;
				color: #ffffff;
				text-align: center;
				line-height: 0.56rem;
				border-radius: 0.1rem;
				font-size: 0.24rem;
			}
		}
		.form_input {
			border: none;
			font-size: 0.22rem;
			float: left;
			height: 0.56rem;
			background-color:transparent!important;
			line-height: 0.56rem;
			color: #ffffff!important;
		}
	}
	
	#appUser {
		input {
			padding: 0;
			margin: 0;
			background-color: #ffffff;
			color: #ffffff;
			width: 3.5rem;
			height: 0.52rem;
			
		}
		input::-webkit-input-placeholder {
			color: #ffffff;
			opacity: 1;
		}
		.header {
			background-color: #ffffff;
			height: 0.89rem;
			background-color: #ffffff;
			width: 6.4rem;
			position: fixed;
			top: 0;
			z-index: 999999;
			.back {
				img {
					height: 0.88rem !important;
					position: absolute !important;
					left: 0 !important;
					top: 0 !important;
				}
			}
		}
		.save {
			position: absolute;
			right: 0.2rem;
			line-height: 0.89rem;
			color: #6bfffd;
			top: 0;
		}
	}
</style>