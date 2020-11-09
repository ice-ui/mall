<template>
  <div id="home">
    <!-- 首页部分只有中间部分需要替换 -->
    <nav-bar class="home-nav"> <div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      class="tab-control"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 在组建中使用轮播图 -->
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        class="tab-control"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <!-- 从pop里面取出list -->
      <goods-list :goods="goods[currentType].list" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
// 公共的组件
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import Scroll from "components/common/scroll/Scroll";
// 和业务有关的组件
import FeatureView from "./childComps/FeatureView";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";
// 其他组件
import { getHomeMultidata, getHomeGoods } from "components/network/home";
import { debounce } from "common/utils";
import { itemListenerMixin } from "common/mixin";

// import BScroll from "better-scroll";
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      // 当前类型，默认设置为pop
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      itemImgListener: null,
    };
  },
  destroyed() {
    console.log("home destroyed");
  },
  activated() {
    // 当一进去的时候保持在原来滚动的位置
    this.$refs.scroll.scrollTo(0, this.saveY, 100);
    // 滚动完后进行一次刷新
    this.$refs.scroll.refresh();
  },
  // 离开时记录位置
  deactivated() {
    //1.保存位置
    this.saveY = this.$refs.scroll.getScrollY();
    //2.取消全局事件的监听
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },

  // 什么时候发送网络请求？组件一创建好就发送网络请求，使用created声明周期函数
  created() {
    //1.请求多个数据
    this.getHomeMultidata();
    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {},
  methods: {
    //事件监听相关的方法
    tabClick(index) {
      // console.log(index);
      // 根据index决定是新款、流行、精选数据
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      // 打印我们的offsetTop
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    // 监听滚动
    contentScroll(position) {
      // 根据position的值确定按钮是否显示
      this.isShowBackTop = -position.y > 1000;
      // 判断tabControl是否吸顶----->是否有position:fixed
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
      // 调用refresh就会重新计算可滚动的区域，先监听图片什么时候加载完，再调用该方法进行刷新
      this.$refs.scroll.refresh();
    },

    backClick() {
      // 拿到scroll对象
      this.$refs.scroll.scrollTo(0, 0, 500);
    },

    // 网络请求相关的方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // this.result = res;
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      // 获取page
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        //将一个数组放在另一个数组里面
        // 注意：这里必须经过两次.data才能获取到list数据
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;
        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>
<style scoped>
/* scoped:作用域，加上了这个属性意味着在下面写的样式只针对当前组件起效果 */
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

/* .content {
  height: 500px;
  overflow: hidden;
} */
.content {
  overflow: hidden;
  position: absolute;
  /* 导航栏高度 */
  top: 44px;
  /* 底部高度 */
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 9;
}
</style>