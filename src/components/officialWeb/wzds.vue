<template>
  <div class="wzds">
    <div class="news">
      <div class="news-top">
        <h4>玩转蛋生</h4>
        <!-- <span class="morenew"></span> -->
      </div>
      <ul class="newslist">
        <li @click="changenews(0)"></li>
        <li @click="changenews(1)"></li>
      </ul>
      <swiper :options="swiperOption1" ref="mySwiper" :not-next-tick="swiperOption1.notNextTick">
        <swiper-slide>
          <div class="news-content">
            <ul class="newsitem">
              <li @click="egginfo(0)">
                <img src="../../common/img/officalwebimg/pic1/60.png" alt="">
                <p>小鸡蛋</p>
              </li>
              <li @click="egginfo(1)">
                <img src="../../common/img/officalwebimg/pic1/59.png" alt="">
                <p>小鸭蛋</p>
              </li>
              <li @click="egginfo(2)">
                <img src="../../common/img/officalwebimg/pic1/58.png" alt="">
                <p>小蛇蛋</p>
              </li>
              <li @click="egginfo(3)">
                <img src="../../common/img/officalwebimg/pic1/57.png" alt="">
                <p>乌龟蛋</p>
              </li>
              <li @click="egginfo(4)">
                <img src="../../common/img/officalwebimg/pic1/56.png" alt="">
                <p>猫头鹰蛋</p>
              </li>
              <li @click="egginfo(5)">
                <img src="../../common/img/officalwebimg/pic1/55.png" alt="">
                <p>鹦鹉蛋</p>
              </li>
              <li @click="egginfo(6)">
                <img src="../../common/img/officalwebimg/pic1/64.png" alt="">
                <p>企鹅蛋</p>
              </li>
              <li @click="egginfo(7)">
                <img src="../../common/img/officalwebimg/pic1/63.png" alt="">
                <p>鹈鹕蛋</p>
              </li>
              <li @click="egginfo(8)">
                <img src="../../common/img/officalwebimg/pic1/62.png" alt="">
                <p>小飞龙蛋</p>
              </li>
              <li @click="egginfo(9)">
                <img src="../../common/img/officalwebimg/pic1/61.png" alt="">
                <p>绿孔雀蛋</p>
              </li>
              <!-- <li @click="egginfo(10)">
                <img src="../../common/img/officalwebimg/pic1/60.png" alt="">
                <p>小鸡蛋</p>
              </li> -->
              <li @click="egginfo(10)">
                <img src="../../common/img/officalwebimg/pic1/65.png" alt="">
                <p>小水龙蛋</p>
              </li>
              <li @click="egginfo(11)">
                <img src="../../common/img/officalwebimg/pic1/66.png" alt="">
                <p>恐龙蛋</p>
              </li>
              <li @click="egginfo(12)">
                <img src="../../common/img/officalwebimg/pic1/67.png" alt="">
                <p>狮鹫蛋</p>
              </li>
              <li @click="egginfo(13)">
                <img src="../../common/img/officalwebimg/pic1/69.png" alt="">
                <p>火凤凰蛋</p>
              </li>
               <li @click="egginfo(14)">
                <img src="../../common/img/officalwebimg/pic1/68.png" alt="">
                <p>青龙蛋</p>
              </li>
            </ul>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="news-content">
            <ul class="newsitem">
              <li @click="egginfo(0)">
                <img src="../../common/img/officalwebimg/egg/p1.png" alt="">
                <p>暖宝宝</p>
              </li>
              <li @click="egginfo(1)">
                <img src="../../common/img/officalwebimg/egg/p3.png" alt="">
                <p>小暖炉</p>
              </li>
              <li @click="egginfo(2)">
                <img src="../../common/img/officalwebimg/egg/p2.png" alt="">
                <p>孵化箱</p>
              </li>
            </ul>
          </div>
        </swiper-slide>
      </swiper>
      <fadeAnimation>
        <div class="eggbox" v-show="showeggbox">
          <i class="close" @click="closeeggbox"></i>
          <img v-if="index0 == 0" :src="eggimg[index3]" alt="">
          <img v-if="index0 == 1" :src="djimg[index3]" alt="">
          <div class="cwtip">
            <p v-if="index0 == 0">{{egginfo1[index3] && egginfo1[index3].p1}}</p>
            <p v-if="index0 == 0">{{egginfo1[index3] && egginfo1[index3].p2}}</p>
            <p v-if="index0 == 0">{{egginfo1[index3] && egginfo1[index3].p3}}</p>
            <p v-if="index0 == 1">{{djinfo[index3] && djinfo[index3].p1}}</p>
            <p v-if="index0 == 1">{{djinfo[index3] && djinfo[index3].p2}}</p>
            <p v-if="index0 == 1">{{djinfo[index3] && djinfo[index3].p3}}</p>
          </div>
        </div>
      </fadeAnimation>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import fadeAnimation from "./fadeAnimation";
