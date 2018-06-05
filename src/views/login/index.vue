<template>
  <div class="login-container">
    <div class="login-container-left">

    </div>
    <div class="login-container-right">
      <div class="login-form">

        <Card :bordered="false">
          <p slot="title">
            <Icon type="log-in"></Icon> 欢迎登陆</p>
          <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <FormItem prop="username">
              <Input type="text" v-model="formInline.username" placeholder="请输入用户名">
              <span slot="prepend">
                <Icon :size="16" type="person"></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="formInline.password" placeholder="请输入密码" @keyup.enter="handleSubmit('formInline')">
              <span slot="prepend">
                <Icon :size="14" type="locked"></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formInline')" long>登 录</Button>
            </FormItem>
          </Form>
        </Card>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      formInline: {
        username: "admin",
        password: "admin"
      },
      ruleInline: {
        username: [
          {
            required: true,
            message: "请输入用户名！",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码！",
            trigger: "blur"
          },
          {
            type: "string",
            min: 5,
            message: "密码长度不能小于6位！",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$store.dispatch("Login",this.formInline).then(() => {
            this.$store
              .dispatch("GetUserInfo")
              .then(() => {
                this.$router.push({ name: "home_index" });
              })
              .catch(err => {
              });
          });
        } else {
          this.$Message.error("Fail!");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  position: fixed;
  width: 100%;
  height: 100%;
  // background: #2d3a4b;
  background-image: url("https://file.iviewui.com/iview-admin/login_bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  .login-container-left {
    flex: 1;
  }
  .login-container-right {
    flex: 0 0 360px;
    .login-form {
      margin: 200px 20px 20px 20px;
      // padding: 20px;
      background: #fff;
      width: 300px;
      // height: 300px;
      border-radius: 5px;
    }
  }
}
</style>

