<template>
  <div class="box">
    <section class="pictureBox">
      <div class="picture">
        <img src="../assets/noGoods.png" alt="">
      </div>
    </section>
    <section class="foryou">
      <div class="title">
        <div class="line"></div>
        <div class="tip">为您推荐</div>
        <div class="line"></div>
      </div>
    </section>
    <section class="goodList">
      <ul>
        <router-link v-for="item in dataList" :key="item.id" :to="'/detail?id='+item.id">
          <li>
            <div class="goods_picture">
              <img :src="item.image" alt="">
            </div>
            <div class="text">
              <div class="name">{{ item.store_name }}</div>
              <div class="price">￥{{ item.price }}</div>
            </div>
          </li>
        </router-link>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "Fourzerofour",
  data() {
    return {
      dataList: []
    }
  },
  created() {
    this.axios.get("api/product/hot?page=1&limit=20").then(data => {
      this.dataList = data.data.data;
    })
  }
}
</script>

<style lang="less" scoped>
.box{
  background: white;
  margin-top: .2rem;
}
section.pictureBox {
  padding-top: .75rem;

  .picture {
    width: 4.1rem;
    height: 3.3rem;
    margin: 0 auto .3rem auto;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

section.foryou {
  height: 1.35rem;
  color: #282828;
  display: flex;
  justify-content: center;

  .title {
    display: flex;
    font-size: .28rem;
    align-items: center;

    .line {
      width: 1rem;
      height: .02rem;
      background-color: #999;
    }

    .tip {
      margin: 0 .2rem;
    }
  }
}

section.goodList {
  padding: 0 .3rem;

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    a {
      flex-basis: 49%;
      border-radius: 0.1rem;
      overflow: hidden;
      margin-bottom: .3rem;
      background: white;
      color: black;

      .goods_picture {
        width: 100%;
        height: 3.35rem;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .text {
        margin-top: .2rem;

        .name {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
        }

        .price {
          color: #fc4141;
        }
      }
    }
  }
}
</style>