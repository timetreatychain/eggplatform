<template>
  <div class="registerOtc">
    <heador v-if="view == 1">
      <h3>绑定OTC</h3>
    </heador>
    <heador v-if="view == 3">
      <h3>提币到OTC交易</h3>
    </heador>
    <div class="content">
      <div class="banner" v-if="view == 1">
        <div class="userinfo">
          <p class="upload">
            <img :src="datainfo.picUrl" v-if="datainfo.picUrl!=''" />
            <img src="../../common/img/blockidenty/avator.png" v-if="!datainfo.picUrl!=''" />

            <label for="up_img1">
              <!-- <input type="file" accept="image/*" id="up_img1" @change="up_face(this ,'#up_img1')" /> -->
            </label>
          </p>
          <p class="info1" v-if="status == 0">当前登录的区块身份ID：{{qkid}}</p>
        </div>
      </div>
      <div class="inner_b" v-if="view == 1">
        <p class="p1">请确认现在就绑定OTC账号
          <i>{{otcnum}}</i></p>
        <p class="sub" @click="sub">确认</p>
        <p class="qx" @click="qx">取消</p>
      </div>
      <div class="otcCenter otcCenter_setMes" v-if="view==3">
        <img src="../../common/img/mes.jpg" class="messagelogo" />
        <div class="otcAccount">OTC账号:&nbsp;{{otcusername}}</div>
        <div class="priceSetting">
          <div class="lable">输入提交到OTC交易的单价</div>
          <div class="price clear">
            <span>交易单价:</span>
            <input type="text" name="" id="price" placeholder="单价" value="" />
            <span>元</span>
          </div>
          <div class="tips">市场指导价:{{bidtprice}}元</div>
        </div>
        <div class="rmbWeys">
          <div class="lable">设置您的收款方式</div>
          <div class="sublable">交易金额会转入您设置的收款账号</div>
          <ul>
            <span class="wrapper">
            <input class="radio" id="r1" type="radio" value="0" name="gender">支付宝</input></span>
            <li class="clear">
              <!-- <span class="qrbtn" id="hit1" data-state="0">上传收款码</span> -->
              <label for="up_img2" class="qrbtn">上传收款码
                <input type="file" accept="image/*" id="up_img2" @change="up_face(this ,'#up_img2')" />
              </label>
              <input class="aliPayInfo" type="text" id="zfbnum" placeholder="填写您的支付宝账号" />
            </li>
            <span class="wrapper">
            <input class="radio" id="r2" type="radio" value="1" name="gender">微信</input></span>
            <li class="clear">
              <!-- <span class="qrbtn" id="hit2" data-state="1">上传收款码</span> -->
              <label for="up_img3" class="qrbtn">上传收款码
                <input type="file" accept="image/*" id="up_img3" @change="up_face(this,'#up_img3')" />
              </label>
              <input class="aliPayInfo" type="text" id="wxnum" placeholder="填写您的微信账号" />
            </li>
          </ul>
        </div>
        <div class="phone">
          <li class="clear">
            <input type="checkbox" name="phone" id="checkbox" value="1"></input>开启交易信息手机短信通知
          </li>
          <div class="sublable">勾选后，交易信息将通过手机短信通知于您</div>
          <input class="phonenum" type="text" placeholder="输入手机号码">
          <div class="warn">温馨提示</div>
          <div class="sublable">1.游戏里提币交易后，请留意查收交易信息；</div>
          <div class="sublable">2.您可用当前账号登录TTC-OTC官网http://otc.timetreaty.com/查看 </div>
        </div>

        <div class="submit subOTC" @click="updatephone">保存</div>
        <!-- <div class="pic_edit pic_edit1">
          <div id="clipArea1" class="clipArea"></div>
          <input type="file" id="file1" class="file">
          <button id="choose1" class="choose">选择图片</button>
          <button id="clipBtn1" class="clipBtn">上传</button>
          <button id="cannel1" class="cannel">取消</button>
        </div>
        <div class="pic_edit pic_edit2">
          <div id="clipArea2" class="clipArea"></div>
          <input type="file" id="file2" class="file">
          <button id="choose2" class="choose">选择图片</button>
          <button id="clipBtn2" class="clipBtn">上传</button>
          <button id="cannel2" class="cannel">取消</button>
        </div> -->
      </div>

    </div>
  </div>
