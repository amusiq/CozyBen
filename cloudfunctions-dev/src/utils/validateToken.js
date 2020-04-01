const jwt = require('jwt-simple')
const {
  wxConfig,
} = require('../utils/constants.js')

const db = uniCloud.database()
async function validateToken(token) {
  if(!token){
	  return{
	  	  status: -2,
	  	  msg: '无token'
	  }
  }
  const userFromToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
  const userInDB = await db.collection('user').where(userFromToken).get()
  if (userInDB.data.length !== 1) {
    return {
      status: -1,
      msg: '根据token查无此人'
    }
  }
  const userInfoDB = userInDB.data[0]
  let userInfoDecode

  userInfoDecode = jwt.decode(token, userInfoDB.tokenSecret)

  function checkUser(userFromToken, userInfoDB) {
    return Object.keys(userFromToken).every(function(item) {
      return userFromToken[item] === userInfoDB[item] && userFromToken[item] === userInfoDecode[item]
    })
  }


  if (userInfoDB.exp > Date.now() && checkUser(userFromToken, userInfoDB)) {
	// 获取喜爱列表
	let shareLikes = [];
	const shareLikeCollection = db.collection('share-likes');
	const shareLikeDB = await shareLikeCollection.where({ likes: userInfoDB.openid }).field({ 'id': true }).get();
	for(let i = 0; i < shareLikeDB.data.length; i++){
		shareLikes.push(shareLikeDB.data[i].id);
	}
    return {
      status: 0,
	  userInfo:{
		  token,
		  openid: userInfoDB.openid,
		  isAdmin: userInfoDB.openid === wxConfig.adminOpenid,
		  shareLikes
	  },
      msg: 'token验证成功'
    }
  }

  if (userInfoDB.exp < Date.now()) {
    return {
      status: -3,
      msg: 'token已失效'
    }
  }

  return {
    status: -2,
    msg: 'token无效'
  }

}

module.exports = {
  validateToken
}
