<template>
  <div>
    <section class="myIndex" v-if="payInfo&&userInfo">
      <header>
        <div class="head">
          <img :src="userInfo.avatar" alt="">
          <div class="text">
            <p>{{ userInfo.nickname }}</p>
            <p>ID: {{ userInfo.uid }}
              <van-icon name="edit" class="icon_edit"/>
            </p>
          </div>
        </div>
        <div class="icon">
          <router-link to="/setting">
          <img src="../assets/set.png" alt="">
          </router-link>
        </div>
      </header>
      <main class="operation">
        <section class="myWallet">
          <ul>
            <li>
              我的余额
              <p>{{ userInfo.now_money }}</p>
            </li>
            <li>
              当前佣金
              <p>{{ userInfo.commissionCount }}</p>
            </li>
            <li>
              优惠券
              <p>{{ userInfo.couponCount }}张</p>
            </li>
          </ul>
        </section>
        <section class="myOrder">
          <div class="all">我的订单<span @click="goList">全部订单<i class="fa fa-angle-right"></i></span></div>
          <div class="orders">
            <ul>
              <li @click="goPay(0)">
                <van-badge :class="payInfo.unpaid_count==0?'din':''" :content="payInfo.unpaid_count">
                  <div class="picture"><img src="../assets/01.png" alt=""></div>
                </van-badge>
                <div>待付款</div>
              </li>
              <li @click="goPay(1)">
                <van-badge :class="payInfo.unshipped_count==0?'din':''" :content="payInfo.unshipped_count">
                  <div class="picture"><img src="../assets/02.png" alt=""></div>
                </van-badge>
                <div>待发货</div>
              </li>
              <li @click="goPay(2)">
                <van-badge :class="payInfo.received_count==0?'din':''" :content="payInfo.received_count">
                  <div class="picture"><img src="../assets/03.png" alt=""></div>
                </van-badge>
                <div>待收货</div>
              </li>
              <li @click="goPay(3)">
                <van-badge :class="payInfo.evaluated_count==0?'din':''" :content="payInfo.evaluated_count">
                  <div class="picture"><img src="../assets/04.png" alt=""></div>
                </van-badge>
                <div>待评论</div>
              </li>
              <li @click="goPay(4)">
                <van-badge :class="payInfo.refund_count==0?'din':''" :content="payInfo.refund_count">
                  <div class="picture"><img src="../assets/05.png" alt=""></div>
                </van-badge>
                <div>售后/退款</div>
              </li>
            </ul>
          </div>
        </section>
        <section class="service">
          <div class="title">我的服务</div>
          <ul>
            <li>
              <div class="picture"><img src="../assets/06.png" alt=""></div>
              会员中心
            </li>
            <li>
              <div class="picture"><img src="../assets/07.png" alt=""></div>
              砍价记录
            </li>
            <li>
              <div class="picture"><img src="../assets/08.png" alt=""></div>
              我的推广
            </li>
            <li>
              <div class="picture"><img src="../assets/09.png" alt=""></div>
              我的余额
            </li>
            <li>
              <div class="picture"><img src="../assets/10.png" alt=""></div>
              地址信息
            </li>
            <li>
              <router-link to="/collection" style="color: black">
                <div class="picture"><img src="../assets/11.png" alt=""></div>
                我的收藏
              </router-link>
            </li>
            <li>
              <div class="picture"><img src="../assets/12.png" alt=""></div>
              优惠券
            </li>
            <li>
              <div class="picture"><img src="../assets/13.png" alt=""></div>
              联系客服
            </li>
          </ul>
        </section>
      </main>
      <footer><img src="../assets/logo.png" alt=""></footer>
    </section>

    <div class="loading" v-else>
      <van-loading size="1rem" type="spinner"  vertical>加载中...</van-loading>
    </div>
  </div>
</template>

<script>
export default {
  name: "My",
  data() {
    return {
      payInfo: null,
      userInfo: null
    }
  },
  created() {
    this.axios({
      url: '/api/order/data',
      headers: {
        'Authori-zation': 'Bearer ' + sessionStorage.getItem('token') || this.$store.state.token
      },
      method: "get",
    }).then(res => {
      this.payInfo = res.data.data;
    })

    this.axios({
      url: '/api/user',
      headers: {
        'Authori-zation': 'Bearer ' + sessionStorage.getItem('token') || this.$store.state.token
      },
      method: "get",
    }).then(res => {
      this.userInfo = res.data.data;
    })
  },
  methods: {
    goList() {
      this.$router.push("/ordersInfo")
    },
    goPay(num) {
      if (num == 4) {
        this.$router.push('/refund');
        return;
      }
      this.$router.push("/ordersInfo?active=" + num)
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
.myIndex {
  font-family: 'MXiangHeHeiTC', sans-serif;
}

.myIndex header {
  background: #e93323;
  height: 2rem;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;

  &::after {
    content: '';
    height: 1rem;
    display: block;
    background: #e93323;
    width: 100%;
    position: absolute;
    bottom: -1rem;
    border-radius: 0 0 50% 50%;
    z-index: -1;
  }

  .head {
    display: flex;
    padding-left: .3rem;
    align-items: center;

    img {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
    }

    .text {
      margin-left: 0.35rem;

      p:nth-of-type(1) {
        font-size: .32rem;
        color: white;
      }

      p:nth-of-type(2) {
        display: flex;
        align-items: center;
        color: rgba(255, 255, 255, .5);

        .icon_edit {
          margin-left: .1rem;
        }
      }
    }
  }

  .icon {
    margin-right: .3rem;
    width: 0.5rem;
  }
}

.operation {
  padding: 0 .2rem;

  .myWallet {
    height: 1.5rem;
    background: white;
    border-radius: .1rem;
    display: flex;
    align-items: center;

    ul {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      li {
        font-size: .28rem;
        flex: 1;
        color: rgba(0, 0, 0, .6);
        text-align: center;

        &:not(&:last-child) {
          border-right: 1px solid #ccc;
        }

        p {
          margin-top: .1rem;
          color: black;
          font-size: .36rem;
        }
      }
    }
  }

  .myOrder {
    margin-top: .2rem;
    width: 100%;
    background: white;
    border-radius: .1rem;

    .all {
      height: .9rem;
      border-bottom: 1px solid #eee;
      width: 100%;
      padding: 0 .3rem;
      display: flex;
      align-items: center;
      font-size: .28rem;
      justify-content: space-between;
    }

    .orders {
      ul {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 1.6rem;

        li {
          flex: 1;
          text-align: center;

          .picture {
            width: .5rem;
            height: .42rem;
            margin: 0 auto .18rem auto;

            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }

  .service {
    margin-top: .2rem;
    width: 100%;
    background: white;
    border-radius: .1rem;
    padding-bottom: .3rem;

    .title {
      height: .9rem;
      border-bottom: 1px solid #eee;
      width: 100%;
      padding: 0 .3rem;
      display: flex;
      align-items: center;
      font-size: .28rem;
    }

    ul {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      text-align: center;

      li {
        margin-top: .3rem;
        flex-basis: 25%;

        .picture {
          width: .5rem;
          height: .5rem;
          margin: 0 auto .18rem auto;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}

footer {
  margin-top: .5rem;
  text-align: center;
  width: 100%;

  img {
    width: 2.5rem;
    height: .8rem;
  }
}


/deep/ .van-badge--fixed {
  padding: 0 .1rem;
  background: #fff;
  border: 1px solid #ee0a24;
  color: #ee0a24;
}

.din {
  /deep/ .van-badge--fixed {
    display: none;
  }
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>