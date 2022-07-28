<template>
<!-- https://vuetifyjs.com/en/components/application/#default-application-markup -->
<!-- v-app태그가 vuetify의 기본 골격됨. 도화지 역할 -->
  <v-app>
    <AppNavbar 
      :is-login="isLogin"
      @logout-success="deleteAuthUserInfo"
    /> <!-- 라우팅을 이용해서 v-main 컴포넌트 하위의 내용 바꿔치기 하기 -->
    <v-main>
      <!-- v-main 하위의 컴포넌트는 라우팅에 따라서 다른 컴포넌트 보여주기 : Tap 영역 컴포넌트 추가 -->
      <!-- 'v-on:커스텀 이벤트명="이벤트에 매핑할 함수명"' >> 커스텀 이벤트명이 발생하게 되면 해당 이벤트에 매핑된 함수가 실행된다. -->
      <!-- v-on 속성을 이용해서 login-success이라는 이름의 이벤트 리스너를 설정해줌.-->
      <!-- 하위 컴포넌트에서 login-success라는 이벤트가 발생하면 setAuthUserInfo함수가 호출됨 -->
      <router-view
        :is-login="isLogin"
        @login-success="setUserInfoOnStorage"
      />
    </v-main>
  </v-app>
</template>
 
<script>
import AppNavbar from './components/AppNavbar';
import storageUtil from '@/common/StorageUtil.js';

export default {
  name: 'App',

  components: {
    AppNavbar,
  },

  data: ()=>{
    return {
      /**
       * 로그인 정보는 모든 컴포넌트에서 접근 가능해야 함.
       * 따라서 최상위 컴포넌트에서 로그인 정보를 관리할 수 있는 변수를 생성.
       * 해당 변수를 하위컴포넌트에 props로 내려주기
       **/
      // javascript의 한계 : 객체 변경감지가 제한적  -참고자료 : https://uxgjs.tistory.com/193
      isLogin: false,   
    }
  },
  methods: 
  {
  /** http://v3.ko.vuejs.org/guide/data-methods.html#data-%E1%84%89%E1%85%A9%E1%86%A8%E1%84%89%E1%85%A5%E1%86%BC
   * Vue는 methods 안에서 컴포넌트 인스턴스를 항상 참조할 수 있도록 this 값을 자동으로 바인딩합니다. 
   * 이렇게 하면 메서드가 이벤트 리스너나 콜백으로 사용될 때, 올바른 this 값을 유지하게 됩니다. 
   * 화살표 함수를 사용해서 methods를 정의하면 Vue가 적절한 this 값을 바인딩하지 못합니다. 따라서 methods를 정의할 때, 화살표 함수를 사용하지 않도록 합니다.
   */
      setUserInfoOnStorage(response)
      {
        // 로그인 결과에 따른 session값을 App.vue인스턴스의 data로 관리해야함.
        // 이를 통해 세션값을 전체 App에서 사용할 수 있게 함.
        // 객체 복사를 통해 LoginPage.vue에서 넘겨 받은 값을 Vue인스턴스의 data속성에 할당해줌
        // https://ko.javascript.info/object-copy 

        /** 22.05.25 인준 TODO 안건 인증된 회원 정보를 클라이언트 어디에다가 저장할 것인가.
         * 필요성 : API호출시 url에 회원의 정보(userSeq, 소속된 팀의 teamSeq등)을 넣어야 하기 때문에
         * 1안 : WebStorage를 활용한다 - local과 session storage의 차이점을 확인하고 그 둘중 어디에? https://velog.io/@ejchaid/localstorage-sessionstorage-cookie%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90
         * 2안 : Vue의 최상위 컴포넌트에서 안증된 회원 정보를 관리하고, 하위 컴포넌트에 prop로 내려준다.
         * 3안(추가자료조사 필요) : Vuex사용??!
         */
        storageUtil.setAuthUserOnSession(response.data);
        this.checkLoginState();
        this.$router.push('/');
      },
      deleteAuthUserInfo() 
      {
        storageUtil.clearSession();
        this.checkLoginState();
        this.$router.go(); //파라미터가 없으면 현재 위치 새로고침 - 숫자형 인수가 있으면 해당 숫자만큼 히스토리 스택으로 이동
      },
      checkLoginState() 
      {
        const authUser = storageUtil.getAuthUserFromSession();
        if (authUser == null) {
          this.isLogin = false;
          return;
        }
        this.isLogin = true;
      }
  },
  mounted() {
    this.checkLoginState();
  }
};
</script>

<style>
  /** 라우터 등록시 발생하는 밑줄 제거를 위한 css설정
   * https://devbirdfeet.tistory.com/147  */
  a { text-decoration: none; }
</style>