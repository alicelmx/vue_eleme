import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import goods from 'components/goods/goods'
import seller from 'components/seller/seller'
import ratings from 'components/ratings/ratings'
import './common/stylus/index.styl'

// 以下路由配置参考vue-router官方文档
// 使用模块化编程机制
Vue.use(VueRouter)
Vue.use(VueResource)

// 创建根实例
let app = Vue.extend(App)

let router = new VueRouter({
  linkActiveClass: 'active'
})

// 配置路由的方法
router.map({
  '/goods': {
    component: goods
  },
  '/seller': {
    component: seller
  },
  '/ratings': {
    component: ratings
  }
})

// #app是挂载点，挂载到App.vue上
router.start(app, '#app')
// 刷新直接跳转到那一页
// router.go('/goods')
