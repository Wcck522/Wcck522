<template>
  <div class="box">
    <van-swipe :autoplay="2000" indicator-color="red">
      <van-swipe-item v-for="i in bannerData" :key="i.id">
        <van-image :src="i.img"/>
      </van-swipe-item>
    </van-swipe>
    <div class="title">
      <div class="line"></div>
      <div class="name">
        <van-icon :name="titleData[this.$route.query.id-1].iconName"/>
        {{ titleData[this.$route.query.id - 1].name }}
      </div>
      <div class="line"></div>
    </div>
    <template>
      <ProductsSquare :bastList="list" v-if="this.$route.query.id<=3"></ProductsSquare>
      <BeneList v-else :beneList="list"></BeneList>
    </template>
  </div>
</template>

<script>
import ProductsSquare from "../components/ProductsSquare";
import BeneList from "../components/BeneList"

export default {
  name: "Recommend",
  components: {
    ProductsSquare,
    BeneList
  },
  data() {
    return {
      bannerData: [],
      titleData: [
        {"name": "精品推荐", "iconName": "gem-o"},
        {"name": "热门榜单", "iconName": "fire-o"},
        {"name": "首发新品", "iconName": "new-o"},
        {"name": "促销单品", "iconName": "bag-o"},
      ],
      list: [],
    }
  },
  created() {
    this.axios.get("/api/groom/list/" + this.$route.query.id).then(data => {
      this.bannerData = data.data.data.banner;
      this.list = data.data.data.list;
      console.log(data)
    })
  }
}
</script>

<style lang="less" scoped>
div.box {
  width: 100%;
  height: 2.9rem;
  font-family: 'MXiangHeHeiTC', sans-serif;
  div {
    width: 100%;

    /deep/ img {
      display: block;
      height: 2.9rem;
    }
  }
}

.title {
  height: 1.2rem;
  font-size: .32rem;
  color: #282828;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;

  .line {
    width: 2.3rem;
    height: .02rem;
    background-color: #e9e9e9;
  }

  .name {
    width: auto;
    margin: 0 .2rem;
    position: relative;
  }
}
</style>