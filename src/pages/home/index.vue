<template>
  <view class="container">
    <view class="tab">
      <view class="tab_inner">
        <uni-segmented-control
          :current="current"
          :values="items.map((item) => item.title)"
          @clickItem="onClickItem"
          style-type="text"
          active-color="#d4237a"
        ></uni-segmented-control>
      </view>
      <view class="search">
        <icon type="search" size="20" />
      </view>
    </view>
    <view class="content">
      <view v-if="current === 0">
        <home-recommend></home-recommend>
      </view>
      <view v-if="current === 1">
        <home-category></home-category>
      </view>
      <view v-if="current === 2">
        <home-new></home-new>
      </view>
      <view v-if="current === 3">
        <home-album></home-album>
      </view>
    </view>
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
import homeCategory from "./components/category";
import homeNew from "./components/new";
import homeAlbum from "./components/album";
import homeRecommend from "./components/recommend";
export default {
  components: {
    uniSegmentedControl,
    homeCategory,
    homeNew,
    homeAlbum,
    homeRecommend,
  },
  data() {
    return {
      items: [
        { title: "推荐" },
        { title: "分类" },
        { title: "最新" },
        { title: "专辑" },
      ],
      current: 1,
    };
  },
  onLoad() {},
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  .tab {
    position: relative;
    .tab_inner {
      width: 60%;
      margin: 0 auto;
    }
    .search {
      position: absolute;
      right: 5%;
      top: 50%;
      transform: translateY(-40%);
    }
  }
}
</style>
