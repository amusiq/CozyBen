
import config from '@/constants/config';
import store from '@/store/index.js';

// needLogin: 0 默认不需要；1 需要；2 需要但不强制

const request = async({ name, data, needLogin }) => {
	if(needLogin === 1 || needLogin === 2){
		let { token } = config.userInfo;
		if(token){ 
			data.token = token; 
		} else {
			if(needLogin === 1){
				return uni.showModal({
					title:'还没登录呢',
					content:'还没登录呢',
					cancelText:'就不',
					confirmText:'登录',
					success(res){
						if(res.confirm){
							// 登录
							store.dispatch('login');
						}
					}
				});
			}
		}
	}
	try {
		const res = await uniCloud.callFunction({ name, data });
		console.log(res,'res')
		return res.result;
	} catch {
		return {
			status: 500,
			msg: 'Network error'
		}
	}
}

export default request;
