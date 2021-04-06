<template>
  <div>
    <div class="ball">
      <transition
          enter-active-class="animate__animated animate__bounceInRight"
          leave-active-class="animate__animated animate__backOutRight"
      >
        <div class="icon" v-show="iconShow">
          <router-link class="home" to="/">
            <van-icon name="wap-home-o"/>
          </router-link>
          <router-link class="cart" to="/cart">
            <van-icon name="cart-o"/>
          </router-link>
          <router-link class="user" to="/my">
            <van-icon name="contact"/>
          </router-link>
        </div>
      </transition>
      <div class="ball_gif" @click="iconShow=!iconShow">
        <img ref='img' src="../assets/icon_index2.gif" alt="">
      </div>
    </div>
  </div>

</template>

<script>
import icon1 from '../assets/icon_index.gif'
import icon2 from '../assets/icon_index2.gif'
export default {
  name: "Ball",
  data() {
    return {
      iconShow: false,

    }
  },
  methods: {},
  watch: {
    iconShow: function (){
      if (this.iconShow){
        this.$refs.img.src=icon1;
      }else{
        this.$refs.img.src=icon2;
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ball {
  position: fixed;
  z-index: 999;
  right: .3rem;
  bottom: 2rem;
  display: flex;

  .icon {
    width: 3rem;
    height: .9rem;
    align-items: center;
    justify-content: space-around;
    background: #fc4141;
    border-radius: .5rem;
    margin-right: .2rem;
    display: flex;

    a {
      font-size: .48rem;
      text-align: center;
      line-height: .48rem;
      color: white;
    }
  }

  .ball_gif {
    flex-shrink: 0;
    width: .9rem;
    height: .9rem;
    transform: rotate(90deg);

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>