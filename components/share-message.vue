<template>
	<view class="share-msg-container">
		<view class="share-msg-datetime">
			<text class="datetime">{{shareMsg.createTime}}</text>
			<image class="more-btn" src="../static/images/more.png" mode="widthFix" />
		</view>
		<swiper class="image-swiper" :current="current" :indicator-dots="indicatorDots" @change="onChangeCurrent">
			<swiper-item v-for="img in shareMsg.images" :key="img">
				<image class="share-msg-img" :src="img" mode="aspectFill" @click="onPreview"/>
			</swiper-item>	
		</swiper>
		<view class="describe">
			<view class="describe-top">
				<text class="share-msg-title">{{shareMsg.title}}</text>
				<view>
					<image class="share-msg-opt" :src="shareMsg.isLike ? '../static/images/heart-active.png' : '../static/images/heart.png'" @click="onLike"/>
					<button class="share-btn" open-type="share" :data-data="shareMsg">
						<image class="share-btn__icon" src="../static/images/share.png" @click="onShare"/>
					</button>
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
		
		computed:{
			indicatorDots(){
				return this.shareMsg.images.length > 1;
			}
		},
		
		data() {
			return {
				current: 0
			};
		},
		
		methods:{
			onChangeCurrent(e){
				this.current = e.detail.current;
			},
			onPreview(){
				const { images } = this.shareMsg;
				uni.previewImage({
					current: this.current,
					urls: images
				});
			},
			async onLike(){
				const validateRes = await uniCloud.callFunction({
				  name: 'validateToken',
				  data: {
				    token: uni.getStorageSync('token') // token最好不要每次从storage内取，本示例为了简化演示代码才这么写
				  }
				});
				if(validateRes.result.status === 0){
					this.$emit('onLike',{ _id: this.shareMsg._id, isLike: !isLike });
					const { _id, isLike } = this.shareMsg;
					const res = await uniCloud.callFunction({
					  	name:'likeShareMessage',
						data:{
							_id,
							openid: validateRes.result.openid,
							isLike: !isLike
						}
					});
					if(res.result.status !== 0){
						this.$emit('onLike',{ _id: this.shareMsg._id, isLike });
					}
				}else{
					uni.showModal({
					    content: '还没登录呢，还没登录呢',
					    showCancel: false
					})
				}
				console.log(validateRes,'validateRes')
				// uniCloud.callFunction({
				//   name: 'validateToken',
				//   data: {
				//     token: uni.getStorageSync('token') // token最好不要每次从storage内取，本示例为了简化演示代码才这么写
				//   }
				// }).then((res) => {
				//   console.log(res);
				//   const { _id, isLike } = this.shareMsg;
				//   uniCloud.callFunction({
				//   	name:'likeShareMessage',
				// 	data:{
				// 		_id,
				// 		openid: res.openid,
				// 		isLike: !isLike
				// 	}
				//   }).then(likeRes=>{
				// 	  console.log('点赞函数调用成功')
				//   })
				// }).catch((err) => {
				//   uni.showModal({
				//     content: '还没登录呢，还没登录呢',
				//     showCancel: false
				//   })
				// })
			}
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
		height:750rpx;
	}
	.share-msg-img{
		width: 100%;
		height: 750rpx;
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
	.share-btn{
		display: inline-block;
		border: 0;
		padding:0;
		width:40rpx;
		height:40rpx;
		margin-left: 40rpx;
		line-height: 0;
		border-radius: 0;
		background-color: transparent;
		&::after{
			content:'';
			border:0;
		}
		&__icon{
			width:40rpx;
			height:40rpx;
		}
	}
}
</style>
