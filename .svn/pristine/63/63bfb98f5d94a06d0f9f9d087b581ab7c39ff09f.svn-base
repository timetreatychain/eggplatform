<template>
  <div class="egg_activity">
    <img class="header_img" src="../../common/img/activity/activity2/activity2_top.png" alt="">
    <div class="header_pto">
      <div class="invite_way">
        <div class="invite_way_inner">
          <p class="poster" @click="showposter($event)"></p>
          <div class="link_share">
            <span v-clipboard:copy="message" v-clipboard:success="onCopy" v-clipboard:error="onError" ></span>
          </div>
        </div>
        <div style="margin-top: 6.5rem;display: flex;justify-content: space-around;">
        	<img src="../../common/img/activity/activity2/QQfuli.png" style="width: 1.72rem;height: 1.99rem;"/>
        	<img src="../../common/img/activity/activity2/dxmwx.png" style="width: 1.72rem;height: 1.99rem;"/>
        	<img src="../../common/img/activity/activity2/wxgzh.png" style="width: 1.72rem;height: 1.99rem;"/>
        </div>
      </div>
    </div>
    <transition name="custom-classes-transition" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
      <tc v-if="show" class="tc" v-on:hide="hide1" :link1="a" @hidett="haha"></tc>
    </transition>
    <transition name=" custom-classes-transition" enter-active-class="animated zoomIn " leave-active-class="animated zoomOut ">
      <tc2 v-if="show1 " class="tc1" :index0="cur" :url="url6" v-on:hide3="hide4"></tc2>
    </transition>
  </div>
</template>

<script>
import tc from "./tc";
import tc2 from "./tc2";
export default {
  data() {
    return {
      message: "确认过眼神，你是我要邀请的人。快跟我一起来蛋生的世界开启创世之旅吧，轻松游戏，快乐赚钱",
      invitefriends: "",
      jf: "",
      show1: false,
      a: "您需要登陆后获取您的专属邀请链接",
      show: false,
      invitelist: [],
      showlink: false,
      cur: 0,
      url6: ""
    };
  },
  mounted() {
    this.getinfo();
    this.getinvitelist();
    this.getlink0();
  },
  components: {
    tc,
    tc2
  },
  watch: {
    // show(val) {
    //   this.show1 = !val;
    //   if (this.show1) {
    //     // mui.toast("截屏此图，分享给你的朋友,一起来玩游戏吧！")
    //     document.documentElement.style.overflow = "hidden";
    //   } else {
    //     document.documentElement.style.overflow = "scroll";
    //   }
    // }
  },
  methods: {
    enterGame() {
      this.$router.push('/');
    },
    haha(val3) {
      this.show1 = val3;
      this.show  = val3;
    },
    hide4() {
      this.show1 = false;
      document.documentElement.style.overflow = "scroll";
    },
    hide1(val) {
      console.log(val);
      this.show = val.show4;
      this.show1 = true;
      this.cur = val.index;
      this.url6 = val.url;
    },

    getlink0() {
      let vm = this;
      //if (sessionStorage.egg_isLogin == 1) {
      $.ajax({
        type: "get",
        url: contextPath + "/api/eggworldactivity/findInvitation?",
        async: true,
        data: {
          token: sessionStorage.egg_token || "1"
        },
        dataType: "json",
        success: function(data) {
          if (data.state.code == 20000) {
            // vm.twottcid = 1;
            // mui.alert(data.state.msg);
            vm.invitefriends = data.data.peoplenum;
            vm.jf = data.data.TTCnum;
            vm.a = data.data.url;
            vm.message = data.data.url;
          }
        }
      });
    },

    showposter(e) {
      if (sessionStorage.egg_isLogin == 1) {
        this.show = true;
        document.documentElement.style.overflow = "hidden";
      } else {
        this.$router.push({
          path: "/userNormal",
          query: {
            bakUrl: location.href
          }
        });
      }
    },
    onCopy: function(e) {
      // if (this.showlink) {
      // console.log("你刚刚复制: " + e.text);
      mui.alert("复制成功");
      // }
    },
    onError: function(e) {
      if (this.showlink) {
        console.log("无法复制文本！");
        mui.alert("复制失败");
      }
    },
    // 二维码
    utf16to8(str) {
      //解决中文乱码
      var out, i, len, c;
      out = "";
      len = str.length;
      for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if (c >= 0x0001 && c <= 0x007f) {
          out += str.charAt(i);
        } else if (c > 0x07ff) {
          out += String.fromCharCode(0xe0 | ((c >> 12) & 0x0f));
          out += String.fromCharCode(0x80 | ((c >> 6) & 0x3f));
          out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
        } else {
          out += String.fromCharCode(0xc0 | ((c >> 6) & 0x1f));
          out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
        }
      }
      return out;
    }
  }
};
</script>

