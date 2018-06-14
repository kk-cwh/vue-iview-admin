<template>
    <div>
        <Row :gutter="16">
            <Col span="4">
            <Button @click="toCreateArticle()" type="primary">创建文章</Button>
            </Col>
            <Col :xs="{ span: 14, offset: 2 }" :sm="{ span: 8, offset: 8}" :md="{ span: 6, offset: 10 }" :lg="{ span: 4, offset: 12 }">
            <Form label-position="right" :label-width="60">
                <FormItem label="文章:" class="margin-bottom-10">
                    <Input type="text" v-model="query" placeholder="标题或者副标题"></Input>
                </FormItem>
            </Form>
            </Col>
            <Col span="4">
            <Button type="primary" @click="toQuery">查询</Button>
            </Col>
        </Row>

        <Table border ref="selection" :columns="columns" :data="tableDatas" stripe @on-select-all="selectAlldata"></Table>
        <Page :total="total" show-elevator show-sizer :page-size="10" class="margin-top-10 "></Page>
    </div>
</template>
<script>
export default {
  data() {
    return {
      query: "",
      total: 0,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "ID",
          width: 60,
          key: "id"
        },
        {
          title: "标题",
          key: "avatar"
        },
        {
          title: "副标题",
          key: "name"
        },
        {
          title: "状态",
          key: "status",
          width: 90,
          render: (h, params) => {
            return h("div", [
              h("i-switch", {
                props: {
                  value: params.row.status,
                  size: "large"
                },
                scopedSlots: {
                  open: () => {
                    return "启用";
                  },
                  close: () => {
                    return "停用";
                  }
                },
                on: {
                  "on-change": status => {
                    this.changeStatus(params.index);
                  }
                }
              })
            ]);
          }
        },
        {
          title: "发布时间",
          key: "created_at"
        },
        {
          title: "操作",
          key: "action",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    icon: "eye",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    icon: "compose",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ],
      tableDatas: []
    };
  },
  computed: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.queryList();
    },
    async queryList() {
      try {
        const result = await this.$store.dispatch("GetUserList", { page: 1 });
        this.tableDatas = result.data;
        this.total = result.meta.total;
      } catch (error) {
        const response = error.response;
        if (response) {
          if (response.status === 401) {
            this.$Message.error("你没有权限!");
          }
          if (response.status === 500) {
            this.$Message.error("系统繁忙，请稍后再试!");
          }
        }
      }
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    changeStatus(index) {
      this.tableDatas[index].status = !this.tableDatas[index].status;
      //  console.log( this.userDatas)
    },
    show(index) {
      this.$Message.info("当前查看索引" + index);
    },
    selectAlldata(datass) {
      this.$Message.success("选择了全部");
      console.log(datass);
    },
    toQuery() {
      this.queryList();
    },
    toCreateArticle() {
      this.$router.push({ name: "add_article" });
    }
  }
};
</script>
