<template>
  <div class="eggNews">
    <heador></heador>
    <div class="content" ref="wrapper">
      <div>
        <div class="news">
          <div class="page-top">
            <h4 class="title" v-if="newstype ==1">{{newdetails.newstitle}}</h4>
            <h4 class="title" v-if="newstype ==2">{{newdetails.title}}</h4>
            <h4 class="title" v-if="newstype ==3">{{newdetails.eggactivitytitle}}</h4>
            <h4 class="title" v-if="newstype ==4">{{newdetails.eggstrategystitle}}</h4>
            <p class="author">来源：蛋小妹</p>
            <p class="updatetime" v-if="newstype ==1">发布时间：{{newdetails.createtime}}</p>
            <p class="updatetime" v-if="newstype ==2">发布时间：{{newdetails.createtime}}</p>
            <p class="updatetime" v-if="newstype ==3">发布时间：{{newdetails.createtime}}</p>
            <p class="updatetime" v-if="newstype ==4">发布时间：{{newdetails.createtime}}</p>
          </div>
          <div class="page-content">
            <p v-if="newstype ==1" v-html="newdetails.eggnewsinfo"></p>
            <p v-if="newstype ==2" v-html="newdetails.context"></p>
            <p v-if="newstype ==3" v-html="newdetails.eggactivityinfo"></p>
            <p v-if="newstype ==4" v-html="newdetails.eggstrategysinfo"></p>

          </div>
          <!-- <span class="share">分享</span> -->
        </div>
        <div class="votewrap" v-if="voteexit == 1">
            <!-- <cube-radio-group v-model="selected2" :options="options2" position="right" :hollow-style="true" /> -->
            <ul>
              <li v-if="!data4.state || data4.state == 0" @click="selectvote(index , item.id)" v-for="(item,index) in voteitems" :key="item.id">
                <p><i>{{item.subitemoption}}</i><i class="sec" v-if="item.type == 1">{{item.subitemcontent}}</i></p>
                <p v-if="!data4.state || data4.state == 0"><span :class="{'cur' : index2 == index}"></span></p>
              </li>
              <li v-if="data4.state == 1" v-for="(item,index) in voteitems" :key="item.id">
                <p><i>{{item.eggVoteSubitems.subitemoption}}</i><i class="sec" v-if="item.eggVoteSubitems.type == 1">{{item.eggVoteSubitems.subitemcontent}}</i></p>
                <p v-if="data4.state == 0"><span :class="{'cur' : index2 == index}"></span></p>
                <div  class="wrapperProcess">
                  <div class="innner" :style= "bgwidth(data4.sum,item.num)"><i v-if="item.state == 1"></i></div>
                  <span>{{item.num}}票</span>
                </div>
              </li>
            </ul>
            <div v-if="!data4.state || data4.state == 0" class="sub" @click="toupiao">投票</div>
        </div>
        <div class="realatelink" v-if="relatenew">
          <div class="news-top">
            <h4>相关推荐</h4>
            <ul class="newsitem">
              <li @click="newstype1(1 , item.id)" v-for="item in relatenew" :key="item.id" v-if="newstype == 1">
                <i>【新闻】</i>
                <p>{{item.newstitle}}</p>
                <span>{{dealtime(item.createtime)}}</span>
              </li>
              <li @click="newstype1(2 , item.id)" v-for="item in relatenew" :key="item.id" v-if="newstype == 2">
                <i>【公告】</i>
                <p>{{item.title}}</p>
                <span>{{dealtime(item.createtime)}}</span>
              </li>
              <li @click="newstype1(3 , item.id)" v-for="item in relatenew" :key="item.id" v-if="newstype == 3">
                <i>【活动】</i>
                <p>{{item.eggactivitytitle}}</p>
                <span>{{dealtime(item.createtime)}}</span>
              </li>
              <li @click="newstype1(4 , item.id)" v-for="item in relatenew" :key="item.id" v-if="newstype == 4">
                <i>【攻略】</i>
                <p>{{item.eggstrategystitle}}</p>
                <span>{{dealtime(item.createtime)}}</span>
              </li>
            </ul>
          </div>
        </div>
        <footer1></footer1>
      </div>
    </div>
  </div>
</template>

