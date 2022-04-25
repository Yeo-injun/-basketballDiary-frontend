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
    import { login } from '@/api/UserAPI.js';

    export default {
        data: ()=>{
            return {
                userId: '',
                password: '',
            }
        },
        methods: {
            // 비동기 처리
            async doLogin() {
                const data = {
                    userId: this.userId,
                    password: this.password
                }
                console.log(data);
                try {
                    const result = await login(data);
                    console.log(result);
                    if (result.status == 200) {
                        // 참고자료 : https://v3.router.vuejs.org/guide/essentials/navigation.html#router-push-location-oncomplete-onabort
                        // 인증을 위한 쿠키 사용에 대한 추가 설정 필요 여부 확인 필요 - store 확인 https://developerjournal.tistory.com/15 (중앙 상태관리 libarary vuex)
                        this.$router.push('/');
                    }
                } catch(e) {
                    this.initInput();
                }
            },
            initInput() {
                this.userId = '';
                this.password = '';
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>