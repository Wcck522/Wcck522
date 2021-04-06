<template>
  <div class="pay" v-if="info">
    <template v-if="info._status._type!=-1">
      <div class="title">
        <div class="picture"><img v-if='active==0' src="../assets/sf.gif" alt=""><img v-else src="../assets/cat.gif"
                                                                                      alt=""></div>
        <div class="text">
          <div class="msg">{{ info._status._msg }}</div>
          <div class="time">{{ info.add_time_y + " " + info.add_time_h }}</div>
        </div>
      </div>
      <van-steps :active="active" active-color="#fc4141">
        <van-step>待付款</van-step>
        <van-step>待发货</van-step>
        <van-step>待收货</van-step>
        <van-step>待评价</van-step>
        <van-step>已完成</van-step>
      </van-steps>
      <div class="address">
        <div class="name">{{ info.real_name }}<span>{{ info.user_phone }}</span></div>
        <div class="dress">{{ info.user_address }}</div>
      </div>
      <div class="line"><img src="../assets/line.jpg" alt=""></div>
    </template>
    <div class="refund" v-else>
      <div class="bo">
        <div class="msg">{{ info._status._msg }}</div>
        <div class="time">{{ info.add_time_y + " " + info.add_time_h }}</div>
      </div>
    </div>
    <section class="product">
      <div class="count">共{{ info.total_num }}件商品</div>
      <div class="card" v-for="item in info.cartInfo" :key="item.id">
        <div class="picture"><img :src="item.productInfo.image" alt=""></div>
        <div class="text">
          <div class="text_title">
            <div class="name">{{ item.productInfo.store_name }}</div>
            <span>x{{ item.cart_num }}{{ item.productInfo.unit_name }}</span></div>
          <div class="attr">{{ item.productInfo.attrInfo.suk }}</div>
          <div class="price">￥{{ item.productInfo.attrInfo.price }}</div>
        </div>
      </div>
      <div class="contact">
        <van-icon name="service-o"/>
        联系客服
      </div>
    </section>
    <section class="msg">
      <div class="msg_number">订单编号: <span>{{ info.order_id }}</span></div>
      <div class="msg_time">下单时间: <span>{{ info.add_time_y + " " + info.add_time_h }}</span></div>
      <div class="msg_type">订单类型: <span>普通订单</span></div>
      <div class="msg_state">支付状态: <span>{{ info._status._title }}</span></div>
      <div class="msg_method">支付方式: <span>{{ info._status._payType }}</span></div>
    </section>
    <section class="payMoney">
      <div class="payMoney_name">支付金额</div>
      <div class="payMoney_price">￥{{ info.pay_price }}</div>
    </section>
    <section class="payfor">实付款: <span>￥{{ info.pay_price }}</span></section>
    <footer v-show="info._status._type!=-1">
      <template v-if="active==0">
        <button @click="cancel(info.order_id)">取消订单</button>
        <button>立即付款</button>
      </template>
      <router-link :to="'/qrefund?wxid='+info.order_id" v-else>
        <button>申请退款</button>
      </router-link>
    </footer>
  </div>
</template>

<script>
import {Toast} from "vant";
import {Dialog} from "vant";

export default {
  name: "Pay",
  data() {
    return {
      info: null,
      active: 0,
    }
  },
  methods: {
    cancel(id) {
      let beforeClose = (action, done) => {
        if (action === 'confirm') {
          setTimeout(done, 500);
          this.axios({
            url: '/api/order/cancel',
            method: 'post',
            data: {
              id
            },
            headers: {
              'Authori-zation': 'Bearer ' + this.$store.state.token
            },
          }).then(() => {
            setTimeout(() => {
              Toast.success('取消订单成功');
              this.$router.push('/ordersinfo');
            }, 500)
          })
        } else {
          done();
        }
      }

      Dialog.confirm({
        title: '提示',
        message: '确认取消该订单?',
        beforeClose,
      });
    },
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
      this.active = res.data.data._status._type;
    })

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
.refund {
  height: 1.6rem;
  background-color: #666;
  display: flex;
  align-items: center;
  padding: .3rem;
  color: white;

  .msg {
    font-weight: 700;
  }

  .time {
    color: rgba(255, 255, 255, .8);
    font-size: .24rem;
  }
}

