<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container">
        <a class="navbar-brand" href="/">My space</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link
                class="nav-link active"
                aria-current="page"
                :to="{ name: 'home' }"
                >首页</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'userlist' }"
                >好友列表</router-link
              >
            </li>
          </ul>
          <ul
            class="navbar-nav mb-2 mb-lg-0"
            v-if="!$store.state.user.is_login"
          >
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'login' }"
                >登录</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'register' }"
                >注册</router-link
              >
            </li>
          </ul>
          <ul class="navbar-nav mb-2 mb-lg-0" v-else>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{
                  name: 'userprofile',
                  params: { userId: $store.state.user.id },
                }"
                >{{ $store.state.user.username }}</router-link
              >
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" @click="logout">退出</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  name: "NavBar",
  setup() {
    const store = useStore(); //store放在这里才可以成功 放在logout里面就不行
    const logout = () => {
      store.commit("logout");
    };

    return {
      logout,
    };
  },
};
</script>

<style scoped>
</style>