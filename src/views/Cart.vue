<template>
<div class="cart">
  <header>
    <ul>
      <li><van-icon name="certificate" />100%正品保证</li>
      <li><van-icon name="certificate" />所有商品精挑细选</li>
      <li><van-icon name="certificate" />售后无忧</li>
    </ul>
  </header>
  <main>
    <section class="title">
      <div class="count">购买数量 <span style="color:#fc4141">{{allNum}}</span></div>
      <div class="manage"><button @click="isManage=!isManage" v-show="cartList.length!=0">{{ isManage?'取消':'管理' }}</button></div>
    </section>
    <section class="card" v-for="item in cartList" :key="item.id">
      <div class="select">
        <label>
          <input type="checkbox" v-model="item.isSelect" @change="select">
        </label>
      </div>
      <div class="picture"><img :src="item.productInfo.image" alt=""></div>
      <div class="text">
          <div class="title_text van-ellipsis">{{ item.productInfo.store_name }}</div>
          <div class="attr">规格: {{item.productInfo.attrInfo.suk}}</div>
        <div class="money">
          <div class="price">￥{{item.productInfo.attrInfo.price}}</div>
          <div class="steper"><van-stepper @change="onChange(item.id,item.cart_num)" v-model="item.cart_num"/></div>
        </div>
      </div>
    </section>
  </main>
  <Fourzerofour v-if="cartList.length==0"></Fourzerofour>
  <van-submit-bar :style="cartList.length==0?'display:none;':''" :price="totalMoney*100" button-text="提交订单" :safe-area-inset-bottom="false" style="margin-bottom:1rem">
    <van-checkbox v-model="checked" @click="selectAll">全选</van-checkbox>
    <template #button>
      <div v-if="isManage" class="opearte"><button @click="collection" class="fav">收藏</button><button class="remove" @click="remove">删除</button></div>
      <div v-else><button class="buy" @click="settle">提交订单</button></div>
    </template>
  </van-submit-bar>

</div>
</template>

