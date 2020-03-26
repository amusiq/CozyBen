'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const db = uniCloud.database();
async function addShareMessage(event) {
	const collection = db.collection('share-message');
	const res = await collection.add(event);
	return res
}

var main = addShareMessage;

var addShareMessage_1 = {
	main: main
};

exports.default = addShareMessage_1;
exports.main = main;
