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
	const formatData = res.data.map(item=>{
		const likeInfo = likeCollection.where({ id: item._id }).get();
		let isLike = false;
		if(likeInfo.data.length !==0 && openid){
			isLike = likeInfo.likes.includes(openid)
		}
		return {
			...item,
			isLike
		}
	});
	res.data = formatData;
	return res;
}

exports.main = getShareMessage
