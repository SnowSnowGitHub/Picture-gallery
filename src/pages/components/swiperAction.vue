<template>
  <view @touchstart="handleTouchStart" @touchend="handleTouchEnd">
    <slot></slot>
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
      //需要判断3处地方:  水平滑动距离大于50  滑动时间不能大于2s  垂直滑动距离超过10 则视为是垂直滑动
      if (Math.abs(distanceX) < 50 || Date.now() - this.startTime > 2000 || Math.abs(distanceY-this.startY)>10) {
        return;
      }
      if (distanceX < 0) {
        this.$emit("swiperAction", { direction: "right" });
      }
      if (distanceX > 0) {
        this.$emit("swiperAction", { direction: "left" });
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
