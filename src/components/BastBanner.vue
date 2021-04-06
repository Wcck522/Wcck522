<template>
  <div class="head">
    <van-swipe :autoplay="2000" :show-indicators="false">
      <van-swipe-item v-for="i in bannerData" :key="i.id">
        <van-image :src="i.img"/>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "BastBanner",
  props: ["bannerData"]
}
</script>

<style lang="less" scoped>
div.head {
  width: 6.9rem;
  height: 2.9rem;
  margin: .28rem auto 0 auto;

  div {
    width: 100%;

    /deep/ img {
      display: block;
      height: 2.6rem;
    }
  }
}
</style>