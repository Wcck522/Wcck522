<template>
  <section>
    <van-tabbar route v-model="active" active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item to="/" icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item to="/cartgory" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/my" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </section>
</template>

<script>
export default {
  name: "HomeNav",
  data() {
    return {
      active: 0,
      icon: {
        active: 'https://img01.yzcdn.cn/vant/user-active.png',
        inactive: 'https://img01.yzcdn.cn/vant/user-inactive.png',
      },
    };
  },
}
</script>

<style lang="less" scoped>
.van-tabbar {
  height: 1rem;
}

/deep/ .van-tabbar-item__icon {
  font-size: .45rem;
  height: .55rem;
  line-height: .55rem;
  margin-bottom: 0;
}

.van-tabbar-item {
  font-size: .2rem;
}

</style>