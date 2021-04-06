import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import store from '../store/index'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index,
        meta: {showNav: true,keepAlive:true}
    },
    {
        path: '/sort',
        name: 'Sort',
        component: () =>
            import("../views/Sort.vue"),
        meta: {showNav: true,keepAlive:true}
    },
    {
        path: '/recommend',
        name: 'Recommend',
        component: () =>
            import("../views/Recommend"),
    },
    {
        path: '/goodslist',
        name: 'GoodsList',
        component: () =>
            import("../views/GoodsList")
    },
    {
        path: '/detail',
        name: "Detail",
        component: () =>
            import("../views/Detail"),
        beforeEnter: function (to, from, next) {
            next()
        }
    },
    {
        path: "/search",
        name: 'Search',
        component: () =>
            import("../views/Search")
    },
    {
        path: "/cart",
        name: "Cart",
        component: () =>
            import("../views/Cart"),
        meta: {showNav: true, needLogin: true}
    },
    {
        path: "/my",
        name: "My",
        component: () =>
            import("../views/My"),
        meta: {showNav: true, needLogin: true}
    },
    {
        path: "/login",
        name: "Login",
        component: () =>
            import("../views/Login")
    },
    {
        path: "/settle",
        name: "Settle",
        component: () => import("../views/Settle"),
        meta: {needLogin: true}
    },
    {
        path: "/fail",
        name: "Fail",
        component: () => import("../views/Fail"),
        meta: {needLogin: true}
    },
    {
        path: '/pay',
        name: "Pay",
        component: () => import("../views/Pay"),
        meta: {needLogin: true}
    },
    {
        path: '/ordersInfo',
        name: 'OrdersInfo',
        component: () => import("../views/OrdersInfo"),
        meta: {needLogin: true}
    },
    {
        path: '/collection',
        name: "Collection",
        component: () => import("../views/Collection"),
        meta: {needLogin: true}
    },
    {
        path: '/refund',
        name: 'Refund',
        component: () => import("../views/Refund"),
        meta: {needLogin: true}
    },
    {
        path: '/qrefund',
        name: 'Qrefund',
        component: () => import('../views/Qrefund'),
        meta: {needLogin: true}
    },
    {
        path: '/setting',
        name: 'Setting',
        component: ()=>import('../views/Setting'),
        meta: {needLogin: true}
    },
    {
        path: '/cartgory',
        name: 'CartGory',
        component: ()=>import('../views/Cartgory'),
        meta: {showNav: true}
    }
]


const router = new VueRouter({
    mode: "hash",
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.needLogin && !store.state.token) {
        if(to.name=='Cart'){
            next('/login?url=2');
        }else if(to.name=="My"){
            next("/login?url=3");
        }
        return;
    }
    next();
});

export default router
