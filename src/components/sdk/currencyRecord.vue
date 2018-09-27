<template>
    <div class="body3">
        <heador :navtitle="navtitle1"></heador>  
        <div class="jyjl_list">
           <!-- <mt-loadmore  :bottom-method="loadBottom"  @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" :auto-fill= "false" ref="loadmore"> -->
             <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
           <ul>
               <li @click="gototibidetails(item)" v-for="(item , index) in listshow" :key=index>
                   <div class="list_l">
                       <p>提币数量 &nbsp;{{item.ttcNumber}}</p>
                       <!-- <h3 v-if="item.rstate == 1">充值</h3>
                       <h3 v-if="item.rstate == 2">购买</h3>
                       <h3 v-if="item.rstate == 3">提币</h3>
                       <p>
                       <span v-if="item.rstate == 1">充值</span>
                       <span v-if="item.rstate == 2">购买</span>
                       <span v-if="item.rstate == 3">提币</span>
                           成功</p> -->
                       <p>{{new Date(item.createTime).toLocaleString()}}</p>
                   </div>
                   <div class="list_r">
                       <h4>
                            <span v-if=" item.status == 2" class="sh">审核中...</span>
                       <span v-if="item.status == 1" class="cg">提币成功</span>
                       <span v-if="item.status == 0" class="bh">驳回</span>
                            <!-- <span v-if="item.state == 3">TTC</span> -->
                           </h4>
                   </div>
               </li>
           </ul>
           
           </mt-loadmore>
       </div>
    </div>
</template>

<script>
import heador from "../userCenter/header";
import { Loadmore } from "mint-ui";
export default {
  data() {
    return {
      navtitle1: "提币记录",
      ttcHistory: "",
      listshow: [],
      bottomStatus: "",
      searchCondition: {
        //分页属性
        pageNo: 1,
        pageSize: 11
      },
      pageList: [],
      allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
      scrollMode: "auto" //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
    };
  },
  components: {
    heador,
    "mt-loadmore": Loadmore
  },
  mounted() {
    Date.prototype.toLocaleString = function() {
          return this.getFullYear() + "/" + (this.getMonth() + 1) + "/" + this.getDate() + "/ " + this.getHours() + ":" + this.getMinutes();
    };
    this.gettibi1();
  },
  methods: {
    loadBottom: function() {
      // 上拉加载
      this.searchCondition.pageNo += 1;
      this.gettibi(); // 上拉触发的分页查询
      this.$refs.loadmore.onBottomLoaded(); // 固定方法，查询完要调用一次，用于重新定位
    },
    gototibidetails: function(item) {
      this.$router.push({
        name: "tibidetail",
        params: { id: item.id }
        //query: { rstate: val, id: val2, state: val3 }
      });
    },
    handleBottomChange(status) {
      console.log(status);
      this.bottomStatus = status;
    },
    gettibi: function() {
      let vm = this;
      $.ajax({
        type: "post",
        url: eggContextPath+"/currency/list",
        async: true,
        data: {
          openId: window.sessionStorage.egg_openId,
          page: vm.searchCondition.pageNo,
          rows: vm.searchCondition.pageSize
        },
        dataType: "json",
        success: function(data) {
          //console.log(data);
          if (data.state.code == 20000) {
            console.log(data);
            if (data.data.length <= 0) {   
              mui.alert("已经到底了,没数据啦");
              vm.allLoaded = true;
              return;
            }
            
            vm.listshow.push(...data.data);
            vm.scrollMode = "touch";
            vm.$nextTick(function() {
              vm.scrollMode = "touch";
            });
          }
        }
      });
    },
    gettibi1: function() {
      let vm = this;
      $.ajax({
        type: "post",
        url: eggContextPath+"/currency/list",
        async: true,
        data: {
          openId: window.sessionStorage.egg_openId,
          page: vm.searchCondition.pageNo,
          rows: vm.searchCondition.pageSize
        },
        dataType: "json",
        success: function(data) {
          //console.log(data);
          if (data.state.code == 20000) {
            console.log(data);
            if(data.data.length < 11 && data.data.length > 0) {
              vm.allLoaded = true;
              $(".mint-loadmore-text").css('display',"none")
            }else if (data.data.length <= 0) {   
              mui.alert("已经到底了,没数据啦");
              vm.allLoaded = true;
              $(".mint-loadmore-text").css('display',"none")
              return;
            }
            
            vm.listshow.push(...data.data);
            vm.scrollMode = "touch";
            vm.$nextTick(function() {
              vm.scrollMode = "touch";
            });
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.mint-loadmore-bottom{
	text-align: center;
}
.body3{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  overflow: hidden;
}
.jyjl_list {
  width: 6.4rem;
  height: 100%;
  overflow: scroll;
  // padding-top: 1rem;
  ul li {
    height: 1rem;
    box-shadow: 0rem 0.04rem 0rem rgba(118, 118, 118, 0.36);
    padding: 0.09rem 0.21rem 0.1rem;
    overflow: hidden;
    .list_l {
      float: left;
      h3 {
        height: 0.25rem;
        font-size: 0.26rem;
        line-height: 0.25rem;
        margin-bottom: 0.12rem;
        font-weight: normal;
        color: #333333;
      }
      p {
        font-size: 0.2rem;
        padding-top: 0.2rem;
        height: 0.2rem;
        line-height: 0.2rem;
        margin-bottom: 0.1rem;
        &:nth-child(1) {
          color: #000;
          font-size: 0.25rem;
        }
      }
    }
    .list_r {
      float: right;
      h4 {
        font-size: 0.24rem;
        font-weight: normal;
        padding-top: 0.1rem;
        span {
          display: inline-block;
          width: 1.5rem;
          line-height: 0.3rem;
          text-align: center;
          padding: 0.1rem;
          &.sh {
            color: #8b4500;
          }
          &.cg {
            color: #7cfc00;
          }
          &.bh {
            color: red;
          }
        }
      }
    }
  }
}
</style>