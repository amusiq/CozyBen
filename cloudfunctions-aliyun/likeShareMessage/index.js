'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const db = uniCloud.database();
async function likeShareMessage(event) {
	const { _id, openid, isLike } = event;
	const shareCollection = db.collection('share-message');
	const collection = db.collection('share-likes');
	const dbCmd = db.command; // 取指令
	const shareLikesInDB = await collection.where({ id: _id }).get();
	if(shareLikesInDB.data.length === 0 && isLike){
		const likeRes = await collection.add({
		  id: _id,
		  likes: [openid]
		});
		if(likeRes.id || likeRes.updated === 1){
			return {
				status: 0,
				msg: '点赞成功'
			}
		} else {
			return {
				status: -1,
				msg: '点赞失败'
			}
		}
	} else if(shareLikesInDB.data.length !== 0) {
		const likesInDB = shareLikesInDB.data[0];
		const isHasOpenid = likesInDB.likes.some(item => item === openid);
		if(isHasOpenid && !isLike){
			const likeRes = await collection.where({ id: _id }).update({
				data:{
					likes: likesInDB.likes.splice(likesInDB.likes.findIndex(item => item === openid), 1)
				}
			});
			if(likeRes.id || likeRes.updated === 1){
				return {
					status: 0,
					msg: '取消点赞成功'
				}
			} else {
				return {
					status: -1,
					msg: '取消点赞失败'
				}
			}
		}else if(!isHasOpenid && isLike){
			const likeRes = await collection.where({ id: _id }).update({
				data:{
					likes: likesInDB.likes.push(openid)
				}
			});
			if(likeRes.id || likeRes.updated === 1){
				return {
					status: 0,
					msg: '点赞成功'
				}
			} else {
				return {
					status: 0,
					msg: '点赞失败'
				}
			}
		} else {
			return {
				status: -2,
				msg: '参数有误'
			}
		}
	}
}

var main = likeShareMessage;

var likeShareMessage_1 = {
	main: main
};

exports.default = likeShareMessage_1;
exports.main = main;
