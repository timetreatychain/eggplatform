<template>
  <div class="activityReward">
    <div class="box">
      <p class="title">TTC用户点击链接</p>
      <p>
        <a href="http://cn.mikecrm.com/99Lt5FZ">http://cn.mikecrm.com/99Lt5FZ</a>进入答题页面，答题完成后留下对应信息，即可有机会获得丰厚奖励。</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.activityReward {
  position: relative;
  width: 6.4rem;
  height: 30rem;
  background: url("../../common/img/activityreward.png") no-repeat;
  background-size: 100% 100%;
  .box {
    position: absolute;
    width: 5rem;
    height: 2rem;
    box-sizing: border-box;
    padding: 0.2rem;
    left: 50%;
    transform: translateX(-50%);
    top: 11.3rem;
    // background: #fff;
    
    color: #fff;
    p {
      font-size: 0.26rem;
      color: rgba(255, 255, 255, 0.9);
      line-height: 0.32rem;
      &.title {
        margin-bottom: 0.12rem;
      }
      a {
        color: aqua;
      }
    }
  }
}
</style>