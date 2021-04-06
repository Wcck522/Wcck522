<template>
  <section>
    <div class="title">
      <div class="left">
        <h5>
          <slot name="title"></slot>
        </h5>
        <section><small>
          <slot name="tips"></slot>
        </small></section>
      </div>
      <router-link class="more" :to="'/'+where">更多
        <i class="fa fa-chevron-right"></i>
      </router-link>
    </div>
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: "ProductsSelect",
  props: ["scrollProductsData", "isScroll", "where"],
  components: {}
}
</script>

<style lang="less" scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  margin: 0 .3rem;
  padding-top: .34rem;
  border-top: 1px solid #eee;
  font-size: 14px;

  .left {
    h5 {
      font-weight: bold;
      font-size: .3rem;
    }

    small {
      font-size: .24rem;
      color: #999;
    }
  }

  .more {
    font-size: .26rem;
    text-align: center;
    color: #333333;

  }
}
</style>