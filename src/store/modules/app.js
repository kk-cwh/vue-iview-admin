
const app = {
  state: {
    openedSubmenuArr: [], // 要展开的菜单数组,
    openedTags: [], // 打开过的标签,
    shrink: false

  },
  mutations: {
    SET_SHRINK (state, boolval) {
      state.shrink = boolval
    },
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
    removeOpenTag (state, name) {
      let isEmpty = false
      if (name.length === 0) {
        isEmpty = true
      }
      if (!isEmpty && state.openedTags.indexOf(name) > -1) {
        const index = state.openedTags.indexOf(name)
        state.openedTags.splice(index, 1)
      }
    },
    addOpenTag (state, name) {
      let hasThisName = false
      let isEmpty = false
      if (name.length === 0) {
        isEmpty = true
      }
      if (state.openedTags.indexOf(name) > -1) {
        hasThisName = true
      }
      if (!hasThisName && !isEmpty) {
        state.openedTags.push(name)
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
