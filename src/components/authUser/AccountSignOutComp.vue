<template>
  <v-container>
    <v-card>
      <v-row>
        <v-col>비밀번호 확인</v-col>
        <v-col>
          <v-text-field solo></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="end">
        <v-btn class="float-right" @click="signOut()">회원탈퇴</v-btn>
        <v-btn class="float-right" @click="cancel()">취소</v-btn>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import myProfileApi from "@/api/AuthUserAPI";

export default {
  data: () => {
    return {};
  },
  methods: {
    async signOut() {
      // TODO 처리 완료 알림 구현
      const response = await myProfileApi.deleteUser();
      console.log(response);
    },
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style></style>
