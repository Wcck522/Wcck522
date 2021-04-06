<template>
  <div>
    <div class="index" v-if="data">
      <SearchBar :showIcon="showIcon"></SearchBar>
      <Carousel :bannerData="bannerData"></Carousel>
      <Grid :menusData="menusData"></Grid>
      <NoticeBar :NoticeBarData="NoticeBarData"></NoticeBar>
      <ProductsSelect :scrollProductsData="scrollProductsData" :isScroll="isScroll" :where="'sort'">
        <template v-slot:title>快速选择</template>
        <template v-slot:tips>{{ fastInfo }}</template>
        <ScrollProducts :scrollProductsData="scrollProductsData"></ScrollProducts>
      </ProductsSelect>
      <ProductsSelect :bastList="bastList" :where="'recommend?id=1'">
        <template v-slot:title>精品推荐</template>
        <template v-slot:tips>{{ bastInfo }}</template>
        <BastList :bannerData="bastBanner" :bastList="bastList"></BastList>
      </ProductsSelect>
      <HotList :hotList="hotList" :where="'recommend?id=2'"></HotList>
      <ProductsSelect :where="'recommend?id=3'">
        <template v-slot:title>首发商品</template>
        <template v-slot:tips>{{ firstInfo }}</template>
        <FirstList :firstList="firstList"></FirstList>
      </ProductsSelect>
      <ProductsSelect :where="'recommend?id=4'">
        <template v-slot:title>促销单品</template>
        <template v-slot:tips>{{ salesInfo }}</template>
        <BeneList :beneList="beneList"></BeneList>
      </ProductsSelect>
      <HomeNav></HomeNav>
    </div>
    <div class="loading" v-else>
      <van-loading size="1rem" type="spinner"  vertical>加载中...</van-loading>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Carousel from "../components/Carousel.vue"
import SearchBar from "../components/SearchBar.vue"
import HomeNav from "../components/HomeNav.vue"
import Grid from "../components/Grid.vue"
import NoticeBar from "../components/NoticeBar.vue"
import ProductsSelect from "../components/ProductsSelect.vue"
import ScrollProducts from "../components/ScrollProducts.vue"
import BastList from "../components/BastList"
import HotList from "../components/HotList";
import FirstList from "../components/FirstList";
import BeneList from "../components/BeneList";

export default {
  name: 'Index',
  components: {
    Carousel,
    SearchBar,
    HomeNav,
    Grid,
    NoticeBar,
    ProductsSelect,
    BastList,
    ScrollProducts,
    HotList,
    FirstList,
    BeneList
  },
  data() {
    return {
      bannerData: [],
      menusData: [],
      NoticeBarData: [],
      scrollProductsData: [],
      fastInfo: null,
      isScroll: true,
      bastInfo: null,
      bastList: [],
      bastBanner: [],
      hotList: [],
      firstInfo: null,
      firstList: [],
      salesInfo: null,
      beneList: [],
      showIcon: true,
      isFixed: true,
      data: null
    }
  },
  methods: {},
  created() {
    this.axios.get("api/index").then(data => {
      this.data = data.data.data;
      this.bannerData = data.data.data.banner;
      this.menusData = data.data.data.menus;
      this.NoticeBarData = data.data.data.roll;
      this.scrollProductsData = data.data.data.info.fastList;
      this.fastInfo = data.data.data.info.fastInfo;
      this.bastInfo = data.data.data.info.bastInfo;
      this.bastList = data.data.data.info.bastList;
      this.bastBanner = data.data.data.info.bastBanner;
      this.hotList = data.data.data.likeInfo;
      this.firstInfo = data.data.data.info.firstInfo;
      this.firstList = data.data.data.info.firstList;
      this.salesInfo = data.data.data.info.salesInfo;
      this.beneList = data.data.data.benefit;
    })
  },
}
</script>

<style lang="less" scoped>
.index {
  font-family: 'MXiangHeHeiTC', sans-serif;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
