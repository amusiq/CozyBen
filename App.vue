<script>
	import loginUtil from '@/utils/login';
	export default {
		onLaunch: function() {
			loginUtil.login();
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.bb-container{
		width:100%;
		height: 100vh;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}
	.bb-content{
		width:100%;
		flex:1;
		overflow: hidden;
		overflow-y: auto;
	}
</style>
