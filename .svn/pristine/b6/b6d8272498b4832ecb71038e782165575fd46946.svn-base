<template>
	<div class="recommendBox" v-if="canShow">
		<img :src="reData.imgurl" @click="read" class="mainPath" />
		<img src="../common/img/close.png" @click="close" class="close" />
	</div>
</template>

<script>
	export default {
		data() {
			return {
				canShow: false,
				reData: ""

			}
		},
		methods: {
			read: function() {
				let vm = this;
				sessionStorage.egg_remId = vm.reData.id;
				vm.$router.push({
					path: vm.reData.activetyurl
				})
			},
			close: function() {
				let vm = this;
				vm.canShow = false;
				sessionStorage.egg_remId = vm.reData.id;
			},
			getDefault: function(backCall) {
				let vm = this;
				$.ajax({
					type: "get",
					url: contextPath + "/api/backstager/getScreen",
					async: true,
					dataType: "json",
					success: function(data) {
						vm.reData = data.data[0];
						backCall();
					}
				});
			}
		},
		mounted: function() {
			let vm = this;
			vm.getDefault(function() {
				if(sessionStorage.egg_remId) {
					if(sessionStorage.egg_remId != vm.reData.id) {
						vm.canShow = true;
					}
				} else {
					vm.canShow = true;
				}
			});
		}
	}
</script>

<style lang="less">
	.recommendBox {
		position: fixed;
		top: 0;
		z-index: 999999;
		height: 100%;
		width: 6.4rem;
		background: rgba(0, 0, 0, 0.4);
		.mainPath {
			width: 6.4rem;
			position: fixed;
			bottom: 50%;
			-webkit-transform: translateY(50%);
			-moz-transform: translateY(50%);
			-ms-transform: translateY(50%);
			-o-transform: translateY(50%);
			transform: translateY(50%);
		}
		.close {
			width: 0.6rem;
			height: 0.6rem;
			bottom: 10%;
			left: 2.87rem;
			position: fixed;
			z-index: 9999999;
		}
	}
</style>