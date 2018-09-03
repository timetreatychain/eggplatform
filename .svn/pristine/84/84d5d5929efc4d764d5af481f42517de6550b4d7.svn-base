<template>
  <div class="coinActivity">
    <div class="content">
      <div class="title">
        为庆祝TTC全球首款模拟经营区块链游戏《蛋生的世界》公测火爆开启，TTC基金会联合专业数字资产交易平台FUBT举行豪礼空投活动。
      </div>
      <div class="activity1">
        <span class="title1"></span>
        <p class="page">活动期间内，蛋生的世界玩家通过活动链接或者邀请码（169699）成功在富比特平台注册成功（两个平台注册手机号码相同），即可获得200BIDT的注册奖励；活动期间内有任意交易买卖行为，都可以额外再获取500BIDT奖励，限量200000枚BIDT，先到先得（本奖励添加蛋小妹或者蛋小弟领取）。
        </p>
        <p class="link-title">富比特专属注册链接：</p>
        <a href="https://old.fubt.top/user/register.html?uid=169699" class="linkweb">{{message}}</a>
        <p class="copy" v-clipboard:copy="message" v-clipboard:success="onCopy" v-clipboard:error="onError">点击复制</p>
        <p class="txzcm">注册时填写邀请码:</p>
        <p class="num">169699</p>

      </div>

      <div class="activity1">
        <span class="title1 title2"></span>
        <p class="page">富比特将在7月19日18:00对持有BIDT的所有用户进行空投快照，并在7月20日18:00进行空投发放到富比特账户（请提前把BIDT提取到富比特），BIDT空投比例为100:3 。冻结的BIDT富比特将视为无效，不会发放空投奖励。（本奖励由富比特发放）
        </p>

      </div>

      <div class="link_us">
        <div class="link_us-bg">
          <p><img src="../../common/img/coinActivity/dxm.png" alt="">
          </p>
          <p><img src="../../common/img/coinActivity/dxd.png" alt="">
          </p>
        </div>
      </div>
      <div class="footer">
        <p class="p1">注意事项：</p>
        <p>1.活动时间：2018年7月17日15:00—2018年7月19日24:00（GMT+8）;</p>
        <p>2.（活动一）必须通过邀请链接或者填写邀请码在富比特注册；</p>
        <p>3.（活动一）富比特注册手机必须与蛋生的世界同一个手机号；</p>
        <p>4.活动奖品5个工作日内发出;</p>
        <p>5.为保证活动公平公正，严禁作弊刷单行为，一经发现将取消获奖资格；</p>
        <p>6.活动最终解释权归TTC基金会所有。</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
        message :"https://old.fubt.top/user/register.html?uid=169699"
      }
    },
  methods:  {
    onCopy:function(e) {
		      	mui.alert("已复制到剪切板！");
		    },
		    onError:function(e){
		       	mui.alert("复制失败！");
		    },
  }
};
</script>

<style scoped lang="less">
.coinActivity {
  width: 6.4rem;
  height: 15.6rem;
  background: #0a062b url("../../common/img/coinActivity/bg.png") no-repeat;
  background-size: 100%;
  box-sizing: border-box;
  .content {
    position: relative;
    overflow: hidden;
    top: 7rem;
    .title {
      font-size: 0.18rem;
      color: #fff;
      padding: 0.1rem 0.2rem;
      font-weight: 300;
      line-height: 0.35rem;
      // margin-top: 0.2rem;
    }
    .activity1 {
      position: relative;
      padding-top: 0.5rem;
      padding: 0.3rem 0.2rem;
      border-bottom: 0.01rem dotted #fff;
      background: #0a062b;
      .title1 {
        width: 2.44rem;
        height: 0.84rem;
        font-size: 0.24rem;
        display: block;
        margin: 0 auto 0.4rem;
        background: url("../../common/img/coinActivity/a1.png") no-repeat;
        background-size: 100%;
      }
      .title2 {
        background: url("../../common/img/coinActivity/a2.png") no-repeat;
        background-size: 100%;
      }
      .page {
        font-size: 0.24rem;
        color: #fff;
        font-weight: 300;
        line-height: 0.35rem;
      }
      .link-title {
        font-size: 0.26rem;
        margin: 0;
        color: #fff;
        font-weight: 300;
      }
      .linkweb {
        color: #3863f1;
        margin: 0;
        font-size: 0.24rem;
      }
      .copy {
        background: #661dd3;
        color: #fff;
        margin: 0.2rem auto;
        text-align: center;
        line-height: 0.48rem;
        height: 0.48rem;
        width: 2.13rem;
        font-weight: 300;
        border-radius: 0.3rem;
        font-size: 0.18rem;
        // margin-top: 0.2rem;
      }
      .txzcm {
        color: #fff;
        font-weight: 300;
        margin-bottom: 0;
      }
      .num {
        color: #3863f1;
        margin-bottom: 0;
      }
    }
    .link_us {
      height: 3.35rem;
      background: #0a062b url("../../common/img/coinActivity/border.png")
        no-repeat;
      background-size: 100%;
      margin: 0 auto;
      overflow: hidden;
      border-bottom: 0.01rem dotted #fff;
      .link_us-bg {
        // border: 0.01rem solid red;
        width: 3.5rem;
        height: 1.8rem;
        position: relative;
        top: 0.44rem;
        left: 1.4rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        box-sizing: border-box;
        padding-top: 0.3rem;
        p {
          width: 1.25rem;
          img {
            width: 100%;
          }
          em {
            display: block;
            font-style: normal;
            font-size: 0.18rem;
            color: #fff;
            text-align: center;
          }
        }
      }
    }
    .footer {
      background: #0a062b;
      font-weight: 300;
      padding: 0.2rem;
      p {
        margin-bottom: 0;
        color: #fff;
        font-size: 0.18rem;
        line-height: 0.35rem;
      }
      .p1 {
        font-size: 0.3rem;
      color: #fff;
      margin-bottom: 0.1rem;
      } 
    }
  }
}
</style>