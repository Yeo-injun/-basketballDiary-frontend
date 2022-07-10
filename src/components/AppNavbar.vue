<template>
    <v-app-bar color="green" dark app>
      <router-link to="/">
        <div class="d-flex align-center font-weight-bold white--text">농구일기</div>
      </router-link>      

      <v-spacer></v-spacer>
      <v-btn class="ma-1" to="/myTeams">소속팀</v-btn>
      <v-btn class="ma-1" to="/teams">농구팀</v-btn>
      <v-btn class="ma-1" to="/myProfile">내정보</v-btn>
      <!-- v-if사용 tips : 하나의 엘리먼트에 적용해야함. 래퍼 엘리먼트 <template>을 사용하여 하나의 엘리먼트로 묶어주기 https://kr.vuejs.org/v2/guide/conditional.html -->
      <!-- <template v-if="!sessionUserInfo.isLogin"> -->
      <template v-if="!isLogin">
        <v-btn class="ma-1" to="/login">로그인</v-btn>
      </template>
      <template v-else>
        <v-btn class="ma-1" v-on:click="doLogout">로그아웃</v-btn>
      </template>
    </v-app-bar>
</template>

<script>
import userApi from '../api/UserAPI.js';

    export default {
        methods: {
          async doLogout() {
            if (!confirm("로그아웃 하시겠습니까?")) {
               return;              
            }
            let vueInstance = this;
            try {
                await userApi.logout();
                vueInstance.$emit('logout-success');
            } catch(e) {
                console.log(e);
            }
            

          }
        },
        /**상위컴포넌트에서 데이터 받기 : props 사용하기
         * props선언시 <template>영역에서는 kebab-case로 작성해야함.
         * 작성 스타일 참고자료: https://kr.vuejs.org/v2/guide/components-props.html
         */
        props: {
          // sessionUserInfo: Object,
          isLogin: Boolean,
        },
    }
</script>

<style lang="scss" scoped>

</style>