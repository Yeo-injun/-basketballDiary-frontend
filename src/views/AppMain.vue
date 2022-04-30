<template>
  <v-container>
    <h1> {{ sessionUserInfo.isLogin }} </h1>
  </v-container>
</template>

<script>
  export default {
    data: () => {
      return {
      }
    },
    methods: {
      // testFuntion() {
      //   if (this.sessionUserInfo.userId != '')
      //   {
      //     return this.sessionUserInfo.userId;
      //   }
      // },
    },
    props: 
    {
      sessionUserInfo: Object,
    }
  }
</script>
