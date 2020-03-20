<template>
	<view class="home-container">
		<share-message v-for="(shareMsg,shareMsgIdx) in shareMsgList" :shareMsg="shareMsg" :key="shareMsgIdx"/>
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
				shareMsgList: []
			}
		},
		
		onLoad() {
			this.getShareMsg();
		},
		
		methods: {
			// 获取分享列表信息
			getShareMsg(){
				const db = wx.cloud.database();
				db.collection('shareMessages').get({
				  success:(res)=> {
					this.shareMsgList = this.formatShareMsg(res.data);
				  }
				});
			},
			// 处理分享列表信息
			formatShareMsg(shareMsgList){
				return shareMsgList.map(item=>{
					return {
						...item,
						datetime:dayjs(item.dateTime).format('YYYY/M/D')
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
