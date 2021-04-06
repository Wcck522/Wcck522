<template>
  <section>
    <div class="bg">
      <div class="box">
        <div class="title">{{ type=="login"?'登录':'注册' }}</div>
        <form action="" @submit.prevent="doLogin" v-if="type=='login'">
          <label :class="isActive?'active':''">
            <input name="username" type="text" @focus="con" @blur="con" v-model="username">
            <span v-show="!username">用户名</span>
            <span :style="username?'opacity: 1;transform: scale(0.75)':'opacity: 0;transform: scale(1)'">用户名</span>
          </label>
          <label :class="isActive2?'active':''">
            <input name="password" type="password" @focus="conl" @blur="conl" v-model="password">
            <span v-show="!password">密码</span>
            <span :style="password?'opacity: 1;transform: scale(0.75)':'opacity: 0;transform: scale(1)'">密码</span>
          </label>
          <label class="loginstate">
            <input type="checkbox" v-model="isB">
            <span>保持登录状态</span>
          </label>
          <button type="submit" @click="btn"></button>
        </form>

        <form action="" v-else>
          <label :class="isActive?'active':''" >
            <input name="username" type="text" @focus="con" @blur="con" v-model="username">
            <span v-show="!username">用户名</span>
            <span :style="username?'opacity: 1;transform: scale(0.75)':'opacity: 0;transform: scale(1)'">用户名</span>
          </label>

        <label :class="isActive2?'active':''">
          <input name="password" type="password" @focus="conl" @blur="conl" v-model="password">
          <span v-show="!password">密码</span>
          <span :style="password?'opacity: 1;transform: scale(0.75)':'opacity: 0;transform: scale(1)'">密码</span>
        </label>

          <label :class="isActive3?'active code':'code'">
            <input name="password" type="password" @focus="con3" @blur="con3" v-model="code">
            <span v-show="!code">验证码</span>
            <span :style="code?'opacity: 1;transform: scale(0.75)':'opacity: 0;transform: scale(1)'">验证码</span>
          </label>
          <div class="btn" @click="sendCode">{{ time>0?'剩余'+time+'秒':'获取验证码' }}</div>
          <button @click="reg" type="button"></button>
        </form>


        <div class="register" v-if="type=='login'">无法登录?<span @click="register" style="color: #0c57f4">注册账号</span></div>
        <div class="lo" v-else>已有账号?<span @click="register" style="color: #0c57f4">点击登录</span></div>
      </div>
    </div>
  </section>
</template>

<script>
import {Toast} from "vant"
export default {
  name: "Login",
  data() {
    return {
      username: null,
      password: null,
      isActive: false,
      isActive2: false,
      isB:true,
      type: "login",
      isActive3: false,
      code: null,
      time: 0
    }
  },
  methods: {
    reg(e){
      if (timer) {
        clearTimeout(timer)
      }
      e.target.style.backgroundColor = "#a9ddf1";
      let timer = null;
      timer = setTimeout(function () {
        e.target.style.backgroundColor = "transparent";
      }, 300)
      this.axios({
        url: 'api/register',
        method: 'post',
        data: {
          account: this.username,
          captcha: this.code,
          password: this.password,
          spread: null
        }
      }).then(res=>{
        Toast(res.data.msg)
      })
    },
    sendCode(){
      if(this.time>0){
        return;
      }
      this.time = 60;
      var that = this;
      let timer = setInterval(function (){
        that.time--;
        if(that.time==0){
          clearInterval(timer)
        }
      },1000)
      this.axios({
        url: 'api/verify_code',
        method: 'get',

      }).then(res=>{
        this.axios({
          url: 'api/register/verify',
          method: 'post',
          data: {
            code: '',
            key: res.data.data.key,
            phone: this.username,
            type: 'register'
          }
        }).then(res=> {
          console.log(res)
          Toast(res.data.msg)
          this.type="login"
          this.username = "";
          this.password = "";
        })
      })
    },
    register(){
      this.username = "";
      this.password = "";
      if(this.type=="register"){
        this.type="login";
        return ;
      }
      this.type="register";
    },
    btn(e) {
      if (timer) {
        clearTimeout(timer)
      }
      e.target.style.backgroundColor = "#a9ddf1";
      let timer = null;
      timer = setTimeout(function () {
        e.target.style.backgroundColor = "transparent";
      }, 300)
    },
    con() {
      this.isActive = !this.isActive;
    },
    conl() {
      this.isActive2 = !this.isActive2;
    },
    con3(){
      this.isActive3 = !this.isActive3;
    },
    doLogin(e) {
      this.axios.post('api/login', {account:e.target[0].value,password:e.target[1].value}).then(d => {
        if (d.data.status != 200) {
          alert("登陆失败");
          return;
        }
        if(this.isB){
          if (d.data.data.token) {
            sessionStorage.clear();
            sessionStorage.setItem("token", d.data.data.token);
          }
        }
        this.$store.commit('setToken', d.data.data.token)
        this.$store.dispatch('getUser');
        setTimeout(() => {
          if(this.$route.query.url==2){
            this.$router.push("/cart")
          }else if(this.$route.query.url==3){
            this.$router.push("/my")
          }else{
            this.$router.back()
          }
        }, 500)
      })
    }
  },
  mounted() {
  },
  updated() {

  },
  beforeDestroy() {

  },
}
</script>

