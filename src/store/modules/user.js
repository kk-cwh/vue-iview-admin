
import { constantRouterMap, asyncRouterMap } from '@/router/routes'
import router from './../../router'
const user = {
  state: {
    token: '',
    name: '',
    avatar: '',
    roles: [],
    hasMenus: [],
    menuList: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_MENULIST: (state, routes) => {
      state.menuList = constantRouterMap.concat(routes)
    }
  },
  actions: {
    Login: ({ commit }) => {
      return new Promise((resolve, reject) => {
        const data = {menus: {'home': 1, 'main': 1, 'home1': 1, 'home2': 1}}
        commit('SET_TOKEN', '123123123')
        commit('SET_NAME', '天空之城')
        commit('SET_AVATAR', '图片url')
        commit('SET_AVATAR', '图片url')
        commit('SET_MENULIST', asyncRouterMap)
        const userMenus = data.menus
        let routes = []
        asyncRouterMap.forEach(item => {
          if (userMenus.hasOwnProperty(item.name) && userMenus[item.name]) {
            if (item.children && item.children.length) {
              let children = item.children.filter(element => {
                return userMenus.hasOwnProperty(element.name) && userMenus[element.name]
              })
              item.children = children
            }
            routes.push(item)
          }
        })
        console.log(routes)
        router.addRoutes(routes)
        console.log('add routes')
        resolve()
      })
    }

  }
}

export default user
