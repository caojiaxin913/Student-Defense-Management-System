<template>
	<view class="home">
		<view :class="[item.ishow?'unpload':'']" v-for="(item,index) in list" :key="index+1">
			<view class="main">
				<view class="title">
					<view>{{item.name}}</view>
					<image src="../static/unfold.png" mode="widthFix" @click="upload(item,index)" v-if="!item.ishow">
					</image>
				</view>
				<view class="section">
					<view class="Top">
						<view class="li" v-for="(items,indexs) in item.list" :key="indexs+2">
							<view class="time">{{items.time.split(' ')[0]}}
								<view>{{items.time.split(' ')[1]}}</view>
							</view>
							<image src="../static/garden.png" mode="widthFix" v-if="!items.succes"></image>
							<image src="../static/gardenA.png" mode="widthFix" v-else class="img"></image>
							<view class="main_a"
								:style="{'border':(indexs==0&&item.list.length==1)||indexs+1===item.list.length?'none':''}">
								<view>{{items.name1}}</view>
								<view>{{items.main}}</view>
							</view>
						</view>
						<image src="../static/packUp.png" mode="widthFix" class="close" @click="item.ishow=false">
						</image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			list: {
				type: Array,
				default: [],
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			upload(item,i){
				this.$emit('upload',item,i)
			},
		},
	}
</script>

<style lang="scss">
	.home {
		.unpload {
			.main {
				.section {
					max-height: 490rpx;
				}
			}
		}
		.main {
			background-color: #fff;
			margin:10rpx;
			border-radius: 10rpx;
			padding: 30rpx 35rpx;
			box-shadow: 1rpx 1rpx 7rpx #00557f;

			.title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #00557f;

				image {
					width: 25rpx;
					height: 26rpx;
				}
			}

			.section {
				overflow: hidden;
				max-height: 0rpx;
				transition: all 0.2s ease;

				.Top {
					padding-top: 20rpx;
				}

				.close {
					width: 25rpx;
					height: 26rpx;
					position: relative;
					left: 310rpx;
					top: 10rpx;
				}

				.li {
					display: flex;
					position: relative;
					justify-content: space-between;
				}

				.xian {
					position: absolute;
					left: 37.5%;
					top: 0%;
					z-index: 7;
					border: 0.5rpx solid #cccccc;
				}

				.time {
					width: 165rpx;
					// border:1px solid red;
					font-size: 28rpx;
					color: #999999;
				}

				.main_a {
					width: 350rpx;
					border-left: 0.5rpx solid #cccccc;
					padding-left: 45rpx;
					white-space: pre-wrap;
					word-break: break-all;
					margin-top: -1rpx;

					// border:1px solid red;
					:nth-child(odd) {
						font-size: 30rpx;
					}

					:nth-child(even) {
						padding: 10rpx 0rpx;
						font-size: 28rpx;
						color: #999999;
					}
				}

				.img {
					width: 30rpx;
					height: 30rpx;
					position: absolute;
					left: 31.5%;
					top: 1%;
				}

				image {
					width: 18rpx;
					height: 18rpx;
					position: absolute;
					left: 32.5%;
					top: 2%;
				}
			}
		}

	}
</style>
