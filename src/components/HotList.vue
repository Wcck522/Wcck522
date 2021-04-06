<template>
  <section>
    <div class="hotBg">
      <div class="title">
        <div class="text"><span>热门榜单</span>根据销量、搜索、好评等综合得出</div>
        <router-link class="more" :to="'/'+where">更多
          <i class="fa fa-chevron-right"></i>
        </router-link>
      </div>
    </div>
    <ul class="list">
      <router-link v-for="(i,index) in hotList" :key="i.id" :to="'/detail?id='+i.id">
        <li>
          <div class="picture">
            <img :src="i.image" alt="" class="productsImg">
            <img :src="levels[index]" alt="" class="level">
          </div>
          <div class="name">{{ i.store_name }}</div>
          <div class="prices">￥{{ i.price }}</div>
        </li>
      </router-link>
    </ul>
  </section>
</template>

<script>
export default {
  name: "HotList",
  props: ['hotList', 'where'],
  data() {
    return {
      levels: [
        "http://47.115.51.185/h5/img/one.2814de22.png",
        "http://47.115.51.185/h5/img/two.1ea1d146.png",
        "http://47.115.51.185/h5/img/three.2162defb.png",
      ],
    }
  }
}
</script>

<style lang="less" scoped>
.hotBg {
  width: 100%;
  height: 2.15rem;
  background-image: url(../assets/hotBg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 0 .3rem;
  font-size: .24rem;
  color: #fff;
  margin-top: .15rem;

  .title {
    height: .87rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;

    .text {
      width: 5.75rem;

      span {
        font-size: .3rem;
        font-weight: 700;
        margin-right: .2rem;
      }
    }

    .more {
      color: #333;

      i {
        font-size: .25rem;
        margin-left: .1rem;
      }
    }
  }
}

.list {
  width: 6.9rem;
  height: 3.3rem;
  border-radius: .2rem;
  background-color: #fff;
  margin: -1.28rem auto 0 auto;
  padding: 0 .22rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 0.2rem -0.1rem #aaa;

  li {
    width: 2rem;
    text-align: left;

    .picture {
      width: 100%;
      height: 2rem;
      position: relative;

      img.productsImg {
        width: 100%;
        height: 100%;
        border-radius: .1rem;
      }

      .level {
        width: .5rem;
        height: .5rem;
        border-radius: 50%;
        position: absolute;
        top: .07rem;
        left: .07rem;
      }
    }

    .name {
      font-size: .26rem;
      color: #282828;
      margin-top: .12rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
      overflow: hidden;
    }

    .prices {
      font-size: .28rem;
      color: #fc4141;
      font-weight: 700;
      margin-top: .02rem;
    }
  }
}
</style>