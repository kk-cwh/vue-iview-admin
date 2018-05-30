<template>
  <div class="layout">
    <sidebar :menu-list="menuList" :open-names="openedSubmenuArr" @on-select="handelSelect" @on-open-change="handelOpenChange"></sidebar>
    <layout-content>
      <router-view slot="main"></router-view>
    </layout-content>

  </div>
</template>

<script>
import layoutContent from "./components/content";
import sidebar from "./components/sidebar";
export default {
  name: "layout",
  components: {
    layoutContent,
    sidebar
  },
  data() {
    return { openedSubmenuArr: this.$store.state.app.openedSubmenuArr };
  },
  props: {},
  computed: {
    menuList() {
      return this.$store.getters.menuList;
    },
    routerLoading() {
      return this.$store.getters.routerLoading;
    }
  },
  methods: {
    handelOpenChange(openNames) {
      this.$store.commit("setOpenSubMenu", openNames);
    },
    handelSelect(name) {
      this.$router.push({ name });
    }
  },
  watch: {
    $route(to) {
      this.$store.commit("addOpenSubmenu", to.matched[0].name);
    }
  },
  created() {}
};
</script>

<style lang="less">
.layout {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

</style>