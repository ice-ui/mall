<template>
  <!-- 注意结构的搭建 -->
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
      // probeType: 3,该属性不能直接给定->有些组件在使用的时候不需要实时监听
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    // console.log(this.scroll);
    //2.监听滚动的位置--->调用on方法
    this.scroll.on("scroll", (position) => {
      this.$emit("scroll", position);
    });
    // 3.监听上拉加载更多
    this.scroll.on("pullingUp", () => {
      // console.log("上拉加载更多");
      this.$emit("pullingUp");
    });
    // 监听scroll滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
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