import login from '@/views/login'
import page404 from '@/views/error-page/404.vue'

const layout = () => import(/* webpackChunkName: "group-index" */ '@/views/layout')

/**
 * 登陆路由
 */
export const constantRouterMap = [
  { path: '/login', name: 'login', hidden: true, meta: { title: '系统登录' }, component: login }
]
// 错误页面路由
export const errorRouterMap = [
  {
    path: '/403',
    meta: {
      title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@/views/error-page/403.vue')
  },
  {
    path: '/500',
    meta: {
      title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
  },
  { path: '/*', name: '404', hidden: true, component: page404 }
]

/**
* hidden: true                   如果hidden为true则不在左侧菜单栏展示，默认为false
* name:'router-name'             路由名称，必须填写
* meta : {
    roles: ['admin','editor']    权限列表，用于页面级的权限控制，默认不设置代表任何权限均可访问
    title: 'title'               对应路由在左侧菜单栏的标题名称
    icon: 'icon-class'             对应路由在左侧菜单栏的图标样式，样式使用iconfont图标库，见assest/iconfont文件夹
  }
**/
export const asyncRouterMap = [
  {
    path: '/',
    name: 'main',
    // redirect: '/home',
    // hidden: true,
    meta: { title: '主页', icon: 'ios-paw' },
    component: layout,
    children: [
      { path: 'home1', hidden: true, name: 'home1', meta: { title: '500', icon: 'ios-paw' }, component: () => import(/* webpackChunkName: "group-index" */'@/views/error-page/500.vue') },

      { path: 'home', name: 'home', meta: { title: '仪表盘', icon: 'ios-paw' }, component: () => import(/* webpackChunkName: "group-index" */'@/views/home') }
    ]
  },
  {
    path: '/error',
    name: 'error',
    // redirect: '/error/404',
    // hidden: true,
    meta: { title: '错误页面', icon: 'ios-paw' },
    component: layout,
    children: [
      { path: '403', name: 'err403', meta: { title: '403页面', icon: 'ios-paw' }, component: () => import(/* webpackChunkName: "group-index" */'@/views/error-page/403.vue') },
      { path: '404', name: 'err404', meta: { title: '404页面', icon: 'ios-paw' }, component: () => import(/* webpackChunkName: "group-index" */'@/views/error-page/404.vue') },
      { path: '500', name: 'err500', meta: { title: '500页面', icon: 'ios-paw' }, component: () => import(/* webpackChunkName: "group-index" */'@/views/error-page/500.vue') }
    ]
  },
  {
    path: '/table',
    name: 'table',
    // redirect: '/error/404',
    // hidden: true,
    meta: { title: '表格示例', icon: 'ios-paw' },
    component: layout,
    children: [
      { path: 'index', name: 'table_index', meta: { title: '自定义列表格', icon: 'ios-paw' }, component: () => import(/* webpackChunkName: "group-index" */'@/views/table/index.vue') },
      { path: 'select', name: 'select', meta: { title: '带选框表格', icon: 'ios-paw' }, component: () => import(/* webpackChunkName: "group-index" */'@/views/table/select.vue') },
      { path: 'sort', name: 'sort', meta: { title: '排序表格', icon: 'ios-paw' }, component: () => import(/* webpackChunkName: "group-index" */'@/views/table/sort.vue') }
    ]
  },
  {
    path: '/form',
    name: 'form',
    // redirect: '/error/404',
    // hidden: true,
    meta: { title: '表单示例', icon: 'ios-paw' },
    component: layout,
    children: [
      { path: 'index', name: 'form_index', meta: { title: '基本表单', icon: 'ios-paw' }, component: () => import(/* webpackChunkName: "group-index" */'@/views/form/index.vue') },
      { path: 'formInline', name: 'formInline', meta: { title: '行内表单', icon: 'ios-paw' }, component: () => import(/* webpackChunkName: "group-index" */'@/views/form/formInline.vue') },
      { path: 'formValidate', name: 'formValidate', meta: { title: '表单验证', icon: 'ios-paw' }, component: () => import(/* webpackChunkName: "group-index" */'@/views/form/formValidate.vue') },
      { path: 'formCustom', name: 'formCustom', meta: { title: '自定义验证', icon: 'ios-paw' }, component: () => import(/* webpackChunkName: "group-index" */'@/views/form/formCustom.vue') }
    ]
  }
]
