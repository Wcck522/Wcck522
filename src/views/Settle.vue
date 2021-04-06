<template>
  <section v-if="detail">
    <header>
      <div class="select">
        <div>收货地址</div>
      </div>
      <div class="address">
        <div class="text">
          <div class="name">{{ detail.addressInfo.real_name }} <span class="phone">{{ detail.addressInfo.phone }}</span></div>
          <div class="dress">[默认] <span class="phone">{{detail.addressInfo.province + detail.addressInfo.city + detail.addressInfo.district + detail.addressInfo.detail}}</span></div>
        </div>
        <div class="angle"><i class="fa fa-angle-right"></i></div>
      </div>
      <div class="line">
        <img src="../assets/line.jpg" alt="">
      </div>
    </header>
    <main>
      <section class="total">共{{ totalNum }}件商品</section>
      <section class="card" v-for="item in detail.cartInfo" :key="item.id">
        <div class="picture"><img :src="item.productInfo.attrInfo.image" alt=""></div>
        <div class="text">
          <div class="top">
            <div class="name">{{ item.productInfo.store_name }}</div>
            <div class="count">x{{ item.cart_num }}</div>
          </div>
          <div class="attr">{{ item.productInfo.attrInfo.suk }}</div>
          <div class="price">￥{{ item.productInfo.price }}</div>
        </div>
      </section>
      <section class="man">
        <div class="coupon">
          <div class="name">优惠券</div>
          <div class="operate">请选择 <i class="fa fa-angle-right"></i></div>
        </div>
        <div class="point">
          <div class="name">积分抵扣</div>
          <div class="operate">当前积分: <span style="color: #fc4141">{{ detail.userInfo.integral }}</span><input type="checkbox" v-model="ivalue" @change="inc"></div>
        </div>
        <div class="courier">
          <div class="name">快递费用</div>
          <div class="operate">{{detail.priceGroup.storePostage!=0?'￥'+detail.priceGroup.storePostage:'免运费'}}</div>
        </div>
        <div class="marks">
          <div class="name">备注信息</div>
          <div class="operate">
            <textarea id="text" placeholder="请添加备注 (150字以内)"></textarea>
          </div>
        </div>
      </section>
      <section class="payMethod">
        <div class="title">支付方式</div>
        <div class="pay">
          <div :class="isSelect?'active wechat':'wechat'" @click="wechatPay"><div class="left"><van-icon name="wechat" />微信支付</div><div class="right">微信快捷方式支付</div></div>
          <div :class="isSelect?'balance':'active balance'" @click="moneyPay"><div class="left"><van-icon name="gold-coin" />余额支付</div><div class="right">可用余额: <span style="color:#fc4141">{{detail.userInfo.now_money}}</span></div></div>
        </div>
      </section>
      <section class="totalMoney">
        <div class="block"><div class="name">商品总价:</div><div class="price">￥ {{ payPrice }}</div></div>
      </section>
    </main>
    <van-submit-bar @submit="settle" text-align="left" :price="( payPrice )*100" button-text="提交订单"  />
  </section>
</template>

<script>
import {Toast} from 'vant';

