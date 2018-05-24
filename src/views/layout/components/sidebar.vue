<!-- 底部布局 -->
<template>
    <div class="layout-sider">
        <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
            <template v-for="item in menuList">
                <MenuItem v-if="!item.hidden && item.children.length<=1" :name="item.children[0].name" :key="'menuitem' + item.name">
                <Icon :type="item.meta.icon" :size="iconSize" :key="'menuicon' + item.name"></Icon>
                <span class="layout-text" :key="'title' + item.name">{{ item.children[0].name }}</span>
                </MenuItem>

                <Submenu v-if="!item.hidden && item.children.length > 1" :name="item.name" :key="item.name">
                    <template slot="title">
                        <Icon :type="item.meta.icon" :size="iconSize"></Icon>
                        <span class="layout-text">{{ item.name }}</span>
                    </template>
                    <template v-for="child in item.children">
                        <MenuItem :name="child.name" :key="'menuitem' + child.name">
                        <Icon :type="child.meta.icon" :size="iconSize" :key="'icon' + child.name"></Icon>
                        <span class="layout-text" :key="'title' + child.name">{{ child.name }}</span>
                        </MenuItem>
                    </template>
                </Submenu>
            </template>
        </Menu>
    </div>
</template>

<script>

export default {
  name: "footer",
  components: {  },
  data() {
    return {
        iconSize:20
    }
  },
//   props: { menuList: {
//       type: Array
//     }},
  computed: {
    menuList(){
        console.log(this.$store.getters.menuList)
        return this.$store.getters.menuList
    }
  },
  methods: {},
  watch: {},
  created() {}
};
</script>

<style lang="less" scoped>
.layout-sider {
  position: absolute;
  width: 200px;
  text-align: left;
  background-color: #49505f;
  top: 0;
  left: 0;
  height: 100%;
  //   flex: 0 0 200px;
  //   height: 100vh;
  overflow-y: auto;
}
</style>