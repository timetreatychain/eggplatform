<template>
	<div class="activityends">
		<img src="../common/img/activity/activity2/activityends1.jpg"/>
		<div class="link" @click="activi"></div>
		<img src="../common/img/activity/activity2/activityends2.jpg"/>
	</div>	
</template>
<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			activi(){
				this.$router.push({
					path:'/eggActivityAg'
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	.activityends{
		position: absolute;
		width: 100%;
		display: flex;
		flex-direction: column;
		img{
			width: 100%;
			height: 100%;
		}
		.link{
			width: 20%;
			height: 30px;
		    position: absolute;
		    bottom: 2.8rem;
		    right: 0.1rem;
		}
	}
</style>

