class Login {
	login(){
		uni.showLoading({ title: '登录中...' });
		return new Promise((resolve, reject)=>{
			this.getCode().then((code) => {
			  return uniCloud.callFunction({
			    name: 'login',
			    data: {
			      code
			    }
			  });
			}).then((res) => {
			  uni.hideLoading()
			  console.log(res);
			  if (res.result.status !== 0) {
			    return Promise.reject(new Error(res.result.msg))
			  }
			  resolve(res.result);
			  uni.setStorageSync('token', res.result.token)
			}).catch((err) => {
			  console.log(err);
			  uni.hideLoading()
			  uni.showModal({
			    content: '出现错误，请稍后再试.' + err.message,
			    showCancel: false
			  })
			})
		})
		
	}
	
	// 获取code
	getCode() {
	  return new Promise((resolve, reject) => {
	    uni.login({
	      provider: 'weixin',
	      success(e) {
	        if (e.code) {
	          resolve(e.code)
	        } else {
	          reject(new Error('微信登录失败'))
	        }
	      },
	      fail(e) {
	        reject(new Error('微信登录失败'))
	      }
	    })
	  })
	}
	
	async checkToken(){
		const token = uni.getStorageSync('token');
		if(!token){
			return {
				status: -1,
				msg:'无token'
			}
		} 
		const validateRes = await uniCloud.callFunction({
		  name: 'validateToken',
		  data: { token }
		});
		return validateRes.result;
	}
}

const login = new Login();
export default login;