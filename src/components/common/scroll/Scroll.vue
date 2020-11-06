<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  //由子组件来确定probeType的值
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      //   保存变量，因为当下面mounted里面的代码执行完后scroll不再存在
      scroll: null,
    };
  },
  mounted() {
    //1. 创建better-scroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      //  监听滚动的位置必须写上该属性,但是这个值在这里不要写死，因为不同的组件有
      //实时监听有些没有
      // probeType: 3,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    //2.监听滚动的位置--->调用on方法
    this.scroll.on("scroll", (position) => {
      // 将probeType传出去
      this.$emit("scroll", position);
    });
    // 3.监听上拉加载更多
    this.scroll.on("pullingUp", () => {
      // console.log("上拉加载更多");
      // 将事件传递出去
      this.$emit("pullingUp");
    });
    // 监听scroll滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // 监听到滚动到底部
        //  将时间传递出去
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      // console.log("----");
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>
<style scoped>
</style>