<style scoped lang="less">

.egg_activity {
	background-color: #f7d675;
  width: 6.4rem;
  // overflow: hidden;
  position: relative;
  .tc {
    position: fixed;
    -webkit-overflow-scrolling: touch;
    top: 0;
    bottom: 0;
    left: 0;
    // z-index: 22;
    // transform: translate(-50%,-50%);
    width: 100%;
    // height: 6.84rem;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    overflow: auto;
    // border-radius: 0.2rem;
  }
  .header_img {
    width: 100%;
    display: block;
    overflow: hidden;
  }
  .enter_game{
    position: absolute;
    left: 50%;
    top: 30.5%;
    cursor: pointer;
    transform: translate(-50%, -50%);
    width: 2rem;
    height: 1rem;
    background: url('../../common/img/activity/activity2/entergame.png') no-repeat;
    background-size: 100%;
  }
  .header_pto {
    width: 6.4rem;
    box-sizing: border-box;
    background: linear-gradient(top, #fdab04 0%, #ffbb02 100%);
    background: -webkit-linear-gradient(top, #fdab04 0%, #ffbb02 100%);
    .header_pto_t {
      width: 5.92rem;
      height: 2.21rem;
      box-sizing: border-box;
      padding: 0.24rem;
      background: url("../../common/img/activity/activity2/pto1.png") no-repeat;
      background-size: 5.92rem 2.21rem;
      margin-bottom: 0.4rem;
      p {
        height: 0.52rem;
        font-size: 0.18rem;
        font-family: PingFang-SC-Medium;
        color: rgba(105, 27, 27, 1);
        line-height: 0.26rem;
        font-style: normal;
        margin-bottom: 0;
      }
      ul {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
        margin-top: 0.2rem;
        margin-bottom: 0.44rem;
        li {
          width: 1.7rem;
          height: 0.9rem;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 0.12rem;
          box-sizing: border-box;
          border: 0.01rem solid #691b1b;
          padding: 0.15rem 0.1rem;
          p {
            &:nth-of-type(1) {
              text-align: center;
              margin-top: 0.15rem;
              height: 0.24rem;
              font-size: 0.2rem;
              font-family: MicrosoftYaHei;
              color: rgba(105, 27, 27, 1);
              line-height: 0px;
            }
            &:nth-of-type(2) {
              text-align: center;
              margin-top: 0.1rem;
              height: 0.2rem;
              font-size: 0.18rem;
              font-family: MicrosoftYaHei;
              color: #f7da3a;
              line-height: 0px;
              i {
                font-style: normal;
                color: #691b1b;
                font-size: 0.3rem;
              }
            }
          }
          &:nth-of-type(3) {
            border: none;
            background: url("../../common/img/activity/activity2/get.png")
              no-repeat left center;
            background-size: 1.7rem 0.81rem;
          }
        }
      }
    }
    .invite_way {
      width: 6.4rem;
      height: 14.86rem;
      /*background: url("../../common/img/activity/activity2/activity_bottom.png") no-repeat;*/
      background: url("../../common/img/activity/activity2/activity_bottom1.png") no-repeat;
      background-size: 6.4rem 14.86rem;
      .invite_way_inner {
        box-sizing: border-box;
        padding: 0.18rem;
        .title {
          height: 0.2rem;
          font-size: 0.2rem;
          font-family: PingFang-SC-Regular;
          color: rgba(105, 27, 27, 1);
          line-height: 0.19rem;
          margin-top: 0.8rem;
        }
        .poster {
          height: 0.73rem;
          background: url("../../common/img/activity/activity2/poster.png")
            no-repeat;
          background-size: 5.54rem 0.73rem;
          margin-bottom: 0.3rem;
              /*margin-top: 2.22rem;*/
             margin-top: 1.85rem;
    margin-left: 0.3rem;
        }
        .title1 {
          height: 0.2rem;
          font-size: 0.2rem;
          font-family: PingFang-SC-Regular;
          color: rgba(105, 27, 27, 1);
          line-height: 0.19rem;
        }
        .link_share {
          height: 0.68rem;
          margin-bottom: 0.4rem;
          input::-webkit-input-placeholder {
            color: #691b1b;
            font-size: 0.2rem;
          }
          input {
            float: left;
            outline: none;
            width: 4.16rem;
            height: 0.54rem;
            border-radius: 0.06rem;
            background: #feb924;
            color: #691b1b;
            border: 0.01rem solid #691b1b;
            line-height: 0.54rem;
            text-indent: 0;
            margin-right: 0.2rem;
            font-size: 0.2rem;
          }
          span {
            float: right;
            width: 0.94rem;
            height: 0.68rem;
            background: url("../../common/img/activity/activity2/btn.png")
              no-repeat;
            background-size: 0.94rem 0.68rem;
                /*margin-top: 0.15rem;*/
    margin-right: 0.25rem;
          }
        }
      }
    }
    .invite_list {
      width: 5.92rem;
      height: 6.67rem;
      background: url("../../common/img/activity/activity2/list.png") no-repeat;
      background-size: 5.92rem 6.67rem;
      overflow: hidden;
      p {
        height: 0.36rem;
        font-size: 0.3rem;
        font-family: PingFang-SC-Regular;
        color: rgba(255, 255, 255, 1);
        line-height: 0.36rem;
        text-align: center;
        margin-top: 0.8rem;
      }
      .invite_list_c {
        width: 5.55rem;
        height: 4.51rem;
        border-top: 0.07rem solid #d48800;
        border-bottom: 0.2rem solid #d48800;
        border-radius: 0.08rem;
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.85);
        ul {
          box-sizing: border-box;
          padding: 0.4rem 0.2rem;
          li {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            align-items: center;
            box-sizing: border-box;
            border-bottom: 0.01rem solid rgba(0, 0, 0, 0.1);
            i {
              width: 1.71rem;
              height: 0.7rem;
              font-style: normal;
              font-size: 0.26rem;
              line-height: 0.7rem;
              text-align: center;
              color: #1e1e1e;
            }
            &:nth-of-type(1) {
              i {
                &:nth-of-type(1) {
                  height: 0.5rem;
                  background: url("../../common/img/activity/activity2/1.png")
                    no-repeat top center;
                  background-size: 0.33rem 0.4rem;
                }
              }
            }
            &:nth-of-type(2) {
              i {
                &:nth-of-type(1) {
                  height: 0.5rem;
                  background: url("../../common/img/activity/activity2/2.png")
                    no-repeat top center;
                  background-size: 0.33rem 0.4rem;
                }
              }
            }
            &:nth-of-type(3) {
              i {
                &:nth-of-type(1) {
                  height: 0.5rem;
                  background: url("../../common/img/activity/activity2/3.png")
                    no-repeat top center;
                  background-size: 0.33rem 0.4rem;
                }
              }
            }
            &:nth-of-type(4) {
              i {
                &:nth-of-type(1) {
                  height: 0.5rem;
                  background: url("../../common/img/activity/activity2/4.png")
                    no-repeat center;
                  background-size: 0.24rem 0.2rem;
                }
              }
            }
            &:nth-of-type(5) {
              i {
                &:nth-of-type(1) {
                  height: 0.5rem;
                  background: url("../../common/img/activity/activity2/5.png")
                    no-repeat center;
                  background-size: 0.24rem 0.2rem;
                }
              }
            }
          }
        }
        p.no_tip {
          text-align: center;
          font-size: 0.24rem;
          color: #898989;
          margin-top: 0;
        }
      }
    }
    .ewm {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      margin-top: 0.5rem;
      li {
        i {
          display: block;
          width: 1.78rem;
          height: 1.79rem;
        }
        p{
          font-size: 0.18rem;
          text-align: center;
          color: #5c9423;
        }
        &:nth-of-type(1) i {
          background: url("../../common/img/activity/activity2/link1.png")
            no-repeat;
          background-size: 1.78rem 1.79rem;
        }
        &:nth-of-type(2) i {
          background: url("../../common/img/activity/activity2/link2.png")
            no-repeat;
          background-size: 1.78rem 1.79rem;
        }
        &:nth-of-type(3) i {
          background: url("../../common/img/activity/activity2/link3.png")
            no-repeat;
          background-size: 1.78rem 1.79rem;
        }
      }
    }
    .footer {
      margin-top: 0.2rem;
      p {
        color: #691b1b;
        font-size: 0.2rem;
        margin-bottom: 0;
        line-height: 0.35rem;
        &:nth-of-type(1) {
          margin-bottom: 0.18rem;
        }
      }
    }
  }
}
</style>