<template>
  <div class="eggworld" :class="{cur : flags}">
    <!-- <div class="eggworld-header">
      <h1 class="logo"></h1>
      <span class="header-more" v-if="showmore" @click="changeShowMore"></span>
      <span class="header-more close" v-else @click="changeShowMore"></span>
    </div> -->
    <heador></heador>
    <div class="content" ref="wrapper">
      <div>
      <div class="carouls">
        <swiper :options="swiperOption" v-if="caroluesl.length>0">
          <swiper-slide v-for="item in caroluesl" :key="item.id"><router-link :to="item.activetyurl"><img :src="item.imgurl" alt=""></router-link></swiper-slide>
          <!-- <swiper-slide><router-link to="eggNewsDetails/13?sf=3"><img src="../../common/img/officalwebimg/pic1/1111.png" alt=""></router-link></swiper-slide>
          <swiper-slide><router-link to="eggNewsDetails/12?sf=3"><img src="../../common/img/officalwebimg/pic1/2.png" alt=""></router-link></swiper-slide>
          <swiper-slide><router-link to="eggNewsDetails/6?sf=4"><img src="../../common/img/officalwebimg/pic1/zqbd.jpg" alt=""></router-link></swiper-slide> -->
        </swiper>
      </div>
      <div class="content-cen">
        <div class="wkrs">
          <i>游戏挖矿人数：{{data1}}人</i>
        </div>
        <div class="wkrs-b">
          <a href="http://egg.liyugame.com/"></a>
          <a href="http://egg.liyugame.com/download"></a>
          <a href="http://block.timetreaty.org/"></a>
        </div>
        <div class="news">
          <div class="news-top">
            <h4>新闻资讯</h4>
            <router-link to="/eggNews" tag="span" class="morenew"></router-link>
          </div>
          <ul class="newslist">
            <li :class="{cur : index0 == 0}" @click="changenews(0)">热门</li>
            <li :class="{cur : index0 == 1}" @click="changenews(1)">新闻</li>
            <li :class="{cur : index0 == 2}" @click="changenews(2)">公告</li>
            <li :class="{cur : index0 == 3}" @click="changenews(3)">活动</li>
            <li :class="{cur : index0 == 4}" @click="changenews(4)">攻略</li>
          </ul>
          <swiper :options="swiperOption1" ref="mySwiper" :not-next-tick="swiperOption1.notNextTick">
            <swiper-slide>
              <div class="news-content">
                <ul class="newsitem">
                   <!-- <li @click="newstype(item.type , item.eggnewsinfo)" v-for="item in hotlist" :key ="item.id" v-if="item.type == 1">
                    <i>[新闻]</i>
                    <p>{{item.egghotspottitle}}</p>
                    <span>{{item.createtime}}</span>
                  </li>
                   <li @click="newstype(item.type , item.eggnewsinfo)" v-for="item in hotlist" :key ="item.id" v-if="item.type == 2">
                    <i>[公告]</i>
                    <p>{{item.egghotspottitle}}</p>
                    <span>{{item.createtime}}</span>
                  </li>
                  <li @click="newstype(item.type , item.eggnewsinfo)" v-for="item in hotlist" :key ="item.id" v-if="item.type == 3">
                    <i>[活动]</i>
                    <p>{{item.egghotspottitle}}</p>
                    <span>{{dealtime(item.createtime)}}</span>
                  </li>
                  <li @click="newstype(item.type , item.eggnewsinfo)" v-for="item in hotlist" :key ="item.id" v-if="item.type == 4">
                    <i>[攻略]</i>
                    <p>{{item.egghotspottitle}}</p>
                    <span>{{item.createtime}}</span>
                  </li> -->
                  <li v-for="item in hotlist" :key ="item.id">
                    <i v-if="item.type == 1">[新闻]</i>
                    <i v-if="item.type == 2">[公告]</i>
                    <i v-if="item.type == 3">[活动]</i>
                    <i v-if="item.type == 4">[攻略]</i>
                    <p @click="newstype(item.type , item.eggnewsinfo)">{{item.egghotspottitle}}</p>
                    <span>{{dealtime(item.createtime)}}</span>
                  </li>
                </ul>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="news-content">
                <ul class="newsitem">
                   <li @click="newstype(1 , item.id)" v-for="item in newslist" :key ="item.id">
                    <!-- <i>{{item.newstitle}}</i> -->
                    <p class="newitem">{{item.newstitle}}</p>
                    <span>{{dealtime(item.createtime)}}</span>
                  </li>
                </ul>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="news-content">
                <ul class="newsitem">
                  <li @click="newstype(2 , item.id)" v-for="item in gglist" :key ="item.id" >
                    <!-- <i>{{item.newstitle}}</i> -->
                    <p class="newitem">{{item.title}}</p>
                    <span>{{dealtime(item.createtime)}}</span>
                  </li>
                </ul>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="news-content">
                <ul class="newsitem">
                  <li @click="newstype(3 , item.id)" v-for="item in activitylist" :key ="item.id">
                    <!-- <i>{{item.newstitle}}</i> -->
                    <p class="newitem">{{item.eggactivitytitle}}</p>
                    <span>{{dealtime(item.createtime)}}</span>
                  </li>
                </ul>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="news-content">
                <ul class="newsitem">
                  <li @click="newstype(4 , item.id)" v-for="item in gllist" :key ="item.id">
                    <!-- <i>{{item.newstitle}}</i> -->
                    <p class="newitem">{{item.eggstrategystitle}}</p>
                    <span>{{dealtime(item.createtime)}}</span>
                  </li>
                </ul>
              </div>
            </swiper-slide>
          </swiper>
        </div>
        <wzds></wzds>
        <ul class="link-us">
          <router-link to="/publicWeb" tag="li"></router-link>
          <router-link to="/eggSociety" tag="li"></router-link>
        </ul>
        <footer1></footer1>
        </div>
      </div>
    </div>

    <div class="dtz" @mousedown="down" @touchstart="down" @mousemove="move(oW)" @touchmove="move(oW)" @mouseup="end" @touchend="end" id="moveDiv" @click="showlinkme"></div>
   <!-- <div class="dtz1" @mousedown="down1" @touchstart="down1" @mousemove="move1(oW)" @touchmove="move1(oW)" @mouseup="end1" @touchend="end1" id="moveDiv1" @click="enterGame"></div>-->
    <fadeAnimation>
      <div class="tc" v-if="showtc">
        <i class="close1" @click="hidetc"></i>
      </div>
    </fadeAnimation>
    <fadeAnimation>
      <div class="bg" v-if="showtc"></div>
    </fadeAnimation>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import wzds from "./wzds";
