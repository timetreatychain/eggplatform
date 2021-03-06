import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload';
import VueClipboard from 'vue-clipboard2';
import BScroll from 'better-scroll'	
Vue.config.productionTip = false;
Vue.use(VueClipboard)
import VueQuickLoadmore from 'vue-quick-loadmore';
// import 'vue-quick-loadmore/dist/index.css';  // 引入插件相关的css

Vue.use(VueQuickLoadmore)
import Cube from 'cube-ui'

Vue.use(Cube)
window.eventBus = new Vue()

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	render: h => h(App),
	components: { App }
})