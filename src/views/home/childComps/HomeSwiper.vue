<template>
  <swiper>
    <!-- 动态获取banners里面的信息 -->
    <swiper-item v-for="(item, index) in banners" :key="index">
      <!-- 由于图片是可以进行点击的，包含在a标签里面 -->
      <a :href="item.link">
        <!-- 插入图片 -->
        <img :src="item.image" alt="" @load="imageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isLoad: false,
    };
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    },
  },
};
</script>
<style scoped>
</style>