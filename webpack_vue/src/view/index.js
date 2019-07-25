// var Vue = require('vue')
import Vue from 'vue'
import App from '../pages/app.vue'
import routes from '../router/router'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
    routes,
    // scrollBehavior: (to, from, savePisition) => {
    //     return {x: 0 , y:2000}
    // }
})

router.beforeEach((to, from, next) => {
    //会在任意路由跳转前执行，next一定要记着执行，不然路由不能跳转了
  console.log('beforeEach')
  console.log(to,from)
  //
  next()
})




new Vue({
    el: '#app',
    router,
    render: h => h(App)
})