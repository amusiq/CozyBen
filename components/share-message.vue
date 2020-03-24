<template>
	<view class="share-msg-container">
		<view class="share-msg-datetime">
			<text class="datetime">{{shareMsg.createTime}}</text>
			<image class="more-btn" src="../static/images/more.png" mode="widthFix" />
		</view>
		<swiper class="image-swiper">
			<swiper-item v-for="img in shareMsg.images" :key="img">
				<image class="share-msg-img" :src="img" mode="aspectFill"/>
			</swiper-item>	
		</swiper>
		<view class="describe">
			<view class="describe-top">
				<text class="share-msg-title">{{shareMsg.title}}</text>
				<view>
					<image class="share-msg-opt" src="../static/images/heart.png" />
					<image class="share-msg-opt" src="../static/images/share.png" />
				</view>
			</view>
			<view class="share-msg-content">
				{{shareMsg.content}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			shareMsg: Object
		},
		
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.share-msg-container{
	width: 100%;
	background: #fff;
	margin-bottom: 20rpx;
	.share-msg-datetime{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 36rpx 30rpx;
		.datetime{
			font-size: 30rpx;
			color: #424242;
		}
		.more-btn{
			width: 6rpx;
		}
	}
	.image-swiper{
		height:400rpx;
	}
	.share-msg-img{
		width: 100%;
		height: 400rpx;
	}
	.describe{
		padding: 0 30rpx;
	}
	.describe-top{
		display: flex;
		justify-content: space-between;
		padding: 30rpx 0;
	}
	.share-msg-title{
		font-size: 34rpx;
		color: #424242;
		font-weight: bold;
	}
	.share-msg-content{
		color: #333;
		font-size: 30rpx;
		padding:30rpx 0;
		border-top:1rpx solid #F2F2F2;
	}
	.share-msg-opt{
		width:40rpx;
		height:40rpx;
		margin-left: 40rpx;
	}
}
</style>
