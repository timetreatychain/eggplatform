<template>
  <div class="bindingBlockIdentity">
    <heador v-if="status == 0">
      <h3>绑定区块身份</h3>
    </heador>
    <heador v-if="status == 1">
      <h3>我的区块身份</h3>
    </heador>
    <div class="banner">
      <div class="userinfo">
        <p class="upload">
          <img :src="datainfo.picUrl" v-if="datainfo.picUrl!=''" />
          <img src="../../common/img/blockidenty/avator.png" v-if="!datainfo.picUrl!=''" />

          <label for="up_img1">
            <!-- <input type="file" accept="image/*" id="up_img1" @change="up_face(this)" /> -->
          </label>
        </p>
        <p class="info1" v-if="status == 0">当前登录的区块身份ID：{{qkid}}</p>
        <p class="info1" v-if="status == 1">区块身份ID：{{datainfo.blockId}}</p>
        <p class="info1 info2" v-if="status == 1">可直接登录TTC生态内DApps</p>
      </div>
    </div>
    <div class="bannerB" v-if="status == 0">
      <div class="bannerB_inner">
        你同意
        <span>【蛋生的世界】账号：{{mynum}}</span>绑定同步你的区块身份？
      </div>
    </div>
    <div class="bd" v-if="status == 0">
      <p @click="changestatus">确认绑定</p>
      <p @click="goback1">暂不绑定</p>
    </div>
    <ul class="finaly" v-if="status == 1">
      <li @click="gocurrency">
        <span>总资产</span>
        <p>
          <!-- <i>查看你在TTC生态内的所有资产</i>-->
          <em>{{total}}BIDT</em> 
          <i class="more"></i>
        </p>
      </li>
      <li @click="gosfrz">
        <span>身份认证</span>
        <p>
          <i class="more"></i>
        </p>
      </li>
      <li @click="gootc">
        <span>OTC交易</span>
        <p>
          <i class="more"></i>
        </p>
      </li>
      <!-- <li>
        <span>区块地址</span>
        <p>
          <i>{{datainfo.blockAddress}}</i>
        </p>
      </li> -->
      <li @click="authorizationBinding">
        <span>授权绑定</span>
        <p>
           <i class="more"></i>
          <!-- <i>蛋生的世界</i>
          <em>账号：{{datainfo.account}}</em> -->
        </p>
      </li>
    </ul>
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
      datainfo:"",
      accessToken:sessionStorage.egg_token,
      cardinfo:"",
      total:0
    };
  },
  mounted () {
    this.getinit();
    this.getinfo ();
    this.getasset();
  },
  methods: {
    gocurrency () {
      this.$router.push('/myAssets');
    },  
    checkOtcBind () {
      let vm = this;
      $.ajax({
						url:  contextPath1+"/api/certification/whetherBandingOtc",
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
                if(vm.otcBindStatus != 0) {
                  vm.$router.push('/manageOtc')
                }else {
                  vm.$router.push("/loginOtc");
                }
						}
					});
    },
    gootc () {
      this.checkOtcBind();
      // this.$router.push("/loginOtc");
    },
    gosfrz () {
      this.$router.push({ path: '/AdvancedSetting', query: { accessToken: this.accessToken }})
    },
    //跳转 授权绑定
    authorizationBinding () {
      this.$router.push("/authorizationBinding")
    },
    getinit () {
      let vm = this;
      $.ajax({
						url:  contextPath1+"/api/banding/judgeBanding",
						type: "post",
						async: true,
						dataType: "json",
						data: {
							// token:sessionStorage.egg_token,
              // count:amount
              token: sessionStorage.egg_token,
              project: 1
						},
						success: function(data) {
                vm.status = data.data.status;
                vm.datainfo = data.data;
                if(vm.datainfo.blockId) {
                  sessionStorage.qkid = data.data.blockId
                }
                // sessionStorage.qkid = data.data.blockId
						}
					});
    },
    getasset () {
      let vm = this;
      $.ajax({
						url:  contextPath1+"/app/api/content/getProperty",
						type: "post",
						async: true,
						dataType: "json",
						data: {
							// token:sessionStorage.egg_token,
              // count:amount
              token: sessionStorage.lh_token,
              // project: 1
						},
						success: function(data) {
              vm.total = data.data.total
                // vm.status = data.data.status;
                // vm.datainfo = data.data;
                // if(vm.datainfo.blockId) {
                //   sessionStorage.qkid = data.data.blockId
                // }
                // sessionStorage.qkid = data.data.blockId
						}
					});
    },
     getinfo () {
      let vm = this;
      $.ajax({
						url:  contextPath+"/api/blockinfo/getUserIdcard",
						type: "post",
						async: true,
						dataType: "json",
						data: {
							// token:sessionStorage.egg_token,
              // count:amount
              token: sessionStorage.egg_token,
              // project: 1
						},
						success: function(data) {
                vm.cardinfo = data.data;
                // vm.status = data.data.status;
                // vm.datainfo = data.data;
                // sessionStorage.qkid = data.data.blockId
						}
					});
    },
    qrbd () {
      let vm = this;
      let level1;
      if(vm.cardinfo && vm.cardinfo.twostate == 1) {
        level1 = 2;
      }else {
        level1 = 1;
      }
      $.ajax({
						url:  contextPath1+"/api/banding/getAccredityId",
						type: "post",
						async: true,
						dataType: "json",
						data: {
              blockToken:sessionStorage.lh_token,
              token: sessionStorage.egg_token,
              project: 1,
              // account: sessionStorage.mynum,
              account: JSON.parse(sessionStorage.egg_userData).phoneNum,
              identityCard: vm.cardinfo && vm.cardinfo.identityCard || "",
              userName:vm.cardinfo && vm.cardinfo.username  || "",
              frontUrl:vm.cardinfo && vm.cardinfo.frontUrl || "",
              backUrl: vm.cardinfo && vm.cardinfo.backUrl || "",
              status:vm.cardinfo && vm.cardinfo.state || 1,
              level:level1

						},
						success: function(data) {
                vm.datainfo = data.data;
								vm.status = 1;
						}
					});
    },
    goback1 () {
      this.$router.push("/blockIdentity");
    },
    changestatus() {
      this.qrbd();
    },
    up_face() {
      let vm = this;
      var file = $("#up_img1")[0].files[0];
      var size = (file.size / 1024).toFixed(2);
      // vm.checkAndHandleUpload (file);
      // 这里设置5m以内
      if (size <= 3072) {
        var reader = new FileReader();
        reader.readAsDataURL(file); //调用自带方法进行转换
        reader.onload = function(e) {
          vm.img_src1 = this.result;
          console.log(vm.img_src1);
          //   $.ajax({
          //   type: "post",
          //   url: contextPath + "/api/invitation/savePicUrl",
          //   async: true,
          //   dataType: "json",
          //   data: {
          //     token: localStorage.coffeeokex_token,
          //     picUrl: vm.img_src1
          //   },
          //   success(res) {
          //     if (res.state.code === "20000") {
          //       mui.toast("头像上传成功！")
          //     }
          //   }
          // });
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
.bindingBlockIdentity {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f7f7f7;
  overflow: hidden;
  .banner {
    height: 2.36rem;
    background: url("../../common/img/blockidenty/bg.png") no-repeat;
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
        color: #000;
        font-weight: 300;
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
  .finaly {
    li {
      height: 1rem;
      padding: 0.2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fff;
      margin-bottom: 0.1rem;
      span {
        width: 1.4rem;
        color: #999;
        // text-align: center;
        font-size: 0.3rem;
        font-weight: 300;
      }
      i {
        margin-top: 0.1rem;
        margin-bottom: 0.05rem;
        color: #333;
      }
      em {
        display: inline-block;
        color: #000;
        //  line-height: 1rem;
        vertical-align: top;
        margin-top: 0.2rem;
        font-size: 0.28rem;
      }
      i,em{
        font-weight: 300;
        text-align: right;
        display: inline-block;
        font-style: normal;
       
      }
      .more  {
        display: inline-block;
        width: 0.3rem;
        height: 0.4rem;
        background: url('../../common/img/blockidenty/more.png') center no-repeat;
      }
    }
  }
  .bannerB {
    height: 1.32rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #fff;

    .bannerB_inner {
      width: 4.34rem;
      font-size: 0.2rem;
      text-align: center;
      span {
        display: inline-block;
        color: #169bd5;
        font-size: 0.2rem;
        margin-bottom: 0.1rem;
      }
    }
  }
  .bd {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 1rem;
    p {
      line-height: 0.58rem;
      width: 4.44rem;
      border-radius: 0.05rem;
      text-align: center;
      font-size: 0.2rem;
      font-weight: 300;
      &:nth-of-type(1) {
        background: #169bd5;
        color: #fff;
        box-shadow: 0 0rem 0.2rem rgba(0, 0, 0, 0.3);
      }
      &:nth-of-type(2) {
        // background: #169BD5;
        color: #169bd5;
      }
    }
  }
}
</style>