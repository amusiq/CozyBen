<template>
	<view class="home-container">
		<share-message v-for="(shareMsg,shareMsgIdx) in shareMsgData.list" :shareMsg="shareMsg" :openid="openid" :key="shareMsgIdx" :shareLikes="shareLikes" @onLike="onLike"  />
		<image v-if="isAdmin" class="add-btn" @click="goAdd" src="../../static/images/add.png" mode="widthFix" />
	</view>
</template>

<script>
	import shareMessage from '@/components/share-message';
	import request from '@/utils/request.js';
	import { mapState, mapMutations } from 'vuex';
	import dayjs from 'dayjs';
	const app = getApp();
	
	export default {
		components:{
			'share-message':shareMessage
		},
		
		computed:{
			...mapState({
				isAdmin: state => state.userStore.isAdmin,
				shareLikes: state => state.userStore.shareLikes
			}),
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
			console.log('xxxx')
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
			async getShareMsg(fresh){
				uni.showLoading({ title: '全力加载中...' });
				if (fresh) this.shareMsgData = { hasMore: true, list: [], limit: 5 };
				const { hasMore, list, limit } = this.shareMsgData;
				if (!hasMore) return uni.hideLoading();
				const data = {
					start: list.length,
					limit: limit
				};
				console.log(this.openid,'this.openid')
				if(this.openid){ data.openid = this.openid; } 
				const res = await request({ name: 'getShareMessage', data });
				uni.hideLoading();
				if(res.data){
					this.shareMsgData.hasMore = res.hasMore;
					this.shareMsgData.list = list.concat(this.formatShareMsg(res.data));
				} else {
					uni.showModal({
					  content: `查询失败`,
					  showCancel: false
					});
				}
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
			},
			onLike(data){
				if(data.isLike){
					this.shareLikes.push(data._id);
					// this.setShareLikes()
				} else {
					this.shareLikes.splice(this.shareLikes.findIndex(item => item === data._id), 1)
				}
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