<script>
import { Toast } from 'vant';
import Fourzerofour from "../components/Fourzerofour";
export default {
  name: "Cart",
  components: {
    Fourzerofour
  },
  data(){
    return{
      cartList: [],
      checked: false,
      list: [],
      isManage: false,
      idList: []
    }
  },
  /*beforeUpdate() {
    this.$route.meta.keepAlive=false;
    console.log(this.$route.meta.keepAlive)
  },
  beforeRouteLeave(to,from,next){
    this.$route.meta.keepAlive=true;
    console.log(this.$route.meta.keepAlive)
    next();
  },*/
  created(){
    this.getDetail();
  },
  methods: {
    collection(){
      this.axios({
        method: "post",
        url: "/api/collect/all",
        data: {
          category: "product",
          id: this.idList
        },
        headers: {
          'Authori-zation': 'Bearer ' + sessionStorage.getItem('token') || this.$store.state.token
        },
      })
      Toast.success("收藏成功");
    },
    settle(){
      if(this.list.length > 0){
        this.$router.push('/settle?list='+this.list.join(','))
      }
    },
    getDetail(){
      this.axios({
        method:"get",
        url: "/api/cart/list",
        headers: {
          'Authori-zation': 'Bearer ' + this.$store.state.token
        },
      }).then(res=>{
        this.cartList=res.data.data.valid.map((n)=>{
          let key = 'isSelect';
          let value = false;
          n[key] = value;
          return n;
        })
      }).catch(err=>{
        console.log(err)
      })
    },
    select(){
      let checkedArr = [];
      let notCheckedArr = [];
      let selectArr=[];
      let selectId=[];
      this.cartList.forEach(item=>{
        if (item.isSelect){
          checkedArr.push(item.isSelect);
        }else{
          notCheckedArr.push(item.isSelect);
        }
        this.checked = checkedArr.length == this.cartList.length;
      })
      this.cartList.filter((item)=>item.isSelect).forEach(item=>{
        if(!selectArr.includes(item.id)){
          selectArr.push(item.id);
        }
        if(!selectId.includes(item.product_id)){
          selectId.push(item.product_id);
        }
      })
      this.list=selectArr;
      this.idList=selectId;
    },
    selectAll(){
      if(this.checked){
        this.cartList.forEach(item=>{
          item.isSelect=true;
        })
        this.cartList.filter((item)=>item.isSelect).forEach(item=>{
          if(!this.list.includes(item.id)){
            this.list.push(item.id);
          }
        })
      }else{
        this.cartList.forEach(item=>{
          item.isSelect=false;
        })
        this.list=[];
      }
    },
    onChange(id,val){
      this.axios({
        method: "post",
        url: "/api/cart/num",
        data: {
          id: id,
          number: val
        },
        headers: {
          'Authori-zation': 'Bearer ' + this.$store.state.token
        },
      })
    },
    remove(){
      this.axios({
        method: "post",
        url: "/api/cart/del",
        data: {
          ids: this.list
        },
        headers: {
          'Authori-zation': 'Bearer ' + this.$store.state.token
        },
      }).then(()=>{
        this.getDetail();
      })
      Toast.success("已成功从购物车中删除!");
    }
  },
  mounted() {
    document.querySelector('body').setAttribute('style', 'background-color:#f7f7f7;padding-bottom:1rem;')
  },
  updated() {

  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style');
  },
  watch: {

  },
  computed: {
    totalMoney: function(){
      return this.cartList.filter((item)=>item.isSelect).reduce((total,item)=>{
        return total + item.cart_num * Number(item.productInfo.price)
      },0);
    },
    allNum: function(){
      return this.cartList.filter((item)=>item.isSelect).reduce((total,item)=>{
        return total + item.cart_num;
      },0)
    },
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-checkbox__icon--checked .van-icon {
  color: #fff;
  background-color: red;
  border-color: red;
}
.cart{
  font-family: 'MXiangHeHeiTC', sans-serif;
  header{
    ul{
      display: flex;
      justify-content: space-around;
      padding: 0 .3rem;
      font-size: .22rem;
      height: .8rem;
      align-items: center;
      li{
        color: #8c8c8c;
        display: flex;
        align-items: center;
        .van-icon{
          font-size: .3rem;
        }
      }
    }
  }
  main{
    .title{
      display: flex;
      height: .8rem;
      background: white;
      padding: 0 .3rem;
      justify-content: space-between;
      align-items: center;
      .manage{
        button{
          background: transparent;
          border: 1px solid #8c8c8c;
          width: 1.1rem;
          height: .46rem;
        }
      }
    }
    .card{
      display: flex;
      background: white;
      margin-top: .15rem;
      padding: .25rem .3rem;
      justify-content: space-between;
      align-items: center;
      .select{
        label{
          input{
            background: #fff;
            outline: none;
            width: .4rem;
            height: .4rem;
            border: 1px solid #c9c9c9;
            border-radius: 50%;
            appearance: none;
            &:checked{
              background: url("../assets/select.png")no-repeat center red;
              background-size: 80%;
            }
          }
        }
      }
      .picture{
        width: 1.6rem;
        height: 1.6rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .text{
        width: 4.5rem;
        font-size: .28rem;
      }
      .attr{
        font-size: .24rem;
        color: #868686;
        margin-top: .16rem;
      }
      .money{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: .25rem;
        .steper{
          /deep/ .van-stepper__minus{
            width:.5rem;
            height: .5rem;

          }
          /deep/ .van-stepper__input{
            width: .5rem;
            height: .5rem;
          }
          /deep/ .van-stepper__plus{
            width: .5rem;
            height: .5rem;
          }
        }
      }
    }
  }
}

.buy{
  color: #fff;
  font-size: .3rem;
  width: 2.26rem;
  height: .7rem;
  border-radius: .5rem;
  text-align: center;
  line-height: .7rem;
  margin-left: .22rem;
  background-color: #e93323!important;
  border: none;
}

.fav{
  font-size: .28rem;
  border-radius: .5rem;
  width: 1rem;
  height: .6rem;
  text-align: center;
  color: #ff3700;
  border: 1px solid #ff3700;
  background: #f5f5f5;
}

.remove{
  font-size: .28rem;
  color: #999;
  border-radius: .5rem;
  border: 1px solid #999;
  width: 1rem;
  height: .6rem;
  text-align: center;
  margin-left: .17rem;
  background: #f5f5f5;

}

.opearte{
  display:flex;
  align-items: center;
}
</style>