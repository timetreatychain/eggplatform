<template>
	<div class="footer ">
		<ul v-if="isShow==1">
			<!-- <router-link to='/home'>
				<li v-if="state!=1" @click="changeState(1)"><span class="a"><img src="./img/play2.png" alt="" /></span>
					<a>推荐</a>
				</li>
				<li v-if="state==1" @click="changeState(1)"><span class="a"><img src="./img/play1.png" alt="" /></span>
					<a style="color: #006b8d;">推荐</a>
				</li>
			</router-link> -->
			<router-link to='/home'>
				<li v-if="state!=3" @click="changeState(3)"><span class="c"><img src="./img/tribe2.png" alt="" /></span>
					<a>部落</a>
				</li>
				<li v-if="state==3" @click="changeState(3)"><span class="c"><img src="./img/tribe1.png" alt="" /></span>
					<a style="color: #006b8d;">部落</a>
				</li>
			</router-link>
			<router-link to='/game'>
				<li v-if="state!=2" @click="changeState(2)"><span class="b"><img src="./img/game2.png" alt="" /></span>
					<a>游戏</a>
				</li>
				<li v-if="state==2" @click="changeState(2)"><span class="b"><img src="./img/game1.png" alt="" /></span>
					<a style="color: #006b8d;">游戏</a>
				</li>
			</router-link>
			<!-- <router-link to='/tribe'>
				<li v-if="state!=3" @click="changeState(3)"><span class="c"><img src="./img/tribe2.png" alt="" /></span>
					<a>部落</a>
				</li>
				<li v-if="state==3" @click="changeState(3)"><span class="c"><img src="./img/tribe1.png" alt="" /></span>
					<a style="color: #006b8d;">部落</a>
				</li>
			</router-link> -->
			<router-link to='/transaction'>
				<li v-if="state!=4" @click="changeState(4)"><span class="d"><img src="./img/deal2.png" alt="" /></span>
					<a>集市</a>
				</li>
				<li v-if="state==4" @click="changeState(4)"><span class="d"><img src="./img/deal1.png" alt="" /></span>
					<a style="color: #006b8d;">集市</a>
				</li>
			</router-link>
			<router-link to='/userCenter'>
				<li v-if="state!=5" @click="changeState(5)"><span class="e"><img src="./img/my2.png" alt="" /></span>
					<a>我的</a>
				</li>
				<li v-if="state==5" @click="changeState(5)"><span class="e"><img src="./img/my1.png" alt="" /></span>
					<a style="color: #006b8d;">我的</a>
				</li>
			</router-link>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				state: sessionStorage.egg_footerState || 1,
				isShow: 1
			}
		},
		methods: {
			changeState: function(id) {
				let vm = this;
				sessionStorage.egg_footerState = id;
				vm.state = id;
			},

		},
		mounted: function() {
		let vm=this;
//			var windowTop = 0;
//			$(window).scroll(function() {
//				event.preventDefault(); 
//				var scrolls = document.body.scrollTop;
//				if(scrolls >= windowTop) {
//					vm.isShow==0;
//					windowTop = scrolls;
//				} else {
//					vm.isShow==1;
//					windowTop = scrolls;
//				}
//			});

			/*

		var foot=document.getElementsByClassName('footer')[0];

		  var startx, starty;  

    function getAngle(angx, angy) {  
        return Math.atan2(angy, angx) * 180 / Math.PI;  
    };  
   

    function getDirection(startx, starty, endx, endy) {  
        var angx = endx - startx;  
        var angy = endy - starty;  
        var result = 0;  


        if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {  
        }  
   
        var angle = getAngle(angx, angy);  
        if (angle >= -135 && angle <= -45) {  
            result = 1;  
        } else if (angle > 45 && angle < 135) {  
            result = 2;  
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {  
            result = 3;  
        } else if (angle >= -45 && angle <= 45) {  
            result = 4;  
        }  
        return result;  
    }  

    document.addEventListener("touchstart", function(e) {  
        startx = e.touches[0].pageX;  
        starty = e.touches[0].pageY;  
        
    }, false);  



document.addEventListener("touchmove", function(e) {  
        var endx, endy;  
        endx = e.changedTouches[0].pageX;  
        endy = e.changedTouches[0].pageY;  
        var direction = getDirection(startx, starty, endx, endy);  
//      console.log(endx)
//      console.log(endy)
      
        switch (direction) {  
            case 0:  
         console.log(1)
                break;  
            case 1:  
				console.log(1)
			foot.style.display='none'
                break;  
            case 2:  

			foot.style.display='block'
                break;  
            default:  
        }  
    }, false)



    document.addEventListener("touchend", function(e) {  
        var endx, endy;  
        endx = e.changedTouches[0].pageX;  
        endy = e.changedTouches[0].pageY;  
        var direction = getDirection(startx, starty, endx, endy);  
        switch (direction) {  
            case 0:  

                break;  
            case 1:  
			foot.style.display='none'
                break;  
            case 2:  

			foot.style.display='block'
                break;  
            default:  
        }  
    }, false)
		
			
			
			
			
			
		*/
		}
	}
</script>

<style lang="less" scoped>
	.footer {
		border-top: 1px solid #e2e2e2;
		position: fixed;
		bottom: 0;
		height: 0.9rem;
		width: 6.4rem;
		background: #fff;
	}
	
	span {
		/*width: 20%;*/
		/*height: 0.8rem;*/
		background: #fff;
	}
	
	ul {
		width: 100%;
		/*height: 0.8rem;*/
		display: flex;
		justify-content: space-around;
	}
	
	ul li {
		text-align: center;
		height: 0.9rem;
		/*line-height: 0.25rem;*/
		float: left;
		font-size: 0.16rem;
		color: #494e51;
	}
	
	ul li span {
		width: 0.7rem;
		height: 0.55rem;
		display: block;
		overflow: hidden;
	}
	
	ul li span img {
		margin-top: 0.12rem;
	}
	ul li span a {
		width: 0.7rem;
		/*height: 0.4rem;*/
		margin-bottom: 0.1rem;
	}
	
	.router-link-exact-active .router-link-active {
		color: red;
	}
	
   a {
		color: #494e51;
	}
	.a img {
		width: 0.34rem;
		height: 0.38rem;
	}
	
	.b img {
		width: 0.5rem;
		height: 0.38rem;
	}
	
	.c img {
		width: 0.39rem;
		height: 0.38rem;
	}
	
	.d img {
		width: 0.38rem;
		height: 0.41rem;
	}
	
	.e img {
		width: 0.38rem;
		height: 0.38rem;
	}
</style>