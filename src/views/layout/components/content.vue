<!-- 中间主要布局 -->
<template>
  <div class="layout-content">
    <div class="container">
      <div class="container-header">
        <layout-header></layout-header>
      </div>
      <div class="container-main">
        <slot name="main"></slot>
      </div>
      <div class="container-footer">
        <layuot-footer>
          <a class="footer-content" href="https://github.com/calebman/vue-DBM">
            点此进入代码仓库
          </a>
        </layuot-footer>

      </div>
    </div>
  </div>
</template>

<script>
import layoutHeader from "./header";
import layuotFooter from "./footer";
export default {
  name: "content",
  components: {
    layoutHeader,

    layuotFooter
  },
  data() {
    return {
      breadcrumbItems: []
    };
  },
  props: {},
  computed: {
    routerLoading() {
      return this.$store.getters.routerLoading;
    }
  },
  methods: {
    initBreadcrumbItems(router) {
      let breadcrumbItems = [{ path: "/", title: "数据管理系统" }];
      for (let index in router.matched) {
        if (router.matched[index].meta && router.matched[index].meta.title) {
          breadcrumbItems.push({
            path: router.matched[index].path ? router.matched[index].path : "/",
            title: router.matched[index].meta.title
          });
        }
      }
      if (breadcrumbItems.length > 0) {
        breadcrumbItems[breadcrumbItems.length - 1].path = "";
      }
      this.breadcrumbItems = breadcrumbItems;
    }
  },
  watch: {
    $route(to) {
      this.initBreadcrumbItems(to);
    }
  },
  created() {
    this.initBreadcrumbItems(this.$route);
  }
};
</script>

<style lang="less" scoped>
.layout-content {
  position: absolute;
  background: #fff;
  left: 200px;
  right: 0;
  bottom: 0;
  height: 100%;
  .container {
    display: flex; /*设为伸缩容器*/
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
    .container-header {
      flex: 0 0 60px;
      text-align: left;
      border: 1px solid rgb(250, 105, 79);
    }
    .container-main {
      flex: 1 0 300px;
      margin: 10px;
      border: 1px solid rgb(250, 105, 79);
      overflow-y: auto;
    }
    .container-footer {
      flex: 0 0 64px;
      border: 1px solid rgb(250, 105, 79);
    }
  }
}
</style>


