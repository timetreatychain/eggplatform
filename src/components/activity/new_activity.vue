<template>
	<div class="new_activity">
		<img src="../../common/img/activity/newactivity/banner.png" class="bannerimg"/>
		<div class="text">
			活动期间，玩家通过分享个人邀请链接或者邀请海报成功邀请有效的用户（完成实名认证的用户为有效用户）后，当被邀请人在游戏中等级达到3级，活动结束后邀请人可获得20个BIDT作为邀请奖励，当被邀请人在游戏中等级达到5级，活动结束后邀请人可再获得40个BIDT作为邀请奖励，累计可获得60个BIDT奖励。
		</div>
		<div class="bgbox1">
			<div class="content">
				<div class="number_div">
					<div class="sum">
						我的邀请好友数
						<div class="num">{{dataNum.pom}}</div>
					</div>
					<div class="three">
						到3级的好友
						<div class="num">{{dataNum.level3}}</div>
					</div>
					<div class="five">
						到5级的好友
						<div class="num">{{dataNum.level5}}</div>
					</div>
				</div>
				<div class="award">
					累计获得邀请奖励
					<div class="bidt_num">{{dataNum.BIDT}}&nbsp;&nbsp;BIDT</div>
				</div>
				<img src="../../common/img/activity/newactivity/noclick.png" class="click_img" v-if="dataNum.state===0" @click="getyes"/>
				<img src="../../common/img/activity/newactivity/click.png" class="click_img" v-if="dataNum.state===1" @click="getyes"/>
				<img src="../../common/img/activity/newactivity/yesclick.png" class="click_img" v-if="dataNum.state===2" @click="getyes"/>
			</div>
		</div>
		<div class="notes">
			<img src="../../common/img/activity/newactivity/notes.png"/>
			<img src="../../common/img/activity/newactivity/methods.png" class="method_img"/>
		</div>
		<div class="bgbox2">
			<div class="bg_main">
				<div class="text1">专属邀请海报</div>
				<img src="../../common/img/activity/newactivity/select.png"  class="select_img" @click="showposter($event)"/>
				<div class="text2">复制我的邀请链接</div>
				<div class="copy_div">
					<div class="border">{{message}}</div>
					<img src="../../common/img/activity/newactivity/copy.png" class="copy_img" v-clipboard:copy="message" v-clipboard:success="onCopy" v-clipboard:error="onError"/>
				</div>
			</div>
		</div>
		<div class="foot_div">
			<div class="left_foot">
				活动规则
				<div class="l_text">
					1.活动时间：2018年8月1日至2018年8月31日;<br />
					2.活动结束后，玩家可通过本页面领取奖励;<br />
					3.对于恶意刷量的行为，一经查证永久封号;<br />
					4.本活动最终解释权归蛋生的世界运营团队所有
				</div>
			</div>
			<div class="right_foot">
				<div class="r_text">蛋小妹微信</div>
				<img src="../../common/img/activity/newactivity/wxcodes.png" class="wxcodes"/>
			</div>
		</div>
		<!-- <transition name="custom-classes-transition" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
	    	<tc v-if="show" class="tc" v-on:hide="hide1" :link1="a" @hidett="haha"></tc>
	    </transition>
	    <transition name=" custom-classes-transition" enter-active-class="animated zoomIn " leave-active-class="animated zoomOut ">
	    	<tc2 v-if="show1 " class="tc1" :index0="cur" :url="url6" v-on:hide3="hide4"></tc2>
	    </transition> -->
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
	export default{
		data(){
			return{
				message:'fuzhi',
				show:false,
				show1:false,
				cur: 0,
				url6: "",
				dataNum:{}
			}
		},
		components:{
			tc,
			tc2
		},
		created(){
			this.getnum()
			this.getlink()
		},
		methods:{
			hide1(val) {
			  	console.log(val);
			  	this.show = val.show4;
			  	this.show1 = true;
			  	this.cur = val.index;
			  	this.url6 = val.url;
			},
			haha(val3) {
		      	this.show1 = val3;
		      	this.show  = val3;
		    },
		    hide4() {
		      this.show1 = false;
		      document.documentElement.style.overflow = "scroll";
		    },
		    showposter(e) {
		      	if(sessionStorage.egg_isLogin == 1){
		        	this.show = true;
		        	document.documentElement.style.overflow = "hidden";
		      	}else{
		        	this.$router.push({
		          		path: "/userNormal",
		          		query: {
		            		bakUrl: location.href
		          		}
		        	});
		      	}
		    },
		    onCopy:function(e) {
		      	mui.alert("已复制到剪切板！");
		    },
		    onError:function(e){
		       	mui.alert("复制失败！");
		    },
		    getnum(){
		    	let vm=this;
		    	if(sessionStorage.egg_isLogin==1){
		    		$.ajax({
			    		type:"post",
			    		url:contextPath+"/api/eggworldTwoActivity/findeggActivityTwolist",
			    		async:true,
			    		dataType:'json',
			    		data:{
			    			token:sessionStorage.egg_token
			    		},
			    		success(res){
			    			if(res.state.code==='20000'){
			    				vm.dataNum=res.data;
			    			}
			    		}
			    	});
		    	}else{
		    		this.$router.push({
		          		path: "/userNormal",
		          		query: {
		            		bakUrl: location.href
		          		}
		        	});
		    	}
		    },
		    getyes(){
		    	let vm=this;
		    	if(vm.dataNum.state===0){
		    		mui.alert('活动结束后，开放领取！')
		    	}else if(vm.dataNum.state===1){
		    		$.ajax({
		    			type:"post",
		    			url:contextPath+"/api/eggworldTwoActivity/receiveeggActivityTwolist",
		    			async:true,
		    			dataType:'json',
		    			data:{
		    				token:sessionStorage.egg_token
		    			},
		    			success(res){
		    				if(res.state.code==='20000'){
		    					mui.alert('领取成功！')
		    					vm.getnum()
		    				}
		    			}
		    		});
		    	}else{
		    		mui.alert('您已领取过奖励了！')
		    	}
		    },
		    getlink(){
		    	let vm=this;
		    	$.ajax({
		    		type:"post",
		    		url:contextPath+"/api/eggworldTwoActivity/findopenid",
		    		async:true,
		    		dataType:'json',
		    		data:{
		    			token:sessionStorage.egg_token||1
		    		},
		    		success(res){
		    			if(res.state.code==='20000'){
		    				vm.message=res.data.url;
		    			}
		    		}
		    	});
		    }
		}
	}
