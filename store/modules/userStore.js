import loginUtil from '@/utils/login';
import config from '@/constants/config';
import { request } from '@/utils/request';

export default {
	state: {
		isAdmin: false,
		shareLikes:[],
	},
	getters: {},
	mutations: {
		setIsAdmin(state,isAdmin){
			state.isAdmin = isAdmin
		},
		setShareLikes(state,shareLikes){
			state.shareLikes = shareLikes;
			console.log(shareLikes,'shareLikes');
			uni.setStorageSync('USER_INFO',{ ...config.userInfo,shareLikes });
		}
	},
	actions: {
		async login(context){
			const USER_INFO = uni.getStorageSync('USER_INFO');
			if(USER_INFO){
				config.userInfo = USER_INFO;
				context.commit('setIsAdmin', USER_INFO.isAdmin);
				context.commit('setShareLikes',USER_INFO.shareLikes);
				return;
			};
			loginUtil.login().then(res=>{
				if(res.status === 0){
					const { userInfo } = res;
					config.userInfo = userInfo;
					uni.setStorageSync('USER_INFO',userInfo);
					context.commit('setIsAdmin', userInfo.isAdmin);
					context.commit('setShareLikes',userInfo.shareLikes);
				}
			});
		}
	}
}