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
      <view v-if="current !== 4">
        <video-img :list="list" @handleMore="getMoreData"></video-img>
      </view>
      <view v-if="current === 4">
        <category-img :list="list" @handleMore="getMoreData"></category-img>
      </view>
    </view>
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
import categoryImg from "./components/categotyImg";
import videoImg from "./components/videoImg";
export default {
  components: {
    uniSegmentedControl,
    categoryImg,
    videoImg,
  },
  data() {
    return {
      current: 0,
      items: [
        { title: "推荐", order: "hot", url: this.api.queryVideoRecommend },
        { title: "娱乐", order: "new", url: this.api.queryVideoActivity },
        { title: "最新", order: "new", url: this.api.queryVideoNew },
        { title: "热门", order: "new", url: this.api.queryVideohot },
        // { title: "分类", order: "new", url: this.api.queryVideoCategory },
        { title: "分类", order: "new", url: this.api.queryVideohot },
      ],
      id: "",
      params: {
        order: "hot",
        limit: 30,
        skip: 0,
      },
      list: [],
    };
  },
  onLoad() {
    this.getData();
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.hasMore = true;
        this.params.skip = 0;
        this.list = [];
        this.params.order = this.items[e.currentIndex].order || "";
        this.current = e.currentIndex;
        this.getData();
      }
    },
    getData() {
    //   const data = this.current === 4 ? {} : this.params;
      const data =  this.params;
      const url = this.items[this.current].url;
      this.request({
        url,
        data,
      }).then((res) => {
        const { videowp = [] } = res.res || [];
        if (videowp.length > 0) {
          this.list = [...this.list, ...videowp];
        } else {
          this.hasMore = false;
          uni.showToast({
            title: "没有更多数据了",
            duration: 2000,
          });
        }
      });
    },
    getMoreData() {
      if (this.hasMore) {
        this.params.skip += this.params.limit;
        this.getData();
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
