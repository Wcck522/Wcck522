<template>
  <section>
    <BastBanner :bannerData="bannerData"></BastBanner>
    <ProductsSquare :bastList="bastList"></ProductsSquare>
  </section>
</template>

<script>
import BastBanner from "../components/BastBanner.vue"
import ProductsSquare from "./ProductsSquare.vue";

export default {
  name: "BastList",
  props: ['bannerData', 'bastList'],
  components: {
    BastBanner,
    ProductsSquare
  }
}
</script>

<style scoped>

</style>