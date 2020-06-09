<template>
  <view>
    <scroll-view
      scroll-y
      v-if="list.length > 0"
      @scrolltolower="handleScrollToLower"
      class="recommend"
    >
      <view class="image_wrap" v-for="image in list" :key="image.id">
        <image :src="image.img" mode="aspectFill"></image>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      hasMore: true,
    };
  },
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  mounted() {
    console.log('this.list--------------',this.list)
  },
  methods: {
    handleScrollToLower() {
      if (this.hasMore) {
        this.$emit('handleMore')
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.recommend {
  width: 100%;
  height: calc(100vh - 36px);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .image_wrap {
    width: 33.33%;
    display: inline-block;
    image {
      border: 2rpx solid white;
      height: 300rpx;
    }
  }
}
</style>
