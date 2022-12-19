<template>
  <v-container>
    <h1>테스트</h1>
    <v-card>
      <v-row>
        <v-col>현재 비밀번호</v-col>
        <v-col>
          <v-text-field v-model="prevPassword" solo />
        </v-col>
      </v-row>
      <v-row>
        <v-col>새 비밀번호</v-col>
        <v-col>
          <v-text-field v-model="newPassword" solo />
        </v-col>
      </v-row>
      <v-row>
        <v-col>새 비밀번호 확인</v-col>
        <v-col>
          <v-text-field v-model="checkNewPassword" solo />
        </v-col>
      </v-row>
      <v-row justify="end">
        <v-btn class="float-right" @click="update()">변경</v-btn>
        <v-btn class="float-right" @click="cancel()">취소</v-btn>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import myProfileAPI from "@/api/AuthUserAPI";

export default {
  data: () => {
    return {
      prevPassword: "",
      newPassword: "",
      checkNewPassword: "",
    };
  },
  methods: {
    async update() {
      const params = {
        prevPassword: this.prevPassword,
        newPassword: this.newPassword,
        checkNewPassword: this.checkNewPassword,
      };
      // TODO 비밀번호 확인 로직 추가 필요
      const res = await myProfileAPI.updatePassword(params);
      alert("비밀번호가 정상적으로 변경되었습니다.");
      this.$router.push("/");
      console.log(res);
    },
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style></style>
