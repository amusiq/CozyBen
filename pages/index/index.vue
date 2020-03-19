<template>
	<view class="home-container">
		<share-message v-for="(shareMsg,shareMsgIdx) in shareMsgList" :shareMsg="shareMsg" :key="shareMsgIdx"/>
	</view>
</template>

<script>
	import shareMessage from '@/components/share-message'
	export default {
		components:{
			'share-message':shareMessage
		},
		data() {
			return {
				shareMsgList: [{
					id:1,
					datetime:'2020/3/8',
					images:['/static/blue.jpg'],
					title:'it is title',	
					content:'it is content'
				},{
					id:2,
					datetime:'2020/3/7',
					images:['/static/blue.jpg'],
					title:'it is title2',
					content:'it is content2'
				}]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.home-container{
		min-height: 100vh;
		background: #F2F2F2;
	}
</style>
