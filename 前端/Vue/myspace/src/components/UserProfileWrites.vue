<template>
  <div class="card">
    <div class="card-body">
      <div class="form-floating">
        <textarea
          class="form-control"
          v-model="textArea"
          placeholder="Leave a comment here"
          id="floatingTextarea2"
          style="height: 100px"
        ></textarea>
        <label for="floatingTextarea2">动态内容</label>
        <button type="button" @click="onclick" class="btn btn-light">
          提交动态
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import $ from "jquery";
import { useStore } from "vuex";
export default {
  name: "UserProfileWrites",
  setup(props, context) {
    const textArea = ref("");
    const store = useStore();
    const onclick = () => {
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/post/",
        type: "post",
        headers: {
          Authorization: "Bearer " + store.state.user.access,
        },
        data: {
          content: textArea.value,
        },
        success(resp) {
          if (resp.result == "success") {
            context.emit("post_a_post", textArea.value);
            textArea.value = "";
          }
        },
        error() {
          console.log("post error");
        },
      });
    };
    return {
      textArea,
      onclick,
    };
  },
};
</script>

<style scoped>
.card {
  margin-top: 10px;
}
button {
  margin-top: 10px;
  padding-top: 2px;
  padding-bottom: 2px;
}
</style>