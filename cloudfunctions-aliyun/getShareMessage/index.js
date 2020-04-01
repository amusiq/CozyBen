'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const db = uniCloud.database();
async function getShareMessage(event) {
	const { start, limit } = event;
	const collection = db.collection('share-message');
	const dbCmd = db.command; // 取指令
	const countResult = await collection.where({title:dbCmd.neq(null)}).count();
	const hasMore = (start+1+limit) < countResult.total;
	let res = await collection.orderBy('createTime','desc').skip(start).limit(limit).get();
	res.hasMore = hasMore;
	if(res.data){
		res.status = 0;
		res.msg = '查询成功';
	} else {
		res.status = -1;
		res.msg = '查询失败';
	}
	return res;
}

var main = getShareMessage;

var getShareMessage_1 = {
	main: main
};

exports.default = getShareMessage_1;
exports.main = main;
