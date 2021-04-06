<template>
  <div class="box">
    <router-link to="/search">
      <van-search
          v-model="value"
          shape="round"
          background="#fff"
          placeholder="搜索商品"
          style=""
      >
        <template #left>
          <van-image class="searchIcon"
                     src="http://kaifa.crmeb.net/uploads/attach/2019/08/20190801/deb30359d22c0b80f3cece86cb462104.png"></van-image>
        </template>
      </van-search>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      value: null
    }
  }
}
</script>

<style lang="less" scoped>
a {
  width: 100%;
}

div.box {
  display: flex;
  height: 1rem;
  width: 100%;

  .searchIcon {
    width: 1.27rem;
    height: .45rem;
    margin-right: .25rem;
  }

  .van-search__content--round {
    display: flex;
    height: .64rem;
    align-items: center;
    background-color: #f7f7f7;
    border-radius: .5rem;
    padding: 0 .28rem;
    font-size: .28rem;
    color: #bbb;
    overflow: hidden;
  }
}

/deep/ .van-field__left-icon .van-icon, .van-field__right-icon .van-icon {
  font-size: .34rem;
  margin-right: .16rem;
  display: inline-block;
}

/deep/ .van-field__value {
  font-size: .28rem;
}

.van-search {
  width: 100%;
}

/deep/ .van-field__left-icon {
  position: relative;
  margin-right: .45rem;

  .van-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
}

</style>