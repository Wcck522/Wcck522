<template>
  <div class="box">
    <div class="searchBox">
      <van-search
          shape="round"
          background="#e93323"
          placeholder="搜索商品信息"
          :show-action="true"
          v-model="value"
          @search="onSearch"
      >
        <template #action>
          <van-icon name="qr" @click="changeView"/>
        </template>
      </van-search>
    </div>
    <nav>
      <ul>
        <li>
          <router-link to="/sort" style="color:#fc4141">{{ title }}</router-link>
        </li>
        <li @click="changePrice">价格<img src="../assets/first.png" alt="" v-if="priceCount==0"/><img
            src="../assets/second.png"
            alt=""
            v-else-if="priceCount==1"><img
            src="../assets/third.png" alt="" v-else></li>
        <li @click="changeSales">销量<img src="../assets/first.png" alt="" v-if="salesCount==0"/><img
            src="../assets/second.png"
            alt=""
            v-else-if="salesCount==1"><img
            src="../assets/third.png" alt="" v-else></li>
        <li @click="news==0?news=1:news=0" :style="news==1?'color:#fc4141':''">新品</li>
      </ul>
    </nav>
    <template>
      <ul class="products" v-if="changeShow">
        <router-link v-for="item in dataList" :key="item.id" :to="'/detail?id='+item.id">
          <li>
            <div class="picture"><img :src="item.image" alt=""></div>
            <div class="text">
              <div class="name">{{ item.store_name }}</div>
              <div class="price">￥{{ item.price }}</div>
              <div class="and">
                <div class="price_vip">￥{{ item.vip_price }} <span><img src="../assets/vip.png" alt=""></span></div>
                <div class="sales">已售{{ item.sales }}件</div>
              </div>
            </div>
          </li>
        </router-link>
      </ul>
      <ProductsSquare :bastList="dataList" v-else></ProductsSquare>
    </template>
    <Fourzerofour v-if="dataList.length==0"></Fourzerofour>
  </div>
</template>

<script>
import Fourzerofour from "../components/Fourzerofour";
import ProductsSquare from "../components/ProductsSquare";

export default {
  name: "GoodsList",
  data() {
    return {
      priceCount: 0,
      salesCount: 0,
      priceOrder: null,
      salesOrder: null,
      dataList: [],
      news: 0,
      changeShow: true,
      value: null,
      title: this.$route.query.title
    }
  },
  components: {
    Fourzerofour,
    ProductsSquare
  },
  methods: {
    changePrice() {
      this.priceCount++;
      this.priceCount = this.priceCount % 3;
    },
    changeSales() {
      this.salesCount++;
      this.salesCount = this.salesCount % 3;
    },
    changeView() {
      this.changeShow = !this.changeShow;
    },
    onSearch() {
      this.axios.get("/api/products?keyword=" + this.value).then(data => {
        this.dataList = data.data.data;
      })
      this.title = this.value;
    }
  },
  watch: {
    priceCount: function () {
      if (this.priceCount == 1) {
        this.priceOrder = "asc";
      } else if (this.priceCount == 2) {
        this.priceOrder = "desc";
      } else {
        this.priceOrder = "null";
      }
      if (this.priceOrder != "null") {
        this.axios.get("/api/products?sid=" + this.$route.query.id + "&priceOrder=" + this.priceOrder + "&news=" + this.news).then(data => {
          this.dataList = data.data.data;
        })
      } else {
        this.axios.get("/api/products?sid=" + this.$route.query.id).then(data => {
          console.log(data);
          this.dataList = data.data.data;
        })
      }
    },
    salesCount: function () {
      if (this.salesCount == 1) {
        this.salesOrder = "asc";
      } else if (this.salesCount == 2) {
        this.salesOrder = "desc";
      } else {
        this.salesOrder = "null";
      }
      if (this.salesOrder != "null") {
        this.axios.get("/api/products?sid=" + this.$route.query.id + "&salesOrder=" + this.salesOrder + "&news=" + this.news).then(data => {
          this.dataList = data.data.data;
        })
      } else {
        this.axios.get("/api/products?sid=" + this.$route.query.id).then(data => {
          this.dataList = data.data.data;
        })
      }
    },
    news: function () {
      this.axios.get("/api/products?sid=" + this.$route.query.id + "&salesOrder=" + this.salesOrder + "&priceOrder=" + this.priceOrder + "&news=" + this.news).then(data => {
        this.dataList = data.data.data;
      })
    }
  },
  created() {
    if (this.$route.query.keyword) {
      this.axios.get("/api/products?sid=" + this.$route.query.id + "&keyword=" + this.$route.query.keyword).then(data => {
        this.dataList = data.data.data;
      })
    } else {
      this.axios.get("/api/products?sid=" + this.$route.query.id).then(data => {
        this.dataList = data.data.data;
      })
    }
  },
  mounted() {
    document.querySelector('body').setAttribute('style', 'background-color:#f7f7f7')
  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
  },
}
</script>

<style lang="less" scoped>

.box {
  nav {
    height: .7rem;
    background: white;

    ul {
      text-align: center;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;

      li {
        flex-basis: 25%;

        &:first-child {
          color: #fc4141;
        }

        img {
          width: .15rem;
          height: .19rem;
          margin-left: .1rem;
        }
      }
    }
  }

  div.searchBox {
    display: flex;
    height: 1rem;
    width: 100%;
    border-bottom: 1px solid #f5f5f5;
    box-sizing: border-box;

    /deep/ .van-field__left-icon .van-icon {
      color: black;
    }

    /deep/ .van-icon {
      margin: 0 auto;
      color: #fff;
      width: .4rem;
      font-size: .4rem;
      height: .86rem;
      line-height: .86rem;
    }

    .van-search__content--round {
      display: flex;
      height: .64rem;
      align-items: center;
      background-color: #f5f5f5;
      border-radius: .5rem;
      padding: 0 .28rem;
      font-size: .28rem;
      color: #bbb;
      overflow: hidden;
    }
  }

  .van-search {
    width: 100%;
  }

  /deep/ .van-field__value {
    font-size: .28rem;
  }

  /deep/ .van-field__left-icon .van-icon, .van-field__right-icon .van-icon {
    font-size: .34rem;
    margin-right: .16rem;
    display: inline-block;
  }

  /deep/ .van-field__left-icon {
    position: relative;
    margin-right: .45rem;

    .van-icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%)
    }
  }


  ul.products {
    display: flex;
    padding: 0 .2rem;
    justify-content: space-between;
    flex-wrap: wrap;

    a {
      color: black;
      margin-top: .2rem;
      width: 49%;
      background: white;
      border-radius: .1rem;
      overflow: hidden;

      .picture {
        width: 100%;
        height: 3.45rem;
        position: relative;
        overflow: hidden;

        img {
          width: 100%;
        }
      }

      .text {
        padding: .2rem;

        .name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
          font-size: .3rem;
          font-weight: 700;
        }

        .price {
          color: #fc4141;
          font-weight: 700;
          margin-top: .08rem;
          font-size: .3rem;
        }

        .and {
          display: flex;
          justify-content: space-between;
          font-size: .22rem;
          color: #aaa;
          margin-top: .07rem;

          .price_vip {
            color: #333;
            font-size: .24rem;
            font-weight: 700;

            span {
              img {
                width: .5rem;
                height: .2rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>