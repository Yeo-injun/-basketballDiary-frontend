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
            async doLogin()
            {
                const param = 
                {
                    userId: this.userId,
                    password: this.password
                }
                await login(param)
                        .then((res) => {
                            console.log(res);
                            // 참고자료 : https://v3.router.vuejs.org/guide/essentials/navigation.html#router-push-location-oncomplete-onabort
                            // 인증을 위한 쿠키 사용에 대한 추가 설정 필요 여부 확인 필요 - store 확인 https://developerjournal.tistory.com/15 (중앙 상태관리 libarary vuex)
                            // 'login-success'라는 이름의 커스텀 이벤트를 res 데이터와 함께 상위 컴포넌트로 올려보냄
                            this.$emit('login-success', res); // loginSuccess라는 이름의 이벤트를 발생시켜서 상위 컴포넌트로 올린다.
                            this.$router.push('/');
                        })
                        .catch((e) => {
                            // 함수로 감싸기 - 오류코드에 따라 에러 메세지 처리
                            alert(e.response.data.message);
                            this.initInput();
                        })
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