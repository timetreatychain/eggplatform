<template>
  <div class="lottery">
    <div class="wrapper">
      <div class="zp" id="turntable"></div>
      <img class="lottery_center" src="../../common/img/lottery/center.png" alt="">
    </div>
  </div>
</template>

<script>
// import '../../common/js/turntable.js'
export default {
  data() {
    return {

    };
  },
  mounted (){
    this.init();
  },
  methods :{
    init() {
      var turntable = new Turntable({
        type: 'transition',
        size: 320,
        textSpace: 15,
        imgSpace: 54,
        values: [
          {
            id: 0,
            name: '靓号666666',
            img: {
              width: 50,
              height: 50,
              src: 'http://image.liyugame.com/ew/reward/lh.png'
            },
            color: '#000',
            bg: '#e5e5e4'
          },
          {
            id: 1,
            name: 'iPhoneXS',
            img: {
              width: 45,
              height: 57,
              src: 'http://image.liyugame.com/ew/reward/sj.png'
            },
            color: '#000',
            bg: '#ff9700'
          },
          {
            id: 2,
            name: '真宠（金毛）',
            img: {
              width: 45,
              height: 57,
              src: 'http://image.liyugame.com/ew/reward/jm.png'
            },
            color: '#000',
            bg: '#6e78ef'
          },
          {
            id: 3,
            name: '手表',
            img: {
              width: 50,
              height: 35,
              src: 'http://image.liyugame.com/ew/reward/sb.png'
            },
            color: '#000',
            bg: '#e5e5e4'
          },
          {
            id: 0,
            name: '恐龙蛋',
            img: {
              width: 50,
              height: 50,
              src: 'http://image.liyugame.com/ew/reward/kld.png'
            },
            color: '#000',
            bg: '#0624c6'
          },
          {
            id: 4,
            name: '33BIDT',
            img: {
              width: 50,
              height: 35,
              src: 'http://image.liyugame.com/ew/reward/33BIDT.png'
            },
            color: '#000',
            bg: '#6e78ef'
          },
          {
            id: 5,
            name: '333BIDT',
            img: {
              width: 30,
              height: 60,
              src: 'http://image.liyugame.com/ew/reward/333.png'
            },
            color: '#000',
            bg: '#e5e5e4'
          },
          {
            id: 6,
            name: '孵化箱',
            img: {
              width: 30,
              height: 57,
              src: 'http://image.liyugame.com/ew/reward/fhx.png'
            },
            color: '#000',
            bg: '#0624c6'
          },
          {
            id: 7,
            name: '背包',
            img: {
              width: 30,
              height: 57,
              src: 'http://image.liyugame.com/ew/reward/bb.png'
            },
            color: '#000',
            bg: '#6e78ef'
          },
        ]
      });
      turntable.draw(document.getElementById('turntable'));

      var random = function(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
      }
      var isStop = false;
      document.querySelector('.lottery_center').addEventListener('click', function() {
        turntable.goto(random(0, 6), function(val) {
          console.log(val);
          alert('恭喜你中了' + val.name);
        });
      }, false);
    }
  }
};
</script>

<style scoped lang="less">
.lottery {
  position: relative;
  width: 6.4rem;
  background: url("../../common/img/lottery/bg.png") no-repeat;
  background-size: 100% 100%;
  height: 18.18rem;
  .wrapper {
    position: absolute;
    width: 5.63rem;
    height: 5.63rem;
    font-size: 0.2rem;
    // background: url('../../common/img/lottery/zp.png') no-repeat;
    // background-size: 100% 100%;
    top: 5.5rem;
    left: 50%;
    transform: translateX(-50%);
    .zp {
      position: absolute;
      left: 0;
      top: 0;
      width: 5rem;
      height: 5rem;
      background: url("../../common/img/lottery/zp.png") no-repeat 0.15rem;
      background-size: 100% 100%;
      .turntable-effect{
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
        transform: translate(-50% , -50%);
        z-index: 2;
      }
  }
}
</style>