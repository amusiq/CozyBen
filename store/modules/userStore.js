import loginUtil from '@/utils/login';

export default {
	state: {
		openid: '',
		token: '',
		isAdmin: false
	},
	getters: {},
	mutations: {
		setOpenid(state, openid) {
			state.openid = openid
		},
		setToken(state, token) {
			state.token = token
		},
		setIsAdmin(state,isAdmin){
			state.isAdmin = isAdmin
		}
	},
	actions: {
		async login(context){
			const checkRes = await loginUtil.checkToken();
			console.log(checkRes,'checkRes')
			if(checkRes.status === 0){
				const { openid, token, isAdmin } = checkRes;
				context.commit('setOpenid',openid);
				context.commit('setToken',token);
				context.commit('setIsAdmin',isAdmin);
			} else {
				await loginUtil.login();
				const res = await loginUtil.checkToken();
				if(checkRes.status === 0){
					const { openid, token, isAdmin } = checkRes;
					context.commit('setOpenid',openid);
					context.commit('setToken',token);
					context.commit('setIsAdmin',isAdmin);
				}
			}
		}
	}
}