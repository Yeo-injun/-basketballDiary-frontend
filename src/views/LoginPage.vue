<template>
    <v-container>
        <div>로그인 페이지</div>
        <!-- 참고 API문서 : https://vuetifyjs.com/en/components/inputs/#slots -->
        <v-text-field label="아이디" v-model="userId"></v-text-field>
        <v-text-field label="비밀번호" type="password" v-model="password"></v-text-field>
        <v-btn block color="primary" v-on:click="doLogin">로그인</v-btn>
    </v-container>
</template>

<script>
    import userApi from '@/api/UserAPI.js';

    export default {
        data: ()=>{
            return {
                userId: '',
                password: '',
            }
        },
        methods: {
            // 비동기 처리
            async doLogin()
            {
                const param = {
                    userId: this.userId,
                    password: this.password
                }
                try {
                    /**
                     * 참고자료 : https://v3.router.vuejs.org/guide/essentials/navigation.html#router-push-location-oncomplete-onabort
                     * 인증을 위한 쿠키 사용에 대한 추가 설정 필요 여부 확인 필요 - store 확인 https://developerjournal.tistory.com/15 (중앙 상태관리 libarary vuex)
                     * 'login-success'라는 이름의 커스텀 이벤트를 res 데이터와 함께 상위 컴포넌트로 올려보냄
                     */
                    const res = await userApi.login(param);
                    console.log(res.headers);
                    this.$emit('login-success', res);
                } catch(e) {
                    // request후 response에서 에러가 발생할 경우 Axios interceptor를 먼저 거침 
                    this.initInput();
                }
            },
            initInput() 
            {
                this.userId = '';
                this.password = '';
            },
            
        }
    }
</script>

<style lang="scss" scoped>

</style>