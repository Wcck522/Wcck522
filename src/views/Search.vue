<template>
  <div>
    <van-search
        v-model="value"
        show-action
        placeholder="点击搜索商品"
        @search="onSearch"
        shape="round"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <div class="hotSearch">
      <div class="title">热门搜索</div>
      <ul class="hotWords">
        <li @click="clickSearch('洗衣机')">洗衣机</li>
        <li @click="clickSearch('加湿器')">加湿器</li>
        <li @click="clickSearch('衣服')">衣服</li>
        <li @click="clickSearch('热水器')">热水器</li>
      </ul>
    </div>
    <div class="noGoods" v-show="value">
      <Fourzerofour v-if="detail.length==0"></Fourzerofour>
      <ProductsSquare v-else :bastList="detail"></ProductsSquare>
    </div>
  </div>
</template>

<script>
import Fourzerofour from "../components/Fourzerofour";
import ProductsSquare from "../components/ProductsSquare";

export default {
  name: "Search",
  data() {
    return {
      value: null,
      detail: []
    }
  },
  components: {
    Fourzerofour,
    ProductsSquare
  },
  methods: {
    onSearch: function () {
      this.axios.get("/api/products?keyword=" + this.value).then(data => {
        this.detail = data.data.data;
      })
    },
    clickSearch: function (value) {
      this.value = value;
      this.axios.get("/api/products?keyword=" + this.value).then(data => {
        this.detail = data.data.data;
      })
    }
  },
  created(){

  }
}
</script>

<style lang="less" scoped>
div{
  font-family: 'MXiangHeHeiTC', sans-serif;
}
.van-search--show-action {
  height: 1rem;
}

.van-field__left-icon .van-icon, .van-field__right-icon .van-icon {
  font-size: .28rem;
}

.van-field__body {
  font-size: .2rem;
}

.van-search__action {
  font-size: .2rem;
}

.hotSearch {
  margin: 0 .2rem;
  padding-bottom: .25rem;
  border-bottom: .01rem solid #eee;

  .title {
    margin-top: .2rem;
    margin-bottom: .2rem;
    color: #999;
  }

  .hotWords {
    display: flex;

    li {
      padding: 0 .2rem;
      border: 1px solid #aaa;
      height: .6rem;
      line-height: .6rem;
      text-align: center;
      margin-right: .2rem;
    }
  }
}
</style>
