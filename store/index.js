import Vue from 'vue'
import Vuex from 'vuex'
import userStore from './modules/userStore.js'
Vue.use(Vuex)
const store = new Vuex.Store({
	modules:{
		userStore
	},
    state: {
		
	},
    mutations: {
	},
    actions: {}
})
export default store