<template>
  <div class="box" v-if="userInfo">
    <div class="settingHead">
      <div class="title">管理我的账号</div>
      <div class="card">
        <div class="card-item">
          <div class="picture"><img :src="userInfo.avatar?userInfo.avatar:''" alt=""></div>
          <div class="text">
            <div class="name">{{ userInfo.nickname }}</div>
            <div class="phone">绑定手机号: {{ userInfo.phone }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="options">
      <van-cell title="昵称" :value="userInfo.nickname">
        <input type="text" style="background:transparent;border:none;text-align: right" :placeholder="userInfo.nickname"
               v-model="nickname">
      </van-cell>
      <van-cell title="ID号">
        <template #right-icon>
          <div style="display: flex;align-items: center;color: #969799;">
            <span>{{ userInfo.uid }}</span>
            <van-icon name="lock" class="search-icon"/>
          </div>
        </template>
      </van-cell>
      <van-cell title="手机号码">
        <template #right-icon>
          <div style="display: flex;align-items: center;color: #969799;">
            <span>{{ userInfo.phone }}</span>
            <van-icon name="lock" class="search-icon"/>
          </div>
        </template>
      </van-cell>
      <van-cell title="密码" value="点击修改密码"/>
    </div>

    <div class="btns">
      <div class="red">
        <button @click="edit">保存修改</button>
      </div>
      <div class="white">
        <button @click="exit">退出登录</button>
      </div>
    </div>

  </div>
</template>

<script>
import {Dialog} from "vant"

export default {
  name: "Setting",
  data() {
    return {
      userInfo: null,
      nickname: null,
    }
  },

  methods: {
    exit() {
      Dialog.confirm({
        title: '退出登录?',
      })
          .then(() => {
            sessionStorage.removeItem("token");
            this.$router.push('/');
            location.reload();
          })
          .catch(() => {
            // on cancel
          });
    },
    edit() {
      this.axios({
        url: 'api/user/edit',
        method: 'post',
        headers: {
          'Authori-zation': 'Bearer ' + sessionStorage.getItem('token') || this.$store.state.token
        },
        data: {
          nickname: this.nickname,
          avatar: this.userInfo.avatar
        }
      }).then(res => {
        console.log(res)
        this.$router.push('/my')
      })
    }
  },
  created() {
    this.axios({
      url: '/api/user',
      headers: {
        'Authori-zation': 'Bearer ' + sessionStorage.getItem('token') || this.$store.state.token
      },
      method: "get",
    }).then(res => {
      console.log(res)
      this.userInfo = res.data.data;
    })
  }
}
</script>

<style scoped lang="less">
.box {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(245, 245, 245);
}

.settingHead {
  margin-bottom: 0.1rem;
  background-color: #fff;
  padding: .36rem .3rem .13rem .3rem;

  .title {
    margin-bottom: .3rem;
    font-size: .32rem;
    color: #282828;
  }

  .card {
    .card-item {
      border-radius: .2rem;
      background-size: 100% 100%;
      background-color: #fff9f9;
      display: flex;
      align-items: center;
      padding: 0 .3rem;
      width: 7rem;
      height: 1.6rem;
      border: .02rem solid #e93323;

      .picture {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        overflow: hidden;
      }

      .text {
        margin-left: .2rem;

        .name {
          color: #282828;
          font-size: .3rem;
        }

        .phone {
          font-size: .24rem;
          color: #999;
          margin-top: .1rem;
        }
      }
    }
  }

}

.btns {
  div {
    font-size: .32rem;
    width: 6.9rem;
    height: .9rem;
    text-align: center;

    &:first-of-type {
      margin: .76rem auto 0 auto;

      button {
        width: 100%;
        height: 100%;
        background: #ee0a24;
        border-radius: .5rem;
        border: none;
        color: white;
      }
    }

    &:last-of-type {
      margin: .3rem auto 0;

      button {
        width: 100%;
        height: 100%;
        background: white;
        border: none;
        color: #ee0a24;
        border-radius: .5rem;
      }
    }
  }
}
</style>