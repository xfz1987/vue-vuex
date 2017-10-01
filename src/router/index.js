import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Home from '@/view/Home'
import Product from '@/view/Product'
import Detail from '@/view/Detail'
import Order from '@/view/Order'
import Info from '@/view/Info'
import Login from '@/view/Login'
import ErrorPage from '@/view/ErrorPage'

Vue.use(Router)

//刷新时重新赋值token,用户信息
if(window.localStorage.token && window.localStorage.info){
    store.commit('isLogin', {token:window.localStorage.token, info:JSON.parse(window.localStorage.info)});
}


//需要登录验证的，在路由上加上 meta: { requiresAuth: true }
const router = new Router({
    routes: [
        {path: '/',name:'homePage',component: Home,meta:{txt:'首页'}},
        {path: '/product',component: Product,meta:{txt:'产品列表'}},
        {path: '/detail/:id',component: Detail,meta:{txt:'产品详情'}},
        {path: '/login',component: Login,meta:{txt:'登录'}},
        {path: '/order',component:Order,meta:{txt:'我的订单',requiresAuth:true}},
        {path: '/info',component:Info,meta:{txt:'个人信息',requiresAuth:true}},
        {path: '*',component: ErrorPage,meta:{txt:'页面出错'}}
    ]
})

router.beforeEach((to, from ,next) => {
    if(to.matched.some(r => r.meta.requiresAuth)){
        //判断用户是否登录，我例子中是验证本地存储是否有token
        if(store.state.token){
            next();
        }else{
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            });
        }
    }else{
        next();
    }
})

export default router;