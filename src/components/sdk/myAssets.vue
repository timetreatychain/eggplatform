<template>
  <div class="myAssets">
    <heador><h3>我的资产</h3></heador>
    <p class="zzc"><i>总资产</i><span>{{total.total}}</span><em>bidt</em></p>
    <ul class="finaly">
      <li @click="gocurrency">
        <span>币达钱包</span>
        <p>
          <em>{{list && (list[0].money)}}BIDT</em> 
          <i class="more"></i>
        </p>
      </li>
      <li>
        <span>蛋生世界</span>
        <p>
          <em>{{list &&  (list[1].money)}}BIDT</em>
          <!-- <i class="more"></i> -->
        </p>
      </li>
      <!-- <li>
        <span>TTC-OTC</span>
        <p>
           <em>20000BIDT</em>
          
        </p>
      </li> -->
    </ul>
  </div>
</template>

<script>
  import heador from './header'
  export default {
    data() {
      return {
        total:"",
        list:[
          {
            money:0
          },
          {
            money:0
          }
        ]

      }
    },
    components :{
      heador
    },
    mounted () {
      this.getasset();
    },
    methods : {
      gocurrency () {
        this.$router.push('/currency');
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
              vm.total = data.data;
              data.data.list.map((item) => {
                if(item.appName == 1) {
                  vm.list[1] = item;
                }else  if(item.appName == 0) {
                  vm.list[0] = item;
                }
              })
              console.log(vm.list);

                // vm.status = data.data.status;
                // vm.datainfo = data.data;
                // if(vm.datainfo.blockId) {
                //   sessionStorage.qkid = data.data.blockId
                // }
                // sessionStorage.qkid = data.data.blockId
						}
					});
    },
    }
  }
</script>

<style scoped lang="less">
.myAssets {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  // background: #f7f7f7;
  .zzc {
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    font-size: 0;
    // display: flex;
    // justify-content: space-around;
    background: #f7f7f7;
    i,em {
      display: inline-block;
      // float: left;
      font-style: normal;
      font-size: 0.25rem;
    }
    span {
      display: inline-block;
      // float: left;
      color: #000;
      font-size: 0.35rem;
      margin: 0 0.1rem;
    }
  }
  .finaly {
    li {
      height: 0.8rem;
      padding: 0.2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fff;
      // margin-bottom: 0.1rem;
      border-bottom: 0.01rem solid #f7f7f7;
      span {
        width: 1.4rem;
        color: #999;
        // text-align: center;
        font-size: 0.2rem;
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
        font-size: 0.26rem;
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
      &:nth-of-type(1) span{
        color: #000;
      }
      &:nth-of-type(2) em ,&:nth-of-type(3) em{
        color: #999;
      }
    }
  }

}
</style>