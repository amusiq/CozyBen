class Login {
	login(){
		uni.showLoading({ title: '登录中...' });
		this.getCode().then((code) => {
		  console.log('code', code);
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
		  uni.setStorageSync('token', res.result.token)
		  console.log('登录成功')
		}).catch((err) => {
		  console.log(err);
		  uni.hideLoading()
		  uni.showModal({
		    content: '出现错误，请稍后再试.' + err.message,
		    showCancel: false
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
		const validateRes = await uniCloud.callFunction({
		  name: 'validateToken',
		  data: { token }
		});
		validateRes.result.token = token;
		return validateRes.result;
	}
}

const login = new Login();
export default login;