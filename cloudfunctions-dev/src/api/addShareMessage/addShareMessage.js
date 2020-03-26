const db = uniCloud.database()
async function addShareMessage(event) {
	const collection = db.collection('share-message')
	const res = await collection.add(event)
	return res
}

exports.main = addShareMessage
