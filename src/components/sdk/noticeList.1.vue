<template>
	<div class="content">
		<div class="header">
			<a href="javascript:history.go(-1)"><img src="../../common/img/userCenter/arrowsb.png" alt="" class="back" /></a>
			<span>公告</span>
		</div>
		<!-- <scrolist @scrollToEnd="loadData" :pullup="pullup"> -->
			<ul>
				<li v-for="item in getNoticeListData">
					<router-link :to="{ path: 'notice', query: { id: item.id }}">
						<p v-html="item.title" class="title"></p>
						<p v-html="item.createtime" class="time"></p>
					</router-link>
				</li>
			</ul>
		<!-- </scrolist> -->
	</div>
</template>

<script>
// import scrolist from "./scroll";
export default {
  data: function() {
    return {
      getNoticeListData: "",
			pullup: true,
			page1: 1,
    };
  },
  
  mounted() {
    this.loadData0();
  },
  methods: {
    loadData0() {
      let vm = this;
      $.ajax({
        type: "get",
        url: contextPath + "/api/eggworld/findnoticeBystatus",
        async: true,
        dataType: "json",
        data: {
          page: vm.page1,
          row: 10000
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
        url: contextPath + "/api/eggworld/findnoticeBystatus",
        async: true,
        dataType: "json",
        data: {
          page: vm.page1,
          row: 20
        },
        success: function(data) {
          vm.getNoticeListData.push(data.data);
        }
      });
    }
  }
};
</script>

<style scoped>
.header {
  width: 6.4rem;
  height: 0.88rem;
  background: #006b8d;
  position: fixed;
  top: 0;
  z-index: 9999;
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
  padding-top: 0.88rem;
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