<template>
	<view class="imageUploadContainer">
			<view class="imageUploadList">
				<view class="imageItem" v-bind:key="index" v-for="(path,index) in imageListData">
					<image :src="path" :class="{'dragging':isDragging(index)}" draggable="true" @tap="previewImage" :data-index="index" @touchstart="start" @touchmove.stop.prevent="move" @touchend="stop" mode="aspectFill" />
					<view v-if="isShowDel" class="imageDel" @tap="deleteImage" :data-index="index">x</view>
				</view>
				<view v-if="isShowAdd" class="imageUpload" @tap="selectImage">+</view>
			</view>
			<image v-if="showMoveImage" class="moveImage" :style="{left:posMoveImageLeft, top:posMoveImageTop}" :src="moveImagePath"></image>
		</view>
</template>

<script>
	export default {
		name:'image-upload',
		
		props: ['value','enableDel','enableAdd','enableDrag','formData','header', 'limit','fileKeyName'],
		
		data() {
			return {
				serverUrl:'',
				serverUrlDeleteImage:'',
				imageBasePos:{
					x0: -1,
					y0: -1,
					w:-1,
					h:-1,
				},
				showMoveImage: false,
				moveImagePath: '',
				moveLeft: 0,
				moveTop: 0,
				deltaLeft: 0,
				deltaTop: 0,
				dragIndex: null,
				targetImageIndex: null,
				imageList: [],
				isDestroyed: false
			};
		},
		
		mounted: function(){
			this.imageList = this.value
		},
				
		destroyed: function(){
			this.isDestroyed = true
		},
		
		computed:{
			imageListData: function(){
				if(this.value){
					return this.value
				}
			},
			posMoveImageLeft: function(){ 
				return this.moveLeft + 'px'
			},
			posMoveImageTop: function(){
				return this.moveTop + 'px'
			},
			isShowDel: function(){
				if(this.enableDel === false){
					return false
				}else{
					return true
				}
			},
			isShowAdd: function(){
				if(this.enableAdd === false){
					return false
				}
				
				if(this.limit && this.imageList.length >= this.limit){
					return false
				}
				
				return true
			},
			isDragable: function(){
				if(this.enableDrag === false){
					return false
				}else{
					return true
				}
			}
		},
		
		methods:{
			selectImage(){
				if(!this.imageList){
					this.imageList = []
				}
				
				new Promise((resolve, reject) => {
				  uni.chooseImage({
				    count: this.limit ? (this.limit - this.imageList.length) : 999,
				    success: res => {
						const filePath = res.tempFilePaths;
						//如果设置了limit限制，在web上count参数无效，这里做判断控制选择的数量是否合要求
						//在非微信小程序里，虽然可以选多张，但选择的结果会被截掉
						//在app里，会自动做选择数量的限制
						if(this.limit){
							const availableImageNumber = this.limit - this.imageList.length
							if(availableImageNumber < filePath.length){
								uni.showToast({
									title: '图片总数限制为'+this.limit+'张，当前还可以选'+availableImageNumber+'张',
									icon:'none',
									mask: false,
									duration: 2000
								});
								return
							}
						}
						
						const options = { filePath }
						
						resolve(options)
				    },
				    fail: () => {
						reject(new Error('Fail_Cancel'))
				    }
				  })
				}).then(async (options) => {
					uni.showLoading({ title: '文件上传中...' });
					const { filePath } = options;
					const remoteIndexStart = this.imageList.length - filePath.length;
					let promiseWorkList = filePath.map(item=>{
					  return uniCloud.uploadFile({ filePath: item });
					});
					Promise.all(promiseWorkList).then(res => {
						console.log(res,'Promise')
						uni.hideLoading()
						if(this.isDestroyed){
							return
						}
						
						res.forEach(item=>{
							this.imageList.push(item.fileID)
						});
						
						this.$emit('add', {
							currentImages: filePath,
							allImages: this.imageList
						})
						
						this.$emit('input', this.imageList)
					}).catch(err=>{
						uni.hideLoading()
						console.log(err);
						if (err.message !== 'Fail_Cancel') {
							uni.showModal({
							  content: `图片上传失败，错误信息为：${err.message}`,
							  showCancel: false
							})
						}
					});
				})
			},
			
			deleteImage: function(e){
				var imageIndex = e.currentTarget.dataset.index
				var deletedImagePath = this.imageList[imageIndex]
				this.imageList.splice(imageIndex, 1) 
				
				//检查删除图片的服务器地址是否设置，如果设置则调用API，在服务器端删除该图片
				if(this.serverUrlDeleteImage){
					uni.request({
						url: this.serverUrlDeleteImage,
						method: 'GET',
						data: {
							imagePath: deletedImagePath
						},
						success: res => {
							console.log(res.data)
						}
					});
				}
				
				this.$emit('delete',{
					currentImage: deletedImagePath,
					allImages: this.imageList
				})
				this.$emit('input', this.imageList)
			},
			
			previewImage: function(e){
				var imageIndex = e.currentTarget.dataset.index
				uni.previewImage({
					current: this.imageList[imageIndex],
					indicator: "number",
					loop: "true",
					urls:this.imageList
				})
			},
			
			initImageBasePos: function(){
				let paddingRate = 0.024
				var _self = this
				//计算图片基准位置
				uni.getSystemInfo({
					success: function(obj) {
						let screenWidth = obj.screenWidth
						let leftPadding = Math.ceil(paddingRate * screenWidth)
						let imageWidth = Math.ceil((screenWidth - 2*leftPadding)/4)
						
						_self.imageBasePos.x0 = leftPadding
						_self.imageBasePos.w = imageWidth
						_self.imageBasePos.h = imageWidth
					}
				})
			},
			
			findOverlapImage: function(posX, posY){
				let rows = Math.floor((posX-this.imageBasePos.x0)/this.imageBasePos.w)
				let cols = Math.floor((posY-this.imageBasePos.y0)/this.imageBasePos.h)
				let indx = cols*4 + rows
				return indx
			},
			
			isDragging: function(indx){
				return this.dragIndex === indx
			},
			
			start: function(e){
				console.log(this.isDragable)
				if(!this.isDragable){
					return
				}
				this.dragIndex = e.currentTarget.dataset.index
				this.moveImagePath = this.imageList[this.dragIndex]
				this.showMoveImage = true
				
				//计算纵向图片基准位置
				if(this.imageBasePos.y0 === -1){
					this.initImageBasePos()
					
					let basePosY = Math.floor(this.dragIndex / 4) * this.imageBasePos.h
					let currentImageOffsetTop = e.currentTarget.offsetTop
					this.imageBasePos.y0 = currentImageOffsetTop - basePosY
				}
				
				//设置选中图片当前左上角的坐标
				this.moveLeft = e.target.offsetLeft
				this.moveTop = e.target.offsetTop
			},
			
			move: function(e){
				if(!this.isDragable){
					return
				}
				const touch = e.touches[0]
				this.targetImageIndex = this.findOverlapImage(touch.clientX, touch.clientY)
				
				//初始化deltaLeft/deltaTop
				if(this.deltaLeft === 0){
					this.deltaLeft = touch.clientX - this.moveLeft
					this.deltaTop = touch.clientY - this.moveTop 
				}
				
				//设置移动图片位置
				this.moveLeft = touch.clientX - this.deltaLeft
				this.moveTop = touch.clientY - this.deltaTop
			},
			
			stop: function(e){
				if(!this.isDragable){
					return
				}
				if(this.dragIndex !== null && this.targetImageIndex !== null){
					if(this.targetImageIndex<0){
						this.targetImageIndex = 0
					}
				
					if(this.targetImageIndex>=this.imageList.length){
						this.targetImageIndex = this.imageList.length-1
					}
					//交换图片
					if(this.dragIndex !== this.targetImageIndex){
						this.imageList[this.dragIndex] = this.imageList[this.targetImageIndex]
						this.imageList[this.targetImageIndex] = this.moveImagePath
					}
				}
				
				this.dragIndex = null
				this.targetImageIndex = null
				this.deltaLeft = 0
				this.deltaTop = 0
				this.showMoveImage = false
				
				this.$emit('input', this.imageList)
			}
		}
	}
</script>

<style lang="scss">
	.imageUploadContainer{
		padding: 10rpx 5rpx;
		margin: 10rpx 5rpx;
	}

	.dragging{
		transform: scale(1.2)
	}

	.imageUploadList{
		display: flex;
		flex-wrap: wrap;
	}

	.imageItem, .imageUpload{
		width: 160rpx;
		height: 160rpx;
		margin: 10rpx;
	}

	.imageDel{
		position: relative;
		left: 120rpx;
		bottom: 165rpx;
		background-color: rgba(0,0,0,0.5);
		width: 36rpx;
		text-align: center;
		line-height: 35rpx;
		border-radius: 17rpx;
		color: white;
		font-size: 30rpx;
		padding-bottom: 2rpx;
	}

	.imageItem image, .moveImage{
		width: 160rpx;
		height: 160rpx;
		border-radius: 8rpx;
	}

	.imageUpload{
		line-height: 130rpx;
		text-align: center;
		font-size: 150rpx;
		color: #D9D9D9;
		border: 1px solid #D9D9D9;
		border-radius: 8rpx;
	}

	.moveImage{
		position: absolute;
	}
</style>