.pay {
  font-family: 'MXiangHeHeiTC', sans-serif;
}

.title {
  height: 1.6rem;
  padding: 0 .3rem;
  background: #e93323;
  display: flex;
  align-items: center;

  .picture {
    width: 1.2rem;
    height: 1.2rem;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .text {
    margin-left: .2rem;

    .msg {
      font-size: .3rem;
      font-weight: 700;
      margin-bottom: .1rem;
      color: #fff;
    }

    .time {
      color: rgba(255, 255, 255, .6);
      font-size: .24rem;
    }
  }
}

.van-steps {
  font-size: .28rem;
  background: #fff;
  padding: .3rem;
  font-weight: 700;

  /deep/ .van-step--horizontal:nth-of-type(1) .van-step__circle-container {
    padding-left: .5rem;
  }

  /deep/ .van-step--horizontal:nth-of-type(5) .van-step__circle-container {
    padding-right: .5rem;
  }
}

.address {
  padding: 0 .3rem .3rem;
  background: #fff;

  .name {
    display: flex;
    align-items: center;

    span {
      margin-left: .3rem;
    }
  }

  .dress {
    display: flex;
    align-items: center;
    margin-top: .15rem;
    color: #868686;
    font-size: .26rem;
  }
}

.line {
  img {
    display: block;
  }
}

.product {
  margin-top: .2rem;
  background: white;

  .count {
    height: .9rem;
    padding: 0 .3rem;
    border-bottom: .01rem solid #eee;
    font-size: .3rem;
    display: flex;
    align-items: center;
  }

  .card {
    padding: 0 .3rem;
    display: flex;
    height: 1.8rem;
    align-items: center;
    justify-content: space-between;
    border-bottom: .01rem solid #eee;

    .picture {
      width: 1.3rem;
      height: 1.3rem;
      flex-shrink: 0;

      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }

    .text {
      width: 5.4rem;

      .text_title {
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: .28rem;

        .name {
          width: 85%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        span {
          color: #868686;
        }
      }

      .attr {
        margin-top: .05rem;
        font-size: .22rem;
        color: #868686;
      }

      .price {
        margin-top: .15rem;
        font-size: .26rem;
        color: #fc4141;
      }
    }
  }

  .contact {
    display: flex;
    align-items: center;
    height: .9rem;
    justify-content: center;

    .van-icon {
      color: #fc4141;
      font-size: .32rem;
      font-weight: 700;
      margin-right: .1rem;
    }
  }
}

section.msg {
  padding: .3rem;
  margin-top: .2rem;
  background: #fff;

  div {
    display: flex;
    justify-content: space-between;

    span {
      color: #868686;
    }
  }

  div:not(:first-of-type) {
    margin-top: .2rem;
  }
}

section.payMoney {
  margin-top: .2rem;
  padding: 0 .3rem;
  height: .9rem;
  background: white;
  border-bottom: .01rem solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .payMoney_price {
    color: #868686;
  }
}

section.payfor {
  display: flex;
  justify-content: flex-end;
  height: .9rem;
  padding: 0 .3rem;
  background: white;
  align-items: center;

  span {
    color: #fc4141;
    font-weight: 700;
  }
}

footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1rem;
  background: white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 .3rem;

  button {
    height: .6rem;
    outline: none;
    border-radius: .3rem;
    display: block;
    background: #fc4141;
    border: none;
    color: white;

    &:first-of-type {
      margin-right: .2rem;
      background: white;
      border: 1px solid #eee;
      color: #aaa;
    }
  }
}
</style>