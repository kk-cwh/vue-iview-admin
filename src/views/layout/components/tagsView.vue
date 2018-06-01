<template>
  <div class="tags-view-container">
    <div class="close-all-tag-con">
      <Dropdown transfer @on-click="handleTagsOption">
        <Button size="small" type="primary">
          标签选项
          <Icon type="arrow-down-b"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="clearAll">关闭所有</DropdownItem>
          <DropdownItem name="clearOthers">关闭其他</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <scroll-pane class="tags-view-wrapper" ref='scrollPane'>
      <Tag v-for="(item,index) in openedTags" ref="tag" @click.native="linkTo(item.name)" :key="index" :name="item.name" type="dot" closable @on-close="handleClose" :color="$route.name === item.name  ? 'blue':'default'">{{ item.meta.title }}</Tag>
    </scroll-pane>
  </div>

</template>
<script>
import ScrollPane from "@/components/ScrollPane";
export default {
  components: { ScrollPane },
  computed: {
    openedTags() {
      return this.$store.state.app.openedTags;
    }
  },
  data() {
    return {

    }
  },
  watch: {
    $route() {
      this.moveToCurrentTag();
    }
  },
  methods: {
    linkTo(name) {
      this.$router.push({ name });
    },
    handelSelect(name) {
      this.$router.push({ name });
    },
    handleClose(event, name) {
      this.$store.commit("removeOpenTag", name);
    },
    handleTagsOption(type) {
      if (type === "clearAll") {
        this.$store.commit("clearAllTags");
        this.$router.push({
          name: "home_index"
        });
      } else {
        this.$store.commit("clearOtherTags", this);
        this.moveToCurrentTag();
      }
    },
    moveToCurrentTag() {
      //   console.log(tags)
      this.$nextTick(() => {
        const tags = this.$refs.tag;
        for (const tag of tags) {
          if (tag.name === this.$route.name) {
            this.$refs.scrollPane.moveToTarget(tag.$el);
            break;
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.tags-view-container {
  position: relative;
  padding-right: 100px;
  .close-all-tag-con {
    position: absolute;
    top: 5px;
    right: 10px;
    z-index: 100;
  }
  .tags-view-wrapper {
    height: 36px;
    // border-bottom: 1px solid #d8dce5;
    // box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  }
}
</style>
