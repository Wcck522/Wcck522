<template>
  <div class="box">
    <ul>
      <router-link v-for="item in firstList" :key="item.id" :to="'/detail?id='+item.id">
        <li>
          <div>
            <div class="picture">
              <img :src="item.image" alt="">
            </div>
            <div class="name">{{ item.store_name }}</div>
            <div class="prices">￥{{ item.price }}</div>
          </div>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "FirstList",
  props: ["firstList"]
}
</script>

<style lang="less" scoped>
div.box {
  white-space: nowrap;
  padding: 0 .3rem;
  margin: .35rem 0 .42rem 0;
  overflow: hidden;
  font-size: .28rem;

  ul {
    display: flex;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    li {
      display: inline-block;
      width: 2.43rem;
      margin-right: .2rem;
      border: 1px solid #eee;
      border-radius: .12rem;

      .picture {
        width: 100%;
        height: 2.4rem;

        img {
          width: 100%;
          height: 100%;
          border-radius: .12rem .12rem 0 0;
        }
      }

      .name {
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
        font-size: .28rem;
        color: #333;
        text-align: center;
        padding: .15rem .1rem 0 .1rem;
      }

      .prices {
        padding: 0 .1rem .18rem .1rem;
        text-align: center;
        font-size: .26rem;
        font-weight: 700;
        color: #fc4141;
      }
    }
  }
}

</style>