import $ from 'jquery';
import jwt_decode from "jwt-decode";
const user = {
    state: {
        id: "",
        username: "",
        photo: "",
        followerCount: 0,
        access: "",
        refresh: "",
        is_login: false,
    },
    getters: {
    },
    mutations: {
        update_user(state, user) {
            state.id = user.id;
            state.username = user.username;
            state.photo = user.photo;
            state.followerCount = user.followerCount;
            state.access = user.access;
            state.refresh = user.refresh;
            state.is_login = user.is_login;
        },
        update_access(state, access) {
            state.access = access;
        },
        logout(state) {
            state.id = "";
            state.username = "";
            state.photo = "";
            state.followerCount = "";
            state.access = "";
            state.refresh = "";
            state.is_login = false;
        }
    },
    actions: {
        login(context, data) {
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/api/token/",
                type: "POST",
                data: {
                    username: data.username,
                    password: data.password,
                },
                success(resp) {
                    const { access, refresh } = resp;
                    let access_object = jwt_decode(access);
                    const userId = access_object.user_id;
                    //在登录成功的时候，设一个定时函数，每隔1s获取新的access并且更新
                    setInterval(() => {
                        $.ajax({
                            url: "https://app165.acapp.acwing.com.cn/api/token/refresh/",
                            type: "post",
                            data: {
                                refresh: refresh,
                            },
                            success(resp) {
                                context.commit("update_access", resp);
                            },
                        });
                    }, 4.5 * 60 * 1000);

                    $.ajax({
                        url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
                        type: "get",
                        headers: {
                            'Authorization': 'Bearer ' + access,
                        },
                        data: {
                            user_id: userId,
                        },
                        success(resp) {
                            //为什么不是store.commit
                            context.commit("update_user", {
                                ...resp,
                                access: access,
                                refresh: refresh,
                                is_login: true,
                            });
                            console.log(access_object.access);
                            data.success();
                        },
                    });
                }, error() {
                    console.log("error");
                    data.error();
                }
            });
        },
    },
    modules: {
    }
};

export default user;
