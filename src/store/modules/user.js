
import { constantRouterMap, asyncRouterMap, errorRouterMap } from '@/router/routes'
import { setToken } from '@/utils/auth'
import api from '@/api'
import router from './../../router'
const user = {
  state: {
    token: '',
    name: '',
    avatar: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
    roles: [],
    hasMenus: {},
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
    },
    SET_HASMENUS: (state, menus) => {
      state.hasMenus = menus
    }
  },
  actions: {
    Login: ({ commit }, data) => {
      return new Promise((resolve, reject) => {
        api.loginByUsername(data).then((res) => {
          console.log(res, '----------------------')
          commit('SET_TOKEN', res.token)
          setToken(res.token)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    GetUserInfo: ({ commit }) => {
      return new Promise((resolve, reject) => {
        api.getUserInfo().then(res => {
          const data = {menus: {'home': 1, 'main': 1, 'home1': 1, 'home2': 1}}
          const userMenus = data.menus
          commit('SET_HASMENUS', userMenus)
          //  设置左侧可显示菜单
          let routes = []
          if (!res.is_admin) {
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
          } else {
            routes = asyncRouterMap
          }

          commit('SET_NAME', res.name)
          commit('SET_AVATAR', res.avatar)
          commit('SET_MENULIST', routes)

          router.addRoutes(routes.concat(errorRouterMap))
          console.log('add routes')
          resolve()
        })
      })
    }

  }
}

export default user
