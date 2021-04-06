<template>
  <div>
    <van-swipe :autoplay="2000" indicator-color="red">
      <van-swipe-item v-for="i in bannerData" :key="i.id">
        <van-image :src="i.pic"/>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "Carousel",
  props: ["bannerData"],
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
div {
  height: 3.75rem;

  div {
    width: 100%;

    /deep/ img {
      width: 100%;
      height: 100%;
    }
  }

}
</style>