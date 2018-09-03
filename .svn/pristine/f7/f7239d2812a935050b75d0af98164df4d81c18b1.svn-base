<template>
  <div class="eggworld-header">
    <h1 class="logo" v-if="show1"></h1>
    <a href="javascript:history.go(-1)" class="back" v-if="!show1"></a>
    <router-link tag="h2" to="/officialWeb" class="logo1" v-if="!show1"></router-link>
    <span class="header-more" v-if="showmore" @click="changeShowMore"></span>
    <span class="header-more close" v-else @click="changeShowMore"></span>
    <transition name="custom-classes-transition" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutDown">
      <ul class="nav" v-show="shownav">
        <li :class="{cur : index2 == 1}" @click="changenav(1)">活动</li>
        <li :class="{cur : index2 == 2}" @click="changenav(2)">公告</li>
        <li :class="{cur : index2 == 3}" @click="changenav(3)">攻略</li>
        <!-- <li :class="{cur : index2 == 4}" @click="changenav(4)">系统介绍</li>
        <li :class="{cur : index2 == 5}" @click="changenav(5)">商品介绍</li>
        <li :class="{cur : index2 == 6}" @click="changenav(6)">关于蛋生</li>
        <li :class="{cur : index2 == 7}" @click="changenav(7)">关于TTC</li> -->
        <li :class="{cur : index2 == 8}" @click="changenav(8)">客服中心</li>
      </ul>
    </transition>

    <!-- <transition name="headdernav">
      <ul class="nav" v-if="shownav">
        <li :class="{cur : index2 == 1}" @click="changenav(1)">活动</li>
        <li :class="{cur : index2 == 2}" @click="changenav(2)">公告</li>
        <li :class="{cur : index2 == 3}" @click="changenav(3)">攻略</li>
        <li :class="{cur : index2 == 4}" @click="changenav(4)">系统介绍</li>
        <li :class="{cur : index2 == 5}" @click="changenav(5)">商品介绍</li>
        <li :class="{cur : index2 == 6}" @click="changenav(6)">关于蛋生</li>
        <li :class="{cur : index2 == 7}" @click="changenav(7)">关于TTC</li>
        <li :class="{cur : index2 == 8}" @click="changenav(8)">客服中心</li>
      </ul>
    </transition> -->

  </div>
</template>

<script>
export default {
  data() {
    return {
      index2: 0,
      shownav: false,
      showmore: true,
      show1: false,
      header1: this.$route.path
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    header1(val) {
      let path1 = val.indexOf("publicWeb");
      let path2 = val.indexOf("officialWeb");
      if (path2 != -1) {
        this.show1 = true;
      }
    }
  },
  methods: {
    init() {
      let path1 = this.$route.path.indexOf("publicWeb");
      let path2 = this.$route.path.indexOf("officialWeb");
      if (path2 != -1) {
        this.show1 = true;
      }
    },
    changeShowMore() {
      this.showmore = !this.showmore;
      this.shownav = !this.shownav;
    },
    changenav(val) {
      this.index2 = val;
      this.shownav = false;
      if (val == 1) {
        this.$router.push("/coinActivity");
      } else if (val == 2) {
        this.$router.push("/eggNews");
      } else if (val == 3) {
        this.$router.push("/eggNews");
      } else if (val == 4) {
        this.$router.push("/systemIntroduction");
      } else if (val == 5) {
        this.$router.push("/productDesciption");
      } else if (val == 6) {
        this.$router.push("/productDesciption");
      } else if (val == 7) {




        this.$router.push("/productDesciption");
      }else if (val == 8) {
        this.$router.push("/linkUs");
      }
      this.showmore = true;
    }
  }
};
</script>

<style scoped lang="less">
.headdernav-enter-active, .headdernav-leave-active {
	    transition: height 0.2s linear;
		}
		.headdernav-enter, .headdernav-leave-to{
	    height: 0;
		}
.eggworld-header {
  position: sticky;
  left: 0;
  top: 0;
  height: 0.9rem;
  padding: 0.1rem 0.2rem;
  box-sizing: border-box;
  z-index: 99999999999;
  background: #fff;
  // overflow: hidden;
  .nav {
    position: fixed;
    left: 0;
    top: 0.9rem;
    width: 100%;
    // height: 7rem;
    // height: 100%;
    background: #fff;
    overflow: hidden;
    li {
      height: 0.8rem;
      line-height: 0.8rem;
      text-align: center;
      color: #474747;
      font-size: 0.24rem;
      position: relative;
      // overflow: hidden;
      margin: 0;
      &.cur {
        color: #50cdee;
      }
      &::after {
        content: "";
        width: 3.38rem;
        height: 1px;
        transform: scaleY(0.5);
        background: #e4e4e4;
        position: absolute;
        left: 50%;
        bottom: 0.02rem;
        transform: translateX(-50%);
        transform-origin: 0 0;
      }
      &:last-of-type::after {
        content: "";
        width: 3.38rem;
        height: 0px;
        transform: scaleY(0.5);
        background: #e4e4e4;
        position: absolute;
        left: 50%;
        bottom: 0.02rem;
        transform: translateX(-50%);
        transform-origin: 0 0;
      }
    }
  }
  .logo {
    height: 0.74rem;
    width: 1.15rem;
    background: url("../../common/img/officalwebimg/pic1/logo.png") no-repeat;
    background-size: 100%;
    float: left;
    margin: 0;
  }
  .logo1 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 0.74rem;
    width: 1.15rem;
    background: url("../../common/img/officalwebimg/pic1/logo.png") no-repeat;
    background-size: 100%;
    margin: 0;
  }
  .back {
    height: 0.43rem;
    width: 0.53rem;
    background: url("../../common/img/officalwebimg/pic1/back.png") no-repeat;
    background-size: 100%;
    float: left;
    margin: 0;
    position: relative;
    top: 0.2rem;
  }
  .header-more {
    float: right;
    width: 0.48rem;
    height: 0.4rem;
    background: url("../../common/img/officalwebimg/pic1/more.png") no-repeat;
    background-size: 100%;
    margin-top: 0.2rem;
  }
  .close {
    float: right;
    width: 0.48rem;
    height: 0.48rem;
    margin-top: 0.25rem;
    background: url("../../common/img/officalwebimg/pic1/close.png") no-repeat;
    background-size: 100%;
    margin-top: 0.12rem;
  }
}
</style>