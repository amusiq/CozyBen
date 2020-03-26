const db = uniCloud.database()
async function getShareMessage(event) {
	const { start, limit, openid } = event;
	const collection = db.collection('share-message');
	const likeCollection = db.collection('share-likes');
	const dbCmd = db.command; // 取指令
	const countResult = await collection.where({title:dbCmd.neq(null)}).count();
	const hasMore = (start+1+limit) < countResult.total;
	let res = await collection.orderBy('createTime','desc').skip(start).limit(limit).get();
	res.hasMore = hasMore;
	for(let i = 0;i<res.data.length;i++){
		let isLike = false;
		const likeInfo = await likeCollection.where({ id: res.data[i]._id }).get();
		if(likeInfo.data.length !== 0 && openid){
			isLike = likeInfo.data[0].likes.includes(openid)
		}
		res.data[i].isLike = isLike
	}
	return res;
}

exports.main = getShareMessage
