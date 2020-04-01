<template>
	<view class="editing-container bb-container">
		<view class="bb-content">
			<image-upload v-model="imageData" :limit="limitNumber"/>
			<view class="title-input-box">
				<input class="title-input" placeholder-class="input-placeholder" :value="title" type="text" placeholder="写下标题获得更多赞哦~" maxlength="20" @input="onInputTitle" />
			</view>
			<view class="content-textarea-box">
				<textarea class="content-textarea" placeholder-class="textarea-placeholder" :value="content" placeholder="写下此时此刻的想法..." @input="onInputContent"/>
			</view>
		</view>
		<view class="send-btn" @click="sendMsg">
			发送
		</view>
	</view>
</template>

<script>
	import imageUpload from '@/components/image-upload.vue';
	import request from '@/utils/request.js';
	
	export default {
		components:{
			imageUpload
		},
		
		data() {
			return {
				limitNumber:9,
				enableDrag:true,
				imageData:[],
				title:'',
				content:''
			};
		},
		
		methods:{
			onInputTitle:function(e){
				setTimeout(() => { this.title = e.detail.value }, 0);
			},
			onInputContent:function(e){
				setTimeout(() => { this.content = e.detail.value }, 0);
			},
			sendMsg:async function(){
				if(this.imageData.length < 1){
					return uni.showToast({
						title:'请至少上传一张照片',
						icon:'none'
					})
				}
				uni.showLoading({ title: '处理中...' });
				const data ={
					title: this.title,
					content:this.content,
					images:this.imageData,
					createTime: Date.now()
				}
				const res = await request({
				  name: 'addShareMessage',
				  data,
				  needLogin: 1
				});
				uni.hideLoading();
				if(res.status === 0){
					uni.showModal({
					  content: `发送成功`,
					  showCancel: false,
						success:(modalRes)=>{
							if(modalRes.confirm) uni.navigateBack()
						}
					})
				} else {
					uni.showModal({
					  content: `添加数据失败，错误信息为：${res.msg}`,
					  showCancel: false
					})
				}
			}
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
			padding:20rpx; // 真机下textarea有10rpx的padding
		}
		.send-btn{
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			color: #fff;
			background: #525252;
			text-align: center;
		}
		.title-input,.content-textarea{
			font-size: 30rpx;
		}
		.input-placeholder,.textarea-placeholder{
			color:#A9A9A9;
			font-size: 30rpx;
		}
	}
</style>