export default {
  name: "Settle",
  data() {
    return {
      detail: null,
      currentContact: {
        name: '张三',
        tel: '13000000000',
      },
      userInfo: null,
      isSelect: true,
      payType: 'weixin',
      ivalue: false,
      payPrice: false
    };
  },
  methods: {
    inc(){
      if(this.ivalue){
        this.axios({
          url: "/api/order/computed/"+this.detail.orderKey,
          method: "post",
          headers: {
            'Authori-zation': 'Bearer ' + this.$store.state.token
          },
          data: {
            addressId: this.detail.addressInfo.id,
            couponId: 0,
            payType: "weixin",
            shipping_type: 1,
            useIntegral: this.ivalue?1:0
          }
        }).then(res=>{
          console.log(res)
          this.payPrice=res.data.data.result.pay_price;
        })
      }else{
        this.axios({
          url: "/api/order/computed/"+this.detail.orderKey,
          method: "post",
          headers: {
            'Authori-zation': 'Bearer ' + this.$store.state.token
          },
          data: {
            addressId: this.detail.addressInfo.id,
            couponId: 0,
            payType: "weixin",
            shipping_type: 1,
            useIntegral: this.ivalue?1:0
          }
        }).then(res=>{
          console.log(res)
          this.payPrice=res.data.data.result.pay_price;
        })
      }
    },
    settle(){
      this.axios({
        url: "/api/order/create/"+this.detail.orderKey,
        method: "post",
        headers: {
          'Authori-zation': 'Bearer ' + this.$store.state.token
        },
        data: {
          addressId: this.detail.addressInfo.id,
          payType: this.payType,
          bargainId: 0,
          combinationId: 0,
          couponId: 0,
          from: "weixinh5",
          mark: "",
          phone: "",
          pinkId: 0,
          real_name: "",
          seckill_id: 0,
          shipping_type: 1,
          store_id: 0,
          useIntegral: this.ivalue?1:0
        },
      }).then(res=>{
        Toast(res.data.msg);
        let success=res.data.data.status=="SUCCESS";
        this.$router.push('/fail?wxid='+res.data.data.result.orderId+'&isSuccess='+success);
      })

    },
    onEdit() {
      Toast('编辑');
    },
    wechatPay(){
      this.isSelect=true;
      this.axios({
        url: "/api/order/computed/"+this.detail.orderKey,
        method: "post",
        headers: {
          'Authori-zation': 'Bearer ' + this.$store.state.token
        },
        data: {
          addressId: this.detail.addressInfo.id,
          couponId: 0,
          payType: "weixin",
          shipping_type: 1,
          useIntegral: this.ivalue?1:0
        }
      })

      this.payType="weixin";
    },
    moneyPay(){
      this.isSelect=false;
      this.axios({
        url: "http://47.115.51.185/api/order/computed/"+this.detail.orderKey,
        method: "post",
        headers: {
          'Authori-zation': 'Bearer ' + this.$store.state.token
        },
        data: {
          addressId: this.detail.addressInfo.id,
          couponId: 0,
          payType: "yue",
          shipping_type: 1,
          useIntegral: this.ivalue?'1':'0'
        }
      })
      this.payType="yue";
    }
  },
  created() {

    this.axios({
      method: "get",
      url: "/api/userInfo",
      headers: {
        'Authori-zation': 'Bearer ' + this.$store.state.token
      },
    }).then(res=>{
      this.userInfo=res.data.data;
    })


    this.axios({
      method: "post",
      url: "/api/order/confirm",
      headers: {
        'Authori-zation': 'Bearer ' + this.$store.state.token
      },
      data: {
        cartId: this.$route.query.list
      },
    }).then(res => {
      this.detail = res.data.data;
      this.axios({
        url: "/api/order/computed/"+this.detail.orderKey,
        method: "post",
        headers: {
          'Authori-zation': 'Bearer ' + this.$store.state.token
        },
        data: {
          addressId: this.detail.addressInfo.id,
          couponId: 0,
          payType: "weixin",
          shipping_type: 1,
          useIntegral: this.ivalue?1:0
        }
      }).then(res=>{
        this.payPrice=res.data.data.result.pay_price;
      })
    }).catch(err => {
      console.log(err)
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
  computed: {
    totalNum: function () {
      return this.detail.cartInfo.filter((item) => item).reduce((total, item) => {
        return total + item.cart_num;
      }, 0)
    },

  }
}
</script>

<style lang="less" scoped>
section{
  font-family: 'MXiangHeHeiTC', sans-serif;
}

.van-contact-card {
  border-radius: .15rem .15rem 0 0;
}

header {
  padding: .2rem .3rem 0;
  display: flex;
  color: black;
  flex-direction: column;
  background-image: linear-gradient(
      180deg
      ,#e93323 0,#f5f5f5);
  .select {
    div {
      height: .8rem;
      border-radius: .1rem .1rem 0 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: .4rem;
      color: black;
      font-weight: 700;
    }
  }
  .address{
    height: 1.5rem;
    background: white;
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding: .3rem;
    border-radius: .1rem .1rem 0 0;
    .text{
      .name{
        font-size: .3rem;
        font-weight: 700;
        span{
          margin-left: .3rem;
        }
      }
      .dress{
        font-size: .26rem;
        margin-top: .1rem;
        color: #fc4141;
        span{
          margin-left: .1rem;
          color: #666;
        }
      }
    }
    .angle{
      font-size: .6rem;
    }
  }
  .line{
    img{
      display: block;
    }
  }
}

main {

  .total {
    width: 100%;
    height: .9rem;
    padding: 0 .3rem;
    background: white;
    display: flex;
    align-items: center;
  }

  .card {
    border-top: .02rem solid #f0f0f0;
    height: 1.8rem;
    background: white;
    padding: 0 0 0 .3rem;
    display: flex;
    align-items: center;

    .picture {
      width: 1.3rem;
      height: 1.3rem;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .text {
      width: 5.4rem;
      margin-left: .2rem;

      .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        .name {
          font-size: .28rem;
          color: #282828;
          width: 4.53rem;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }

      .attr {
        font-size: .2rem;
        color: #868686;
        margin-top: .1rem;
      }

      .price {
        font-size: .26rem;
        margin-top: .17rem;
        color: #fc4141;
      }
    }
  }

  .man {
    margin-top: .2rem;
    background: #fff;

    & > div {
      padding: .3rem .3rem;
      font-size: .3rem;
      color: #282828;
      border-bottom: 1px solid #f0f0f0;

      .operate {
        color: #999;
      }
    }

    & > div:not(:last-of-type) {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .coupon {
      i {
        margin-left: .15rem;
      }
    }

    .point {
      .operate {
        display: flex;
        align-items: center;

        input {
          background: #fff;
          margin-left: .15rem;
          outline: none;
          width: .3rem;
          height: .3rem;
          border: 1px solid #c9c9c9;
          border-radius: 50%;
          appearance: none;

          &:checked {
            background: url("../assets/select.png") no-repeat center red;
            background-size: 80%;
          }
        }
      }
    }

    .marks {
      textarea#text {
        -webkit-text-size-adjust: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        font-family: PingFang SC, STHeitiSC-Light, Helvetica-Light, arial, sans-serif, Droid Sans Fallback;
        color: #333;
        background-color: #f9f9f9;
        width: 6.9rem !important;
        height: 1.4rem !important;
        border-radius: .03rem;
        margin-top: .3rem;
        padding: .25rem .28rem;
        resize: none;
        outline: none;
        border: 0;
        -webkit-appearance: none;
      }
    }
  }
  .payMethod{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: .2rem;
    padding: .3rem;
    font-size: .3rem;
    color: #282828;
    background: white;
    border-bottom: 1px solid #f0f0f0;
    .pay{
      margin-top: .3rem;
      .wechat,.balance{
        height: .9rem;
        width: 100%;
        border-radius: .1rem;
        border: 1px solid #eee;
      }
      .active{
        border-color: #fc5445;
      }
      .wechat{
        display: flex;
        .left{
          display:flex;
          align-items: center;
          justify-content: center;
          flex-basis: 50%;
          border-right: 1px solid #f7f7f7;
          .van-icon{
            width: .45rem;
            height: .45rem;
            line-height: .45rem;
            border-radius: 50%;
            background: #41b035;
            text-align: center;
            color: white;
            margin-right: .15rem;
          }
        }
        .right{
          flex-basis: 50%;
          display:flex;
          align-items: center;
          justify-content: center;
          color: #aaa;
          font-size: .26rem;
        }
      }
      .balance{
        display: flex;
        margin-top: .2rem;
        .left{
          display:flex;
          align-items: center;
          justify-content: center;
          border-right: 1px solid #f7f7f7;
          flex-basis: 50%;
          .van-icon{
            color:#fe960f;
            font-size: .45rem;
            margin-right: .15rem;
          }
        }
        .right{
          flex-basis: 50%;
          display:flex;
          align-items: center;
          justify-content: center;
          color: #aaa;
          font-size: .26rem;
        }
      }
    }
  }
  .totalMoney{
    margin-top: .2rem;
    margin-bottom: .2rem;
    height: .9rem;
    background: white;
    .block{
      padding: 0 .3rem;
      display: flex;
      height: 100%;
      justify-content: space-between;
      align-items: center;
      .price{
        color: #aaa;
      }
    }
  }
}
</style>