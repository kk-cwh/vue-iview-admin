<template>
    <div>

        <Tag v-for="item in openedTags" @click.native="linkTo(item)" :key="item" :name="item" type="dot" closable @on-close="handleClose" :color="$route.name === item ? 'blue':'default'">{{ item + 1 }}</Tag>
    </div>

</template>
<script>
export default {
  data() {
    return {
      openedTags: this.$store.state.app.openedTags,
      tagBodyLeft: 0
    };
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
    }
  }
};
</script>
