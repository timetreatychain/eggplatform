<template>
  <div class="eggNews">
    <heador></heador>
    <div class="content">
      <router-link to="eggNewsDetails/10?sf=3"><img class="banner" src="../../common/img/officalwebimg/pic1/2.png" alt=""></router-link>
      <div class="news">
        <div class="news-top">
          <h4>新闻资讯</h4>
          <!-- <router-link to="/eggNews" tag="span" class="morenew"></router-link> -->
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
                   <li @click="newstype(item.type , item.id)" v-for="item in hotlist" :key ="item.id" v-if="item.type == 1">
                    <i>[新闻]</i>
                    <p>{{item.egghotspottitle}}</p>
                    <span>{{item.createtime}}</span>
                  </li>
                   <li @click="newstype(item.type , item.id)" v-for="item in hotlist" :key ="item.id" v-if="item.type == 2">
                    <i>[公告]</i>
                    <p>{{item.egghotspottitle}}</p>
                    <span>{{item.createtime}}</span>
                  </li>
                  <li @click="newstype(item.type , item.id)" v-for="item in hotlist" :key ="item.id" v-if="item.type == 3">
                    <i>[活动]</i>
                    <p>{{item.egghotspottitle}}</p>
                    <span>{{item.createtime}}</span>
                  </li>
                  <li @click="newstype(item.type , item.id)" v-for="item in hotlist" :key ="item.id" v-if="item.type == 4">
                    <i>[攻略]</i>
                    <p>{{item.egghotspottitle}}</p>
                    <span>{{item.createtime}}</span>
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
                    <span>{{item.createtime}}</span>
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
                    <span>{{item.createtime}}</span>
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
                    <span>{{item.createtime}}</span>
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
                    <span>{{item.createtime}}</span>
                  </li>
                </ul>
              </div>
            </swiper-slide>
          <!-- <swiper-slide>
            <div class="news-content">
              <ul class="newsitem">
                <li>
                  <i>[活动]</i>
                  <p>邀请活动：海量BIDT等你来拿</p>
                  <span>07/11</span>
                </li>
                <li>
                  <i>[公告]</i>
                  <p>邀请活动：海量BIDT等你来拿</p>
                  <span>07/11</span>
                </li>
                <li>
                  <i>[新闻]</i>
                  <p>邀请活动：海量BIDT等你来拿</p>
                  <span>07/11</span>
                </li>
                <li>
                  <i>[攻略]</i>
                  <p>邀请活动：海量BIDT等你来拿</p>
                  <span>07/11</span>
                </li>
                <li>
                  <i>[活动]</i>
                  <p>邀请活动：海量BIDT等你来拿</p>
                  <span>07/11</span>
                </li>
                <li>
                  <i>[活动]</i>
                  <p>邀请活动：海量BIDT等你来拿</p>
                  <span>07/11</span>
                </li>
                <li>
                  <i>[公告]</i>
                  <p>邀请活动：海量BIDT等你来拿</p>
                  <span>07/11</span>
                </li>
                <li>
                  <i>[新闻]</i>
                  <p>邀请活动：海量BIDT等你来拿</p>
                  <span>07/11</span>
                </li>
                <li>
                  <i>[攻略]</i>
                  <p>邀请活动：海量BIDT等你来拿</p>
                  <span>07/11</span>
                </li>
                <li>
                  <i>[活动]</i>
                  <p>邀请活动：海量BIDT等你来拿</p>
                  <span>07/11</span>
                </li>
                <li>
                  <i>[活动]</i>
                  <p>邀请活动：海量BIDT等你来拿</p>
                  <span>07/11</span>
                </li>
                <li>
                  <i>[公告]</i>
                  <p>邀请活动：海量BIDT等你来拿</p>
                  <span>07/11</span>
                </li>
                <li>
                  <i>[新闻]</i>
                  <p>邀请活动：海量BIDT等你来拿</p>
                  <span>07/11</span>
                </li>
              </ul>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="news-content">
              <ul class="newsitem">
                <li>
                  <i>[活动]</i>
                  <p>邀请活动：海量BIDT等你来拿</p>
                  <span>07/11</span>
                </li>
                <li>
                  <i>[公告]</i>
                  <p>邀请活动：海量BIDT等你来拿</p>
                  <span>07/11</span>
                </li>
                <li>
                  <i>[新闻]</i>
                  <p>邀请活动：海量BIDT等你来拿</p>
                  <span>07/11</span>
                </li>
                <li>
                  <i>[攻略]</i>
                  <p>邀请活动：海量BIDT等你来拿</p>
                  <span>07/11</span>
                </li>
                <li>
                  <i>[活动]</i>
                  <p>邀请活动：海量BIDT等你来拿</p>
                  <span>07/11</span>
                </li>
              </ul>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="news-content">
              <ul class="newsitem">
                <li>
                  <i>[活动]</i>
                  <p>邀请活动：海量BIDT等你来拿</p>
                  <span>07/11</span>
                </li>
                <li>
                  <i>[公告]</i>
                  <p>邀请活动：海量BIDT等你来拿</p>
                  <span>07/11</span>
                </li>
                <li>
                  <i>[新闻]</i>
                  <p>邀请活动：海量BIDT等你来拿</p>
                  <span>07/11</span>
                </li>
                <li>
                  <i>[攻略]</i>
                  <p>邀请活动：海量BIDT等你来拿</p>
                  <span>07/11</span>
                </li>
                <li>
                  <i>[活动]</i>
                  <p>邀请活动：海量BIDT等你来拿</p>
                  <span>07/11</span>
                </li>
              </ul>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="news-content">
              <ul class="newsitem">
                <li>
                  <i>[活动]</i>
                  <p>邀请活动：海量BIDT等你来拿</p>
                  <span>07/11</span>
                </li>
                <li>
                  <i>[公告]</i>
                  <p>邀请活动：海量BIDT等你来拿</p>
                  <span>07/11</span>
                </li>
                <li>
                  <i>[新闻]</i>
                  <p>邀请活动：海量BIDT等你来拿</p>
                  <span>07/11</span>
                </li>
                <li>
                  <i>[攻略]</i>
                  <p>邀请活动：海量BIDT等你来拿</p>
                  <span>07/11</span>
                </li>
                <li>
                  <i>[活动]</i>
                  <p>邀请活动：海量BIDT等你来拿</p>
                  <span>07/11</span>
                </li>
              </ul>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="news-content">
              <ul class="newsitem">
                <li>
                  <i>[活动]</i>
                  <p>邀请活动：海量BIDT等你来拿</p>
                  <span>07/11</span>
                </li>
                <li>
                  <i>[公告]</i>
                  <p>邀请活动：海量BIDT等你来拿</p>
                  <span>07/11</span>
                </li>
                <li>
                  <i>[新闻]</i>
                  <p>邀请活动：海量BIDT等你来拿</p>
                  <span>07/11</span>
                </li>
                <li>
                  <i>[攻略]</i>
                  <p>邀请活动：海量BIDT等你来拿</p>
                  <span>07/11</span>
                </li>
                <li>
                  <i>[活动]</i>
                  <p>邀请活动：海量BIDT等你来拿</p>
                  <span>07/11</span>
                </li>
              </ul>
            </div>
          </swiper-slide> -->
        </swiper>
      </div>
      <footer1></footer1>
    </div>
  </div>
