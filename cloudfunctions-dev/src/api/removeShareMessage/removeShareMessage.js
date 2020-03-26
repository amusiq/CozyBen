const db = uniCloud.database()
async function removeShareMessage(event) {
	const collection = db.collection('share-Message')
	const docList = await collection.limit(1).get()
	if (!docList.data || docList.data.length === 0) {
		return {
		  status: -1,
		  msg: '集合share-Message内没有数据'
		}
	}
	const res = await collection.doc(event._id).remove()
	if (res.deleted === 1) {
		return {
		  status: 0,
		  msg: '成功删除'
		}
	} else {
		return {
		  status: -2,
		  msg: '删除数据失败'
		}
	}
}

exports.main = removeShareMessage
