<template>
  <div class="layout">
     <sidebar></sidebar>
     <layout-content>
        <layout-header solt="header"></layout-header>
        <router-view slot="main" ></router-view>

        <layuot-footer slot="footer">
        <a class="footer-content" href="https://github.com/calebman/vue-DBM">
        点此进入代码仓库
      </a>
    </layuot-footer>
    </layout-content>
   
    
  
  </div>
</template>

<script>
import layoutHeader from "./components/header";
import layoutContent from "./components/content";
import layuotFooter from "./components/footer";
import sidebar from "./components/sidebar";
export default {
  name: "layout",
  components: {
    layoutHeader,
    layoutContent,
    layuotFooter,
    sidebar
  },
  data() {
    return {};
  },
  props: {},
  computed: {
    routerLoading() {
      return this.$store.getters.routerLoading;
    }
  },
  methods: {},
  watch: {},
  created() {}
};
</script>

<style lang="less">
.layout {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #ff8e6c;
  // display: flex;
}
// .layout {
//   width: 100%;
//   height: 100%;
//   margin: 0 auto;
//   background: #f5f7f9;
// }
</style>