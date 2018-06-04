<template>
    <Table border :columns="columns" :data="tableData" size="small"></Table>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "Name",
          key: "name",
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "person"
                }
              }),
              h("strong", params.row.name)
            ]);
          }
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Phone",
          key: "phone"
        },
        {
          title: "Action",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
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
                "View"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "Delete"
              )
            ]);
          }
        }
      ],
      tableData: [

      ]
    };
  },
  mounted(){
  this.init()
  },
  methods: {
      init(){
            this.$store.dispatch('GetUserList').then(res=>{
                 if(res && res.data){
             this.tableData = res.data
                 }
            })
      },
    show(index) {
      this.$Modal.info({
        title: "User Info",
        content: `Name：${this.tableData[index].name}<br>Age：${
          this.tableData[index].age
        }<br>Phone：${this.tableData[index].phone}`
      });
    },
    remove(index) {
      this.tableData.splice(index, 1);
    }
  }
};
</script>
