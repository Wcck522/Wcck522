<template>
  <div>
    <div class="box" v-if="data">
      <div class="searchBox">
        <van-search
            shape="round"
            background="#fff"
            placeholder="搜索商品信息"
            v-model="value"
            @search="onSearch"
        />
      </div>
      <section class="content">
        <van-index-bar :index-list="titleList" highlight-color="#fc4141" :sticky="false">
          <div class="itemBox">
            <template v-for="item in indexList">
              <div class="item" :key="item.id">
                <div class="title">
                  <div class="line"></div>
                  <van-index-anchor :index="item.cate_name" class="name"></van-index-anchor>
                  <div class="line"></div>
                </div>
                <div class="child">
                  <p v-for="c in item.children" :key="c.id">
                    <router-link :to="'/goodslist?id='+c.id+'&title='+c.cate_name">
                      <van-image :src="c.pic"></van-image>
                      <span>{{ c.cate_name }}</span>
                    </router-link>
                  </p>
                </div>
              </div>
            </template>
          </div>
        </van-index-bar>
      </section>
    </div>
    <div class="loading" v-else>
      <van-loading size="1rem" type="spinner"  vertical>加载中...</van-loading>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sort",
  data() {
    return {
      indexList: [],
      titleList: [],
      value: null,
      data: null
    };
  },
  created() {
    this.axios.get("/api/category").then(data => {
      this.data = data.data.data;
      this.indexList = data.data.data;
      this.titleList = this.indexList.map(d => {
        return d.cate_name;
      })
    })
  },
  mounted() {

  },
  methods: {
    onSearch() {
      this.$router.push({path: '/goodslist/?keyword=' + this.value + '&title=' + this.value});
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  overflow: hidden;
  font-family: 'MXiangHeHeiTC', sans-serif;
}

div.searchBox {
  display: flex;
  height: 1rem;
  width: 100%;
  border-bottom: 1px solid #f5f5f5;
  box-sizing: border-box;
  position: fixed;
  z-index: 999;

  .van-search__content--round {
    display: flex;
    height: .64rem;
    align-items: center;
    background-color: #f5f5f5;
    border-radius: .5rem;
    padding: 0 .28rem;
    font-size: .28rem;
    color: #bbb;
    overflow: hidden;
  }
}

.van-search {
  width: 100%;
}

/deep/ .van-field__value {
  font-size: .28rem;
}

/deep/ .van-field__left-icon .van-icon, .van-field__right-icon .van-icon {
  font-size: .34rem;
  margin-right: .16rem;
  display: inline-block;
}

/deep/ .van-field__left-icon {
  position: relative;
  margin-right: .45rem;

  .van-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%)
  }
}

/deep/ .van-index-bar__sidebar {
  width: 1.8rem;
  left: 0;
  text-align: left;
  top: 1rem;
  bottom: 1rem;
  transform: translateY(0px);
  overflow-y: auto;
  overflow-x: hidden;
  background: #f7f7f7;

  span {
    height: .8rem;
    font-size: .26rem;
    line-height: .8rem;
  }

  .van-index-bar__index--active {
    border-left: .04rem solid red;
    color: #fc4141;
    font-weight: 700;
    background-color: #fff;
  }
}


.item {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .title {
    height: .9rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .child {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    p {
      width: 1.77rem;
      margin-top: .26rem;

      a {
        color: #333;

        .van-image {
          width: 1.2rem;
          height: 1.2rem;
          border-radius: 50%;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }

      span {
        display: block;
      }
    }
  }
}

.itemBox {
  margin-left: 1.8rem;
  margin-top: 1rem;
  padding: 0 .15rem;
}

.line {
  width: 1rem;
  height: .02rem;
  background-color: #999;
}

/deep/ .van-index-anchor {
  font-size: .28rem;
  color: #333;
  margin: 0 .3rem;
  font-weight: 700;
}

.name {
  width: auto;

  /deep/ .van-index-anchor {
    margin: 0;
  }
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>