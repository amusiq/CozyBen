<template>
	<view class="editing-container bb-container">
		<view class="bb-content">
			<image-upload />
			<view class="title-input-box">
				<input type="text" placeholder="写下标题获得更多赞哦~">
			</view>
			<view class="content-textarea-box">
				<textarea value="" placeholder="写下此时此刻的想法..." />
			</view>
		</view>
		<view class="send-btn">
			发送
		</view>
	</view>
</template>

<script>
	import imageUpload from '@/components/image-upload.vue'
	export default {
		components:{
			imageUpload
		},
		
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.editing-container{
		.title-input-box{
			padding: 30rpx;
			border-top:1px solid #F2F2F2;
			border-bottom:1px solid #F2F2F2;
		}
		.content-textarea-box{
			padding:30rpx;
		}
		.send-btn{
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			color: #fff;
			background: #525252;
			text-align: center;
		}
	}
</style>
