<template>
  <Content>
    <div
      class="card"
      v-for="user in users"
      :key="user.id"
      @click="to_user(user.id)"
    >
      <div class="card-body">
        <div class="row">
          <div class="col-sm-1">
            <img class="img-fluid" :src="user.photo" alt="头像" />
          </div>
          <div class="col-sm-11">
            <div class="username">{{ user.username }}</div>
            <div class="fans">粉丝：{{ user.followerCount }}</div>
          </div>
        </div>
      </div>
    </div>
  </Content>
</template>
  
  <script>
// @ is an alias to /src
import Content from "../components/Content.vue";
import $ from "jquery";
import { ref } from "@vue/reactivity";
import router from "@/router/index";
import { useStore } from "vuex";
export default {
  name: "UserListView",
  components: {
    Content,
  },
  setup() {
    let users = ref([]);
    const store = useStore();
    $.ajax({
      url: "https://app165.acapp.acwing.com.cn/myspace/userlist/",
      type: "get",
      success(resp) {
        users.value = resp;
      },
    });
    const to_user = (userId) => {
      if (store.state.user.is_login) {
        router.push({
          name: "userprofile",
          params: {
            userId,
          },
        });
      } else {
        router.push({ name: "login" });
      }
    };
    return {
      users,
      to_user,
    };
  },
};
</script>
  <style scoped>
.card {
  margin-top: 20px;
  cursor: pointer;
}
.card:hover {
  box-shadow: 2px 2px 10px lightgrey;
  transition: 200ms;
}
img {
  border-radius: 50%;
}
.username {
  font-weight: bold;
  height: 50%;
}
.fans {
  font-size: 14px;
  color: gray;
}
</style> 