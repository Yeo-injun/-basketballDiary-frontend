<template>
  <v-container>
    <h1> {{ isLogin }} </h1>
    <div> {{ loginUserInfo }} </div>
    <div> {{ getLoginUserInfoComputed }} </div>

  </v-container>
</template>

<script>
import storageUtil from '@/common/StorageUtil.js';

  export default {
    data: () => {
      return {
        loginUserInfo : {},
      }
    },
    computed : {
      getLoginUserInfoComputed() {
        const auth = storageUtil.getAuthUserFromSession();
        if (auth == null) {
          return "로그인 정보가 없습니다.";
        }
        return auth;
      }
    },
    methods: {
      getLoginUserInfo() {
        const auth = storageUtil.getAuthUserFromSession();
        if (auth == null) {
          this.loginUserInfo = "로그인 정보가 없습니다.";
          return;
        }
        this.loginUserInfo = auth;
      }
    },
    props: 
    {
      isLogin: Boolean,
    },
    mounted() {
      this.getLoginUserInfo();
    }
  }
</script>