<style lang="less" scoped>
.un2,.pw2{
  animation: appear .8s;
}
.register{
  text-align: center;
  margin-top: .4rem;
  margin-bottom: .4rem;
}
.lo{
  text-align: center;
  margin-top: .4rem;
  margin-bottom: .4rem;
}

.btn{
  margin-top: .4rem;
  border-radius: 8px;
  background: rgba(126, 126, 126, 0.1);
  color: black;
  font-weight: 700;
  height: 1rem;
  width: 2rem;
  text-align: center;
  line-height: 1rem;
}

section {
  font-family: 'MXiangHeHeiTC', sans-serif;
}

.bg {
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center center;
  background-image: url("../assets/bg.jpg");
}

.box {
  width: 95%;
  margin: 0 auto;
  background: #f9f9f9;
  padding-top: .8rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .title {
    width: 100%;
    text-align: center;
    font-weight: 700;
    font-size: .50rem;
    margin-bottom: .4rem;
  }
}

form {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  label:nth-of-type(1), label:nth-of-type(2),.code{
    width: 100%;
    height: 100%;
    display: block;
    position: relative;
    background: white;
    background: rgba(126, 126, 126, 0.1);
    color: #525252;
    margin-top: .3rem;
    border: 2px solid rgba(126, 126, 126, 0.1);
    border-radius: .1rem;
    animation: appear .8s;
    input[type='text'], input[type='password'] {
      width: 100%;
      padding: .5rem .2rem .4rem;
      background: transparent;
      border: none;
    }

    span {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 999;
      font-weight: 800;
      color: #333;
      font-size: .34rem;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

      &:first-of-type {
        top: 50%;
        transform: translateY(-50%) scale(1);
        left: .4rem;
      }

      &:last-of-type {
        opacity: 0;
        left: .1rem;
        top: .1rem;
      }
    }
  }

  button {
    margin-top: .5rem;
    width: 1.7rem;
    height: 1.7rem;
    border: 2px solid #e8e8e8;
    background-color: transparent;
    color: #e8e8e8;
    background-size: .7rem;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url("data:image/svg+xml;charset=utf8;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNC4yNzI3IDEwTDAuNSAxMEwwLjUgOEwxNC4yNzI1IDhMOC41MTM0NSAxLjcyNDk2TDkuODY1NzkgMC4yNTE0NjVMMTcuMjE4OSA4LjI2MzMzQzE3LjU5MjMgOC42NzAyMiAxNy41OTIzIDkuMzI5OTMgMTcuMjE4OSA5LjczNjgyTDkuODY1NzkgMTcuNzQ4N0w4LjUxMzQ1IDE2LjI3NTJMMTQuMjcyNyAxMFoiIGZpbGw9IiNFOEU4RTgiLz4KPC9zdmc+Cg==");
    border-radius: .4rem;
  }
}

.active {
  border: 2px solid rgba(0, 0, 0);

  input[type='text'], input[type='password'] {
    background: white;
  }

  span:nth-of-type(1) {
    opacity: 0;
    transform: scale(0.75);
  }

  span:nth-of-type(2) {
    opacity: 1 !important;
    transform: scale(0.75) !important;
  }
}

label:nth-of-type(3).loginstate{
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: .8rem;
  input{
    width: 0.6rem;
    height: 0.6rem;
    &:checked{
      background: #ee0a24;
      color: #ee0a24;
    }
  }
  span{
    margin-left: .2rem;
    color: #333;
    font-size: .26rem;
  }
}

@keyframes appear {
  0%{
    width: 0;
  }
  100%{
    width: 100%;
  }
}
</style>