<template>
  <Content>
    <div class="row">
      <div class="col-3">
        <UserProfileInfo
          @follow="follow"
          @unfollow="unfollow"
          :user="user"
        />
        <UserProfileWrites
          v-if="$store.state.user.id == userId"
          @post_a_post="post_a_post"
        />
      </div>
      <div class="col-9">
        <UserProfilePosts :posts="posts" @delete_a_post="delete_a_post" />
      </div>
    </div>
  </Content>
</template>
  
  <script>
// @ is an alias to /src
import Content from "../components/Content.vue";
import UserProfileInfo from "../components/UserProfileInfo.vue";
import UserProfilePosts from "../components/UserProfilePosts.vue";
import UserProfileWrites from "../components/UserProfileWrites.vue";
import { reactive } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import $ from "jquery";
export default {
  name: "UserProfileView",
  components: {
    Content,
    UserProfileInfo,
    UserProfilePosts,
    UserProfileWrites,
  },
  setup() {
    const user = reactive({});
    const store = useStore();
    const route = useRoute();
    const userId = parseInt(route.params.userId);
    const follow = () => {
      if (user.followed) return;
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/follow/",
        type: "post",
        headers: {
          Authorization: "Bearer " + store.state.user.access,
        },
        data: {
          target_id: userId,
        },
        success(resp) {
          if (resp.result == "success") {
            user.followed = true;
            user.followed_count++;
          }
        },
        error(){
          console.log("失败");
        }
      });
    };
    const unfollow = () => {
      if (!user.followed) return;
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/follow/",
        type: "post",
        headers: {
          Authorization: "Bearer " + store.state.user.access,
        },
        data: {
          target_id: userId,
        },
        success(resp) {
          if (resp.result == "success") {
            user.followed = false;
            user.followed_count--;
          }
        },
      });
    };
    //获取userprofileinfo
    $.ajax({
      url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
      type: "get",
      headers: {
        Authorization: "Bearer " + store.state.user.access,
      },
      data: {
        user_id: userId,
      },
      success(resp) {
        user.username = resp.username;
        user.followed_count = resp.followerCount;
        user.photo = resp.photo;
        user.followed = resp.is_followed;
      },
      error() {},
    });
    //获取posts
    $.ajax({
      url: "https://app165.acapp.acwing.com.cn/myspace/post/",
      type: "get",
      headers: {
        Authorization: "Bearer " + store.state.user.access,
      },
      data: {
        user_id: userId,
      },
      success(resp) {
        posts.posts = resp;
      },
    });
    const posts = reactive({});
    const post_a_post = (content) => {
      posts.counts++;
      posts.posts.unshift({ userId: 1, id: posts.counts, content: content });
    };
    const delete_a_post = (postId) => {
      posts.counts--;
      posts.posts = posts.posts.filter((post) => post.id !== postId);
    };
    return {
      user,
      follow,
      unfollow,
      posts,
      post_a_post,
      userId,
      delete_a_post,
    };
  },
};
</script>
  <style scoped>
.container {
  margin-top: 20px;
}
</style>