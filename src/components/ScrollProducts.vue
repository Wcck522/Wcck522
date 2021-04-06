<template>
  <ul>
    <li v-for="item in scrollProductsData" :key="item.id">
      <router-link :to="'/goodslist?id='+item.id+'&title='+item.cate_name">
        <van-image :src="item.pic"></van-image>
        <section class="name">{{ item.cate_name }}</section>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "ScrollProducts",
  props: ['scrollProductsData']
}
</script>

<style lang="less" scoped>
ul {
  overflow-y: auto;
  margin-top: .38rem;
  padding: 0 .3rem .37rem .3rem;
  display: flex;
  background: white;
  a {
    color: #333333;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  li {
    width: 1.8rem;
    margin-right: .19rem;
    display: inline-block;
    flex-shrink: 0;
    font-size: .28rem;
    background: white;
    &:nth-last-of-type(3n) {
      border-bottom: .04rem solid blue;
    }

    &:nth-last-of-type(3n+1) {
      border-bottom: .04rem solid green;
    }

    &:nth-last-of-type(3n+2) {
      border-bottom: .04rem solid red;
    }

    section.name {
      font-size: .24rem;
      border: 1px solid #f5f5f5;
      border-top: 0;
      border-bottom: 0;
      padding: 0.1rem;
      line-height: .5rem;
      height: .6rem;
      text-align: center;
    }
  }
}

.van-image {
  width: 100%;
  height: 1.8rem;
}
</style>