<template>
  <div class="layout">
     <sidebar></sidebar>
     <layout-content>
        <router-view slot="main" ></router-view>
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