export default {
  data() {
    let vm = this;
    return {
      index0: 0,
      showeggbox: false,
      eggimg: [
        "http://123.206.24.154/static/53.png",
        "http://123.206.24.154/static/54.png",
        "http://123.206.24.154/static/55.png",
        "http://123.206.24.154/static/56.png",
        "http://123.206.24.154/static/57.png",
        "http://123.206.24.154/static/58.png",
        "http://123.206.24.154/static/59.png",
        "http://123.206.24.154/static/60.png",
        "http://123.206.24.154/static/61.png",
        "http://123.206.24.154/static/62.png",
        "http://123.206.24.154/static/63.png",
        "http://123.206.24.154/static/64.png",
        "http://123.206.24.154/static/65.png",
        "http://123.206.24.154/static/67.png",
        "http://123.206.24.154/static/66.png",
      ],
      djimg: [
        "http://123.206.24.154/static/p11.png",
        "http://123.206.24.154/static/p33.png",
        "http://123.206.24.154/static/p22.png",
        
      ],
      egginfo1: [
        {
          p1: "真的就只是一个鸡蛋啊",
          p2: "孵化时间：30分钟",
          p3: "预计收获：小黄鸡1-1只  经验40"
        },
        {
          p1: "你听说过咸鸭蛋吗？",
          p2: " 孵化时间：2小时",
          p3: "预计收获：小白鸭1-1只 经验40"
        },
        {
          p1: "孵出来不要被吓一跳",
          p2: "孵化时间：1小时",
          p3: "预计收获：小蛇：1-1只 经验70"
        },
        {
          p1: "传说中的……龟蛋？",
          p2: "孵化时间：1小时30分钟",
          p3: "预计收获：乌龟1-1只 经验160"
        },
        {
          p1: "据说是在一个树窝里发现的",
          p2: "孵化时间：3小时",
          p3: "预计收获：猫头鹰1-1只 经验280"
        },
        {
          p1: "多和蛋说话，胎教很重要",
          p2: "孵化时间：2小时 ",
          p3: "预计收获：鹦鹉1-1-只  经验170"
        },
        {
          p1: "一颗来自南极的蛋",
          p2: " 孵化时间：45分钟",
          p3: "预计收获：小企鹅1-1只 经验90"
        },

        {
          p1: "虽然名字难念，但蛋是好蛋",
          p2: " 孵化时间：2小时30分钟",
          p3: "预计收获：鹈鹕1-1只 经验360"
        },
         {
          p1: "有可能还没孵化好就飞走了",
          p2: "孵化时间：2小时45分钟 ",
          p3: "预计收获：小飞龙1-1只 经验110"
        },
       
        {
          p1: "蛋黄是绿色的哦",
          p2: " 孵化时间：5小时 ",
          p3: "预计收获：绿孔雀1-4只 经验100"
        },
         {
          p1: "常埋在沙滩里，小心别踩碎了",
          p2: "孵化时间：4小时 ",
          p3: "预计收获：小水龙1-1只  经验220"
        },
        {
          p1: "比比重量就知道谁是大哥",
          p2: "孵化时间：12小时 ",
          p3: " 预计收获：恐龙1-4只 经验2150"
        },
        {
          p1: "内有凶禽，谨慎孵化",
          p2: "孵化时间：6小时 ",
          p3: "预计收获：狮鹫1-4只 经验530"
        },
        {
          p1: "凤凰涅槃必须先有个蛋",
          p2: " 孵化时间：8小时",
          p3: "预计收获：火凤凰1-4只 经验70"
        },
        {
          p1: "集七个蛋去许个愿？",
          p2: "孵化时间：10小时",
          p3: "预计收获：青龙1-4只 经验790"
        },
       
      ],
      djinfo: [
        {
          p1 : "暖宝宝",
          p2:"暖暖的，很贴心。",
          p3: "可减少1小时孵化时间"
        },
        {
          p1 : "小暖炉",
          p2:"温暖的不仅仅是一颗孵蛋的心。",
          p3: "可减少3小时孵化时间"
        },
        {
          p1 : "孵化箱",
          p2:"带点科技的东西总是要高级一些。",
          p3: "可减少6小时孵化时间"
        },
      ],
      index3: "",
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
  methods: {
    egginfo(val) {
      this.showeggbox = true;
      // console.log(val);
      this.index3 = val;
    },
    closeeggbox() {
      this.showeggbox = false;
    },
    changenews(val) {
      this.index0 = val;
      console.log(val);
      this.swiper.slideTo(val, 500, false);
    }
  },
  components: {
    swiper,
    swiperSlide,
    fadeAnimation
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  }
};
</script>

<style scoped lang="less">
.wzds {
  // width: 6.4rem;
  // overflow: hidden;
}
.news {
  box-shadow: 0 0rem 0.2rem rgba(0, 0, 0, 0.2);
  height: 7.02rem;
  background: #fff;
  border-radius: 0.2rem;
  padding: 0.2rem;
  box-sizing: border-box;
  margin-top: 0.2rem;
  overflow: hidden;
  position: relative;
  .eggbox {
    position: absolute;
    box-shadow: 0 0rem 0.3rem rgba(0, 0, 0, 0.4);
    left: 50%;
    top: 65%;
    width: 5.4rem;
    transform: translate(-50%, -50%);
    height: 1.86rem;
    background: #fff;
    z-index: 9999999;
    border-radius: 0.2rem;
    img {
      margin: 0.2rem;
      width: 1.35rem;
      height: 1.35rem;
      float: left;
    }
    .cwtip {
      position: absolute;
      top: 0rem;
      left: 1.8rem;
      margin-top: 0.4rem;
      float: left;
      p {
        margin-bottom: 0;
        font-size: 0.2rem;
        line-height: 0.3rem;
        color: #474747;
        &:nth-of-type(1) {
          font-size: 0.24rem;
          color: #f1bc4d;
        }
      }
    }
    .close {
      position: absolute;
      right: 0;
      top: 0;
      width: 0.48rem;
      height: 0.48rem;
      background: url("../../common/img/officalwebimg/egg/close.png") no-repeat;
      background-size: 100%;
      z-index: 999;
    }
  }
  .news-top {
    overflow: hidden;
    margin-bottom: 0.2rem;
    h4 {
      font-weight: bold;
      color: #50cdee;
      float: left;
      font-size: 0.3rem;
      &::before {
        content: "";
        display: inline-block;
        width: 0.22rem;
        height: 0.22rem;
        background: url("../../common/img/officalwebimg/pic1/scl.png") no-repeat;
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
      // line-height: 0.4rem;
      width: 2.7rem;
      height: 0.86rem;
      color: #7a7a7a;

      &:nth-of-type(1) {
        background: url("../../common/img/officalwebimg/pic1/cwd.png") no-repeat;
        background-size: 100%;
      }

      &:nth-of-type(2) {
        background: url("../../common/img/officalwebimg/pic1/dj.png") no-repeat;
        background-size: 100%;
      }
    }
  }
  // .cwbb {
  //   width: 7rem;
  // }
  .news-content {
    .newsitem {
      // flex-wrap: wrap;
      // display: flex;
      // justify-content: space-between;
      // align-items: center;
      li {
        float: left;
        width: 20%;
        // margin: 0.1rem;
        // margin-right: 0.12rem;
        margin-bottom: 0.15rem;
        
        img {
          width: 0.85rem;
          height: 0.99rem;
          display: block;
          margin: 0 auto;
        }
        p {
          margin-top: 0.1rem;
          overflow: hidden;
          white-space: wrap;
          text-overflow: ellipsis;
          margin-bottom: 0;
          text-align: center;
          line-height: 0.35rem;
          font-size: 0.18rem;
          color: #474747;
          font-weight: 400;
        }
      }
    }
  }
}
</style>