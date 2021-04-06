<template>
  <div id="app">
    <Ball></Ball>
    <keep-alive></keep-alive>
    <HomeNav v-show="$route.meta.showNav"></HomeNav>
    <router-view/>
    <div class="hz" v-show="$route.meta.showNav"></div>
  </div>
</template>

<script>
import HomeNav from "./components/HomeNav.vue"
import Ball from "./components/Ball";

export default {
  components: {
    HomeNav,
    Ball
  },
  created(){

  }
}
</script>

<style lang="less" scoped>
#app {
  font-family: 'MXiangHeHeiTC', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  //padding-bottom: 1.1rem;
  font-size: .28rem;

  a {
    color: #333;
  }

  .hz {
    width: 100%;
    height: 1rem;
  }
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
