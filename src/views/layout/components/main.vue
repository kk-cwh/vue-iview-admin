<!-- 中间主要布局 -->
<template>
  <div class="layout-content">
   
          <router-view></router-view>
    
  </div>
</template>

<script>
import layoutHeader from "./header";
import layuotFooter from "./footer";
export default {
  // name: "content",
  components: {
    layoutHeader,
    layuotFooter
  },
  data() {
    return {};
  },
  props: {},
  computed: {},
  methods: {},
  watch: {},
  created() {}
};
</script>

<style lang="less" scoped>
.layout-content {
  margin: 10px;

}
</style>


