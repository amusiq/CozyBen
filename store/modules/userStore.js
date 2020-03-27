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
			state.shareLikes = shareLikes
		}
	},
	actions: {
		async login(context){
			const checkRes = await loginUtil.checkToken();
			if(checkRes.status === 0){
				const { userInfo } = checkRes;
				config.userInfo = userInfo;
				context.commit('setIsAdmin',userInfo.isAdmin);
				context.commit('setShareLikes',userInfo.shareLikes);
			} else {
				loginUtil.login().then(res=>{
					if(res.status === 0){
						const { userInfo } = res;
						config.userInfo = userInfo;
						console.log(res,'login')
						context.commit('setIsAdmin', userInfo.isAdmin);
						context.commit('setShareLikes',userInfo.shareLikes);
					}
				});
			
			}
		}
	}
}