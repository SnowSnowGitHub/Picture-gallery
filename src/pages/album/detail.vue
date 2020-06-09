<template>
  <view class="detail_view">
    <view class="top">
      <image :src="album.cover" mode="widthFix"></image>
      <view class="desc">
        {{ album.desc || '' }}
      </view>
    </view>
    <view class="bottom">
      <view
        class="image_item"
        v-for="(item, index) in wallpaper"
        :key="item.id"
      >
        <go-detail :list="wallpaper" :index="index">
          <image
            :src="item.thumb + item.rule.replace('$<Height>', 360)"
            mode="widthFix"
          ></image>
        </go-detail>
      </view>
    </view>
  </view>
</template>

<script>
import goDetail from "../components/goDetail";
export default {
  components: {
    goDetail,
  },
  data() {
    return {
      album: {},
      wallpaper: [],
      params: {
        limit: 30,
        order: "new",
        skip: 0,
        first: "1",
      },
      hasMore: true,
    };
  },
  onLoad(options) {
    this.id = options.id;
    // this.id="5dea5033e7bce739990b9cca"
  },
  mounted() {
    this.getData();
  },
  onReachBottom() {
    this.params.skip += this.params.limit;
    this.params.first = "0";
    this.hasMore && this.getData();
  },
  methods: {
    getData() {
      this.request({
        url: this.api.queryAlbumDetail.replace("${id}", this.id),
        data: this.params,
      }).then((result) => {
        const { album = {}, wallpaper = [] } = result.res;
        if (this.params.first === "1") {
          this.album = album;
        }
        if (wallpaper.length === 0) {
          this.hasMore = false;
          uni.showToast({
            icon: "none",
            title: "我也是有底线的",
            duration: 2000,
          });
          return;
        } else {
          this.wallpaper = [...this.wallpaper, ...wallpaper];
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.detail_view {
  height: 100vh;
}
.top {
  width: 100%;
  .desc {
    padding: 20rpx;
  }
}

.bottom {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10rpx;
  .image_item {
    width: 33.3%;
    border: 4rpx solid white;
    background: white;
    image {
      width: 100%;
    }
  }
}
</style>
