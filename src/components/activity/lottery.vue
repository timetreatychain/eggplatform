<template>
	<div class="lottery">
    <div class="back" @click="backPrev"></div>
		<div class="myreward" @click="showMyAllreWard(0)"></div>
		<div class="carouls">
			<div class="caroule_inner">
				<swiper :options="swiperOption">
					<swiper-slide v-for="(item , index) in getReawardUserInfo" :key="index">
						<p>恭喜{{item.phonenum}} 获得{{rewardItem[item.reward -1]}}</p>
					</swiper-slide>

					<!-- <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div> -->
				</swiper>
			</div>
		</div>
		<div class="wrapper">
			<div class="zp" id="turntable"></div>
			<img class="lottery_center" src="../../common/img/lottery/center.png" alt="">
		</div>

		<div class="lottery_btn">
			<p>今日剩余抽奖次数：{{lotteryCount}}次</p>
			<ul class="lottery_btn_list">
				<li @click="satrtlottery(10)"></li>
				<li @click="satrtlottery(50)"></li>
				<li @click="satrtlottery(100)"></li>
			</ul>
		</div>
		<transition name="fade">
			<div v-if="show" class="bg">
				<!-- <Login v-if="showMyRewards" @hideMyreward = "resHideMyreward"></Login> -->
				<singalReward v-if="showMyRewards" :id="wardIndex"></singalReward>
				<myAllReword v-if="showmyAllReword" :alltype="myallrewardType" :rewardsArray="rewardArray"></myAllReword>
				<reget v-if="regetBox"></reget>
				<buyCoin v-if="showBuyCoin"></buyCoin>
				<changeSuccess v-if="showchangeSuccess"></changeSuccess>
			</div>
		</transition>
		<ActivityPAY ref="activityPay"></ActivityPAY>
	</div>
</template>