</template>

<script>
import heador from "./header";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import footer1 from "./footer";
export default {
  data() {
    let vm = this;
    return {
      hotlist:[],
      newslist:[],
      gglist:[],
      activitylist:[],
      gllist:[],
      index0: 0,
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
    heador,
    swiper,
    swiperSlide,
    footer1
  },
  mounted () {
    this.getinit();
    this.getnews();
    this.getgg();
    this.getActivity();
    this.getgl();
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  methods: {
     getinit () {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/eggworldorg/findnhotspotinfolist",
        async: true,
        dataType: "json",
        data: {
          page: 1 ,
          row: 1000
        },
        success(res) {
          if (res.state.code === "20000") {
            vm.hotlist = res.data;
            // console.log(vm.hotlist)
          }
        }
      });
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
          row: 1000
        },
        success(res) {
          if (res.state.code === "20000") {
            vm.newslist = res.data;
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
          page: 1 ,
          row: 1000
        },
        success(res) {
          if (res.state.code === "20000") {
            vm.gglist = res.data;
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
          row: 1000
        },
        success(res) {
          if (res.state.code === "20000") {
            vm.activitylist = res.data;
            // console.log(vm.activitylist)
          }
        }
      });
    },
    dealtime (val) {
      let val2 = val.split(" ");
      return val2[0];
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
          row: 1000
        },
        success(res) {
          if (res.state.code === "20000") {
            vm.gllist = res.data;
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
    changeShowMore() {
      this.showmore = !this.showmore;
    },
    changenews(val) {
      this.index0 = val;
      this.swiper.slideTo(val, 500, false);
    }
  }
};
</script>

<style scoped lang="less">
.eggNews {
  position: fixed;
  background: #f3f3f3;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow-y:scroll; 
  .content {
    padding: 0.2rem;
    background: #f3f3f3;
    .banner {
      width: 100%;
      margin: 0 auto;
       box-shadow: 0 0rem 0.3rem rgba(0, 0, 0, 0.2);
       border-radius: 0.2rem;
    }
    .news {
       box-shadow: 0 0rem 0.2rem rgba(0, 0, 0, 0.2);
      // height: 8.25rem;
      background: #fff;
      border-radius: 0.2rem;
      padding: 0.2rem;
      box-sizing: border-box;
      margin-top: 0.2rem;
      overflow: hidden;
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
              width: 1.5rem;
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
  }
}
</style>