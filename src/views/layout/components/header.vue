<!-- 布局头部 -->
<template>
  <div class="layout-header">
   
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "header",
  components: {},
  data() {
    return {};
  },
  props: {},
  computed: {
    ...mapGetters(["avatar", "name", "introduction", "isLogin"])
  },
  methods: {
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
  position: absolute;
  width: 100%;
  background: #495060;
  line-height: 64px;
  height: 64px;
  top: 0;
  .system-info {
    text-align: left;
    .logo {
      width: 40px;
      height: 40px;
      border-radius: 50px;
      margin-top: 12px;
      margin-left: 20px;
      margin-right: 10px;
      float: left;
      position: relative;
    }
    .title {
      font-size: 18px;
      font-weight: bold;
      color: azure;
      line-height: 64px;
    }
  }
  .system-user {
    text-align: right;
    float: right;
    padding-right: 16px;
    .userinfo-inner {
      color: #fff;
      font-size: 16px;
      cursor: pointer;
      img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin: 10px 0px 10px 10px;
        float: right;
      }
    }
    .tools {
      float: left;
      padding-right: 16px;
    }
  }
}
</style>