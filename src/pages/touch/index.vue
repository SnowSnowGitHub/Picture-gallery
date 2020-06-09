<template>
  <view class="wrap" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
    触屏事件
  </view>
</template>

<script>
export default {
  data() {
    return {
      startX: 0,
      startY: 0,
      startTime: "",
    };
  },
  methods: {
    handleTouchStart(e) {
      const { clientX, clientY } = e.changedTouches[0];
      this.startX = clientX;
      this.startY = clientY;
      this.startTime = Date.now();
    },
    handleTouchEnd(e) {
      const { clientX, clientY } = e.changedTouches[0];
      const distanceX = clientX - this.startX;
      const distanceY = clientY - this.startY;
      if (Math.abs(distanceX) < 50 || Date.now() - this.startTime > 2000) {
        return;
      }
      if (distanceX < 0) {
        console.log("左滑动--------");
      }
      if (distanceX > 0) {
        console.log("右滑动--------");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  height: 500rpx;
  width: 100%;
  background: chocolate;
  color: white;
  font-size: 40rpx;
  line-height: 500rpx;
  text-align: center;
}
</style>
