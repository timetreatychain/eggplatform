<template>
	<div class="maintain">
		<div class="time">{{start}} - {{end}} &nbsp;&nbsp;</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				start:'00:00',
				end:'00:00'
			}
		},
		created(){
			this.Getstatus()
		},
		methods:{
			Getstatus(){
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
							console.log(res)
							vm.start=res.data.system.startTime;
							vm.end=res.data.system.endTime;
						}else if(res.data.status==='0'){
							vm.$router.push({
								path:'/'
							})
						}
					}
				});
			}
		}
	}
</script>
<style lang="less" scoped>
	.maintain{
		width: 6.4rem;
		height: 100%;
		position: absolute;
		background: url(../common/img/maintain.jpg)no-repeat;
		background-size: 100% 100%;
		.time{
			position: absolute;
			top: 49%;
			/*left: 13%;*/
			width: 6.4rem;
			text-align: center;
			font-size: 0.27rem;
			font-family: "HappyZcool-2016";
			color: rgb(203, 100, 5);
			text-transform: uppercase;
			line-height: 1.2;
			text-shadow: 0px 2px 0px rgba(242, 165, 38, 0.75),1px 0px 0px rgba(241, 165, 38, 0.75);
			-moz-transform: matrix( 0.91929957306032,0,0,0.91920639111458,0,0);
			-webkit-transform: matrix( 0.91929957306032,0,0,0.91920639111458,0,0);
			-ms-transform: matrix( 0.91929957306032,0,0,0.91920639111458,0,0);
		}
	}
</style>