
const app = {
  state: {
    openedSubmenuArr: [] // 要展开的菜单数组
  },
  mutations: {
    addOpenSubmenu (state, name) {
      let hasThisName = false
      let isEmpty = false
      if (name.length === 0) {
        isEmpty = true
      }
      if (state.openedSubmenuArr.indexOf(name) > -1) {
        hasThisName = true
      }
      if (!hasThisName && !isEmpty) {
        state.openedSubmenuArr.push(name)
      }
    },
    setOpenSubMenu (state, names) {
      state.openedSubmenuArr = names
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('')
    }

  }
}

export default app
