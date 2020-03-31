import Vue from 'vue'
import App from './App'
import store from './store'
import funcTool from '@/js_sdk/functionTool/functionTool.js'

Vue.prototype.$store = store
Vue.prototype.$funcTool = funcTool
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
