<template>
    <v-app-bar color="green" dark app>
      <router-link to="/">
        <div class="d-flex align-center font-weight-bold white--text">농구일기</div>
      </router-link>      

      <v-spacer></v-spacer>

      <v-btn class="ma-1" to="/cookieTest">쿠키테스트화면</v-btn>
      <v-btn class="ma-1" to="/myTeams">소속팀</v-btn>
      <v-btn class="ma-1" to="/team">농구팀</v-btn>
      <v-btn class="ma-1" to="/myProfile">내정보</v-btn>
      <!-- v-if사용 tips : 하나의 엘리먼트에 적용해야함. 래퍼 엘리먼트 <template>을 사용하여 하나의 엘리먼트로 묶어주기 https://kr.vuejs.org/v2/guide/conditional.html -->
      <!-- <template v-if="!sessionUserInfo.isLogin"> -->
      <template v-if="!isLogin">
        <v-btn class="ma-1" to="/login">로그인</v-btn>
        <v-btn class="ma-1" to="/signup">회원가입</v-btn>
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
                // 로그아웃 처리  TODO 데이터 변경에 따라 바로 컴포넌트 변경시키기 
                vueInstance.$emit('logout-success');
                console.log(vueInstance);
                console.log(`로그아웃 처리 됐습니다.`);
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