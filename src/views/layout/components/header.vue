<!-- 布局头部 -->
<template>
  <div class="layout-header">
   header
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
  
 
}
</style>