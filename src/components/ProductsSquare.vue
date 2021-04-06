<template>
  <ul>
    <router-link v-for="i in bastList" :key="i.id" :to="'/detail?id='+i.id">
      <li>
        <div class="leftImg">
          <img :src="i.image" alt="">
        </div>
        <div class="right">
          <div class="text">
            <h5>{{ i.store_name }}</h5>
            <div class="prices">￥{{ i.price }}</div>
            <div>
              <div class="prices_vip">￥{{ i.vip_price }}<img src="../assets/vip.png" alt=""></div>
              <span class="sales">已售{{ i.sales }}{{ i.unit_name }}</span>
            </div>
          </div>
        </div>
        <van-icon name="shopping-cart-o" class="shopCat">
        </van-icon>
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: "ProductsSquare",
  props: ['bastList']
}
</script>

<style lang="less" scoped>
ul {
  display: flex;
  flex-wrap: wrap;

  a {
    width: 100%;

    li {
      flex: 1;
      display: flex;
      padding-left: .3rem;
      justify-content: space-between;
      align-items: center;
      position: relative;
      background: white;

      .leftImg {
        width: 1.8rem;
        height: 1.8rem;
        position: relative;
        border-radius: .06rem;
        overflow: hidden;
        align-items: center;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .right {
        font-size: .3rem;
        color: #222;
        text-align: left;
        border-bottom: 1px solid #f5f5f5;
        padding: .3rem .3rem .3rem 0;

        h5 {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
        }

        .text {
          width: 4.89rem;

          .prices {
            font-size: .34rem;
            font-weight: 700;
            color: #fc4141;
            margin-top: .5rem;

          }

          .prices_vip {
            font-size: .24rem;
            display: inline-block;
            margin-right: .22rem;

            img {
              width: .46rem;
              height: .21rem;
              margin-left: .05rem;
            }
          }

          .sales {
            font-size: .22rem;
            color: #aaa;
            margin: -.02rem 0 0 0;
          }
        }
      }
    }
  }
}

.shopCat {
  position: absolute;
  right: .3rem;
  width: .5rem;
  height: .5rem;
  border-radius: 50%;
  font-size: .3rem;
  bottom: .38rem;
  border: 1px solid #ff3700;
  color: #ff3700;
  line-height: .5rem;
  text-align: center;
}
</style>