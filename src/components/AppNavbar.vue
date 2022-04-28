<template>
    <v-app-bar color="green" dark app>
      <router-link to="/">
        <div class="d-flex align-center font-weight-bold white--text">농구일기</div>
      </router-link>      

      <v-spacer></v-spacer>

      <!-- <v-btn class="ma-1" to="/myTeams/members">소속팀</v-btn> -->
      <v-btn class="ma-1" to="/myTeams">소속팀</v-btn>
      <v-btn class="ma-1" to="/team">농구팀</v-btn>
      <v-btn class="ma-1" to="/myProfile">내정보</v-btn>
      <!-- v-if사용 tips : 하나의 엘리먼트에 적용해야함. 래퍼 엘리먼트 <template>을 사용하여 하나의 엘리먼트로 묶어주기 https://kr.vuejs.org/v2/guide/conditional.html -->
      <template v-if="!userInfo.isLogin">
        <v-btn class="ma-1" to="/login">로그인</v-btn>
        <v-btn class="ma-1" to="/signup">회원가입</v-btn>
      </template>
    </v-app-bar>
</template>

<script>
    export default {
        methods: {
        },
        props: 
        {
          userInfo: Object,
        }
    }
</script>

<style lang="scss" scoped>

</style>