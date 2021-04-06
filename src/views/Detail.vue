<template>
  <div>
    <div class="box" v-if="storeInfo && detail">
      <van-tabs scrollspy sticky class="nav">
        <van-tab :title="'商品'">
          <div class="products">
            <van-swipe @change="onChange">
              <van-swipe-item v-for="(item,index) in detail.storeInfo.slider_image" :key="index">
                <img :src="item" alt="">
              </van-swipe-item>
              <template #indicator>
                <div class="custom-indicator">{{ current + 1 }}/{{ detail.storeInfo.slider_image.length }}</div>
              </template>
            </van-swipe>
            <div class="text">
              <div class="text_top">
                <div class="text_top_left">
                  <div class="price">￥{{ detail.storeInfo.price }}</div>
                  <div class="price_vip">￥{{ detail.storeInfo.vip_price }}<img src="../assets/vip.png" alt=""></div>
                </div>
                <div class="text_top_right share">
                  <van-icon name="share-o"/>
                </div>
              </div>
              <div class="text_mid">
                <div class="store_name">
                  {{ detail.storeInfo.store_name }}
                </div>
              </div>
              <div class="text_bottom">
                <div class="o_pirce">原价:￥{{ detail.storeInfo.ot_price }}</div>
                <div class="stock">库存:{{ detail.storeInfo.stock }}{{ detail.storeInfo.unit_name }}</div>
                <div class="sales">销量:{{ detail.storeInfo.sales }}{{ detail.storeInfo.unit_name }}</div>
              </div>
            </div>
            <div class="select" v-if="detail.productAttr.length>0" @click="show = true">
              <div class="select_left">已选择:<span class="params">{{ sku.join() }}</span></div>
              <div class="select_right"><i class="fa fa-angle-right"></i></div>
            </div>
          </div>
        </van-tab>

        <van-tab :title="'评价'">
          <div class="comment">
            <div class="comment_left">用户评价(0)</div>
            <div class="comment_right"><span>0%</span>好评率<i class="fa fa-angle-right"></i></div>
          </div>
        </van-tab>

        <van-tab :title="'推荐'">
          <div class="recommend">
            <div class="title">
              <div class="diamond"><img src="../assets/diamond.png" alt=""></div>
              <div class="title_text">优品推荐</div>
              <div class="diamond"><img src="../assets/diamond.png" alt=""></div>
            </div>
            <van-swipe class="shop_recommend" indicator-color="#fc4141">
              <van-swipe-item v-for="item in recommendList.length/6" :key="item">
                <ul>
                  <li v-for="i in recommendList.slice(6*(item-1),6*(item))" :key="i.id">
                    <router-link :to="'/detail?id='+i.id">
                      <div class="picture"><img :src="i.image" alt=""></div>
                      <div class="text">
                        <div class="name">{{ i.store_name }}</div>
                        <div class="price">￥{{ i.price }}</div>
                      </div>
                    </router-link>
                  </li>
                </ul>
              </van-swipe-item>
            </van-swipe>
          </div>
        </van-tab>

        <van-tab :title="'详情'">
          <div class="product_dec">产品介绍</div>
          <div style="width: 100%;overflow: hidden">
            <div class="contentj" v-if="detail.storeInfo.description" v-html="detail.storeInfo.description"></div>
          </div>
        </van-tab>

      </van-tabs>

      <van-popup
          v-model="show"
          closeable
          round
          position="bottom"
          :style="{ height: 'auto' }"
      >
        <header class="selectBox">
          <div class="picture"><img
              :src="(currentDetail && currentDetail.image)?currentDetail.image:detail.storeInfo.image" alt=""></div>
          <div class="text">
            <div class="name">{{ detail.storeInfo.store_name }}</div>
            <div class="text_b">
              <div class="price">￥{{ detail.storeInfo.price }}</div>
              <div class="stock">库存:{{
                  sku.length != 0 ? detail.productValue[sku.join()].stock : detail.storeInfo.stock
                }}{{ detail.storeInfo.unit_name }}
              </div>
            </div>
          </div>
        </header>
        <main>
          <div class="select_attr" v-for="(item,index) in detail.productAttr" :key="index">
            <div class="attr_name">{{ item.attr_name }}</div>
            <ul>
              <label :class="+idx==0?'active label': 'label'" v-for="(i,idx) in item.attr_values" :key="idx" ref="label" @click="c">
                <input :name="item.attr_name" type="radio" :value="i" v-model="sku[index]">
                <span>{{ i }}</span>
              </label>
            </ul>
          </div>
          <div class="count">
            <div class="count_title">数量</div>
            <div class="count_steper">
              <van-stepper v-model="count" integer
                           :max="sku.length != 0 ? detail.productValue[sku.join()].stock : detail.storeInfo.stock"/>
            </div>
          </div>
        </main>
      </van-popup>

      <div class="nav_bot">
        <van-goods-action>
          <van-goods-action-icon icon="chat-o" text="客服"/>
          <van-badge :content="cartNum" :class="cartNum==0?'din':''">
            <van-goods-action-icon @click="goCart" icon="cart-o" text="购物车"/>
          </van-badge>
          <van-goods-action-icon :class="isCollect?'active':''" @click="collect" icon="star" text="收藏"/>
          <van-goods-action-button type="warning" @click="addcart" text="加入购物车"/>
          <van-goods-action-button type="danger" @click="settle" text="立即购买"/>
        </van-goods-action>
      </div>
    </div>
    <div class="loading" v-else>
      <van-loading size="1rem" type="spinner"  vertical>加载中...</van-loading>
    </div>
  </div>
