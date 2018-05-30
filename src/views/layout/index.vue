<template>
  <div class="layout">
    <sidebar :menu-list="menuList" :open-names="openedSubmenuArr" @on-select="handelSelect" @on-open-change="handelOpenChange"></sidebar>
    <layout-content>
      <div class="open-tags" slot="tags" :style="{left: tagBodyLeft + 'px'}">
        <Tag v-for="item in openedTags" @click.native="linkTo(item)" :key="item" :name="item" type="dot" closable @on-close="handleClose" :color="$route.name === item ? 'blue':'default'">标签{{ item + 1 }}</Tag>
      </div>
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
    return {
      openedSubmenuArr: this.$store.state.app.openedSubmenuArr,
      openedTags: this.$store.state.app.openedTags,
      tagBodyLeft: 0
    };
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
    init() {
      this.$store.commit("addOpenSubmenu", this.$route.matched[0].name);
    },
    handelOpenChange(openNames) {
      this.$store.commit("setOpenSubMenu", openNames);
    },
    handelSelect(name) {
      this.$router.push({ name });
    },
    handleClose(event, name) {
      this.$store.commit("removeOpenTag", name);
    },
    linkTo(name) {
      this.$router.push({ name });
    }
  },
  watch: {
    $route(to) {
      this.$store.commit("addOpenSubmenu", to.matched[0].name);
      this.$store.commit("addOpenTag", to.name);
    },
    openedTags(val) {
      this.tagBodyLeft = val.length * 200;
    }
  },
  mounted() {
    this.init();
  },
  created() {}
};
</script>

<style lang="less">
.layout {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  .open-tags {
    position: absolute;
    padding: 2px 10px;
    overflow: visible;
    white-space: nowrap;
    transition: left 0.3s ease;
  }
}
</style>