</template>

<script>
import heador from "./header";
export default {
  data() {
    return {
      img_src1: "",
      status: 0,
      qkid: sessionStorage.qkid,
      mynum: JSON.parse(sessionStorage.egg_userData).phoneNum,
      datainfo: "",
      view: 1,
      otcusername: "",
      zfburl: "",
      wxurl: "",
      upOTC: "",
      bidtprice: 0,
      otcnum: sessionStorage.otcAcount,
      phonenum:""
    };
  },
  watch :{
    view (val) {
      if(val == 3) {
        this.checkOtcBind();
        this.getupOTC();
        this.getphonenum();
      }
    }
  },
  mounted () {
    this.checkOtcBind();
    this.getDefaultPrice();
  },
  methods: {
    updatephone (){
      let vm = this;
      if(this.phonenum == "") {
        return;
      }
      $.ajax({
        type: "post",
        url: contextOtcPath + "/api/certification/eggUpdatePhone",
        async: true,
        dataType: "json",
        data: {
          // token:sessionStorage.egg_token,
          // count:amount
          phone: vm.phonenum,
          token: sessionStorage.lh_token,
          // project: 2
          // token: ,
          account: sessionStorage.otcAcount
        },
        success: function(data) {
          if(data.state.code == 20000) {
              vm.setupOTC();
          }
          // vm.bidtprice = data.data.fbt;
          
        }
      });
    },
    getupOTC: function() {
      let vm = this;
      $.ajax({
        type: "post",
        url: contextPath + "/api/OTCinfo/getbindingOTCinfobytoken",
        async: true,
        dataType: "json",
        data: {
          token: sessionStorage.egg_token
        },
        success: function(data) {
          if(!data.data) {
            return;
          }
          // vm.otcusername = data.data.substitutes;
          $("#zfbnum").val(data.data.userzhifunum);
          $("#wxnum").val(data.data.userwxnum);
          $("#price").val(data.data.price);
          // vm.phonenum = data.data.phonenum;
          vm.getphonenum();
          (vm.wxurl = data.data.userwximage),
            (vm.zfburl = data.data.userzhifuimage),
            $($("input[type=radio][name='gender']")[data.data.type - 1]).attr(
              "checked",
              "checked"
            );
          $("input[type='checkbox']").attr("value", data.data.openstate);
          if (data.data.openstate == 1) {
            $("#checkbox").prop("checked", true);
          } else {
            $("#checkbox").prop("checked", false);
          }
        }
      });
    },
    getDefaultPrice: function() {
      let vm = this;
      $.ajax({
        type: "get",
        url: contextOtcPath + "/api/push/deal/getBIDTs",
        async: true,
        dataType: "json",
        success: function(data) {
          vm.bidtprice = data.data.fbt;
        }
      });
    },
     getphonenum: function() {
      let vm = this;
      if(this.view != 3) {
        return;
      }
      $.ajax({
        type: "post",
        url: contextOtcPath + "/api/certification/eggGetPhone",
        async: true,
        dataType: "json",
        data: {
          // token:sessionStorage.egg_token,
          // count:amount
          token: sessionStorage.lh_token,
          // project: 2
          // token: ,
          account: sessionStorage.otcAcount
        },
        success: function(data) {
          // vm.bidtprice = data.data.fbt;
          vm.phonenum = data.data;
        }
      });
    },
    checkOtcBind() {
      let vm = this;
      $.ajax({
        url: contextPath1 + "/api/certification/whetherBandingOtc",
        type: "post",
        async: true,
        dataType: "json",
        data: {
          // token:sessionStorage.egg_token,
          // count:amount
          token: sessionStorage.lh_token,
          project: 2
        },
        success: function(data) {
          vm.otcBindStatus = data.data;
          if (vm.otcBindStatus != 0) {
            sessionStorage.otcAcount = vm.otcBindStatus;
            vm.otcusername = sessionStorage.otcAcount
            vm.view = 3;
            vm.getphonenum();
          }
        }
      });
    },
    qx () {
      this.$router.push('/loginOtc')
    },
    sub() {
      let vm = this;
      $.ajax({
						url:  contextPath1+"/api/banding/getAccredityId",
						type: "post",
						async: true,
						dataType: "json",
						data: {
              blockToken:sessionStorage.lh_token,
              token: sessionStorage.otc_token,
              project:2,
              account: sessionStorage.otcAcount
						},
						success: function(data) {
              vm.view = 3;
                // vm.hasbd = data.data.status;
                // if(vm.hasbd == 1) {
                //   sessionStorage.lh_token = data.data.token;
                //   vm.$router.push("/bindingBlockIdentity");
                // }
						}
					});
    },
    // setupOTC () {
    //   let vm = this;
    //   // this.updatephone();
    //   $.ajax({
    //     type: "post",
    //     url: contextPath + "/api/OTCinfo/setupOTC",
    //     async: true,
    //     dataType: "json",
    //     data: {
    //       zfbnum: $("#zfbnum").val() || "",
    //       wxnum: $("#wxnum").val() || "",
    //       price: $("#price").val(),
    //       token: sessionStorage.egg_token,
    //       zfburl: vm.zfburl,
    //       wxurl: vm.wxurl,
    //       type: Number($('input[name="gender"]:checked').val()) + 1,
    //       openstate: $("#checkbox").prop("checked") ? 1 : 0,
    //       phonenum: vm.phonenum
    //     },
    //     success: function(data) {
    //       mui.toast("保存成功");
    //       vm.view = 3;
    //       vm.$router.push({ path: "/" });
    //     }
    //   });
    // },
    setupOTC() {
     let vm = this;
      // this.updatephone();

    // let type1 = Number($('input[name="gender"]:checked').val()) + 1;
    // if(!type1) {
    //   // mui.alert("填写信息不完整");
    //   // return ;
    // }else  if(type1 == 1 && $("#zfbnum").val() && $("#price").val()){
    //   this.upLoadData()
    // }else  if(type1 == 2 && $("#wxnum").val() && $("#price").val()){
    //   this.upLoadData()
    // }else {
    //    mui.alert("填写信息不完整");
    //   return ;
    // }


    let type1 = Number($('input[name="gender"]:checked').val()) + 1;
    if(type1 == 1 && $("#zfbnum").val() && $("#price").val()){
      this.upLoadData()
    }else  if(type1 == 2 && $("#wxnum").val() && $("#price").val()){
      this.upLoadData()
    }else {
       mui.alert("填写信息不完整");
      return ;
    }


      // $.ajax({
      //   type: "post",
      //   url: contextPath + "/api/OTCinfo/setupOTC",
      //   async: true,
      //   dataType: "json",
      //   data: {
      //     zfbnum: $("#zfbnum").val() || "",
      //     wxnum: $("#wxnum").val() || "",
      //     price: $("#price").val(),
      //     token: sessionStorage.egg_token,
      //     zfburl: vm.zfburl,
      //     wxurl: vm.wxurl ,
      //     type: Number($('input[name="gender"]:checked').val()) + 1,
      //     openstate: $("#checkbox").prop("checked") ? 1 : 0,
      //     phonenum: vm.phonenum
      //   },
      //   success: function(data) {
      //     mui.toast("保存成功");
      //     vm.view = 3;
      //     vm.$router.push({ path: "/" });
      //   }
      // });
    },
    upLoadData () {
      let vm = this;
       $.ajax({
        type: "post",
        url: contextPath + "/api/OTCinfo/setupOTC",
        async: true,
        dataType: "json",
        data: {
          zfbnum: $("#zfbnum").val() || "",
          wxnum: $("#wxnum").val() || "",
          price: $("#price").val(),
          token: sessionStorage.egg_token,
          zfburl: vm.zfburl,
          wxurl: vm.wxurl ,
          type: Number($('input[name="gender"]:checked').val()) + 1,
          openstate: $("#checkbox").prop("checked") ? 1 : 0,
          phonenum: vm.phonenum
        },
        success: function(data) {
          mui.toast("保存成功");
          vm.view = 3;
          vm.$router.push({ path: "/" });
        }
      });
    },
    up_face(v1, v2) {
      let vm = this;
      var file = $(v2)[0].files[0];
      var size = (file.size / 1024).toFixed(2);
      // vm.checkAndHandleUpload (file);
      // 这里设置5m以内
      if (size <= 3072) {
        var reader = new FileReader();
        reader.readAsDataURL(file); //调用自带方法进行转换
        reader.onload = function(e) {
          vm.img_src1 = this.result;
          if(v2 == "#up_img2") {
            vm.zfburl = vm.img_src1;
            mui.toast("上传成功");
          }else if(v2 == "#up_img3") {
            vm.wxurl = vm.img_src1;
            mui.toast("上传成功");
          }
          console.log(vm.img_src1);
        };
      } else {
        mui.toast("请选择小于3M的图片");
        return;
      }
    }
  },
  components: {
    heador
  }
};
</script>

