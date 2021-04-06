<template>
  <div>
    <div v-if="data">
      <div class="searchBox">
        <van-search
            shape="round"
            background="#fff"
            placeholder="搜索商品信息"
            v-model="value"
            @search="onSearch"
        />
      </div>
      <div class="cartgory">
        <aside class="aside">
          <ul>
            <li v-for="(item,index) in titleList" :key="item.id" :class="activeIndex==index?'active':''"
                @click="LsitClick(index)">{{ item }}
            </li>
          </ul>
        </aside>
        <section>
          <ul v-for="item in data" :key="item.id" class="products">
            <li class="title">{{ item.cate_name }}</li>
            <div class="product">
              <li v-for="v in item.children" :key="v.id" @click="navigato(v.id,v.cate_name)">
                <div class="child">
                  <div class="picture"><img :src="v.pic" alt=""></div>
                  <div class="name">{{ v.cate_name }}</div>
                </div>
              </li>
            </div>
          </ul>
        </section>
      </div>
    </div>
    <div class="loading" v-else>
      <van-loading size="1rem" type="spinner" vertical>加载中...</van-loading>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cartgory",
  data() {
    return {
      indexList: [],
      titleList: [],
      value: null,
      data: null,
      activeIndex: 0,
      scrollOn: true
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
  methods: {
    navigato(id, title) {
      this.$router.push('/goodslist?id=' + id + '&title=' + title)
    },
    onSearch() {
      this.$router.push({path: '/goodslist/?keyword=' + this.value + '&title=' + this.value});
    },
    LsitClick(index) {
      let uls = document.querySelectorAll('.products');
      // window.scrollTo(0,uls[index].offsetTop-43);
      this.scrollAnimation(window.scrollY, uls[index].offsetTop - 43);
    },
    scrollAnimation(currentY, targetY) {
      // 获取当前位置方法
      // const currentY = document.documentElement.scrollTop || document.body.scrollTop

      // 计算需要移动的距离
      let needScrollTop = targetY - currentY
      let _currentY = currentY
      setTimeout(() => {
        // 一次调用滑动帧数，每次调用会不一样
        const dist = Math.ceil(needScrollTop / 10)
        _currentY += dist
        window.scrollTo(_currentY, currentY);
        // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
        if (needScrollTop > 10 || needScrollTop < -10) {
          this.scrollAnimation(_currentY, targetY)
        } else {
          window.scrollTo(_currentY, targetY)
        }
      }, 1)


    },
    scrolling(e) {
      let scrollTop = e.target.scrollingElement.scrollTop;
      let uls = document.querySelectorAll('.products');
      let ser = document.querySelector('.searchBox')
        uls.forEach((item, index) => {
          if (scrollTop > item.offsetTop - ser.offsetHeight) {
              this.activeIndex = index;
          }
        })
    }
  },
  mounted() {
    var that = this;
    window.addEventListener('scroll', that.scrolling)
  },
  beforeDestroy() {
    var that = this;
    window.removeEventListener('scroll', that.scrolling)
  }
}
</script>

<style scoped lang="less">
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

.cartgory {
  display: flex;
}

aside.aside {
  width: 1.8rem;
  position: fixed;
  top: 1rem;
  left: 0;
  bottom: 1rem;
  background: #f7f7f7;
  overflow-y: auto;
  overflow-x: hidden;

  ul {
    li {
      height: .8rem;
      width: 100%;
      font-size: .26rem;
      color: #424242;
      text-align: center;
      line-height: .8rem;

      &.active {
        background: #fff;
        color: #ee0a24;
        border-left: 2px solid #ee0a24;
        font-weight: 700;
      }
    }
  }
}

section {
  margin-left: 1.8rem;
  margin-top: 1rem;
  padding: 0 .15rem;

  ul {
    padding-top: .2rem;
  }

  .title {
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    font-weight: 700;
    font-size: .3rem;
  }

  .product {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    font-size: .24rem;

    li {
      width: 1.77rem;
      margin-top: .26rem;

      .child {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .picture {
          width: 1.2rem;
          height: 1.2rem;
          border-radius: 50%;
        }

        .name {
          height: .56rem;
          line-height: .56rem;
        }
      }

    }
  }
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>