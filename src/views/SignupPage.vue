<template>
    <v-container>
        회원가입
        <v-text-field label="아이디" v-model="userId"></v-text-field>
        <v-text-field label="비밀번호" type="password" v-model="password"></v-text-field>
        <v-text-field label="비밀번호 확인" type="password" v-model="passwordCheck"></v-text-field>
        
        <v-text-field label="이름" v-model="name"></v-text-field>
        <v-text-field label="이메일" v-model="email"></v-text-field>

        <!-- https://vuetifyjs.com/en/components/date-pickers/#date-events -->
        <v-date-picker
            v-model="birthYmd"
            no-title
            @input="menu1 = false"
        ></v-date-picker>

        <v-radio-group v-model="gender" row>
            <v-radio label="남성" value="01"/>
            <v-radio label="여성" value="02"/>
        </v-radio-group>
        <v-text-field label="신장" v-model="height"></v-text-field>
        <v-text-field label="몸무게" v-model="weight"></v-text-field>

                
        <v-container>
            포지션
            <v-row>
                <v-col cols="12" sm="2" md="2"><v-checkbox label="포인트가드" v-model="positionCode" value="11" color="primary"></v-checkbox></v-col>
                <v-col cols="12" sm="2" md="2"><v-checkbox label="슈팅가드" v-model="positionCode" value="12" color="primary"></v-checkbox></v-col>
                <v-col cols="12" sm="2" md="2"><v-checkbox label="스몰포워드" v-model="positionCode" value="23" color="primary"></v-checkbox></v-col>
                <v-col cols="12" sm="2" md="2"><v-checkbox label="파워포워드" v-model="positionCode" value="24" color="primary"></v-checkbox></v-col>
                <v-col cols="12" sm="2" md="2"><v-checkbox label="센터" v-model="positionCode" value="30" color="primary"></v-checkbox></v-col>
            </v-row>
        </v-container>
        
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
                email: '',
                birthYmd: '',
                gender: '',
                height: 0,
                weight: 0,
                sidoCode: '',
                sigunguCode: '',
                positionCode: [],
            }
        },
        
    }
</script>

<style lang="scss" scoped>

</style>