<template>
  <div class="footer">
    <ul class="footerlist">
      <li><a href="http://egg.liyugame.com">关于蛋生</a></li>
      <li><a href="http://block.liyugame.com/#/">关于TTC</a></li>
      <li><a href="http://www.timetreaty.org/nav">商务合作</a></li>
    </ul>
    <p>时间条约区块链（深圳）有限公司版权所有</p>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped lang="less">
  .footer {
    margin-top: 0.2rem;
    height: 0.86rem;
    background: -webkit-linear-gradient(#9DC445, #D1EC93);
    border-radius: 0.2rem;
    overflow: hidden;
    .footerlist {
      overflow: hidden;
      width: 4rem;
      margin: 0 auto;
      text-align: center;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      font-weight: 300;
      margin-top: 0.2rem;
      li {
        text-align: center;
        float: left;
        line-height: 0.35rem;
        font-size: 0.22rem;
        position: relative;
        color: #fff;
        a {
          color: #fff;
          display: block;
        }
        &::after {
          content: "";
          position: absolute;
          // width: 0;
          border-right: 0.02rem solid #fff;
          height: 0.4rem;
          background: #fff;
          top: 0.02rem;
          margin-left: 0.65rem;
        }
        &:nth-of-type(3):after {
          content: "";
          position: absolute;
          // width: 0;
          border-right:none;
          height: 0.4rem;
          background: #fff;
          top: 0.02rem;
          margin-left: 0rem;
        }
      }
    }
    p {
      color: #fff;
      font-size: 0.2rem;
      margin-bottom: 0;
      text-align: center;
      font-weight: 300;
    }
  }
</style>