<template>
	<div class="content">
		<div class="header">
			<a href="javascript:history.go(-1)"><img src="../../common/img/userCenter/arrowsb.png" alt="" class="back" /></a>
			<span>公告</span>
		</div>
		<!-- <scrolist @scrollToEnd="loadData" :pullup="pullup"> -->
		<div class="wrapper">
			<quick-loadmore :top-method="handleTop" ref="vueLoad" :top-status-change="handleStatusChange" :bottom-method="handleBottom" :bottom-status-change="handleBottomStatusChange" :disable-top="false" :disable-bottom="false">
				<ul>
					<li v-for="item in getNoticeListData">
						<router-link :to="{ path: 'notice', query: { id: item.id }}">
							<p v-html="item.title" class="title"></p>
							<p v-html="item.createtime" class="time"></p>
						</router-link>
					</li>
				</ul>
			</quick-loadmore>
		</div>
	</div>
</template>

<script>
// import scrolist from "./scroll";
export default {
  data: function() {
    return {
      getNoticeListData: "",
      pullup: true,
      page1: 1
    };
  },

  mounted() {
    this.loadData0();
	},
	beforeRouteLeave(to, from, next) {
		// console.log(to.name)
		// return;
    // 进入详情
    if (to.name === "egg") {
        // 获得滚动距离
      let scrollTop = this.$refs.vueLoad.getScrollTop();
      // 设置缓存
      sessionStorage.setItem("messageScrollTop", scrollTop);
    } else {
      // 如果去其他页移除缓存  
      sessionStorage.removeItem("messageScrollTop");
    }
    next();
  },
  methods: {

    handleTop() {
      // 下拉刷新
      setTimeout(() => {
        this.loadData0();
        // this.dataList = [1, 2, 3, 4, 5];
        // 刷新成功调用
        this.$refs.vueLoad.onTopLoaded();
      }, 1000);
    },
    handleStatusChange(status) {
      // status监控下拉刷新状态--等待/下拉/到达阙值/刷新
      const TOPSTATUS = {
        wait: "wait",
        pulling: "pulling",
        limit: "limit",
        loading: "loading"
      };
      console.log(status, "statuschange");
    },
    handleBottomStatusChange(status) {
      // status监控上拉加载状态--等待/加载/没有更多数据
      const BOTTOMSTATUS = {
        wait: "wait",
        loading: "loading",
        nodata: "nodata"
      };
      console.log(status, "bottomchange");
    },
    handleBottom() {
      // 上拉加载
      setTimeout(() => {
        this.loadData();
        // this.dataList.push(1, 2, 3);
        // 加载完毕调用函数(如果没有更多数据参数传false)
        // this.$refs.vueLoad.onBottomLoaded();
      }, 1000);
    },

    loadData0() {
      let vm = this;
      $.ajax({
        type: "get",
        url: contextPath + "/api/eggworld/findnoticeBystatussdk",
        async: true,
        dataType: "json",
        data: {
          page: vm.page1,
          row: 25
        },
        success: function(data) {
          vm.getNoticeListData = data.data;
        }
      });
    },
    loadData() {
      this.page1++;
      console.log(this.page1);
      let vm = this;
      $.ajax({
        type: "get",
        url: contextPath + "/api/eggworld/findnoticeBystatussdk",
        async: true,
        dataType: "json",
        data: {
          page: vm.page1,
          row: 25
        },
        success: function(data) {
					if(data.data.length == 0) {
						vm.$refs.vueLoad.onBottomLoaded(false);
						return;
					}
					vm.getNoticeListData.push(...data.data);
					vm.$refs.vueLoad.onBottomLoaded(true);
					
        }
      });
    }
  }
};
</script>

<style scoped>
.content {
	padding-top: 0.88rem;
	box-sizing: border-box;
	height: 100%;
	overflow: hidden;
} 
.header {
  width: 6.4rem;
  height: 0.88rem;
  background: #006b8d;
  position: fixed;
  top: 0;
  z-index: 9999;
}
.wrapper {
  /* margin-top: 0.88rem; */
	height: 100%;
	box-sizing: border-box;
}

.header img {
  width: 0.2rem;
  height: 0.35rem;
  margin-left: 0.2rem;
  float: left;
  margin-top: 0.25rem;
}

.header span {
  width: 5.6rem;
  color: #fff;
  display: block;
  float: left;
  line-height: 0.88rem;
  font-size: 0.34rem;
  text-align: center;
}

ul {
  overflow: hidden;
}

li {
  border-bottom: 0.01rem solid #e1e1e1;
  padding: 0.1rem 0.2rem;
}

.title {
  margin-bottom: 0;
}

.time {
  margin-bottom: 0;
  text-align: right;
}
</style>