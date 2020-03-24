'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
  //event为客户端上传的参数
  const collection = db.collection('share-message')
  const res = await collection.add(event)
  return res
};
