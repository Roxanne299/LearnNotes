<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-3">
          <img :src="user.photo" class="img-fluid head-img" alt="头像" />
        </div>
        <div class="col-9">
          <div class="username">{{ user.username }}</div>
          <div class="fans">粉丝数量：{{ user.followed_count }}</div>
          <button
            type="button"
            @click="follow"
            v-if="!user.followed"
            class="btn btn-light"
          >
            +关注
          </button>
          <button
            type="button"
            @click="unfollow"
            v-if="user.followed"
            class="btn btn-light"
          >
            取消关注
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserProfileInfo",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  setup(props, Context) {
    const follow = () => {
      console.log("关注");
      Context.emit("follow");
    };
    const unfollow = () => {
      console.log("取消关注" );
      Context.emit("unfollow");
    };
    return {
      follow,
      unfollow,
    };
  },
};
</script>

<style scoped>
.head-img {
  border-radius: 50%;
}
.username {
  font-weight: bold;
}
.fans {
  font-size: 14px;
  color: gray;
}
button {
  padding-top: 2px;
  padding-bottom: 2px;
}
</style>