import footer1 from "./footer";
import heador from "./header";
import fadeAnimation from "./fadeAnimation";
export default {
  data() {
    let vm = this;
    return {
      caroluesl: [],
      hotlist:[],
      newslist:[],
      gglist:[],
      activitylist:[],
      gllist:[],
      data1:"",
      showtc: false,
      flags: false,
      position: {
        x: 0,
        y: 0
      },
      nx: "",
      ny: "",
      dx: "",
      dy: "",
      xPum: "",
      yPum: "",


      flags1: false,
      position1: {
        x: 0,
        y: 0
      },
      nx1: "",
      ny1: "",
      dx1: "",
      dy1: "",
      xPum1: "",
      yPum1: "",
      shownav: 0,
      index0: 0,
      showmore: true,
      oW: "",
      oW1: "",
      swiperOption: {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        loop: true,
        autoplay: {
          delay: 2500 //使图片可以自动播放
        },

        initialSlide: 0,
        // loop:true,
        coverflowEffect: {
          rotate: 10,
          stretch: -0.5 * fontSizes,
          depth: 100,
          modifier: 1,
          slideShadows: false
        },
        on: {
          slideChangeTransitionEnd: function() {
            // alert(this.activeIndex);//切换结束时，告诉我现在是第几个slide
          }
        },
        // pagination: {
        //   el: '.swiper-pagination'
        // }
      },
      swiperOption1: {
        on: {
          slideChangeTransitionStart() {
            vm.index0 = this.activeIndex;
          }
        },
        notNextTick: true
      }
    };
  },
  components: {
    swiper,
    swiperSlide,
    wzds,
    footer1,
    heador,
    fadeAnimation
  },
  mounted() {
    this.getcarouls();
    this.swiper.slideTo(0, 0.1, false);
    this.oW = $(".content").width();
    this.getinit();
    this.getnews();
    this.getgg();
    this.getActivity();
    this.getgl();
    this.getdata1();
    this.scroll = new Bscroll(this.$refs.wrapper, {
      click: true,
      scrollY: true
    });
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  methods: {
    enterGame () {
      this.$router.push('/lottery');
    },
    hidetc() {
      this.showtc = false;
      document.documentElement.style.overflow = "scroll";
      document.body.style.overflow = "scroll";
    },
    getdata1 () {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/eggworldorg/findcountwakuang",
        async: true,
        dataType: "json",
        data: {
          page: 1 ,
          row: 5
        },
        success(res) {
          if (res.state.code === "20000") {
            // vm.hotlist = res.data;
            // console.log(vm.hotlist)
            vm.data1 = res.data;
            vm.scroll.refresh();
          }
        }
      });
    },



    getcarouls () {
      let vm = this;
      $.ajax({
        type: "get",
        url: contextPath + "/api/eggworldorg/getbackstager",
        async: true,
        dataType: "json",
        data: {},
        success(res) {
          if (res.state.code === "20000") {
            vm.caroluesl = res.data;
          }
        }
      });
    },

    getinit () {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/eggworldorg/findnhotspotinfolist",
        async: true,
        dataType: "json",
        data: {
          page: 1 ,
          row: 5
        },
        success(res) {
          if (res.state.code === "20000") {
            vm.hotlist = res.data;
            vm.scroll.refresh();
            // console.log(vm.hotlist)
          }
        }
      });
    },
    dealtime (val) {
      let val2 = val.split(" ");
      return val2[0];
    },
    getnews () {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/eggworldorg/findnewsinfolist",
        async: true,
        dataType: "json",
        data: {
          page: 1 ,
          row: 5
        },
        success(res) {
          if (res.state.code === "20000") {
            vm.newslist = res.data;
            vm.scroll.refresh();
            // console.log(vm.newslist)
          }
        }
      });
    },
    getgg () {
      let vm = this;
      $.ajax({
        type: "get",
        url: contextPath + "/api/eggworld/findnoticeBystatus",
        async: true,
        dataType: "json",
        data: {
          page: 1,
          row: 5
        },
        success(res) {
          if (res.state.code === "20000") {
            vm.gglist = res.data;
            vm.scroll.refresh();
            // console.log(vm.gglist)
          }
        }
      });
    },
    getActivity () {
      let vm = this;
      $.ajax({
        type: "get",
        url: contextPath + "/api/eggworldorg/findactivitysinfolist",
        async: true,
        dataType: "json",
        data: {
          page: 1 ,
          row: 5
        },
        success(res) {
          if (res.state.code === "20000") {
            vm.activitylist = res.data;
            vm.scroll.refresh();
            // console.log(vm.activitylist)
          }
        }
      });
    },
    getgl () {
      let vm = this;
      $.ajax({
        type: "get",
        url: contextPath + "/api/eggworldorg/findnStrategysinfolist",
        async: true,
        dataType: "json",
        data: {
          page: 1 ,
          row: 5
        },
        success(res) {
          if (res.state.code === "20000") {
            vm.gllist = res.data;
            vm.scroll.refresh();
            // console.log(vm.activitylist)
          }
        }
      });
    },
    newstype (val,val2) {
      localStorage.setItem("newtype", val);
      //  this.$router.push('/eggNewsDetails/'+ val2)
       this.$router.push({ path:'/eggNewsDetails/'+ val2 , query:{sf: val}})
    },
    showlinkme() {
      // this.showtc = true;
      // document.documentElement.style.overflow = "hidden";
      // document.body.style.overflow = "hidden";
      this.$router.push("/linkUs");
    },
    changeShowMore() {
      this.showmore = !this.showmore;
    },
    changenews(val) {
      this.index0 = val;
      this.swiper.slideTo(val, 500, false);
    },

    // 实现移动端拖拽
    down() {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      this.flags = true;
      var touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      this.position.x = touch.clientX;
      this.position.y = touch.clientY;
      this.dx = moveDiv.offsetLeft;
      this.dy = moveDiv.offsetTop;
      
    },
    move(val2) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      if (this.flags) {
        var touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        this.nx = touch.clientX - this.position.x;
        this.ny = touch.clientY - this.position.y;
        this.xPum = this.dx + this.nx;
        this.yPum = this.dy + this.ny;
        if (this.xPum >= val2 - 1 * fontSizes) {
          this.xPum = val2 - 1 * fontSizes;
        }
        if (this.xPum <= 0) {
          this.xPum = -10;
        }

        moveDiv.style.left = this.xPum + "px";
        moveDiv.style.top = this.yPum + "px";
        //阻止页面的滑动默认事件
        // document.addEventListener("touchmove",function(e){
        //     e.preventDefault();
        // },false);
      }
    },
    //鼠标释放时候的函数
    end() {
      if (this.xPum <= this.oW / 2) {
        this.xPum = -10;
      } else {
        this.xPum = this.oW - 1 * fontSizes;
      }
      moveDiv.style.left = this.xPum + "px";
      moveDiv.style.top = this.yPum + "px";
      this.flags = false;
      document.documentElement.style.overflow = "scroll";
      document.body.style.overflow = "scroll";
    },



    // 第二个悬浮球
       // 实现移动端拖拽
    down1() {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      this.flags1 = true;
      var touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      this.position1.x = touch.clientX;
      this.position1.y = touch.clientY;
      this.dx1 = moveDiv1.offsetLeft;
      this.dy1 = moveDiv1.offsetTop;
      
    },
    move1(val2) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      if (this.flags1) {
        var touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        this.nx1 = touch.clientX - this.position1.x;
        this.ny1 = touch.clientY - this.position1.y;
        this.xPum1 = this.dx1 + this.nx1;
        this.yPum1 = this.dy1 + this.ny1;
        if (this.xPum1 >= val2 - 1 * fontSizes) {
          this.xPum1 = val2 - 1 * fontSizes;
        }
        if (this.xPum1 <= 0) {
          this.xPum1 = -10;
        }

        moveDiv1.style.left = this.xPum1 + "px";
        moveDiv1.style.top = this.yPum1 + "px";
        //阻止页面的滑动默认事件
        // document.addEventListener("touchmove",function(e){
        //     e.preventDefault();
        // },false);
      }
    },
    //鼠标释放时候的函数
    end1() {
      if (this.xPum1 <= this.oW / 2) {
        console.log(this.xPum1);
        console.log(this.oW / 2);
        console.log(111111111111111)
        this.xPum1= -10;
      } else {
        console.log(this.xPum1);
        console.log(this.oW);
        console.log(22222222222222222)
        this.xPum1 = this.oW - 1 * fontSizes;
      }
      console.log(this.xPum1)
      moveDiv1.style.left = this.xPum1 + "px";

      moveDiv1.style.top = this.yPum1 + "px";
      this.flags1 = false;
      document.documentElement.style.overflow = "scroll";
      document.body.style.overflow = "scroll";
    }











  }
};
</script>

