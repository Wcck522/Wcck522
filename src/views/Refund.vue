<template>
  <div>
    <div class="card" v-for="item in list" :key="item.id">
      <router-link :to="'/pay?wxid='+item.order_id" style="color: black">
      <div class="title">订单号: {{ item.order_id }}</div>
      <div class="icon"><img src="../assets/退款中.png" alt=""></div>
      <div class="product" v-for="i in item.cartInfo" :key="i.id">
        <div class="picture"><img :src="i.productInfo.image" alt=""></div>
        <div class="text">
          <div class="text_title">
          <div class="name van-ellipsis">{{i.productInfo.store_name}}</div><div class="num">x{{i.cart_num}}</div>
          </div>
          <div class="attr">{{i.productInfo.attrInfo.suk}}</div>
          <div class="price">￥{{i.truePrice}}</div>
        </div>
      </div>
      <div class="totalMoney">共{{item.total_num}}件商品,总金额 <span style="color:#fc4141;font-weight: 700">￥{{item.deduction_price}}</span></div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Refund",
  data(){
    return {
      list: null
    }
  },
  created(){
    this.axios({
      url: '/api/order/list?page=1&limit=20&type=-3',
      method: 'get',
      headers: {
        'Authori-zation': 'Bearer ' + this.$store.state.token
      },
    }).then(res=>{
      console.log(res)
      this.list=res.data.data;
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
.card{
  width: 100%;
  position: relative;
  .title{
    height: .9rem;
    background: white;
    display: flex;
    align-items: center;
    padding: .3rem;
    border-bottom: 1px solid #eee;
  }
  .product{
    display: flex;
    padding: 0 .3rem;
    justify-content: space-between;
    align-items: center;
    height: 1.8rem;
    background: white;
    .picture{
      flex-shrink: 0;
      width: 1.3rem;
      height: 1.3rem;
      img{
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .text{
      width: 5.4rem;
      .text_title{
        display: flex;
        justify-content: space-between;
        .name{
          width: 4.5rem;
        }
      }
      .attr{
        margin-top: .1rem;
        font-size: .2rem;
        color: #868686;
      }
      .price{
        font-size: .26rem;
        margin-top: .2rem;
      }
    }
  }
  .totalMoney{
    padding: 0 .3rem .3rem .3rem;
    text-align: right;
    font-size: .26rem;
    background: white;
    color: #282828;
  }
}

.icon{
  right: .5rem;
  top: .1rem;
  width: 1.1rem;
  height: 1.1rem;
  position: absolute;
}
</style>