<template>
  <div v-if="list">
    <div v-if="list">
      <div class="card" v-for="item in list" :key="item.pid">
        <div class="picture"><img :src="item.image" alt=""></div>
        <div class="text">
          <div class="name van-ellipsis">{{ item.store_name }}</div>
          <div class="price">
            <div class="money">￥{{ item.price }}</div>
            <button @click="remove(item.category,item.pid)">删除</button>
          </div>
        </div>
      </div>
    </div>
    <div class="loading" v-else>
      <van-loading size="1rem" type="spinner" vertical>加载中...</van-loading>
    </div>
    <Fourzerofour v-if="list.length<=0"></Fourzerofour>
  </div>
</template>

<script>
import {Toast} from 'vant';
import Fourzerofour from "../components/Fourzerofour";

export default {
  name: "Collection",
  components: {
    Fourzerofour
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.axios({
        url: '/api/collect/user?page=1&limit=20',
        method: 'get',
        headers: {
          'Authori-zation': 'Bearer ' + this.$store.state.token
        },
      }).then(res => {
        this.list = res.data.data
      })
    },
    remove(category, id) {
      this.axios({
        url: '/api/collect/del',
        data: {
          category,
          id
        },
        method: 'post',
        headers: {
          'Authori-zation': 'Bearer ' + this.$store.state.token
        },
      }).then(() => {
        this.getDetail();
      })
      Toast.success('取消收藏成功');
    }
  }
}
</script>

<style lang="less" scoped>
.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 .3rem;
  height: 1.8rem;
  border: 1px solid #eee;

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
    width: 5.3rem;
    height: 1.3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .price {
      display: flex;
      justify-content: space-between;

      .money {
        color: #fc4141;
      }

      button {
        width: 1.2rem;
        height: .5rem;
        border: 1px solid black;
        color: black;
        background: white;
      }
    }
  }
}
</style>