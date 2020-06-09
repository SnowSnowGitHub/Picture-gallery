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
      <category-img :list="list" @handleMore="getMoreData"></category-img>
      <!-- <view v-if="current === 0">
        <category-hot :order="items[current].order"></category-hot>
      </view>
      <view v-if="current === 1">
        <category-new></category-new>
      </view> -->
    </view>
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
import categoryImg from "./components/categoryImg";
export default {
  components: {
    uniSegmentedControl,
    categoryImg
  },
  data() {
    return {
      current: 0,
      items: [
        { title: "热门", order: "hot" },
        { title: "推荐", order: "new" },
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
  onLoad(options) {
    this.id = options.id;
    this.getData();
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.hasMore = true;
        this.params.skip=0
        this.list=[]
        this.params.order = this.items[e.currentIndex].order || "";
        this.current = e.currentIndex;
        this.getData();
      }
    },
    getData() {
      this.request({
        url: this.api.queryCategory4id.replace("${id}", this.id),
        data: this.params,
      }).then((res) => {
        const { vertical = [] } = res.res || {};
        if (vertical.length > 0) {
          this.list = [...this.list, ...vertical];
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