<script>
// import '../../common/js/turntable.js'
import Login from "./login";
import ActivityPAY from "../sdk/activity_pay";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import singalReward from "./singalReward";
import myAllReword from "./myAllReward";
import reget from "./regret";
import buyCoin from "./buyCoin";
import changeSuccess from "./changSuccess";
export default {
  data() {
    return {
      showchangeSuccess: false,
      showBuyCoin: false,
      regetBox: false,
      myallrewardType: 0,
      showmyAllReword: false,
      wardIndex: 0,
      show: false,
      showMyRewards: false,
      rewardList: "",
      rewardArray: [],
      rewardIndex: 0,
      rewardCount: 1,
      turntable: "",
      lotteryCount: 0,
      balance: "",
      getReawardUserInfo: "",
      checkClick: false,
      rewardItem: [
        "恐龙蛋",
        "孵化箱",
        "33币达",
        "333币达",
        "背包",
        "手表",
        "真宠(金毛)",
        "靓号666666",
        "iPhoneXS"
      ],
      swiperOption: {
        // loop: true,
        slidesPerView: 2,
        slidesPerGroup: 2,
        direction: "vertical",
        // spaceBetween: 30,
        // centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        }
      }
    };
  },

  mounted() {
    this.init();
    this.getLottery("0");
    this.getReawardUser();
    this.getBalance();
    this.getinit();
    eventBus.$on("hide", res => {
      this.show = res;
      this.showMyRewards = false;
      this.showmyAllReword = false;
    });
    eventBus.$on("lotterymore", () => {
      this.show = false;
      this.showMyRewards = false;
      this.showmyAllReword = false;
      this.rewardCount = 1;
      this.satrtlottery(this.rewardCount);
    });
    eventBus.$on("hidereget", () => {
      this.show = false;
      this.showMyRewards = false;
      this.showmyAllReword = false;
      this.regetBox = false;
    });
    eventBus.$on("showBuyCoin", () => {
      this.show = true;
      this.showBuyCoin = true;
      this.showMyRewards = false;
      this.showmyAllReword = false;
      this.regetBox = false;
    });
    eventBus.$on("hideBuyCoin", () => {
      this.show = false;
      this.showBuyCoin = false;
      this.showMyRewards = false;
      this.showmyAllReword = false;
      this.regetBox = false;
    });
    eventBus.$on("showChangeSuccessPage", () => {
      this.show = true;
      this.showBuyCoin = false;
      this.showMyRewards = false;
      this.showmyAllReword = false;
      this.regetBox = false;
      this.showchangeSuccess = true;
      setTimeout(() => {
        this.show = false;
        this.showBuyCoin = false;
        this.showMyRewards = false;
        this.showmyAllReword = false;
        this.regetBox = false;
        this.showchangeSuccess = false;
        this.getLottery();
      }, 1000);
    });
  },
  components: {
    swiper,
    swiperSlide,
    Login,
    singalReward,
    ActivityPAY,
    myAllReword,
    reget,
    buyCoin,
    changeSuccess
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  methods: {
    backPrev () {
      window.history.go(-1);
    },  
    showMyAllreWard(val) {
			this.checkLogin();
      this.myallrewardType = val;
      this.show = true;
      this.showmyAllReword = true;
    },
    // 显示遗憾
    showreget() {
      this.show = true;
      this.regetBox = true;
    },
    // 隐藏登录
    // resHideMyreward() {
    // 	console.log("影藏");
    // 	this.show = false;
    // 	this.showMyRewards = false;
    // },

    // 默认调用
    getinit() {
      if (!sessionStorage.egg_token) {
        return;
      }
      let vm = this;
      $.ajax({
        type: "get",
        url: contextPath + "/api/luckDrow/createLogininfo",
        async: true,
        data: {
          token: sessionStorage.egg_token
        },
        dataType: "json",
        success: function(data) {}
      });
    },
    // 显示我的奖品
    showMyreWard() {
      this.show = true;
      this.showMyRewards = true;
    },
    buyByRMB(val) {
      let vm = this;
      mui.confirm(
        "您的BIDT钱包余额不足</br> 账户余额:" +
          vm.balance +
          " BIDT,</br>是否购买BIDT兑换抽奖次数继续赢取大奖?",
        "",
        ["取消", "购买"],
        function(e) {
          if (e.index == 1) {
            $.ajax({
              type: "get",
              url: contextPath + "/api/luckDrow/luckDrowOrder",
              async: true,
              data: {
                token: sessionStorage.egg_token,
                num: val
              },
              dataType: "json",
              success: function(data) {
                vm.$refs.activityPay.payFn(JSON.stringify(data.data));
              }
            });
          }
        }
      );
    },
    buyByBIDT(val) {
      let vm = this;
      $.ajax({
        type: "get",
        url: contextPath + "/api/luckDrow/purchaseTimes",
        async: true,
        data: {
          token: sessionStorage.egg_token,
          num: val
        },
        dataType: "json",
        success: function(data) {
          vm.getLottery();
        }
      });
    },
    NoClick() {
      let vm = this;
      if (vm.checkClick) {
        mui.toast("3秒内不要重复提交!");
        return false;
      }
      vm.checkClick = true;
      setTimeout(function() {
        vm.checkClick = false;
      }, 3000);
      return true;
    },
    satrtlottery(val) {
      let vm = this;
      this.checkLogin();
      if (val > vm.lotteryCount) {
        vm.showreget();
      } else if (val < 0) {
      } else {
        if (vm.NoClick()) {
          $.ajax({
            type: "get",
            url: contextPath + "/api/luckDrow/luckdraw",
            async: true,
            data: {
              token: sessionStorage.egg_token,
              num: val
            },
            dataType: "json",
            error: function() {},
            success: function(data) {
              if (data.state.code == 20000) {
                vm.rewardList = data.data;
                if (val == 1) {
                  vm.rewardList.map(item => {
                    if (item.count == 1) {
                      vm.rewardIndex = item.rid;
                      vm.turntable.goto(vm.rewardIndex - 1, function(val) {
                        vm.wardIndex = vm.rewardIndex - 1;
                        vm.showMyreWard();
                        vm.rewardIndex = 0;
                        vm.getLottery();
                      });
                    }
                  });
                } else {
									vm.rewardArray = [];
                  vm.rewardList.map(item => {
                    if (item.count != 0) {
                      vm.rewardArray.push(item);
                    }
                  });
                  vm.rewardIndex = 0;
                  vm.turntable.goto(0, function(val) {
                    vm.rewardIndex = 0;
                    vm.showMyAllreWard(1);
                    vm.getLottery("0");
                  });
                }
              }
            }
          });
        }
      }
    },
    getBalance() {
      if (!sessionStorage.egg_token) {
        return;
      }
      let vm = this;
      $.ajax({
        type: "get",
        url: contextPath + "/api/eggworld/findttcblance",
        async: true,
        data: {
          token: sessionStorage.egg_token
        },
        dataType: "json",
        success: function(data) {
          vm.balance = data.data.account;
        }
      });
    },
    buy() {
      let vm = this;
      mui.prompt(
        "",
        " 20 BIDT/次",
        "请输入购买次数",
        ["取消", "购买"],
        function(e) {
          if (e.index == 1) {
            if (e.value < 0 || e.value > 1000000000) {
              setTimeout(function() {
                mui.alert("请输入正确的次数!");
              }, 300);
            } else {
              if (Number(vm.balance) > Number(e.value) * 20) {
                vm.buyByBIDT(e.value);
              } else {
                setTimeout(function() {
                  vm.buyByRMB(e.value);
                }, 300);
              }
            }
          }
        }
      );
    },
    // 查询抽奖次数
    getLottery(val, callback) {
      if (!sessionStorage.egg_token) {
        return;
      }
      let vm = this;
      $.ajax({
        type: "get",
        url: contextPath + "/api/luckDrow/selectLuckDrowNum",
        async: true,
        data: {
          token: sessionStorage.egg_token
          // num: val
        },
        dataType: "json",
        success: function(data) {
          if (data.state.code == 20000) {
            vm.lotteryCount = data.data;
          }
        }
      });
    },
    // 查询中奖用户
    getReawardUser() {
      let vm = this;
      $.ajax({
        type: "get",
        url: contextPath + "/api/luckDrow/luckdrawRealTime",
        async: true,
        data: {
          // token: sessionStorage.egg_token,
          page: 1,
          row: 20
          // num: val
        },
        dataType: "json",
        success: function(data) {
          if (data.state.code == 20000) {
            vm.getReawardUserInfo = data.data;
          }
        }
      });
    },
    // 判断用户是否登录
    checkLogin() {
      if (!sessionStorage.egg_token) {
        // this.$route.push('login');
        this.$router.push({
          path: "/user",
          query: {
            bakUrl: location.href
          }
        });
        return;
      }
    },
    init() {
      let vm = this;
      let ff = fontSizes;
      this.turntable = new Turntable({
        speed: "8",
        type: "transition",
        size: ff * 4.7,
        textSpace: 15,
        speed: 2,
        imgSpace: 54,
        values: [
					{
            id: 0,
            name: "恐龙蛋",
            img: {
              width: 50,
              height: 50,
              src: "http://image.liyugame.com/ew/reward/kld.png"
            },
            color: "#000",
            bg: "#0624c6"
					},
					{
            id: 2,
            name: "33BIDT",
            img: {
              width: 40,
              height: 35,
              src: "http://image.liyugame.com/ew/reward/33BIDT.png"
            },
            color: "#000",
            bg: "#6e78ef"
					},
						{
            id: 7,
            name: "真宠（金毛）",
            img: {
              width: 35,
              height: 45,
              src: "http://image.liyugame.com/ew/reward/jm.png"
            },
            color: "#000",
            bg: "#fff"
					},
				
					{
            id: 1,
            name: "孵化箱",
            img: {
              width: 30,
              height: 50,
              src: "http://image.liyugame.com/ew/reward/fhx.png"
            },
            color: "#000",
            bg: "#0624c6"
					},
					{
            id: 4,
            name: "背包",
            img: {
              width: 30,
              height: 40,
              src: "http://image.liyugame.com/ew/reward/bb.png"
            },
            color: "#000",
            bg: "#6e78ef"
					},
					{
            id: 6,
            name: "靓号666666",
            img: {
              width: 40,
              height: 40,
              src: "http://image.liyugame.com/ew/reward/lh.png"
            },
            color: "#000",
            bg: "#fff"
					},
					{
            id: 8,
            name: "iPhoneXS",
            img: {
              width: 35,
              height: 40,
              src: "http://image.liyugame.com/ew/reward/sj.png"
            },
            color: "#000",
            bg: "#ff9700"
					},
						{
            id: 3,
            name: "333BIDT",
            img: {
              width: 30,
              height: 40,
              src: "http://image.liyugame.com/ew/reward/333.png"
            },
            color: "#000",
            bg: "#6e78ef"
					},
					{
            id: 5,
            name: "手表",
            img: {
              width: 40,
              height: 40,
              src: "http://image.liyugame.com/ew/reward/sb.png"
            },
            color: "#000",
            bg: "#fff"
          },
          // {
          //   id: 0,
          //   name: "恐龙蛋",
          //   img: {
          //     width: 50,
          //     height: 50,
          //     src: "http://image.liyugame.com/ew/reward/kld.png"
          //   },
          //   color: "#000",
          //   bg: "#fff"
          // },
          // {
          //   id: 1,
          //   name: "孵化箱",
          //   img: {
          //     width: 30,
          //     height: 50,
          //     src: "http://image.liyugame.com/ew/reward/fhx.png"
          //   },
          //   color: "#000",
          //   bg: "#6e78ef"
          // },
          // {
          //   id: 2,
          //   name: "33BIDT",
          //   img: {
          //     width: 40,
          //     height: 35,
          //     src: "http://image.liyugame.com/ew/reward/33BIDT.png"
          //   },
          //   color: "#000",
          //   bg: "#0624c6"
          // },
          // {
          //   id: 3,
          //   name: "333BIDT",
          //   img: {
          //     width: 30,
          //     height: 40,
          //     src: "http://image.liyugame.com/ew/reward/333.png"
          //   },
          //   color: "#000",
          //   bg: "#e5e5e4"
          // },
          // {
          //   id: 4,
          //   name: "背包",
          //   img: {
          //     width: 30,
          //     height: 40,
          //     src: "http://image.liyugame.com/ew/reward/bb.png"
          //   },
          //   color: "#000",
          //   bg: "#6e78ef"
          // },
          // {
          //   id: 5,
          //   name: "手表",
          //   img: {
          //     width: 40,
          //     height: 35,
          //     src: "http://image.liyugame.com/ew/reward/sb.png"
          //   },
          //   color: "#000",
          //   bg: "#0624c6"
          // },
          // {
          //   id: 6,
          //   name: "靓号666666",
          //   img: {
          //     width: 40,
          //     height: 40,
          //     src: "http://image.liyugame.com/ew/reward/lh.png"
          //   },
          //   color: "#000",
          //   bg: "#e5e5e4"
          // },
          // {
          //   id: 7,
          //   name: "真宠（金毛）",
          //   img: {
          //     width: 35,
          //     height: 45,
          //     src: "http://image.liyugame.com/ew/reward/jm.png"
          //   },
          //   color: "#000",
          //   bg: "#6e78ef"
          // },
          // {
          //   id: 8,
          //   name: "iPhoneXS",
          //   img: {
          //     width: 35,
          //     height: 40,
          //     src: "http://image.liyugame.com/ew/reward/sj.png"
          //   },
          //   color: "#000",
          //   bg: "#ff9700"
          // }
        ]
      });
      this.turntable.draw(document.getElementById("turntable"));
      // var random = function(min, max) {
      //   return min + Math.floor(Math.random() * (max - min + 1));
      // };
      document.querySelector(".lottery_center").addEventListener(
        "click",
        function() {
          vm.satrtlottery(vm.rewardCount);
        },
        false
      );
    }
  }
};
</script>

<style scoped lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
	.fade-leave-to
	/* .fade-leave-active below version 2.1.8 */
	
	 {
  opacity: 0;
}

.lottery {
  position: relative;
  width: 6.4rem;
  background: url("../../common/img/lottery/bg.gif") no-repeat;
	background-size: 100%;
	height: 18.18rem;
	overflow: hidden;
  // height: 20rem;
  .back {
    position: absolute;
    left: 0.3rem;
    top: 0.3rem;
    width: 0.59rem;
    height: 0.7rem;
    background: url('../../common/img/lottery/back.png') no-repeat;
    background-size: 100%;
  }
  .bg {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
  }
  .myreward {
    position: absolute;
    right: 0.1rem;
    top: 0.2rem;
    // background: #fff;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }
  .carouls {
    position: absolute;
    width: 4.3rem;
    height: 0.78rem;
    // background: #fff;
    left: 50%;
    transform: translateX(-50%);
    top: 4.3rem;
    overflow: hidden;
    .caroule_inner {
      font-size: 0.2rem;
      // position: absolute;
      // top: 0;
      // left:0;
      & /deep/ .swiper-wrapper {
        height: 0.8rem !important;
      }
      & /deep/ .swiper-slide {
        height: 0.4rem !important;
        line-height: 0.4rem;
        p {
          text-align: center;
          color: #fff;
          font-size: 0.2rem;
          font-weight: 300;
        }
      }
    }
  }
  .wrapper {
    position: absolute;
    width: 5.63rem;
    height: 5.63rem;
    font-size: 0.22rem;
    // background: url('../../common/img/lottery/zp.png') no-repeat;
    // background-size: 100% 100%;
    top: 5.5rem;
    left: 50%;
    transform: translateX(-50%);
    .zp {
      position: absolute;
      left: 0.45rem;
      top: 0.3rem;
      width: 5.63rem;
      height: 5.63rem;
      // background: url("../../common/img/lottery/zp.png") no-repeat;
      background-size: 100% 100%;
      .turntable-effect {
        position: absolute;
        left: -0.2rem;
      }
    }
    .lottery_center {
      position: absolute;
      width: 1.66rem;
      height: 1.96rem;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 2;
    }
  }
  .lottery_btn {
    position: absolute;
    left: 50%;
    bottom: 5.7rem;
    width: 5.63rem;
    font-size: 0.2rem;
    transform: translateX(-50%);
    p {
      text-align: center;
      color: #fff;
    }
    .lottery_btn_list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.2rem;
      li {
        width: 1.8rem;
        height: 0.69rem;
        &:nth-of-type(1) {
          background: url("../../common/img/lottery/cj10.png") no-repeat;
          background-size: 100% 100%;
        }
        &:nth-of-type(2) {
          background: url("../../common/img/lottery/cj20.png") no-repeat;
          background-size: 100% 100%;
        }
        &:nth-of-type(3) {
          background: url("../../common/img/lottery/cj100.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>