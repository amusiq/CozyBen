'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
  //event为客户端上传的参数
  const { start, limit } = event;
  const collection = db.collection('share-message');
  const dbCmd = db.command; // 取指令
  const countResult = await collection.where({title:dbCmd.neq(null)}).count();
  const hasMore = (start+1+limit) < countResult.total;
  let res = await collection.orderBy('createTime','desc').skip(start).limit(limit).get();
  res.hasMore = hasMore;
  return res;
};
