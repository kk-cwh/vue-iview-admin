<!-- 中间主要布局 -->
<template>
  <div class="layout-content">
    <div class="container">

      <div class="container-header">
        <layout-header></layout-header>
      </div>
      <div class="container-tags">
        <slot name="tags"></slot>
      </div>
      <div class="container-main">
        <slot name="main"></slot>
      </div>

      <div class="container-footer">
        <!-- <layuot-footer>
        </layuot-footer> -->
      </div>
    </div>
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
  position: absolute;
  background-color: #f0f0f0;
  left: 180px;
  right: 0;
  bottom: 0;
  height: 100%;
  .container {
    display: flex; /*设为伸缩容器*/
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
    .container-header {
      flex: 0 0 50px;
      text-align: left;
      border-bottom: solid 1px #e6e6e6;
      box-sizing: border-box;
    }
    .container-tags {
      flex: 0 0 40px;
      border-bottom: solid 1px #e6e6e6;
      position: relative;
      box-sizing: border-box;
      padding-right: 120px;
      width: 100%;
      height: 40px;
    }
    .container-main {
      flex: 1 0 300px;
      margin: 10px;
      // border: 1px solid #e6e6e6;

      overflow-y: auto;
    }
    .container-footer {
      flex: 0 0 10px;
      // border: 1px solid rgb(250, 105, 79);
    }
  }
}
</style>


