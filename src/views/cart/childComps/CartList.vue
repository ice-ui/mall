<template>
  <div class="cart-list">
    <scroll class="content">
      <cart-list-item
        v-for="(item, index) in cartList"
        :item-info="item"
        :key="index"
      />
    </scroll>
  </div>
</template>
<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "../childComps/CartListItem";
import { mapGetters } from "vuex";
export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
};
</script>
<style scoped>
.cart-list {
  height: 100%;
}
.content {
  height: calc(100%-44px-49px);
}
</style>