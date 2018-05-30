import Vue from 'vue'
import Router from 'vue-router'
import store from './../store'
import { constantRouterMap } from './routes'
import { getToken } from '@/utils/auth'
Vue.use(Router)

let router = new Router({
  routes: constantRouterMap
})
let whiteList = ['/login']
router.beforeEach((to, from, next) => {
  // console.log(to)
  //   store.commit('UPDATE_ROUTER_LOADING', true); // 展示路由加载时动画
  if (getToken()) { // 存在token
    // console.log(getToken())
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.menuList.length === 0) { // 判断当前用户是否已拉取完用户信息
        store.dispatch('GetUserInfo').then(data => { // 拉取用户信息
          // console.log('GetUserInfo', store.getters.menuList)
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        }).catch(() => { // 拉取用户信息失败，提示登录状态失效
          // store.dispatch('FedLogOut').then(() => {
          //   next({ path: '/login' })
          // })
        })
      } else {
        // if (store.getters.hasMenus.hasOwnProperty(to.name) && store.getters.hasMenus[to.name]) { // 动态权限匹配
        next()
        // } else {
        //   next({ path: '/401', replace: true, query: { noGoBack: true } })
        // }
      }
    }
  } else { // 没有token
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
    }
  }
})

router.afterEach(to => {
  // store.commit('UPDATE_ROUTER_LOADING', false)
})

router.onError(() => {
  // console.error(err) // for bug
  // store.commit('UPDATE_ROUTER_LOADING', false)
})
export default router
