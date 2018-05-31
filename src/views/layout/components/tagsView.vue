<template>
    <div class="tags-view-container">
        <scroll-pane class="tags-view-wrapper"  ref='scrollPane'>
            <Tag v-for="item in openedTags" ref="tag" @click.native="linkTo(item)" :key="item" :name="item" type="dot" closable @on-close="handleClose" :color="$route.name === item ? 'blue':'default'">{{ item + 1 }}</Tag>
        </scroll-pane>
    </div>

</template>
<script>
import ScrollPane from "@/components/ScrollPane";
export default {
  components: { ScrollPane },
  data() {
    return {
      openedTags: this.$store.state.app.openedTags,
      tagBodyLeft: 0
    };
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
  .tags-view-wrapper {
    height: 36px;  
    // border-bottom: 1px solid #d8dce5;
    // box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  }
}
</style>
