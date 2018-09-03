<template>
        <div class="header">
        <div class="header_inner">
           <a href="javascript:history.go(-1)"><img src="../../common/img/userCenter/arrowsb.png" /></a>
            <span class="title">{{navtitle}}</span>
            <!-- <span v-if="showtibi" class="tibi"><router-link  to="/currency">提币</router-link></span> -->
        </div>
        </div>
</template>

<script>
export default {
  //props: ["showtibi"],
  props: {
    navtitle: {
      type: String,
      default:'BIDT账单'
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="less">
.header {
    position: relative;
    height: 0.8rem;
  .header_inner {
    width: 100%;
    height: 0.8rem;
    //background: #ffd300;
    background: #006b8d;
    position: fixed;
    top: 0;
    left: 0;
    img {
      position: absolute;
      width: 0.16rem;
      height: 0.3rem;
      top: 0.25rem;
      left: 0.2rem;
      margin-top: 0rem;
    }
    .title {
      text-align: center;
      line-height: 0.8rem;
      color: white;
      left: 1rem;
      right: 1rem;
      position: absolute;
    }
    .tibi a {
      line-height: 0.8rem;
      font-size: 0.24rem;
      color: #000;
      right: 0.22rem;
      position: absolute;
    }
  }
}
</style>