<script>
import heador from "./header";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import footer1 from "./footer";
import Bscroll from "better-scroll";
export default {
  data() {
    let vm = this;
    return {
      voteselect:"",
      voteexit:"",
      voteitems:"",
      data4:"",
      selected2: 3,
      options2: [
        {
          label: '宠物探险',
          value: 1
        },
        {
          label: '宠物竞技场',
          value: 2
        },
        {
          label: 'Option3',
          value: 3,
          // disabled: true
        }
      ],
      selitem: "",
      timer:"",
      index2:-1,
      relatenew: "",
      newstype: "",
      newdetails: "",
      actiontype: "",
      index0: 0,
      pathurl: "",
      index1: "",
      path1:"",
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
  mounted() {
    this.shownews();
    this.path1 = this.$route.query.sf;
    this.scroll = new Bscroll(this.$refs.wrapper, {
      click: true,
      scrollY: true
    });

    // console.log(this.$route.params.id)
    //     (function smoothscroll(){
    //     // var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    //     let currentScroll = document.querySelector(".content").scrollTop;
    //     console.log(currentScroll)
    //     if (currentScroll > 0) {
    //          window.requestAnimationFrame(smoothscroll);
    //          window.scrollTo (0,currentScroll - (currentScroll/5));
    //     }
    // })();
  },
  components: {
    heador,
    swiper,
    swiperSlide,
    footer1
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  watch: {
    index1(val) {
      console.log(val);
      // $(".content").animate({ scrollTop: "0rem" }, 800);
      this.scroll.scrollTo(0, 0, 200, "bounce");
    },
    path1 (val) {
      // console.log(val);
      localStorage.newtype = val;
    }
  },
  methods: {
    bgwidth(val, val1) {
      let bfb = val1 / val * 100 + "%";
      return "width" + ":" + bfb;
    },
    toupiao () {
      let vm = this;
      if(sessionStorage.egg_isLogin == 1) {
        if(this.selitem == "") {
          mui.alert("您还没有选择选项投票！");
          return;
        }
      $.ajax({
        type: vm.actiontype,
        url: contextPath + "/api/eggworldorg/createvote",
        async: true,
        dataType: "json",
        data: {
          sid: vm.selitem,
          token:sessionStorage.egg_token
        },
        success(res) {
          if (res.state.code === "20000") {
            mui.toast("投票成功！");
            vm.getinit();
          }
        }
      })
      }else {
        sessionStorage.egg_isLogin = 1
					this.$router.push({
						path: "/userNormal",
						query: {
							bakUrl: location.href
						}
					});
      }
    },
    selectvote (val , val2) {
      this.index2 = val;
      this.selitem = val2;
    },
    newstype1(val, val2) {
      this.index1 = val2;
      localStorage.setItem("newtype", val);
      // $('.content').animate({scrollTop: '0rem'}, 800);
      this.$router.push("/eggNewsDetails/" + val2);
      this.shownews();

      //        (function smoothscroll(){
      //     // var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      //     let currentScroll = document.querySelector(".content").scrollTop;
      //     console.log(currentScroll)
      //     if (currentScroll > 0) {
      //          window.requestAnimationFrame(smoothscroll);
      //          window.scrollTo (0,currentScroll - (currentScroll/5));
      //     }

      // })();
    },
    getinit() {
      clearTimeout(this.timer);
      let vm = this;
      $.ajax({
        type: vm.actiontype,
        url: contextPath + vm.pathurl,
        async: true,
        dataType: "json",
        data: {
          id: vm.$route.params.id,
          token: sessionStorage.egg_token  || "undefind"
        },
        success(res) {
          if (res.state.code === "20000") {
            vm.data4 = res.data;
            vm.newdetails = res.data.news[0];
            vm.relatenew = res.data.newsrelevant;
            vm.voteitems = res.data.votesubitem;
            vm.voteexit = res.data.votestate;
            // console.log(vm.voteexit)
            // vm.scroll.refresh();
            vm.timer = setTimeout(() => {
              vm.scroll.refresh();
            } , 1500)
            // console.log(vm.relatenew)
            // if (vm.newstype == 3) {
            //   window.location.href = vm.newdetails.eggactivityurl;
            // }
          }
        }
      });
    },
    shownews() {
      if (this.$route.query.sf == 1 || localStorage.newtype == 1) {
        
        // if (this.$route.query.sf == 1) {
        //   console.log(this.$route.query.sf)
        //   localStorage.newtype = 1;
        // }
        // localStorage.newtype = 1;
        this.newstype = 1;
        this.actiontype = "post";
        this.pathurl = "/api/eggworldorg/findnewsinfobyid";
        this.getinit();
      } else if (this.$route.query.sf == 2 || localStorage.newtype == 2) {
        // console.log(this.$route.query.sf == 2)
        // if (this.$route.query.sf ==2) {
        //   console.log(this.$route.query.sf)
        //   localStorage.newtype = 2;
        // }
        // localStorage.newtype = 2;
        this.newstype = 2;
        this.actiontype = "get";
        this.pathurl = "/api/eggworld/findnoticeById";
        this.getinit();
      } else if (this.$route.query.sf == 3 || localStorage.newtype == 3) {
        
        // if (this.$route.query.sf == 3) {
        //   console.log(this.$route.query.sf ==3)
        //   localStorage.newtype = 3;
        // }
        // localStorage.newtype = 3;
        this.newstype = 3;
        this.actiontype = "post";
        this.pathurl = "/api/eggworldorg/findactivitysinfobyid";
        this.getinit();
      } else if (this.$route.query.sf == 4 || localStorage.newtype == 4) {
        if (this.$route.query.sf) {
          // localStorage.newtype = 4;
        }
        this.actiontype = "post";
        this.newstype = 4;
        this.pathurl = "/api/eggworldorg/findnStrategysinfobyid";
        this.getinit();
      }
    },
    changeShowMore() {
      this.showmore = !this.showmore;
    },
    dealtime (val) {
      let val2 = val.split(" ");
      return val2[0];
    },
    changenews(val) {
      this.index0 = val;
      this.swiper.slideTo(val, 500, false);
    }
  }
};
</script>
<style  lang="less">
.page-content {
  p {
    img {
      width: 100%;
    }
  }
}
</style>

<style scoped lang="less">
.eggNews {
  position: fixed;
  background: #f3f3f3;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  // overflow-y:scroll;
  .content {
    // position: relative;
    position: absolute;
    top: 1.1rem;
    border-radius: 0.2rem;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    // margin-top: 0.2rem;
    padding: 0.2rem;
    padding-top: 0;
    background: #f3f3f3;
    overflow: hidden;
    .banner {
      width: 100%;
      margin: 0 auto;
    }
    .news {
      // height: 8.25rem;
      background: #fff;
      border-radius: 0.2rem;
      padding: 0.2rem;
      box-sizing: border-box;
      margin-top: 0.2rem;
      padding-bottom: 0.4rem;
      overflow: hidden;
      position: relative;
      .share {
        float: right;
        margin-top: 0.5rem;
        font-size: 0.24rem;
        color: #474747;
        &::before {
          content: "";
          display: inline-block;
          width: 0.28rem;
          height: 0.28rem;
          background: url("../../common/img/officalwebimg/pic1/share.png")
            no-repeat left center;
          background-size: 100%;
          position: relative;
          top: 0.05rem;
          margin-right: 0.05rem;
        }
      }
      .page-top {
        padding-bottom: 0.2rem;
        // border-bottom: 0.01rem solid #474747;
        position: relative;
        &::after {
          content: "";
          height: 0.02rem;
          width: 3.74rem;
          position: absolute;
          left: 50%;
          bottom: 0;
          background: #e5e5e5;
          transform: translateX(-50%);
        }
        .title {
          font-size: 0.24rem;
          color: #ffba00;
          text-align: center;
          font-weight: normal;
          margin-bottom: 0.2rem;
        }
        .author {
          font-size: 0.18rem;
          text-align: center;
          margin-bottom: 0;
          color: #474747;
        }
        .updatetime {
          font-size: 0.2rem;
          text-align: center;
          color: #474747;
        }
      }
      .page-content {
        margin-top: 0.4rem;
        p {
          color: #474747;
          font-size: 0.24rem;
          margin-bottom: 0;
          img {
            width: 100%;
          }
        }
      }
    }

    .votewrap {
      margin-top: 0.2rem;
      border-radius: 0.2rem;
      padding: 0.15rem;
      border-radius: 0.2rem;
      background :#fff;
      font-size : 0.2rem;
      & /deep/ .cube-radio-group {
        &::before {
          border: none;
        }
        &::after {
          border: none;
        }
       } 
       .sub {
        width: 0.8rem;
        line-height: 0.5rem;
        font-size : 0.24rem;
        border: 0.01rem solid #898989;
        border-radius : 0.2rem;
        text-align: center;
        margin: 0 auto;
       } 
       ul {
         li {
           position: relative;
           display: flex;
           flex-wrap: wrap;
           line-height: 0.8rem;
           justify-content: space-between;
           font-family: "微软雅黑";
           color: #333;
           p {
             &:nth-of-type(1) {
               i {
                 text-indent: 2em;
                padding-left: 0.2rem;
                 font-family: "微软雅黑";
           color: #333;
                 display: block;
                 line-height: 0.4rem;
                 font-weight: 400;
                 font-style: normal;
                 margin-top: 0.12rem;
                 &.sec {
                   text-indent: 2em;
                  padding-left: 0.2rem;
                   font-family: "微软雅黑";
                  //  width: 4rem;
           color: #999;
                  //  padding-left: 0.2rem;
                 }
               }
             }
              &:nth-of-type(2) {
                position: absolute;
                right: 0;
                float: right;
               span {
                 display: inline-block;
                 margin-right: 0.2rem;
                 width: 0.2rem;
                 height: 0.2rem;
                 border-radius: 50%;
                 border: 0.02rem solid #898989;
                 &.cur {
                   border-radius: 50%;
                   background:red;
                 }
               }
             }
           }
           .wrapperProcess {
            //  text-indent: 2em;
            // margin-left: 0.6rem;
            //  margin-left: 0.2rem;
             position: relative;
             width: 5.6rem;
             height: 0.3rem;
             background: #898989;
             margin-top: 0.2rem;
             margin-right: 0.2rem;
             border-radius: 0.2rem;
             span {
                  position: absolute;
                 right: 0.1rem;
                 top: 0.1rem;
                  width: 0.5rem;
                 height: 0.2rem;
                 font-size: 0.18rem;
                 line-height: 0.15rem;
                 color: #fff;
                //  text-align: center;
               }
             .innner {
               border-radius: 0.2rem;
               width: 0;
               height: 0.3rem;
               background:#FFA500 ;
               position: relative;
               i {
                 position: absolute;
                 left: 0.1rem;
                 top: 0.1rem;
                 display: inline-block;
                 width: 0.2rem;
                 height: 0.2rem;

                 background: url('../../common/img/gouzi.png') no-repeat;
                 background-size: 100%;
               }
               
             }
           }
         }
       }


    }
    
    .realatelink {
      height: 1.94rem;
      background: #fff;
      border-radius: 0.2rem;
      padding: 0.2rem;
      box-sizing: border-box;
      margin-top: 0.2rem;
      .news-top {
        overflow: hidden;
        margin-bottom: 0.2rem;
        h4 {
          font-weight: bold;
          color: #9dbf4a;
          float: left;
          font-size: 0.3rem;
          margin-bottom: 0.2rem;
          &::before {
            content: "";
            display: inline-block;
            width: 0.22rem;
            height: 0.22rem;
            background: url("../../common/img/officalwebimg/pic1/relatelink.png")
              no-repeat;
            background-size: 100%;
            margin-right: 0.18rem;
          }
        }
      }
      .newsitem {
        clear: both;
        li {
          // display: flex;
          // justify-content: space-between;
          // align-items: center;
          i {
            font-size: 0.18rem;
            color: #474747;
            font-style: normal;
            // width: 0.7rem;
            line-height: 0.4rem;
            float: left;
          }
          p {
            float: left;
            display: inline-block;
            margin-bottom: 0;
            font-size: 0.18rem;
            padding-left: 0.1rem;
            line-height: 0.4rem;
            color: #474747;
            width: 3rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            // &::before {
            //   content: "";
            //   border-left: 0.02rem solid #7a7a7a;
            //   width: 0;
            //   line-height: 0.5rem;
            //   margin-right: 0.1rem;
            // }
          }
          span {
            float: right;
            font-size: 0.18rem;
            color: #999999;
            line-height: 0.4rem;
          }
        }
      }
    }
  }
}
</style>