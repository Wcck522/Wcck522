<template>
  <van-grid column-num="4" class="gridList" :border="false">
    <van-grid-item to="/sort" v-for="item in menusData" :key="item.id">
      <van-image :src="item.pic"></van-image>
      {{ item.name }}
    </van-grid-item>
  </van-grid>
</template>

<script>
export default {
  name: "Grid",
  props: ["menusData"]
}
</script>

<style lang="less" scoped>
.gridList {
  .van-grid-item {
    font-size: .26rem;

    /deep/ .van-image {
      width: 50%;
    }
  }
}
</style>