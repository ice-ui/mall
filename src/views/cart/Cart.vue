<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <!-- 商品的列表 -->
    <cart-list />
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import CartList from "../cart/childComps/CartList";
import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
  },
  computed: {
    ...mapGetters(["cartLength", "cartList"]),
  },
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  /* font-weight: 700; */
}
</style>