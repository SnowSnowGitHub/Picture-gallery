<template>
  <scroll-view
    scroll-y
    v-if="recommendList.length > 0"
    @scrolltolower="handleScrollToLower"
    class="recommend_view"
  >
    <!-- 推荐模块 -->
    <view class="recommend">
      <navigator
        class="recommend_item"
        v-for="item in recommendList"
        :key="item.id"
        :url="`/pages/album/detail?id=${item.target}`"
      >
        <!-- widthFix 设置图片的高自适应 -->
        <image mode="widthFix" :src="item.thumb"></image>
      </navigator>
    </view>
    <!-- 月份模块 -->
    <view class="mouth_warp">
      <view class="title">
        <view class="title_left">
          <view class="pink"
            >{{ mouthsList.mm }}
            <text class="little">/{{ mouthsList.dd }}月 </text></view
          >
          <text class="black">{{ mouthsList.title }}</text>
        </view>
        <view class="title_right">
          更多 >
        </view>
      </view>
      <view class="images">
        <view
          class="image_item"
          v-for="(image, index) in mouthsList.items"
          :key="image.id"
          :list="mouthsList.items"
          :index="index"
        >
          <go-detail>
            <image
              :src="image.thumb + image.rule.replace('$<Height>', 360)"
              mode="aspectFill"
            ></image>
          </go-detail>
        </view>
      </view>
    </view>
    <!-- 热门推荐模块 -->
    <view class="hots">
      <view class="title">
        <view class="title_inner">
          热门
        </view>
      </view>
      <view class="hots_images">
        <view class="image_item" v-for="(item, index) in hots" :key="item.id">
          <go-detail :list="hots" :index="index">
            <image :src="item.thumb" mode="widthFix"></image>
          </go-detail>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
import moment from "moment"; //做日期处理
import goDetail from "../../components/goDetail";
export default {
  components: {
    goDetail,
  },
  data() {
    return {
      recommendList: [],
      mouthsList: {
        title: "",
        mm: "",
        dd: "",
        items: [],
      },
      hots: [],
      params: {
        limit: 30,
        order: "hot",
        skip: 0,
      },
      hasMore: true,
    };
  },
  mounted() {
    uni.setNavigationBarTitle({
      title: "推荐",
    });
    this.getData();
  },
  methods: {
    handleScrollToLower() {
      this.params.skip += this.params.limit;
      this.hasMore && this.getData();
    },
    getData() {
      this.request({
        url: this.api.queryRecommendList,
        data: this.params,
      }).then((result) => {
        const { vertical = [], homepage = [] } = result.res;

        if (this.recommendList.length === 0) {
          const { stime = " ", title = "", items = [] } = homepage[2];
          this.recommendList = homepage[1].items || [];
          this.mouthsList.mm = moment(stime).format("MM");
          this.mouthsList.dd = moment(stime).format("DD");
          this.mouthsList.title = title;
          this.mouthsList.items = items;
        }
        if (vertical.length === 0) {
          this.hasMore = false;
          uni.showToast({
            icon: "none",
            title: "我也是有底线的",
            duration: 2000,
          });
          return;
        } else {
          this.hots = [...this.hots, ...vertical];
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.recommend_view {
  // 注意事项('-'  前后需要空格！！！)
  height: calc(100vh - 36px);
}
.recommend {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .recommend_item {
    width: 50%;
    border: 3rpx solid white;
    box-sizing: border-box;
    image {
      display: inline-block;
      width: 100%;
    }
  }
}

.mouth_warp {
  width: 100%;
  .title {
    padding: 10rpx 20rpx;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: $main_color;
    font-weight: bold;
    .title_left {
      display: flex;
      flex-direction: row;
      .little {
        font-size: 20rpx;
      }
      .black {
        color: black;
        margin-left: 10rpx;
      }
    }
    .title_right {
    }
  }
  .images {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .image_item {
      width: 33.33%;
      border: 2rpx solid white;
    }
  }
}

.hots {
  width: 100%;
  .title {
    padding: 10rpx;
    font-size: 34rpx;
    .title_inner {
      width: 100%;
      margin-left: 6rpx;
      border-left: 8px solid $main_color;
      text-indent: 10rpx;
      font-weight: bold;
    }
  }
  .hots_images {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .image_item {
      width: 25%;
      border: 4rpx solid white;
      image {
        width: 100%;
      }
    }
  }
}
</style>