<style scoped lang="less">
.registerOtc {
  // position: fixed;
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;
  background: #f7f7f7;
  // overflow: hidden;
  .content {
    .submit {
      width: 100% !important;
      height: 0.58rem !important;
      line-height: 0.58rem;
      background-color: #169bd5 !important;
      border-radius: 0.1rem;
      border: none;
      color: #ffffff !important;
      text-align: center;
      font-size: 0.3rem !important;
      -webkit-appearance: none;
    }
    input {
      margin: 0;
      padding: 0 0.1rem;
      height: 0.52rem;
      border: none;
      float: left;
    }
    .clear {
      label {
        float: right;
        width: 1.5rem;
        text-align: center;
        position: relative;
        #up_img2 {
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
          float: left;
          z-index: 99999;
          // display: none;
        }
        #up_img3 {
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
          float: left;
          z-index: 999999;
          // display: none;
        }
      }
    }

    .phone {
      li {
        padding: 0 0.25rem;
        input {
          float: left;
        }
        height: 0.52rem;
        line-height: 0.52rem;
      }
      .phonenum {
        display: block;
        width: 6rem;
    background-color: #eeeeee;
    margin:  0.1rem;
      }
    }
    .rmbWeys {
      ul {
        margin: 0.24rem 0;
        border-bottom: 0.08rem #eeeeee solid;
        .wrapper {
            float: left;
            width: 1.3rem;
            line-height: 0.5rem;
            padding-left: 0.2rem;
            box-sizing: border-box;
            input {
              margin-right: 0.1rem;
            }
          }
        li {
          padding: 0 0.25rem;
          height: 0.58rem;
          line-height: 0.58rem;
          margin: 0.1rem 0;
          
          .radio {
            float: left;
            margin-right: 0.1rem;
          }
          .aliPayInfo {
            float: right;
            width: 3rem;
            background-color: #eeeeee;
          }
          .qrbtn {
            float: right;
            width: 1.5rem;
            overflow: hidden;
            height: 0.41rem;
            line-height: 0.41rem;
            border-radius: 0.06rem;
            float: right;
            background-color: #71c6fe !important;
            color: #ffffff;
            padding: 0 0.1rem;
            margin: 0.05rem 0;
            margin-left: 0.05rem;
          }
        }
      }
    }
    .otcCenter {
      position: absolute;
      // top: 0.88rem;
      .lable {
        font-size: 0.24rem;
        color: #006b8d;
        line-height: 0.8rem;
        text-align: center;
        width: 6.4rem;
      }
      .lable2 {
        font-size: 0.24rem;
        color: #333333;
        text-align: center;
        width: 6.4rem;
        margin-top: 0.4rem;
      }
    }

    input::-webkit-input-placeholder {
      color: #999999;
    }
    .otcCenter_setMes {
      .subOTC {
        margin: 0.2rem 0.2rem 0.8rem 0.2rem;
        width: 6rem !important;
      }
      utext-align: left;
      .messagelogo {
        width: 6.4rem;
      }
      .rmbWeys {
        .lable {
          line-height: 0.63rem;
          padding: 0 0.25rem;
          text-align: left;
          color: #333333;
        }
      }
      .warn {
        color: #ff0808;
        line-height: 0.4rem;
        font-size: 0.24rem;
        margin-left: 0.25rem;
        margin-top: 0.22rem;
      }
      .sublable {
        font-size: 0.24rem;
        color: #999999;
        line-height: 0.31rem;
        -webkit-transform: scale(0.9);
        -moz-transform: scale(0.9);
        -ms-transform: scale(0.9);
        -o-transform: scale(0.9);
        transform: scale(0.9);
      }
      .priceSetting {
        .lable {
          line-height: 0.63rem;
          padding: 0 0.25rem;
          text-align: left;
          color: #333333;
        }
        .price {
          padding-left: 0.25rem;
          span {
            float: left;
            height: 0.52rem;
            line-height: 0.52rem;
          }
          input {
            width: 3.8rem;
            float: left;
            background-color: #eeeeee;
            margin: 0 0.2rem;
          }
        }
        .tips {
          color: #ff9b15;
          font-size: 0.4rem;
          line-height: 0.5rem;
          -webkit-transform: scale(0.5);
          -moz-transform: scale(0.5);
          -ms-transform: scale(0.5);
          -o-transform: scale(0.5);
          transform: scale(0.5);
        }
        padding-bottom: 0.2rem;
        border-bottom: 0.08rem solid #f7f7f7;
      }
      .otcAccount {
        padding: 0 0.25rem;
        line-height: 0.74rem;
        font-size: 0.26rem;
        border-bottom: 0.08rem solid #f7f7f7;
      }
    }
    .inner_b {
      width: 6rem;
      margin: 0 auto;
      margin-top: 1rem;
      p {
        font-size: 0.22rem;
        text-align: center;
        height: 0.3rem;
        line-height: 0.3rem;
        margin-bottom: 0.2rem;
        text-align: center;
        i {
          font-style: normal;
          color: #169bd5;
        }
        &.sub {
          // text-align: center;
          position: relative;
          left: 50%;
          transform: translateX(-50%);
          width: 4.44rem;
          height: 0.58rem;
          line-height: 0.58rem;
          text-align: center;
          color: #fff;
          background: #169bd5;
          border-radius: 0.08rem;
        }
        &.qx {
          color: #169bd5;
        }
      }
    }
    .banner {
      height: 2.36rem;
      background: url("../../common/img/blockidenty/bg2.png") no-repeat;
      background-size: 100%;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      align-items: center;
      .userinfo {
        width: 4rem;
        // img {
        //   display: block;
        //   width: 1.5rem;
        //   height: 1.5rem;
        //   margin: 0 auto;
        //   margin-bottom: 0.2rem;
        // }
        .upload {
          width: 2.52rem;
          text-align: center;
          position: relative;
          margin: 0 auto;

          img {
            position: absolute;
            left: 0.62rem;
            border-radius: 50%;
            top: 0rem;
            width: 1.3rem;
            height: 1.3rem;
            display: block;
            overflow: hidden;
          }
          label {
            position: relative;
            z-index: 999999;
            // margin-top: 1rem;
            display: inline-block;
            width: 1.3rem;
            height: 1.3rem;
            // background: url('../../common/img/blockidenty/avator.png') no-repeat;
            background-size: 100%;
            border: 0.1rem solid #abdcee;
            border-radius: 50%;
            overflow: hidden;
          }
          i {
            display: block;
            font-style: normal;
            color: #999999;
            font-size: 0.23rem;
            font-weight: 300;
            text-align: left;
          }
          input {
            opacity: 0;
            display: none;
          }
        }
        .info1 {
          color: #333;
          font-weight: 400;
          text-align: center;
          font-size: 0.2rem;
        }
        .info2 {
          color: #fff;
          margin: 0 auto;
          width: 3.5rem;
          margin-top: 0.1rem;
          line-height: 0.38rem;
          font-size: 0.18rem;
          background: linear-gradient(
            -45deg,
            rgba(251, 131, 66, 1),
            rgba(255, 167, 81, 1)
          );
          border-radius: 0.1rem;
        }
      }
    }
  }
}
</style>