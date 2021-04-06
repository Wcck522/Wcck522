<template>
  <div>
    <div class="orders" v-if="detail && payInfo && userInfo">
      <header>
        <div class="o_info">
          <div class="text">
            <div class="text_title">订单信息</div>
            <div>累计订单: {{payInfo.order_count}} 总消费: ￥{{payInfo.sum_price}}</div>
          </div>
          <div class="picture"><img src="../assets/orderTime.png" alt=""></div>
        </div>
      </header>
      <main>
        <section class="tabs">
          <ul>
            <li @click="pay" :class="active==0?'active':''">
              <div>待付款</div>
              <div>{{ payInfo.unpaid_count }}</div>
            </li>
            <li @click="shipping" :class="active==1?'active':''">
              <div>代发货</div>
              <div>{{ payInfo.unshipped_count }}</div>
            </li>
            <li @click="consignees" :class="active==2?'active':''">
              <div>待收货</div>
              <div>{{ payInfo.received_count }}</div>
            </li>
            <li @click="comment" :class="active==3?'active':''">
              <div>待评价</div>
              <div>{{ payInfo.evaluated_count }}</div>
            </li>
            <li @click="completed" :class="active==4?'active':''">
              <div>已完成</div>
              <div>{{ payInfo.complete_count }}</div>
            </li>
          </ul>
        </section>
        <section class="products">
          <div class="card" v-for="item in detail" :key="item.id">
            <div class="state">
              <div class="time">{{ item._add_time }}</div>
              <span style="color: #fc4141">{{ item._status._title }}</span>
            </div>
            <router-link :to="'/pay?wxid='+item.order_id" style="color: black">
              <div class="product" v-for="i in item.cartInfo" :key="i.id">
                <div class="picture"><img :src="i.productInfo.attrInfo.image" alt=""></div>
                <div class="text">
                  <div class="name van-multi-ellipsis--l2">{{ i.productInfo.store_name }}</div>
                  <div class="text_price">
                    <div class="text_price_money">￥{{ i.productInfo.price }}</div>
                    <div class="text_price_count">x{{ i.cart_num }}</div>
                  </div>
                </div>
              </div>
            </router-link>
            <div class="price">
              共{{ item.total_num }}件商品, 总金额<span style="font-weight:700;color: #fc4141">￥{{ item.pay_price }}</span>
            </div>
            <div class="operate">
              <template v-if="active==0">
                <button @click="cancel(item.order_id)">取消订单</button>
                <button @click="p(item.order_id)">立即付款</button>
              </template>
              <router-link v-else :to="'/pay?wxid='+item.order_id">
                <button>查看详情</button>
              </router-link>
            </div>
          </div>
        </section>
      </main>
      <van-action-sheet v-model="show" title="选择付款方式">
        <div class="wechat" @click="payfor">
          <div class="icon">
            <van-icon name="wechat-pay"/>
          </div>
          <div class="text">
            <div class="text_method">微信支付</div>
            <div class="text_msg">使用微信快捷支付</div>
          </div>
          <div class="angle"><i class="fa fa-angle-right"></i></div>
        </div>
        <div class="wallet" @click="payfor">
          <div class="icon">
            <van-icon name="gold-coin"/>
          </div>
          <div class="text">
            <div class="text_method">余额支付</div>
            <div class="text_msg">当前可用余额: <span style="color:#fc4141">{{userInfo.now_money}}</span></div>
          </div>
          <div class="angle"><i class="fa fa-angle-right"></i></div>
        </div>
      </van-action-sheet>
    </div>

    <div class="loading" v-else>
      <van-loading size="1rem" type="spinner"  vertical>加载中...</van-loading>
    </div>
  </div>
</template>

<script>
import {Dialog} from 'vant';
import {Toast} from 'vant'

