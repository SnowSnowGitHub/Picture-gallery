<template>
  <view class="wrap">
    <navigator class="image_wrap" v-for="image in imageList" :key="image.id" :url="`/pages/categoryDetail/index?id=${image.id}`">
      <image :src="image.cover" mode="aspectFill"></image>
      <view class="name">{{ image.name }}</view>
    </navigator>
  </view>
</template>

<script>
export default {
  data() {
    return {
      imageList: [],
    };
  },
  mounted() {
    uni.setNavigationBarTitle({
      title: "分类",
    });
    this.getData();
  },
  methods: {
    getData() {
      this.request({ url: this.api.queryCategoryList }).then((res) => {
        const { category = [] } = res.res || {};
        this.imageList = category;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .image_wrap {
  position: relative;
    width: 33.33%;
    border: 2rpx solid white;
  }
  image{
    height: 240rpx;
  }
  .name{
    position: absolute;
    text-indent: 10rpx;
    bottom: 0;
    left: 0;
    right: 0;
    color: white;
    font-weight: bold;
    background: linear-gradient(to right top, rgba(0,0,0,.3), rgba(0,0,0,0) );
  }
}
</style>
