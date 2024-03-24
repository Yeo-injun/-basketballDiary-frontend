<template>
  <v-container>
    <v-card>
      <v-row>
        <v-col>비밀번호 확인</v-col>
        <v-col>
          <v-text-field v-model="password" solo></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="end">
        <v-btn class="float-right" @click="withdrawalMembership()">회원탈퇴</v-btn>
        <v-btn class="float-right" @click="cancel()">취소</v-btn>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import AuthUserAPI from "@/api/AuthUserAPI";
import ValidationUtil from "@/common/util/ValidationUtil";

export default {
  data() {
    return {
      password : "",
    };
  },
  methods: {
    async withdrawalMembership() {
      if ( ValidationUtil.isNull( this.password ) ) {
        alert( "비밀번호를 입력해주시기 바랍니다." );
        return;
      }
      await AuthUserAPI.withdrawalMembership({ password : this.password });
    },
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style></style>
