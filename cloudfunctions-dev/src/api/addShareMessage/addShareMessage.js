const {
  validateToken
} = require('../../utils/validateToken.js')

const db = uniCloud.database()
async function addShareMessage(event) {
	const checkRes = await validateToken(event.token);
	if(checkRes.status !== 0) return checkRes;
	if(!checkRes.userInfo.isAdmin) return {
		status: 500,
		msg:'无权限'
	};
	const collection = db.collection('share-message')
	const res = await collection.add(event)
	if(res.id){
		return {
			status:0,
			msg:'添加成功',
			data:res
		}
	} else {
		return {
			status:1,
			msg:'添加失败',
			data:res
		}
	}
}

exports.main = addShareMessage
