<template>
	<div class="download">
		<img src="../common/img/download1.jpg" class="img1" />
		<a href="http://static.liyugame.com/download/egg.apk" v-if="u_and"><img src="../common/img/download2.png" class="img2" /></a>
		<a href="http://static.liyugame.com/download/egg.apk" v-if="!u_and&&!u_ios"><img src="../common/img/download2.png" class="img2" /></a>
		<a v-if="u_ios" @click="downIOS"><img src="../common/img/download2.png" class="img2" /></a>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				ua: navigator.userAgent,
				u_ios: false,
				u_and: false,
				is_ios: '',
				is_and: ''
			}
		},
		created() {
			let isiOS = !!this.ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
			let isAndroid = this.ua.indexOf('Android') > -1 || this.ua.indexOf('Linux') > -1;
			this.is_ios = isiOS;
			this.is_and = isAndroid;
			if(isiOS) {
				this.u_ios = true;
				console.log('ios')
			} else if(isAndroid) {
				console.log('android')
				this.u_and = true;
			}
		},
		methods: {
			downIOS() {
				mui.alert('目前仅支持安卓设备下载！')
			}
		}
	}
</script>
<style lang="less" scoped>
	.download {
		height: 100%;
		position: absolute;
		    -webkit-transform: translateX(-50%);
		    -moz-transform: translateX(-50%);
		    -ms-transform: translateX(-50%);
		    -o-transform: translateX(-50%);
		    transform: translateX(-50%);
    left: 50%;
		.img1 {
			width: 6.4rem;
			height: 100%;
		}
		.img2 {
			width: 100%;
			position: absolute;
			bottom: 0;
		}
	}
</style>