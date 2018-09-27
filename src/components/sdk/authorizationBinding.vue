<template>
  <div class="authorizationBinding">
    <heador>
      <h3>授权绑定</h3>
    </heador>
    <div class="content">
      <ul class="sqlist">
        <li>
          <span>蛋生的世界</span>
          <span v-if="showegg == 1">已授权绑定</span>
          <span v-if="showegg == 0">未授权绑定</span>
        </li>
        <li>
          <span>TTC-OTC</span>
          <span v-if="showotc == 1">已授权绑定</span>
          <span v-if="showotc == 0">未授权绑定</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import heador from "./header";
export default {
  data() {
    return {
      binds:"",
      showegg:0,
      showotc:0,
    };
  },
  mounted () {
    this.getinit();
  },
  methods: {
    getinit () {
      let vm = this;
      $.ajax({
						url:  contextPath1+"/api/certification/getAppAuthorization",
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
                vm.binds = data.data;
                vm.binds.map((item) => {
                  if(item == 1) {
                    vm.showegg = 1;
                  }else if(item == 2) {
                    vm.showotc = 1;
                  }
                })
                // vm.hasbd = data.data.status;
                // if(vm.hasbd == 1) {
                //   sessionStorage.lh_token = data.data.token;
                //   vm.$router.push("/bindingBlockIdentity");
                // }
						}
					});
    },
  },
  components: {
    heador
  }
};
</script>

<style scoped lang="less">
.authorizationBinding {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #f7f7f7;
  .content {
    background: #fff;
    .sqlist {
      li {
        box-sizing: border-box;
        padding: 0 0.2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 0.9rem;
        border-bottom: 0.01rem solid #f7f7f7;
        line-height: 0.9rem;
        span {
          color: #333;
          font-size: 0.26rem;
          &:nth-of-type(2) {
            font-size: 0.2rem;
            color: #999;
          }
        }
      }
    }
  }
}
</style>