</template>

<script>
import {Toast} from 'vant';

export default {
  name: "Detail",
  data() {
    return {
      current: 0,
      storeInfo: null,
      recommendList: [],
      show: false,
      select: [],
      sku: [],
      detail: [],
      currentDetail: null,
      count: 1,
      isCollect: null,
      cartNum: null
    };
  },
  methods: {
    c(e){
      if(e.target.checked){
        e.target.parentNode.parentNode.children.forEach(function(item){
          item.className="label";
        })
        e.target.parentNode.classList.add('active');
      }
    },
    goCart() {
      this.$router.push('/cart')
    },
    collect() {
      if (!this.$store.state.token) {
        this.$router.push('/login');
        return;
      }
      if (this.isCollect) {
        this.axios({
          method: "post",
          url: "/api/collect/del",
          data: {
            category: "product",
            id: this.currentDetail ? this.currentDetail.product_id : this.storeInfo.id,
          },
          headers: {
            'Authori-zation': 'Bearer ' + this.$store.state.token
          },
        })
        Toast.success("取消收藏成功!");
        this.isCollect = false;
      } else {
        this.axios({
          method: "post",
          url: "/api/collect/add",
          data: {
            category: "product",
            id: this.currentDetail ? this.currentDetail.product_id : this.storeInfo.id,
          },
          headers: {
            'Authori-zation': 'Bearer ' + this.$store.state.token
          },
        })
        Toast.success("收藏成功!");
        this.isCollect = true;
      }
    },
    onChange(index) {
      this.current = index;
    },
    getDetail: function (id) {
      this.axios
          .get("/api/product/detail/" + id)
          .then((response) => {
            this.detail = response.data.data;
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    addcart() {
      if (this.show) {
        if (this.$store.state.token) {
          this.axios({
            method: "post",
            url: "/api/cart/add",
            headers: {
              'Authori-zation': 'Bearer ' + this.$store.state.token
            },
            data: {
              productId: this.currentDetail ? this.currentDetail.product_id : this.storeInfo.id,
              cartNum: this.count,
              new: 0,
              uniqueId: this.currentDetail ? this.currentDetail.unique : ''
            },
          })

          this.axios({
            method: "get",
            url: "/api/cart/list",
            headers: {
              'Authori-zation': 'Bearer ' + this.$store.state.token
            },
          }).then(() => {
            this.show = false;
          })

          this.axios({
            method: "get",
            url: "/api/cart/count?numType=0",
            headers: {
              'Authori-zation': 'Bearer ' + this.$store.state.token
            },
          }).then(res => {
            if (res.data.data.count) {
              this.cartNum = res.data.data.count;
            }
          })
          Toast.success("添加购物车成功")
        } else {
          Toast.fail("请登录后尝试!")
        }
      }
      this.show = true;
    },
    settle() {
      if (!this.$store.state.token) {
        this.$router.push('/login');
        return;
      }
      if (this.show == true) {
        this.axios({
          method: "post",
          url: "/api/cart/add",
          headers: {
            'Authori-zation': 'Bearer ' + this.$store.state.token
          },
          data: {
            productId: this.currentDetail ? this.currentDetail.product_id : this.storeInfo.id,
            cartNum: this.count,
            new: 0,
            uniqueId: this.currentDetail ? this.currentDetail.unique : ''
          },
        }).then(res => {
          console.log(res)
          if (res.data.msg == "该产品库存不足1") {
            Toast.fail("该产品库存不足1");
            return;
          }
          this.$router.push("/settle?list=" + res.data.data.cartId)
        })
      }
      this.show = true;
    }
  },
  created() {
    this.axios.get("/api/product/detail/" + this.$route.query.id).then(data => {
      this.detail = data.data.data;
      this.storeInfo = data.data.data.storeInfo;
      this.sliderImg = data.data.data.storeInfo.slider_image;
      this.recommendList = data.data.data.good_list;
      this.productAttr = data.data.data.productAttr;
      this.productValue = data.data.data.productValue;
      this.isCollect = this.storeInfo.userCollect;
    })
    if (this.$store.state.token) {
      this.axios({
        method: "get",
        url: "/api/cart/count?numType=0",
        headers: {
          'Authori-zation': 'Bearer ' + this.$store.state.token
        },
      }).then(res => {
        this.cartNum = res.data.data.count;
      })
    }
  },
  mounted() {
    document.querySelector('body').setAttribute('style', 'background-color:#f7f7f7;padding-bottom:1rem;')
  },
  updated() {

  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
  },
  watch: {
    detail: function (n) {
      this.sku = n.productAttr.map(item => {
        return item.attr_values[0]
      });
      this.current = 0;
      this.axios.get("/api/product/detail/" + this.$route.query.id).then(data => {
        this.storeInfo = data.data.data.storeInfo;
        this.isCollect = this.storeInfo.userCollect;
      })
    },
    sku: function (n) {
      this.currentDetail = this.detail.productValue[n.join()]
    },
  },
  beforeRouteUpdate(to, from, next) {
    next();
    window.scroll(0, 0);
    this.getDetail(to.query.id);
  },
  computed: {}
}
</script>

<style lang="less" scoped>
.select_attr:not(:first-of-type) {
  margin-top: .2rem;
}
.select_attr ul {
  margin-top: .1rem;
}
.count{
  margin-top: .2rem;
}

.label input{
  display: none;
}

.label span{
  padding: .07rem .33rem;
  display: block;
  background: transparent;
  text-align: center;
  border: 1px solid #bbb;
  border-radius: .1rem;
  color: black;
}

.label.active span{
  background: #ff3700;
  color: white;
  border-color: #ff3700;
}

label:checked{

}
.label{
  margin-top: .1rem;
  &:not(:last-of-type){
    margin-right: 0.2rem;
  }
}

/deep/ .van-goods-action-icon__icon {
  font-size: .35rem;
}

.van-goods-action-button {
  height: 50%;
  font-size: .20rem;
}

.van-goods-action {
  z-index: 9999;
  height: 1rem;
}

.van-popup--bottom {
  padding-bottom: 1rem;
}

.content {
  padding: 16px 16px 160px;
}

/deep/ .van-swipe-item {
  height: auto;
}

.custom-indicator {
  position: absolute;
  right: .3rem;
  bottom: .3rem;
  padding: 0 .1rem;
  font-size: .24rem;
  background-color: #fff;
  color: #050505;
}

/deep/ .van-swipe {
  width: 100vw;

  img {
    width: 100%;
    height: 100%
  }
}

.shop_recommend .van-swipe-item {
  color: #fff;
  text-align: center;
  background-color: white;
}

.van-swipe {
  width: auto;
}

.box {
  /deep/ .van-sticky {
    //display: none;
  }

  .text {
    background: white;

    .text_top {
      margin: 0 .3rem;
      padding-top: .25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .text_top_left {
        display: flex;
        align-items: center;
        font-weight: 700;

        .price {
          font-size: .48rem;
          color: #fc4141;
        }

        .price_vip {
          color: #282828;
          margin-left: .13rem;

          img {
            width: .46rem;
            height: .21rem;
            margin-left: .07rem;
          }
        }
      }

      .text_top_right {
        color: #515151;
        font-size: .4rem;
      }
    }

    .text_mid {
      margin: .1rem .3rem 0 .3rem;

      .store_name {
        font-size: .32rem;
        font-weight: 700;
      }
    }

    .text_bottom {
      margin: .2rem .3rem 0 .3rem;
      padding-bottom: .25rem;
      color: #82848f;
      display: flex;
      justify-content: space-between;
      font-size: .24rem;
    }
  }

  .select {
    padding: 0 .3rem;
    margin-top: .2rem;
    height: .8rem;
    background: white;
    display: flex;
    color: #82848f;
    justify-content: space-between;
    align-items: center;

    .select_left {
      font-size: .3rem;

      span {
        color: #282828;
      }
    }

    .select_right {
      font-size: .45rem;
    }
  }

  .comment {
    padding: 0 .3rem;
    margin-top: .2rem;
    background: white;
    height: .8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .comment_left {

    }

    .comment_right {
      font-size: .3rem;

      span {
        color: #fc4141;
      }
    }
  }

  .recommend {
    background: white;
    margin-top: .2rem;
    padding: 0 .3rem;

    .title {
      display: flex;
      height: 1rem;
      justify-content: center;
      align-items: center;

      .title_text {
        margin: 0 .2rem;
        color: #f4471d;
        font-size: .3rem;
      }

      .diamond {
        width: .3rem;
        height: .3rem;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .shop_recommend {
      padding-bottom: .2rem;

      /deep/ .van-swipe__indicators {
        bottom: .1rem;

        /deep/ .van-swipe__indicator:not(:last-child) {
          margin-right: .15rem;
        }

        i {
          width: .2rem;
          height: .2rem;
          background: #999;
        }
      }

      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        li {
          width: 2.15rem;
          margin-bottom: .2rem;

          .picture {
            width: 100%;
            height: 2.2rem;
            border-radius: .1rem;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .text {
            color: #333;

            .name {
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 100%;
              overflow: hidden;
              font-size: .26rem;
            }

            .price {
              color: #fc4141;
              text-align: left;
              font-size: .26rem;
            }
          }
        }
      }
    }
  }

  .product_dec {
    background: white;
    margin-top: .2rem;
    height: .8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .3rem;
    padding: 0 .3rem;
  }
}

div {
  font-size: .28rem;
}

header.selectBox {
  padding: 0 1.3rem 0 .3rem;
  display: flex;
  justify-content: space-between;
  height: 2rem;
  margin-top: .3rem;

  div.picture {
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .text {
    width: 4.1rem;
    font-size: .32rem;

    .name {
      text-overflow: ellipsis;
      font-size: .32rem;
      white-space: nowrap;
      font-weight: 700;
      width: 100%;
      overflow: hidden;
    }

    .text_b {
      display: flex;
      margin-top: .5rem;
      font-size: .24rem;

      .price {
        margin-right: .15rem;
        color: #fc4141;
        font-size: .36rem;
      }

      .stock {
        color: #999;
        margin-top: .1rem;
      }
    }
  }
}

main {
  .select_attr {
    padding: 0 .3rem;

    .attr_name {
      color: #999;
      font-size: .3rem;
    }

    ul {
      display: flex;
      flex-wrap: wrap;
    }
  }
}

.contentj {
  padding: 0;
  width: 100%;
  overflow: hidden;
}

/deep/ div.contentj img {
  width: 7.5rem !important;
  display: block !important;
}

/deep/ div.contentj div {
  height: 100% !important;
}

.count {
  padding-left: .3rem;

  .count_title {
    margin-bottom: .2rem;
    color: rgba(0, 0, 0, .6);
  }

  .count_steper {
    margin-bottom: .3rem;
  }
}

.active {
  /deep/ .van-goods-action-icon__icon {
    color: #fc4141;
  }
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.din{
  /deep/.van-badge--fixed{
    display: none;
  }
}
</style>