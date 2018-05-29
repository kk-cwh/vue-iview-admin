<!-- åº•éƒ¨å¸ƒå±€ -->
<template>
    <div class="layout-sider">
        <Menu ref="sideMenu" :active-name="$route.name" theme="dark" width="auto"  @on-select="selectItem">
            <template v-for="item in menuList">
                <MenuItem v-if="!item.hidden && item.children.length<=1" :name="item.children[0].name" :key="'menuitem' + item.name">
                <Icon :type="item.meta.icon" :size="iconSize" :key="'menuicon' + item.name"></Icon>
                <span class="layout-text" :key="'title' + item.name">{{ item.children[0].name }}</span>
                </MenuItem>

                <Submenu v-if="!item.hidden && item.children.length > 1" :name="item.name" :key="item.name">
                    <template slot="title">
                        <Icon :type="item.meta.icon" :size="iconSize"></Icon>
                        <span class="layout-text">{{ item.name }}</span>
                    </template>
                    <template v-for="child in item.children">
                        <MenuItem :name="child.name" :key="'menuitem' + child.name">
                        <Icon :type="child.meta.icon" :size="iconSize" :key="'icon' + child.name"></Icon>
                        <span class="layout-text" :key="'title' + child.name">{{ child.name }}</span>
                        </MenuItem>
                    </template>
                </Submenu>
            </template>
        </Menu>
    </div>
</template>

<script>

export default {
  name: "sidebar",
  components: {  },
  data() {
    return {
        openName:this.$store.state.app.openedSubmenuArr,
        iconSize:20,activeMenuItem:'home'
    }
  },
//   props: { menuList: {
//       type: Array
//     }},
  computed: {
    menuList(){
        console.log(this.$store.getters.menuList)
        return this.$store.getters.menuList
    }
  },
  methods: {
      selectItem(name){
          console.log(this.openName)
       this.$router.push({name})
      }
  },
  watch: {
      $route(to) {
      this.activeMenuItem = (to.name);
       this.$store.commit('addOpenSubmenu', to.matched[0].name);
        // this.$refs.sideMenu.updateOpened();
        // this.$refs.sideMenu.updateActiveName();
    }
  },
  created() {},
   updated () {
        this.$nextTick(() => {
            if (this.$refs.sideMenu) {
                this.$refs.sideMenu.updateOpened();
                // this.$refs.sideMenu.updateActiveName();
            }
        });
    }
};
</script>

<style lang="less" scoped>
.layout-sider {
  position: absolute;
  width: 200px;
  text-align: left;
  background-color: #49505f;
  top: 0;
  left: 0;
  height: 100%;
  //   flex: 0 0 200px;
  //   height: 100vh;
  overflow-y: auto;
}
</style>