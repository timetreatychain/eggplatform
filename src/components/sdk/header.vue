<template>
  <div class="heador">
    <a  v-if="show2 == 1" href="javascript:history.go(-1)" class="back"></a>
    <router-link to="/"  v-if="show2 == 2"  class="back"></router-link>
    <slot/>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show2:1,
      }
    },
    mounted() {
      this.hh();
    },
    methods:{
      hh () {
        let path2 = this.$route.path;
        console.log(path2);
        if(path2.indexOf("bindingBlockIdentity") != -1) {
          this.show2 = 2;
        }
      }
    }
    
  }
</script>

<style scoped lang="less">
.heador {
  // border-bottom: 0.01rem solid #E3E3E3;
  background: #006b8d;
  .back {
    float: left;
    width: 0.16rem;
    height: 0.29rem;
    background: url('../../common/img/blockidenty/back.png') no-repeat;
    background-size: 100%;
    margin-left: 0.2rem;
    margin-top: 0.23rem;
  }
  h3 {
    font-size: 0.35rem;
    font-weight: 300;
    text-align: center;
    height: 0.8rem;
    color: #fff;
    line-height: 0.8rem;
  }
}
</style>