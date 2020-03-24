<template>
	<view class="home-container">
		<share-message v-for="(shareMsg,shareMsgIdx) in shareMsgData.list" :shareMsg="shareMsg" :key="shareMsgIdx" @onPreview="onPreview"/>
		<image class="add-btn" @click="goAdd" src="../../static/images/add.png" mode="widthFix" />
	</view>
</template>

<script>
	import shareMessage from '@/components/share-message';
	import dayjs from 'dayjs';
	export default {
		components:{
			'share-message':shareMessage
		},
		
		data() {
			return {
				shareMsgData:{
					list:[],
					hasMore:true,
					limit:5
				},
				shareMsgList: []
			}
		},
		
		onLoad() {
			this.getShareMsg(true);
		},
		
		// 下拉刷新
		async onPullDownRefresh() {
			await this.getShareMsg(true);
			uni.stopPullDownRefresh();
		},
		
		// 滑动底部加载
		onReachBottom() {
			this.getShareMsg();
		},
		
		// 分享
		onShareAppMessage(res) {
			const data = {
				title: '#"COZYBEN"#',
				path: '/pages/index/index'
			}
			if (res.from === 'button') {// 来自页面内分享按钮
				data.imageUrl = res.target.dataset.data.images[0];
			}
			return data
		},
		
		methods: {
			// 获取分享列表信息
			getShareMsg(fresh){
				uni.showLoading({ title: '全力加载中...' });
				if (fresh) this.shareMsgData = { hasMore: true, list: [], limit: 5 };
				const { hasMore, list, limit } = this.shareMsgData;
				if (!hasMore) return;
				uniCloud.callFunction({
				  name: 'getShareMessage',
				  data:{
					  start: list.length,
					  limit: limit
				  }
				}).then((res) => {
				  uni.hideLoading();
				  this.shareMsgData.hasMore = res.result.hasMore;
				  this.shareMsgData.list = list.concat(this.formatShareMsg(res.result.data));
				}).catch((err) => {
				  uni.hideLoading();
				  uni.showModal({
				    content: `查询失败，错误信息为：${err.message}`,
				    showCancel: false
				  });
				  console.error(err);
				});
			},
			// 处理分享列表信息
			formatShareMsg(shareMsgList){
				return shareMsgList.map(item=>{
					return {
						...item,
						createTime:dayjs(item.createTime).format('YYYY/M/D')
					}
				});
			},
			goAdd(){
				uni.navigateTo({
					url:'../editing/editing'
				})
			}
		}
	}
</script>

<style lang="scss">
	.home-container{
		position: relative;
		min-height: 100vh;
		background: #F2F2F2;
		.add-btn{
			position: fixed;
			right:0;
			bottom: 40rpx;
			width: 140rpx;
			height: 140rpx;
		}
	}
</style>
