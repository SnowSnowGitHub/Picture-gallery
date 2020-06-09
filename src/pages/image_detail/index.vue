<template>
  <view class="container">
    <view class="top">
      <view class="title">
        <view class="icon">
          <image :src="imageInfo.user.avatar" mode="widthFix"></image>
        </view>
        <view class="info">
          <view class="name">{{ imageInfo.user.name }}</view>
          <view class="atime">{{ imageInfo.newTime }}</view>
        </view>
      </view>
      <view class="poster">
        <swiper-action :index="imageIndex" @swiperAction="handleSwiperAction">
          <image :src="imageInfo.newThumb" mode="widthFix"></image>
        </swiper-action>
      </view>
      <view class="rank">
        <view class="left">{{ imageInfo.rank }}</view>
        <view class="right">收藏</view>
      </view>
    </view>
    <view class="download" @click="handleDownload">
      下载图片
    </view>
  </view>
</template>

<script>
import moment from "moment";
import swiperAction from "../components/swiperAction";
moment.locale("zh-cn"); //设置为中文

export default {
  components: {
    swiperAction,
  },
  data() {
    return {
      imageInfo: {
        user: {},
      },
      imageIndex: 0,
    };
  },
  onLoad() {
    const { imageIndex = 0 } = getApp().globalData;
    this.imageIndex = imageIndex;
    this.getData();
  },
  methods: {
    async handleDownload(){
      const { imageList = [] } = getApp().globalData;
      const imageUrl= imageList[this.imageIndex].thumb
      const res1 = await uni.downloadFile({url: imageUrl})
      const { tempFilePath: filePath = ''}= res1[1]
      const res2 = await uni.saveImageToPhotosAlbum({filePath})
    },
    getData() {
      const { imageList = [] } = getApp().globalData;
      this.imageInfo = imageList[this.imageIndex];
      this.imageInfo.newTime = moment(this.imageInfo.atime * 1000).fromNow();
      this.imageInfo.newThumb =
        this.imageInfo.thumb + this.imageInfo.rule.replace("$<Height>", 360);
    },
    handleSwiperAction(params) {
      const { direction = "" } = params;
      const { imageList = [] } = getApp().globalData;
      if (direction === "left" && this.imageIndex > 0) {
        this.imageIndex--;
        
        this.getData();
      }
      if (direction === "right" && this.imageIndex < imageList.length - 1) {
        this.imageIndex++;
        this.getData();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  .top {
    .title {
      width: 100%;
      padding: 15rpx 10rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      .icon {
        width: 90rpx;
        margin-right: 16rpx;
        image {
          width: 100%;
          border-radius: 50%;
        }
      }
      .info {
        .atime {
          font-size: 24rpx;
        }
      }
    }
    .rank {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 12rpx;
      font-size: 24rpx;
      .left,
      .right {
        flex: 1;
        text-align: center;
      }
    }
  }
  .download{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 80rpx;
    background: $main_color;
    text-align: center;
    line-height: 80rpx;
    color: white;
    font-weight: bold;
  }
}
</style>
