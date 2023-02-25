<template>
  <Content>
    <div class="row justify-content-md-center">
      <div class="col-4">
        <form @submit.prevent="login">
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
          <div class="error-message">{{ error_message }}</div>
          <button type="submit" class="btn btn-primary">登录</button>
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
export default {
  name: "LoginView",
  components: {
    Content,
  },
  setup() {
    let username = ref("");
    let password = ref("");
    let error_message = ref("");

    const store = useStore();
    let login = () => {
      error_message.value = "";
      store.dispatch("login", {
        username: username.value,
        password: password.value,
        success() {
          router.push({ name: "userlist" });
        },
        error() {
          error_message.value = "用户名或密码错误";
        },
      });
    };

    return {
      username,
      password,
      login,
      error_message,
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