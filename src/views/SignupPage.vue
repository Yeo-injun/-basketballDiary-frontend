<template>
    <v-container>
        회원가입
        <v-text-field label="아이디" v-model="userId"></v-text-field>
        <v-text-field label="비밀번호" type="password" v-model="password"></v-text-field>
        <v-text-field label="비밀번호 확인" type="password" v-model="passwordCheck"></v-text-field>
        
        <v-text-field label="이름" v-model="name"></v-text-field>
        <v-radio-group v-model="gender" row>
            <v-radio label="남성" value="01"/>
            <v-radio label="여성" value="02"/>
        </v-radio-group>
        <!-- https://vuetifyjs.com/en/components/date-pickers/#date-events -->
        <v-date-picker
            v-model="date"
            no-title
            @input="menu1 = false"
        ></v-date-picker>
        <v-text-field label="이메일" v-model="email"></v-text-field>
        <v-text-field label="신장" v-model="height"></v-text-field>
        <v-text-field label="몸무게" v-model="weight"></v-text-field>
        포지션
        생년월일
        신장
        몸무게
        시도, 시군구 코드
    </v-container>
</template>

<script>
// 참고자료 : https://vuetifyjs.com/en/components/forms/#vuelidate
    export default {
        data: ()=>{
            return {
                userId: '',
                password: '',
                passwordCheck: '',
                name: '',
                gender: '',

            }
        },
        
    }
</script>

<style lang="scss" scoped>

</style>