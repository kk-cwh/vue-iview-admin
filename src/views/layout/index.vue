<template>
  <div class="layout">
    <sidebar class="layout-sidebar" :menu-list="menuList" :open-names="openedSubmenuArr" @on-select="handelSelect" @on-open-change="handelOpenChange"></sidebar>
    <div class="layout-container">
      <layout-header class="layout-header"></layout-header>
      <div class="layout-tags">
 <tags-view></tags-view>
      </div>
     
      <layout-main class="layout-main"></layout-main>
    </div>

  </div>
</template>

<script>
import layoutMain from "./components/main";
import tagsView from "./components/tagsView";
import layoutHeader from "./components/header";
import sidebar from "./components/sidebar";
export default {
  name: "layout",
  components: {
    layoutMain,
    tagsView,
    layoutHeader,
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
    toLoading() {
      let w = this.$refs.opentag_panent.offsetWidth;
      console.log(w);
      alert(w);
      console.log(this.$refs.opened_tags);
      this.$refs.opened_tags.forEach(item => {
        console.log(item.$el.offsetLeft);
      });
    },
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
      this.tagBodyLeft = val.length * 50;
    }
  },
  mounted() {
    this.init();
  },
  created() {}
};
</script>

<style lang="less" scoped>
.layout {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .layout-sidebar {
    position: absolute;
    width: 180px;
    text-align: left;
    background-color: #49505f;
    top: 0;
    left: 0;
    height: 100%;
    overflow-y: auto;
  }
  .layout-container {
    position: absolute;
    background-color: #fff;
    left: 180px;
    right: 0;
    height: 100%;
    display: flex; /*设为伸缩容器*/
    flex-direction: column;
    .layout-header {
      flex: 0 0 50px;
      box-sizing: border-box;
      border-bottom: 1px solid #ebebeb;
    }
    .layout-tags {
      flex: 0 0 36px;
      background: #ebebeb;
      padding-left: 10px;
      
    }
    .layout-main{
     flex: 1;
     background-color: #f0f0f0;
    //  padding: 10px;
    } 
  }
}
</style>