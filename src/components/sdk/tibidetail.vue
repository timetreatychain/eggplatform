<template>
    <div class="bg1">
        <heador :navtitle="navtitle1"></heador>
        <div class="showdetails">
            <div class="showdetails_inner">
                <!-- <h4>具体详情</h4> -->
                <div class="tibi_mid">
                    <p><img src="../../common/img/userCenter/details_logo.png" alt=""></p>
                    <!-- <p>{{newscon.ttcnum}}<span>TTC</span></p>
                    <p v-if="newscon.state == 0">审核中</p>
                    <p v-if="newscon.state == 1">提币成功</p>
                    <p v-if="newscon.state == 2">驳回</p> -->
                </div>
                <div class="tibi_bot" >
                    <p >提币金额&nbsp;:<em>{{newscon.ttcNumber}}BIDT</em></p>
                     <p v-if="newscon.status == 2">订单状态&nbsp;:<em class="shz">审核中</em></p>
                     <p v-if="newscon.status == 1">订单状态&nbsp;:<em class="tbcg">提币成功</em></p>
                     <p v-if="newscon.status == 0">订单状态&nbsp;:<em class="bh">驳回</em></p>
                    <p v-if="newscon.reason">驳回理由&nbsp;:<em>{{newscon.reason}}</em></p>
                     <p >订单日期&nbsp;:<em>{{new Date(newscon.createTime).toLocaleString()}}</em></p>
                      <p >提币地址&nbsp;:<em>{{newscon.tokenAddress}}</em></p>
                      <p >订单流水号&nbsp;:<em>{{newscon.transactionId}}</em></p>
                      <p v-if="newscon.state == 1">手续费&nbsp;:<em>{{newscon.procedures}}</em></p>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import heador from "../userCenter/header";
export default {
  data() {
    return {
      navtitle1: "提币详情",
      newscon: ""
    };
  },
  components: {
    heador
  },
  mounted() {
     Date.prototype.toLocaleString = function() {
          return this.getFullYear() + "/" + (this.getMonth() + 1) + "/" + this.getDate() + "/ " + this.getHours() + ":" + this.getMinutes();
    };
    this.gettibidetails();
  },
  methods: {
    gettibidetails: function() {
      let vm = this;
      $.ajax({
        type: "get",
        url: eggContextPath+"/currency/detail",
        async: true,
        data: {
          id: vm.$route.params.id
        },
        dataType: "json",
        success: function(data) {
          //console.log(data);
          if (data.state.code == 20000) {
            console.log(data)
            vm.newscon = data.data;
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.bg1 {
  position: absolute;
  height: 100%;
  background: #eee;
  .showdetails {
    font-size: 0.18rem;
    width: 6.4rem;
    .showdetails_inner {
      background: white;
      padding: 0.1rem;
      position: relative;
      overflow: hidden;
      h4 {
        font-size: 0.25rem;
        font-weight: normal;
      }
      .tibi_mid {
        text-align: center;
        padding-bottom: 0.4rem;
        // p:nth-of-type(1) {
        //   color: red;
        //   font-size: 0.4rem;
        //   span {
        //     font-size: 0.3rem;
        //     color: #898998;
        //     padding-left: 0.1rem;
        //   }
        // }
      }
      .tibi_bot {
        p {
          margin-bottom: 0.1rem;
          line-height: 0.3rem;
          height: 0.3rem;
          em {
            width: 2rem;
            float: right;
            text-align: right;
            padding-left: 0.2rem;
            font-size: 0.22rem;
            text-overflow: ellipsis; //必须
            white-space: nowrap; //必须
            overflow: hidden; //必须
            &.shz{
                color: black;
            }
            &.tbcg{
                color: green;
            }
            &.bh{
                color: red;
            }
          }
        }
      }
    }
  }
}
</style>