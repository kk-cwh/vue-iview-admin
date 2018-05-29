<template>
  <div class="layout-header">

    <div class="header-left">
      <Icon @click.native="collapsedSider" :class="rotateIcon" type="navicon-round" size="24"></Icon>
    </div>
    <div class="header-right">
      <Dropdown>
        <a href="javascript:void(0)">
          jaak
          <Icon type="arrow-down-b"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem>驴打滚</DropdownItem>
          <DropdownItem>炸酱面</DropdownItem>
          <DropdownItem>豆汁儿</DropdownItem>
          <DropdownItem>冰糖葫芦</DropdownItem>
          <DropdownItem>北京烤鸭</DropdownItem>
        </DropdownMenu>
      </Dropdown> &nbsp;&nbsp;
      <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
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
      isCollapsed: false
    };
  },
  props: {},
  computed: {
    ...mapGetters(["avatar", "name", "introduction", "isLogin"])
  },
  methods: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    collapsedSider() {
      alert(this.isCollapsed)
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
  watch: {},
  created() {}
};
</script>

<style lang="less" scoped>
.layout-header {
  padding: 10px;
  .header-left{
    float: left;
  
  }
  .header-right {
    float: right;
  }
     .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
}
</style>