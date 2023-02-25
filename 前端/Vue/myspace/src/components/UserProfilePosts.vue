<template>
  <div class="card">
    <div class="card-body">
      <div v-for="post in posts.posts" :key="post.id" class="card post-list">
        <div class="card-body">
          {{ post.content }}
          <button
            v-if="userId == $store.state.user.id"
            type="button"
            class="btn btn-danger"
            @click="deletePost(post.id)"
          >
            删除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import $ from "jquery";
import { useStore } from "vuex";
export default {
  name: "UserProfilePosts",
  props: {
    posts: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    const route = useRoute();
    const userId = route.params.userId;
    const store = useStore();

    const deletePost = (postId) => {
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/post/",
        type: "delete",
        headers: {
          Authorization: "Bearer " + store.state.user.access,
        },
        data: {
          post_id: postId,
        },
        success(resp) {
          if (resp.result == "success") {
            context.emit("delete_a_post", postId);
          }
        },
      });
    };
    return {
      userId,
      deletePost,
    };
  },
};
</script>

<style scoped>
.post-list {
  margin-top: 10px;
}
button {
  float: right;
}
</style>