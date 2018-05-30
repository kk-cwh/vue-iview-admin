<template>
  <div class="layout-header">

    <div class="header-icon">
      <Icon @click.native="collapsedSider" :class="rotateIcon" type="navicon-round" size="24"></Icon>
    </div>
    <div class="header-breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem :to="item.path" v-for="item in breadcrumbItems" :key="item.path">{{item.title}}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="header-avatar">
      <Dropdown>
        <a href="javascript:void(0)">
          <!-- 登陆用户 名称 和头像-->
          <span> {{name}}&nbsp;&nbsp;</span>
          <Avatar :src="avatar" />
        </a>
        <DropdownMenu slot="list">
          <DropdownItem>首页</DropdownItem>
          <DropdownItem divided>退出</DropdownItem>
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
      let breadcrumbItems = [];
      for (let index in router.matched) {
        if (router.matched[index].meta && router.matched[index].meta.title) {
          breadcrumbItems.push({
            path: router.matched[index].path ? router.matched[index].path : "/",
            title: router.matched[index].meta.title
          });
        }
      }
      this.breadcrumbItems = breadcrumbItems;
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
  height: 50px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .header-icon {
    flex: 0 0 50px;
    text-align: center;
  }
  .header-breadcrumb {
    flex: 1;
  }
  .header-avatar {
    flex: 0 0 120px;
  }
  .menu-icon {
    transition: all 0.3s;
  }
  .rotate-icon {
    transform: rotate(-90deg);
  }
}
</style>