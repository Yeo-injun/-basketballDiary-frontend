<template>
    <v-app-bar color="green" dark app>
      <router-link to="/">
        <div class="d-flex align-center font-weight-bold white--text">농구일기</div>
      </router-link>      

      <v-spacer></v-spacer>

      <v-btn class="ma-1" to="/myTeams/members">소속팀</v-btn>
      <v-btn class="ma-1" to="/team">농구팀</v-btn>
      <v-btn class="ma-1" to="/myProfile">내정보</v-btn>
      <v-btn class="ma-1" to="/login">로그인</v-btn>
      <v-btn class="ma-1" to="/signup">회원가입</v-btn>
    </v-app-bar>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>