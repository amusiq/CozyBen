<template>
	<view class="about-container">
		<view class="author-card">
			<image class="author-card__bg" src="../../static/images/card-bg.png"/>
			<view class="author-card-inner">
				<image class="author-card__avatar" src="../../static/blue.jpg" mode="aspectFill"/>
				<text class="author-card__name">BEN ZHENG</text>
				<view class="contact-btn">contact</view>
			</view>
		</view>
		<view class="author-detail">
			<view class="author-detail__title">
				个人介绍
			</view>
			<view class="author-detail__subTitle">
				求职意向
			</view>
			<view class="author-detail__info">
				<view>
					<text class="label">期望岗位：</text>
					<text class="content">前端工程师</text>
				</view>
				<view>
					<text class="label">期望薪资：</text>
					<text class="content">面议</text>
				</view>
			</view>
			<view class="author-detail__subTitle">
				教育经历
			</view>
			<view class="author-detail__info">
				<view>
					<text class="label">毕业院校：</text>
					<text class="content">广东海洋大学</text>
				</view>
				<view>
					<text class="label">专业：</text>
					<text class="content">计算机科学与技术专业</text>
				</view><view>
					<text class="label">教育程度：</text>
					<text class="content">2014届本科生</text>
				</view>
			</view>
			<view class="author-detail__subTitle">
				职业技能
			</view>
			<view class="author-detail__info">
				<text class="content">WEB前端开发、小程序开发</text>
			</view>
			<view class="author-detail__title">
				项目作品
			</view>
			<view class="author-detail__subTitle">
				微信小程序
			</view>
			<view>
				<view class="wxapp-item">
					<image class="wxapp-item__headimg" src="../../static/images/distinct.png"/>
					<text class="wxapp-item__text">卓正医疗</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.about-container{
		.author-card{
			position: relative;
			display: flex;
			width:100%;
			height: 460rpx;
			&-inner{
				margin:auto;
				display: flex;
				align-items: center;
				flex-direction: column;
			}
			&__bg{
				width: 100%;
				height: 100%;
				position: absolute;
				z-index: -1;
				top:0;
				left:0;
				bottom:0;
				right:0;
			}
			&__avatar{
				width:119rpx;
				height:119rpx;
				border:1rpx solid #fff;
				border-radius: 50%;
			}
			&__name{
				font-size: 30rpx;
				font-weight: bold;
				color: #fff;
				margin-top: 28rpx;
			}
			.contact-btn{
				width: 208rpx;
				height: 60rpx;
				line-height: 60rpx;
				background: #fff;
				color: #131211;
				font-size: 30rpx;
				font-weight: bold;
				text-align: center;
				border-radius: 30rpx;
				margin-top: 52rpx;
			}
		}
		.author-detail{
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			padding: 39rpx 34rpx;
			&__title{
				position: relative;
				font-size: 36rpx;
				font-weight: bold;
				color: #424242;
				margin-bottom: 48rpx;
				&::after{
					content: '';
					position: absolute;
					left:0;
					bottom:4rpx;
					width: 100%;
					height: 10rpx;
					background: rgba(242, 184, 8, 0.37);
				}
			}
			&__subTitle{
				font-size: 32rpx;
				font-weight: bold;
				color: #424242;
				&::after{
					content:'';
					display: block;
					width: 100%;
					height:1px;
					margin-top: 14rpx;
					margin-bottom: 30rpx;
					background:rgba(66, 66, 66, 0.5);
				}
			}
			&__info{
				margin-bottom: 60rpx;
				.label{
					font-size: 28rpx;
					font-weight: bold;
					color:#424242;
				}
				.content{
					font-size: 28rpx;
					color: #666;
				}
			}
			.wxapp-item{
				display: flex;
				flex-direction: column;
				align-items: center;
				&__headimg{
					width:100rpx;
					height:100rpx;
					border-radius: 50%;
				}
				&__text{
					margin-top: 20rpx;
					font-size: 28rpx;
					color: #666;
				}
			}
		}
	}
</style>