</script>

<style lang="less" scoped>
	.new_activity{
		width: 6.4rem;
		font-family:MicrosoftYaHei;
		background: #5CC533;
		.bannerimg{
			width: 100%;
			height: 6.72rem;
			display: block;
		}
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
		.text{
			width: 100%;
			box-sizing: border-box;
			font-size: 0.2rem;
			color: #FFFFFF;
			background: #A2E45E;
			padding: 0.1rem 0.2rem;
		}
		.bgbox1{
			width: 100%;
			background: -webkit-linear-gradient(top,#A2E45E,#5CC533);
			display: flex;
			justify-content: center;
			.content{
				width: 6rem;
				height: 3.03rem;
				box-sizing: border-box;
				padding: 0.2rem 0.3rem;
				background: url(../../common/img/activity/newactivity/bg1.png)no-repeat;
				background-size: 100% 100%;
				text-align: center;
				.number_div{
					width: 100%;
					display: flex;
					padding-bottom: 0.2rem;
					border-bottom: 1px dashed #39CA0D;
					margin-bottom: 0.15rem;
					justify-content: space-between;
					.sum{
						font-size: 0.18rem;
						color: #4FC570;
						text-align:center;
						.num{
							font-size: 0.36rem;
							color: #3CBC55;
							margin-top: 0.1rem;
						}
					}
					.three,.five{
						font-size: 0.18rem;
						color: #4FC570;
						text-align:center;
						.num{
							font-size: 0.36rem;
							color: #3CBC55;
							margin-top: 0.1rem;
						}
					}
					.three{
						width: 2rem;
						border-left: 1px dashed #39CA0D;
						border-right: 1px dashed #39CA0D;
					}
				}
				.award{
					width: 100%;
					text-align: center;
					font-size: 0.18rem;
					color: #4FC570;
					margin-bottom: 0.15rem;
					.bidt_num{
						font-size: 0.36rem;
						color: #3CBC55;
					}
				}
				.click_img{
					width: 2.25rem;
					height: 0.77rem;
				}
		
			}
		}
		.notes{
			width: 100%;
			box-sizing: border-box;
			padding: 0.6rem 0.3rem 0.1rem 0.3rem;
			text-align: center;
			background: #5CC533;
			img{
				width: 100%;
				height: 2.53rem;
			}
			.method_img{
				width: 3.16rem;
				height: 0.98rem;
				margin-top: 0.6rem;
			}
		}
		.bgbox2{
			width: 100%;
			background:#5CC533;
			display: flex;
			justify-content: center;
			padding-bottom: 0.6rem;
			.bg_main{
				width: 6rem;
				height: 3rem;
				background: url(../../common/img/activity/newactivity/bg2.png) no-repeat;
				background-size: 100% 100%;
				box-sizing: border-box;
				padding: 0.3rem 0;
				text-align:center;
				.text1{
					box-sizing: border-box;
					padding-left: 0.38rem;
					font-size: 0.2rem;
					color: #3CBC55;
					margin-bottom: 0.1rem;
					text-align: left;
				}
				.select_img{
					width: 5.54rem;
					height: 0.73rem;
				}
				.text2{
					box-sizing: border-box;
					padding-left: 0.38rem;
					font-size: 0.2rem;
					color: #3CBC55;
					text-align: left;
					margin-top: 0.2rem;
				}
				.copy_div{
					width: 100%;
					box-sizing: border-box;
					padding:0 0.4rem;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.border{
						width: 4.16rem;
						height: 0.54rem;
						text-align: left;
						background: rgba(164,242,134,1);
						border: 1px solid #46D411;
						font-size: 0.2rem;
						color: #3CBC55;
						line-height: 0.54rem;
						overflow: hidden;
						white-space: nowrap;
					}
					.copy_img{
						width: 0.94rem;
						height: 0.71rem;
					}
				}
			}
		}
		.foot_div{
			width: 100%;
			box-sizing: border-box;
			padding: 0 0.2rem 0.3rem 0.2rem;
			background: #5CC533;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.left_foot{
				font-size: 0.24rem;
				color: #FFFFFF;
				.l_text{
					margin-top: 0.1rem;
					font-size: 0.18rem;
					color: #FFFFFF;
				}
			}
			.right_foot{
				text-align: center;
				.r_text{
					font-size: 0.2rem;
					color: #FFFFFF;
				}
				.wxcodes{
					width: 1.25rem;
					height: 1.25rem;
				}
			}
		}
	}
	
</style>