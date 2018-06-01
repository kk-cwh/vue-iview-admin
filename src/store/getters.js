const getters = {
  sidebar: state => state.app.sidebar,
  shrink: state => state.app.shrink,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  menuList: state => state.user.menuList,
  hasMenus: state => state.user.hasMenus
}
export default getters
