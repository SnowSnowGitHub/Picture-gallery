<template>
  <view class="container">
    <image :src="videoObj.img" class="bg_img"></image>
    <view class="tool">
      <view
        @click="changeVoice"
        :class="[
          'voice',
          'iconfont',
          muted ? 'icon-guanbiyinliang' : 'icon-voice',
        ]"
      ></view>
      <view class="zhuanfa iconfont icon-zhuanfa">
        <button open-type="share"></button>
      </view>
    </view>
    <video :muted="muted" :src="videoObj.video" objectFit="Fill"></video>
    <view class="download" @click="handleDownload">
      下载高清
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      muted: false,
      videoObj: {},
    };
  },
  onLoad() {
    this.videoObj = getApp().globalData.video;
  },
  methods: {
    changeVoice() {
      this.muted = !this.muted;
    },
   async handleDownload(){
      await uni.showLoading({title: '下载中'})
      // TODO: 使用 uni.downloadFile 下载文件大小有限制
      const { tempFilePath:filePath='' } = (await uni.downloadFile({url: this.videoObj.video}))[1]
      await uni.saveImageToPhotosAlbum({filePath})
      uni.hideLoading()
      await uni.showToast({title: '下载成功'})
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  .bg_img {
    position: absolute;
    width: 100%;
    height: 100%;
    filter: blur(20rpx);
    z-index: -1;
  }
  .tool {
    padding: 10rpx;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    .iconfont {
      width: 60rpx;
      height: 60rpx;
      border-radius: 50%;
      line-height: 60rpx;
      text-align: center;
      background: rgba(0, 0, 0, 0.3);
      margin-right: 8rpx;
      color: white;
    }
    .iconfont.zhuanfa {
      position: relative;
      button {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
  }
  video {
    margin-top: 20rpx;
    margin-left: 50%;
    transform: translateX(-50%);
    height: 600rpx;
    width: 360rpx;
  }
  .download {
    margin-top: 20rpx;
    margin-left: 50%;
    transform: translateX(-50%);
    width: 400rpx;
    height: 60rpx;
    line-height: 60rpx;
    text-align: center;
    border: 2rpx solid white;
    border-radius: 30rpx;
    background: rgba(0, 0, 0, 0.3);
    color: white;
  }
}
</style>
