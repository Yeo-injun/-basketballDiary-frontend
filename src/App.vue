<template>
<!-- https://vuetifyjs.com/en/components/application/#default-application-markup -->
<!-- v-app태그가 vuetify의 기본 골격됨. 도화지 역할 -->
  <v-app>
    <AppNavbar v-bind:user-info="userInfo"/> <!-- 라우팅을 이용해서 v-main 컴포넌트 하위의 내용 바꿔치기 하기 -->
    <v-main>
      <!-- v-main 하위의 컴포넌트는 라우팅에 따라서 다른 컴포넌트 보여주기 : Tap 영역 컴포넌트 추가 -->
      <router-view v-bind:user-info="userInfo" v-on:loginSuccess="setLoginInfo"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import AppNavbar from './components/AppNavbar';

export default {
  name: 'App',

  components: {
    AppNavbar,
  },

  data: () => ({
    /**
     * 로그인 정보는 모든 컴포넌트에서 접근 가능해야 함.
     * 따라서 최상위 컴포넌트에서 로그인 정보를 관리할 수 있는 변수를 생성.
     * 해당 변수를 하위컴포넌트에 props로 내려주기
     **/
    userInfo: {
      isLogin: false,
      userId: '',
      username: '',
    },
  }),

  methods: 
  {
    setLoginInfo: (data) =>
    {
      this.userInfo = data;
      console.log("이벤트 정상 처리 완료");
    }
  }
};
</script>

<style>
  /** 라우터 등록시 발생하는 밑줄 제거를 위한 css설정
   * https://devbirdfeet.tistory.com/147  */
  a { text-decoration: none; }
</style>