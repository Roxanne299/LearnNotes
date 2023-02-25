<template>
  <Content>
    <div class="row justify-content-md-center">
      <div class="col-4">
        <form @submit.prevent="register">
          <div class="mb-3">
            <label for="username" class="form-label">用户名</label>
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="username"
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">密码</label>
            <input
              type="password"
              v-model="password"
              class="form-control"
              id="password"
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">确认密码</label>
            <input
              type="password"
              v-model="password_confirm"
              class="form-control"
              id="password"
            />
          </div>
          <div class="error-message">{{ error_message }}</div>
          <button type="submit" class="btn btn-primary">注册</button>
        </form>
      </div>
    </div>
  </Content>
</template>
  
  <script>
import { ref } from "@vue/reactivity";
// @ is an alias to /src
import Content from "../components/Content.vue";
import { useStore } from "vuex";
import router from "@/router/index";
import $ from "jquery";
export default {
  name: "RegisterView",
  components: {
    Content,
  },
  setup() {
    let username = ref("");
    let password = ref("");
    let error_message = ref("");
    let password_confirm = ref("");
    const store = useStore();
    let register = () => {
      error_message.value = "";
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/user/",
        type: "post",
        data: {
          username: username.value,
          password: password.value,
          password_confirm: password_confirm.value,
        },
        success(resp) {
          error_message.value = resp.result;
          if (resp.result == "success") {
            store.dispatch("login", {
              username: username.value,
              password: password.value,
              success() {
                router.push({ name: "userlist" });
              },
              error() {
                error_message.value = "系统异常";
              },
            });
          }
        },
      });
    };

    return {
      username,
      password,
      register,
      error_message,
      password_confirm,
    };
  },
};
</script>
  <style scoped>
.container {
  margin-top: 20px;
}
label,
.error-message {
  display: block;
  text-align: left;
}
button {
  width: 100%;
}
.error-message {
  font-size: 14px;
  color: lightcoral;
}
</style>