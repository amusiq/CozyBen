<template>
	<view class="diary-container">
		<image class="diary-banner" src="../../static/blue.jpg" mode="widthFix"/>
		<view class="diary-block" v-for="item in diaryList" :key="item.id">
			<view class="month">{{item.month}}</view>
			<view class="diary" v-for="diary in item.diary" :key="diary.id">
				<view class="diary-detail">
					<text class="diary-title">{{diary.title}}</text>
					<view class="diary-other-info">
						<view class="diary-other-info__item">
							<image class="diary-icon" src="../../static/images/clock.png"/>
							<text>{{diary.datetime}}</text>
						</view>
						<view class="diary-other-info__item">
							<image class="diary-icon" src="../../static/images/heart.png"/>
							<text>{{diary.likes}}</text>
						</view>
						<view class="diary-other-info__item">
							<image class="diary-icon" src="../../static/images/share.png"/>
							<text>{{diary.shares}}</text>
						</view>
					</view>
				</view>
				<image class="diary-img" src='../../static/blue.jpg' mode="aspectFill"/>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				diaryList:[
					{
						id: 1,
						month: '三月',
						diary: [
							{
								id:'d1',
								title:'今天终于可以出去玩了挺开心的了隔离14天人都废了',
								images:'',
								datetime:'2020.03.08',
								likes:0,
								shares:3
							},{
								id:'d2',
								title:'今天拍了张好看的照片',
								images:'',
								datetime:'2020.03.07',
								likes:0,
								shares:3
							},{
								id:'d3',
								title:'今天看了一部电影',
								images:'',
								datetime:'2020.03.07',
								likes:10,
								shares:30
							}
						],
					},
					{
						id: 2,
						month: '二月',
						diary: [
							{
								id:'d1',
								title:'今天终于可以出去玩了挺开心的了隔离14天人都废了',
								images:'',
								datetime:'2020.03.08',
								likes:0,
								shares:3
							},{
								id:'d2',
								title:'今天拍了张好看的照片',
								images:'',
								datetime:'2020.03.07',
								likes:0,
								shares:3
							},{
								id:'d3',
								title:'今天看了一部电影',
								images:'',
								datetime:'2020.03.07',
								likes:10,
								shares:30
							}
						],
					}
				]
			};
		}
	}
</script>

<style lang="scss">
	.diary-container{
		.diary-banner{
			width:100%;
		}
		.diary-block{
			margin-bottom: 40rpx;
			.month{
				padding: 30rpx;
				font-size: 48rpx;
				font-weight: bold;
				color: #424242;
			}
			.diary{
				width: 100%;
				padding: 30rpx;
				box-sizing: border-box;
				display: flex;
				border-bottom:1rpx solid #F2F2F2;
			}
			.diary-detail{
				flex:1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
			.diary-other-info{
				display: flex;
				font-size: 26rpx;
				color: #666;
				&__item{
					display: flex;
					align-items: center;
					margin-right: 30rpx;
				}
			}
			.diary-title{
				color: #424242;
			}
			.diary-img{
				width:160rpx;
				height:140rpx;
				border-radius: 4rpx;
				margin-left: 30rpx;
			}
			.diary-icon{
				width:26rpx;
				height:26rpx;
				margin-right: 10rpx;
			}
		}
	}
</style>
