<template>
  <div class="box" v-if="info">
    <div class="fail">
      <div class="icon">
        <van-icon color="#fc4141" name="checked" v-if="isSuccess=='true'"/>
        <van-icon name="clear" v-else/>
      </div>
      <div class="msg">{{ isSuccess == 'true' ? '订单支付成功' : '订单支付失败' }}</div>
      <div class="text">
        <div class="number">
          <div>订单编号</div>
          <div class="num">{{ info.order_id }}</div>
        </div>
        <div class="number">
          <div>下单时间</div>
          <div class="num">{{ info.add_time_y + " " + info.add_time_h }}</div>
        </div>
        <div class="number">
          <div>支付方式</div>
          <div class="num">{{ info._status._payType }}</div>
        </div>
        <div class="number">
          <div>支付金额</div>
          <div class="num">{{ info.pay_price }}</div>
        </div>
      </div>
      <div class="man">
        <button @click="go" class="end">查看支付结果</button>
        <button class="re">支付失败重新支付</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Fail",
  data() {
    return {
      info: null,
      isSuccess: null
    }
  },
  methods: {
    go() {
      this.$router.push("/pay?wxid=" + this.info.order_id)
    }
  },
  created() {
    this.axios({
      method: "get",
      url: "/api/order/detail/" + this.$route.query.wxid,
      headers: {
        'Authori-zation': 'Bearer ' + this.$store.state.token
      }
    }).then(res => {
      this.info = res.data.data;
      console.log(res)
    })
    this.isSuccess = this.$route.query.isSuccess;
    console.log(this.isSuccess)
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
.box {
  font-family: 'MXiangHeHeiTC', sans-serif;

  .fail {
    background-color: #fff;
    margin: 1.95rem auto 0 auto;
    border-radius: .1rem;
    padding: .01rem 0 .28rem 0;
    width: 6.9rem;
    left: 50%;

    .icon {
      margin: -.8rem auto 0 auto;
      width: 1.5rem;
      height: 1.5rem;

      .van-icon {
        font-size: 1.5rem;
      }
    }

    .msg {
      font-size: .32rem;
      text-align: center;
      margin: .3rem 0;
    }

    .text {
      margin: 0 .3rem .5rem .3rem;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      padding: .3rem;

      .number {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &:not(:first-of-type) {
          margin-top: .2rem;
        }
      }
    }

    .man {
      display: flex;
      flex-direction: column;
      align-items: center;

      button {
        width: 6.3rem;
        height: .9rem;
        border-radius: .5rem;
        color: #fff;
        outline: none;
        font-size: .3rem;
        border: none;
      }

      button:nth-of-type(1) {
        background: #fc4141;
      }

      button:nth-of-type(2) {
        background: white;
        margin-top: .2rem;
        color: #fc4141;
        border: 1px solid #fc4141;
      }
    }
  }
}
</style>