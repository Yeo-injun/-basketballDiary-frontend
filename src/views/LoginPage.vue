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
        /**상위컴포넌트에서 데이터 받기 : props 사용하기
         * props선언시 <template>영역에서는 kebab-case로 작성해야함.
         * 작성 스타일 참고자료: https://kr.vuejs.org/v2/guide/components-props.html
         */
        props: 
        {
          userInfo: Object,
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
                            // 참고자료 : https://v3.router.vuejs.org/guide/essentials/navigation.html#router-push-location-oncomplete-onabort
                            // 인증을 위한 쿠키 사용에 대한 추가 설정 필요 여부 확인 필요 - store 확인 https://developerjournal.tistory.com/15 (중앙 상태관리 libarary vuex)
                            this.$emit('loginSuccess', res);
                            this.loginSeccessEvent(res);
                            this.$router.push('/');
                        })
                        .catch((e) => {
                            console.log(e);
                            this.$emit('loginSuccess');
                            this.initInput();
                        })
            },
            loginSeccessEvent: (res) =>
            {
                console.log(res);
                console.log('진입 : sendLoginInfo...');
                console.log('종료 : sendLoginInfo...');

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