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
	return res
}

exports.main = addShareMessage
