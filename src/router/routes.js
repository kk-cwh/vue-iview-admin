import login from '@/views/login'

/**
* hidden: true                   如果hidden为true则不在左侧菜单栏展示，默认为false
* name:'router-name'             路由名称，必须填写
* meta : {
    roles: ['admin','editor']    权限列表，用于页面级的权限控制，默认不设置代表任何权限均可访问
    title: 'title'               对应路由在左侧菜单栏的标题名称
    icon: 'icon-class'             对应路由在左侧菜单栏的图标样式，样式使用iconfont图标库，见assest/iconfont文件夹
  }
**/

const layout = () => import(/* webpackChunkName: "group-index" */ '@/views/layout')

export const constantRouterMap = [
  { path: '/login', name: 'login', hidden: true, meta: { title: '系统登录' }, component: login }
]

export const asyncRouterMap = [
  {
    path: '/',
    name: 'main',
    redirect: '/home',
    // hidden: true,
    meta: { title: '仪表盘', icon: 'ios-paw' },
    component: layout,
    children: [
      { path: 'home1', name: 'home1', meta: { title: '仪表盘', icon: 'ios-paw' }, component: () => import(/* webpackChunkName: "group-index" */'@/views/home') },

      { path: 'home', name: 'home', meta: { title: '仪表盘', icon: 'ios-paw' }, component: () => import(/* webpackChunkName: "group-index" */'@/views/home') }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
