<template>
    <div>
        <Row :gutter="16">
            <Col span="4">
            <Button @click="toAdd" type="primary">新增友链</Button>
            </Col>
            <Col :xs="{ span: 14, offset: 2 }" :sm="{ span: 8, offset: 8}" :md="{ span: 6, offset: 10 }" :lg="{ span: 4, offset: 12 }">
            <Form label-position="right" :label-width="60">
                <FormItem label="友链:" class="margin-bottom-10">
                    <Input type="text" v-model="query" placeholder="Enter category name"></Input>
                </FormItem>
            </Form>
            </Col>
            <Col span="4">
            <Button type="primary" @click="toQuery">查询</Button>
            </Col>
        </Row>
        <Table border ref="selection" :columns="columns" :data="tableDatas" stripe @on-select-all="selectAlldata"></Table>
        <Page :total="total" show-elevator show-sizer :page-size="10" class="margin-top-10 "></Page>
        <Modal v-model="modal1" title="友链信息" @on-ok="ok" @on-cancel="cancel">
            <Form :model="editRow" label-position="right" :label-width="100">
                <FormItem label="图片">
                    <Input v-model="editRow.name"></Input>
                </FormItem>
                <FormItem label="名字">
                    <Input v-model="editRow.email"></Input>
                </FormItem>
                <FormItem label="链接">
                    <Input v-model="editRow.avatar"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="modal2" title="新增友链" @on-ok="ok" @on-cancel="cancel" width="480">
            <Form :model="addRow" label-position="right" :label-width="140">
                <FormItem label="姓名">
                    <Input v-model="addRow.name" style="width:200px"></Input>
                </FormItem>
                <FormItem label="邮箱">
                    <Input v-model="addRow.email" style="width:200px"></Input>
                </FormItem>
                <FormItem label="头像">
                    <Input v-model="addRow.avatar" style="width:200px"></Input>
                </FormItem>
            </Form>
            <div slot="footer" style="color:#f60;text-align:center">
                <Button type="default" @click="cancel">取消</Button>
                <Button type="primary" @click="ok">保存</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
export default {
  data() {
    return {
      query: "",
      total: 0,
      modal1: false,
      editRow: {},
      modal2: false,
      addRow: {},
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
          title: "图片",
          width: 80,
          key: "avatar"
        },
        {
          title: "名字",
          key: "name"
        },
        {
          title: "链接",
          key: "email"
        },
        {
          title: "是否启用",
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
          title: "创建时间",
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
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    icon: "ios-trash",
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
                "删除"
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
      this.modal1 = true;
      this.$Message.info("当前查看索引" + index);
      this.editRow = this.tableDatas[index];
    },
    selectAlldata(datass) {
      this.$Message.success("选择了全部");
      console.log(datass);
    },
    ok() {
      console.log("ok");
    },
    cancel() {
      console.log("cancel");
    },
    toQuery() {
      this.queryList();
    },
    toAdd() {
      this.modal2 = true;
    }
  }
};
</script>
