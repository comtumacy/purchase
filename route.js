import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './src/store/store'
import notFound from './src/components/404/404'
import login from './src/components/login/login'
import index from './src/components/index/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // 重定向
    redirect: '/login'
  },
  // login
  {
    path: '/login',
    component: login
  },
  // index
  {
    path: '/index',
    component: index
  },
  // 404
  {
    path: '*',
    component: notFound
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    if (store.getters.token_getters !== 'null') {
      next()
    } else if (store.getters.token_getters === 'null') {
      next('/login')
    }
  }
})

// 导出router对象
export default router