export default {

  name: "OrdersInfo",
  data() {
    return {
      active: this.$route.query.active || 0,
      detail: null,
      payInfo: null,
      show: false,
      userInfo: null,
      currentId: null
    };
  },
  methods: {
    p(e){
      this.show = true;
      this.currentId=e;
    },

    payfor() {
      Toast({
        message: '订单支付中...',
      });
      this.axios({
        url: '/api/order/pay',
        method: "post",
        data: {
          from: "weixinh5",
          paytype: "yue",
          uni: this.currentId
        },
        headers: {
          'Authori-zation': 'Bearer ' + this.$store.state.token
        },
      }).then(res=>{
        console.log(res)
        this.$router.push('/pay?wxid='+this.currentId)
      })
      this.show = false;
    },
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
            this.getDetail();
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
    pay() {
      this.active = 0;
      this.getDetail();
    },
    shipping() {
      this.active = 1;
      this.getDetail();
    },
    consignees() {
      this.active = 2;
      this.getDetail();
    },
    comment() {
      this.active = 3;
      this.getDetail();
    },
    completed() {
      this.active = 4;
      this.getDetail();
    },
    getDetail() {
      this.axios({
        method: "get",
        url: "/api/order/list?page=1&limit=20&type=" + this.active,
        headers: {
          'Authori-zation': 'Bearer ' + this.$store.state.token
        }
      }).then(res => {
        this.detail = res.data.data;
        this.axios({
          url: '/api/order/data',
          headers: {
            'Authori-zation': 'Bearer ' + this.$store.state.token
          },
          method: "get",
        }).then(res => {
          this.payInfo = res.data.data;
          console.log(res)
        })
      })
    }
  },
  created() {
    console.log(this.$store.state.userInfo)
    this.getDetail();
    this.axios({
      url: '/api/order/data',
      headers: {
        'Authori-zation': 'Bearer ' + this.$store.state.token
      },
      method: "get",
    }).then(res => {
      this.payInfo = res.data.data;
    });
    this.axios({
      method: 'get',
      url:'/api/user',
      headers: {
        'Authori-zation': 'Bearer ' + this.$store.state.token
      }
    }).then(d=>{
      this.userInfo = d.data.data;
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
header {
  height: 2.6rem;
  background: #e93323;
  padding: 0 .3rem;
  color: white;

  .o_info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.9rem;

    .picture {
      width: 1.2rem;
      height: 1.1rem;

      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }

    .text {
      div:last-of-type {
        color: rgba(255, 255, 255, .8);
        font-size: .26rem;
      }

      .text_title {
        font-weight: 900;
        font-size: .32rem;
        margin-bottom: .2rem;
      }
    }
  }
}

.tabs {
  width: 7rem;
  height: 1.4rem;
  margin: -.73rem auto 0 auto;
  border-radius: .06rem;
  background: white;

  ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      border-bottom: .05rem solid transparent;

      &.active {
        border-bottom-color: #e93323;
      }
    }
  }
}

.products {
  width: 6.9rem;
  margin: .2rem auto 0 auto;

  .card {
    background: white;
    margin-top: .2rem;

    .state {
      height: .9rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 .3rem;
      border-bottom: .01rem solid #eee;
    }

    .product {
      display: flex;
      padding: 0 .3rem;
      justify-content: space-between;
      margin-top: .2rem;

      .picture {
        width: 1.2rem;
        height: 1.2rem;

        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }

      .text {
        display: flex;
        justify-content: space-between;
        width: 5rem;
        font-size: .26rem;
        margin-top: .1rem;

        .name {
          width: 3rem;
          height: .69rem;
        }

        .text_price {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          color: #999;
        }
      }
    }

    .price {
      display: flex;
      justify-content: flex-end;
      padding-right: .3rem;
      padding-bottom: .3rem;
      margin-top: .2rem;
      border-bottom: .01rem solid #eee;
    }

    .operate {
      display: flex;
      justify-content: flex-end;
      padding: .3rem .3rem .3rem 0;

      button {
        width: 1.7rem;
        height: .6rem;
        font-size: .26rem;
        border-radius: .5rem;
      }

      button:first-of-type {
        margin-right: .2rem;
        border: 1px solid #eee;
        color: #aaa;
        background: white;
      }

      button:last-of-type {
        border: none;
        background: #e93323;
        color: white;
      }
    }
  }
}

.wechat {
  border: 1px solid #eee;
}

.wechat, .wallet {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem;

  .icon {
    font-size: .45rem;
    color: #09bb07;
  }

  .text {
    width: 5.4rem;

    .text_msg {
      font-size: .24rem;
      color: #999;
    }
  }

  .angle {
    font-size: .6rem;
  }
}

.wallet {
  .icon {
    color: #f90;
  }
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>