<style scoped lang="less">
@import "swiper/dist/css/swiper.css";
.eggworld {
  position: fixed;
  background: #f3f3f3;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  // overflow:scroll; 
  &.cur {
    overflow: hidden !important;
  }
}
.bg {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 333;
}
.tc {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 6.24rem;
  height: 9.24rem;
  transform: translate(-50%, -50%);
  background: url("../../common/img/officalwebimg/pic1/tc.png") no-repeat;
  background-size: 100%;
  z-index: 9999999999999999999999;
  .close1 {
    position: absolute;
    right: 0.1rem;
    top: 0.1rem;
    width: 0.5rem;
    height: 0.5rem;
    // border: 0.01rem solid #000;
  }
}
.dtz {
  width: 1.02rem;
  height: 1.02rem;
  background: url("../../common/img/officalwebimg/pic1/xf.png") no-repeat;
  background-size: 100%;
  position: fixed;
  left: 0;
  top: 50%;
  z-index: 9999999999999;
}
.dtz1 {
  width: 1.4rem;
  height: 1.4rem;
  background: url("../../common/img/lottery/enter2.png") no-repeat;
  background-size: 100%;
  position: fixed;
  left: 0;
  top: 60%;
  z-index: 9999999999999;
}


.content .carouls /deep/ .swiper-inner {
  width: 100%;
  height: 400px;
  padding-top: 50px;
  padding-bottom: 50px;
  display: flex;
  align-items: top;
}
.content .carouls /deep/ .swiper-slide {
  background-position: center;
  background-size: cover;
  width: 300px;
  height: 300px;
  img {
    width: 100%;
    border-radius: 0.2rem;
    // box-shadow: 0 0rem 0.2rem rgba(0, 0, 0, 0.2);
    // height: 100%;
  }
}
.eggworld-header {
  position: sticky;
  left: 0;
  top: 0;
  height: 0.9rem;
  padding: 0.1rem 0.2rem;
  box-sizing: border-box;
  z-index: 2;
  background: #fff;
  // overflow: hidden;
  .logo {
    height: 0.74rem;
    width: 1.15rem;
    background: url("../../common/img/officalwebimg/pic1/logo.png") no-repeat;
    background-size: 100%;
    float: left;
    margin: 0;
  }
  .header-more {
    float: right;
    width: 0.48rem;
    height: 0.4rem;
    background: url("../../common/img/officalwebimg/pic1/more.png") no-repeat;
    background-size: 100%;
    margin-top: 0.27rem;
  }
  .close {
    float: right;
    width: 0.48rem;
    height: 0.48rem;
    margin-top: 0.25rem;
    background: url("../../common/img/officalwebimg/pic1/close.png") no-repeat;
    background-size: 100%;
  }
}
.content {
    position: absolute;
    top: 1.05rem;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
  background: #f3f3f3;
  overflow: hidden;
  padding-bottom: 0.2rem;
  .carouls {
    margin-top: 0.2rem;
    height: 2.8rem;
    // height: 2.5rem;
    overflow: hidden;
  }
  .content-cen {
    padding: 0.2rem;
    padding-bottom: 0;
    // padding-bottom: 0.2rem;
    box-sizing: border-box;
    .wkrs {
      height: 0.98rem;
      background: url("../../common/img/officalwebimg/pic1/wkrs.png") no-repeat;
      background-size: 100%;
      i {
        display: block;
        padding-left: 1.03rem;
        line-height: 0.98rem;
        font-size: 0.3rem;
        font-style: normal;
        color: #fff;
        font-weight: 200;
      }
    }
    .wkrs-b {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.2rem;
      a {
        display: inline-block;
        // float: left;
        width: 1.8rem;
        height: 1.31rem;
        border-radius: 0.2rem;
        // box-shadow: 0 0rem 0.2rem rgba(0, 0, 0, 0.2);
        &:nth-of-type(1) {
          background: url("../../common/img/officalwebimg/pic1/H5enter.png")
            no-repeat;
          background-size: 100%;
        }
        &:nth-of-type(2) {
          background: url("../../common/img/officalwebimg/pic1/APPdown.png")
            no-repeat;
          background-size: 100%;
        }
        &:nth-of-type(3) {
          background: url("../../common/img/officalwebimg/pic1/TTCst.png")
            no-repeat;
          background-size: 100%;
        }
      }
    }
    .news {
      // height: 4.36rem;
      background: #fff;
      border-radius: 0.2rem;
      padding: 0.2rem;
      box-sizing: border-box;
      margin-top: 0.2rem;
      overflow: hidden;
      box-shadow: 0 0rem 0.2rem rgba(0, 0, 0, 0.2);
      .news-top {
        overflow: hidden;
        margin-bottom: 0.2rem;
        h4 {
          font-weight: bold;
          color: #ffba00;
          float: left;
          font-size: 0.3rem;
          &::before {
            content: "";
            display: inline-block;
            width: 0.22rem;
            height: 0.22rem;
            background: url("../../common/img/officalwebimg/pic1/sccircle.png")
              no-repeat;
            background-size: 100%;
            margin-right: 0.18rem;
          }
        }
        .morenew {
          float: right;
          width: 0.36rem;
          height: 0.08rem;
          background: url("../../common/img/officalwebimg/pic1/morenew.png")
            no-repeat;
          background-size: 100%;
          position: relative;
          top: 0.2rem;
        }
      }
      .newslist {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.2rem;
        li {
          font-size: 0.26rem;
          line-height: 0.4rem;
          color: #7a7a7a;
          &.cur {
            color: #ffba00;
            border-bottom: 0.04rem solid #ffba00;
          }
        }
      }
      .news-content {
        .newsitem {
          li {
            // display: flex;
            // justify-content: space-between;
            // align-items: center;
            i {
              font-size: 0.22rem;
              color: #7a7a7a;
              font-style: normal;
              width: 0.7rem;
              line-height: 0.5rem;
              float: left;
            }
            p {
              float: left;
              width: 3rem;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              display: inline-block;
              margin-bottom: 0;
              font-size: 0.22rem;
              padding-left: 0.1rem;
              line-height: 0.5rem;
              color: #474747;
              &::before {
                content: "";
                border-left: 0.02rem solid #7a7a7a;
                width: 0;
                line-height: 0.5rem;
                margin-right: 0.1rem;
              }
            }
            .newitem {
              padding-left: 0;
              &::before {
                content: "";
                border-left: 0rem solid #7a7a7a;
                // width: 0;
                // line-height: 0.5rem;
                margin-right: 0rem;
              }
            }
            span {
              width: 1.7rem;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              float: right;
              font-size: 0.22rem;
              color: #999999;
              line-height: 0.5rem;
              text-align: right;
            }
          }
        }
      }
    }
    .link-us {
      height: 0.86rem;
      margin-top: 0.2rem;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        width: 2.9rem;
        height: 0.86rem;
        &:nth-of-type(1) {
          background: url("../../common/img/officalwebimg/pic1/gzh.png")
            no-repeat;
          background-size: 100%;
        }
        &:nth-of-type(2) {
          background: url("../../common/img/officalwebimg/pic1/sq.png")
            no-repeat;
          background-size: 100%;
        }
      }
    }
  }
}
</style>