<template>
  <v-container>
    <div>로그인 페이지</div>
    <!-- 참고 API문서 : https://vuetifyjs.com/en/components/inputs/#slots -->
    <v-text-field label="아이디" v-model="userId"></v-text-field>
    <v-text-field
      label="비밀번호"
      type="password"
      v-model="password"
    ></v-text-field>
    <v-btn block color="primary" v-on:click="doLogin">로그인</v-btn>

    <div class="text-subtitle-1 mt-5" align="center">
      회원가입을 하려면
      <router-link to="/signup" class="text-subtitle-2">여기</router-link>
      를 클릭해주세요.
    </div>
  </v-container>
</template>

<script>
import userApi from "@/api/UserAPI.js";
import AuthStateManager from "@/common/state/AuthStateManager";

export default {
  data: () => {
    return {
      userId: "",
      password: "",
    };
  },
  methods: {
    // 비동기 처리
    async doLogin() {
      const param = {
        userId: this.userId,
        password: this.password,
      };
      try {
        const res = await userApi.login(param);
        AuthStateManager.mutations.processLogin(res.data);
        this.$router.push("/");
      } catch (e) {
        // request후 response에서 에러가 발생할 경우 Axios interceptor를 먼저 거침
        this.initInput();
      }
    },
    initInput() {
      this.userId = "";
      this.password = "";
    },
  },
};
</script>

<style lang="scss" scoped></style>
