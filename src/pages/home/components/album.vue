<template>
  <scroll-view
    scroll-y
    v-if="banner.length > 0"
    @scrolltolower="handleScrollToLower"
    class="album_view"
  >
    <!-- 轮播图 -->
    <view class="swiper_wrap">
      <!-- 
            1 swiper 
            默认的高度 150px
            2 image
            默认的宽度:  320px => 在基本样式中重置了 100%
            默认高度 24px
            3 计算图片的宽度和高度比例
            4 把图片的比例也写到swiper标签样式中
         -->
      <swiper indicator-dots autoplay interval="3000" duration="500">
        <block v-for="item in banner" :key="item.id">
          <swiper-item>
            <image :src="item.thumb"></image>
          </swiper-item>
        </block>
      </swiper>
    </view>
    <!-- 列表 -->
    <view class="list">
      <navigator class="item" v-for="item in album" :key="item.id" :url="`/pages/album/detail?id=${item.id}`">
        <image :src="item.cover"> </image>
        <view class="right">
          <view class="title">{{ item.name }}</view>
          <view class="subTitle">{{ item.desc }}</view>
          <view class="button">
            <view class="attention">+关注</view>
          </view>
        </view>
      </navigator>
    </view>
  </scroll-view>
</template>

<script>
export default {
  data() {
    return {
      banner: [],
      album: [],
      params: {
        limit: 30,
        order: "new",
        skip: 0,
      },
      hasMore: true,
    };
  },
  mounted() {
    uni.setNavigationBarTitle({
      title: "专辑",
    });

    this.getData();
  },
  methods: {
    getData() {
      this.request({
        url: this.api.queryAlbumList,
        data: this.params,
      }).then((result) => {
        const { banner = [], album = [] } = result.res;
        if (this.banner.length === 0) {
          this.banner = banner;
        }
        if (album.length > 0) {
          this.album = [...this.album, ...album];
        } else {
          this.hasMore = false;
        }
      });
    },
    handleScrollToLower() {
      this.params.skip += this.params.limit;
      if (this.hasMore) {
        this.getData();
      } else {
        uni.showToast({
          icon: "none",
          title: "我也是有底线的",
        });
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.album_view {
  height: calc(100vh - 36px);
}
.swiper_wrap {
  swiper {
    height: calc(750rpx / 2.3);
    image {
      width: 100%;
      height: 100%;
    }
  }
}

.list {
  width: 100%;
  .item {
    display: flex;
    flex-direction: row;
    padding: 10rpx;
    border-bottom: 1rpx solid #cccccc;
    image {
      width: 200rpx;
      height: 200rpx;
    }
    .right {
      flex: 2;
      padding: 0 10rpx;
      overflow: hidden;
      .title {
        font-size: 30rpx;
        padding: 10rpx 0;
      }
      .subTitle {
        font-size: 24rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .button {
        margin-top: 10rpx;
        padding: 10rpx;
        display: flex;
        justify-content: flex-end;
        font-size: 24rpx;
        font-weight: bold;
        .attention {
          color: $main_color;
          border: 1rpx solid $main_color;
          padding: 10rpx;
        }
      }
    }
  }
}
</style>
