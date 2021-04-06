<template>
  <div v-if="info">
    <div class="card" v-for="item in info.cartInfo" :key="item.id">
      <div class="picture"><img :src="item.productInfo.image" alt=""></div>
      <div class="text">
        <div class="name">{{ item.productInfo.store_name }}</div>
        <div class="money">
          <div class="price">￥{{ item.productInfo.price }}</div>
          <div class="count">x{{ item.cart_num }}</div>
        </div>
      </div>
    </div>
    <div class="list">
      <van-cell-group>
        <van-cell title="退货件数" :value="info.total_num"/>
        <van-cell title="退款金额" :value="'￥'+info.deduction_price"/>
      </van-cell-group>
    </div>
    <div class="refund">
      <button @click="refund">申请退款</button>
    </div>
  </div>
</template>

<script>
import {Toast} from 'vant';

export default {
  name: "Qrefund",
  data() {
    return {
      info: null
    }
  },
  created() {
    this.axios({
      method: "get",
      url: "http://47.115.51.185/api/order/detail/" + this.$route.query.wxid,
      headers: {
        'Authori-zation': 'Bearer ' + this.$store.state.token
      }
    }).then(res => {
      this.info = res.data.data;
    })
  },
  methods: {
    refund() {
      this.axios({
        method: "post",
        url: "/api/order/refund/verify",
        headers: {
          'Authori-zation': 'Bearer ' + this.$store.state.token
        },
        data: {
          text: "收货地址填错了",
          uni: this.$route.query.wxid
        }
      }).then(() => {
        Toast.success("申请退款提交成功");
        this.$router.push("/pay?wxid=" + this.$route.query.wxid)
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
}
</script>

<style lang="less" scoped>
.card {
  padding: .3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;

  .picture {
    width: 1.3rem;
    height: 1.3rem;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .text {
    width: 5.5rem;
    display: flex;
    justify-content: space-between;

    .name {
      width: 3.6rem;
    }

    .money {
      color: #999;

      .count {
        text-align: right;
      }
    }
  }
}

.list {
  margin-top: .2rem;
}

.refund {
  display: flex;
  justify-content: center;

  button {
    font-size: .32rem;
    color: #fff;
    width: 6.9rem;
    height: .86rem;
    border-radius: .5rem;
    text-align: center;
    line-height: .86rem;
    margin: .43rem auto;
    background-color: #e93323;
    border: none;
  }
}
</style>