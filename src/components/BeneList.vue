<template>
  <ul>
    <router-link v-for="item in beneList" :key="item.id" :to="'/detail?id='+item.id">
      <li>
        <div class="picture"><img :src="item.image" alt=""></div>
        <div class="text">
          <div class="name">{{ item.store_name }}</div>
          <div class="prices">
            <div class="moneycon">促销价: <span class="num">￥{{ item.price }}</span></div>
          </div>
          <div class="ot_prices">
            <div class="money">日常价: ￥{{ item.ot_price }}</div>
            <div class="stock">仅剩: {{ item.stock }} {{ item.unit_name }}</div>
          </div>
        </div>
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: "BeneList",
  props: ["beneList"]
}
</script>

<style lang="less" scoped>
ul {
  padding: 0 .3rem;
  font-size: .28rem;

  li {
    border-bottom: 1px solid #eee;
    height: 2.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .picture {
      width: 1.88rem;
      height: 1.88rem;

      img {
        width: 100%;
        height: 100%;
        border-radius: .08rem;
      }
    }

    .text {
      font-size: .24rem;
      color: #999;
      width: 4.72rem;
      text-align: left;

      .name {
        font-size: .3rem;
        color: #333;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
      }

      .prices {
        margin: .34rem 0 .2rem 0;

        .moneycon {
          width: 2.5rem;
          padding: 0 .18rem;
          background-color: red;
          height: .46rem;
          line-height: .46rem;
          text-align: center;
          background-image: linear-gradient(90deg, #ff6248 0, #ff3e1e);
          font-size: .2rem;
          color: #fff;
          border-radius: .24rem .03rem .24rem .03rem;
        }

        .num {
          font-size: .24rem;
        }
      }

      .ot_prices {
        display: flex;
        justify-content: space-between;

        .money {
          text-decoration: line-through;
          font-size: .24rem;
        }
      }
    }
  }
}
</style>