<template>
  <div class="layout-header">

    <div class="header-left">
      <Icon @click.native="collapsedSider" :class="rotateIcon" type="navicon-round" size="24"></Icon>
      <Breadcrumb>
        <BreadcrumbItem :to="item.path" v-for="item in breadcrumbItems" :key="item.path">{{item.title}}</BreadcrumbItem>
       
      </Breadcrumb>

    </div>
    <div class="header-right">
      <Dropdown>
        <a href="javascript:void(0)">
          <span> iview_admin &nbsp;&nbsp;</span>
          <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
          <!-- <Icon type="arrow-down-b"></Icon> -->
        </a>
        <DropdownMenu slot="list">
          <DropdownItem>驴打滚</DropdownItem>
          <DropdownItem>炸酱面</DropdownItem>
          <DropdownItem>豆汁儿</DropdownItem>
          <DropdownItem>冰糖葫芦</DropdownItem>
          <DropdownItem>北京烤鸭</DropdownItem>
        </DropdownMenu>
      </Dropdown> &nbsp;&nbsp;

    </div>
    <slot></slot>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "layout-header",
  components: {},
  data() {
    return {
      isCollapsed: false,
      breadcrumbItems: []
    };
  },
  props: {},
  computed: {
    ...mapGetters(["avatar", "name", "introduction", "isLogin"])
  },
  methods: {
    initBreadcrumbItems(router) {
      console.log(router.matched, "---");
      let breadcrumbItems = [];
      for (let index in router.matched) {
        if (router.matched[index].meta && router.matched[index].meta.title) {
          breadcrumbItems.push({
            path: router.matched[index].path ? router.matched[index].path : "/",
            title: router.matched[index].meta.title
          });
        }
      }
      this.breadcrumbItems = breadcrumbItems
    },
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    collapsedSider() {
      alert(this.isCollapsed);
      this.isCollapsed = true;
    },
    userCommand(command) {
      switch (command) {
        case "usercenter":
          break;
        case "logout":
          this.$store.dispatch("LogOut").then(() => location.reload());
          break;
      }
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
.layout-header {
  padding: 10px;
  .header-left {
    float: left;
  }
  .header-right {
    float: right;
  }
  .menu-icon {
    transition: all 0.3s;
  }
  .rotate-icon {
    transform: rotate(-90deg);
  }
}
</style>