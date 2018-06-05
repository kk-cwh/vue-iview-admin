
import { constantRouterMap, asyncRouterMap, errorRouterMap } from '@/router/routes'
import { setToken, clearAllCache, setKey } from '@/utils/auth'
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
          const result = res.data
          //   commit('SET_TOKEN', result.token_type + ' ' + result.access_token)
          setToken(result.token_type + ' ' + result.access_token)
          setKey('refresh_token', result.refresh_token)
          setKey('expires_in', result.expires_in)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    GetUserInfo: ({ commit }) => {
      return new Promise((resolve, reject) => {
        api.getUserInfo().then(res => {
          if (res && res.data) {
            const user = res.data.user
            commit('SET_HASMENUS', res.data.menus)
            commit('SET_NAME', user.name)
            commit('SET_AVATAR', user.avatar)
            const userMenus = res.data.menus

            //  设置左侧可显示菜单
            let routes = []
            if (!user.is_admin) {
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
            commit('SET_MENULIST', routes)
            router.addRoutes(routes.concat(errorRouterMap))
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetUserList: ({commit}) => {
      return api.getUserList()
    },
    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        clearAllCache()
        resolve()
      })
    }
  }
}

export default user
