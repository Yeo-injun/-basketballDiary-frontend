<template>
    <v-container>
        회원가입
        <v-text-field label="아이디" v-model="userRegInfo.userId"></v-text-field>
        <v-text-field label="비밀번호" type="password" v-model="userRegInfo.password"></v-text-field>
        <v-text-field label="비밀번호 확인" type="password" v-model="passwordCheck"></v-text-field>
        
        <v-text-field label="이름" v-model="userRegInfo.name"></v-text-field>
        <v-text-field label="이메일" v-model="userRegInfo.email"></v-text-field>


        <!-- https://vuetifyjs.com/en/components/date-pickers/#date-events -->
        <!-- 생년월일 입력창  TODO v-lot 문법 숙지하기-->
        <v-dialog ref="dialog" v-model="isModalOpen" :return-value.sync="userRegInfo.birthYmd" persistent width="290px">
            <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="userRegInfo.birthYmd" label="생년월일" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"/>
            </template>
            <v-date-picker v-model="userRegInfo.birthYmd" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="isModalOpen = false">취소</v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(userRegInfo.birthYmd)">확인</v-btn>
            </v-date-picker>
        </v-dialog>


        <v-radio-group v-model="userRegInfo.gender" row>
            <v-radio label="남성" value="01"/>
            <v-radio label="여성" value="02"/>
        </v-radio-group>
        <v-text-field label="신장" v-model="userRegInfo.height"></v-text-field>
        <v-text-field label="몸무게" v-model="userRegInfo.weight"></v-text-field>

                
        <v-container>
            포지션
            <v-row>
                <v-col cols="12" sm="2" md="2"><v-checkbox label="포인트가드" v-model="userRegInfo.positionCode" value="11" color="primary"></v-checkbox></v-col>
                <v-col cols="12" sm="2" md="2"><v-checkbox label="슈팅가드" v-model="userRegInfo.positionCode" value="12" color="primary"></v-checkbox></v-col>
                <v-col cols="12" sm="2" md="2"><v-checkbox label="스몰포워드" v-model="userRegInfo.positionCode" value="23" color="primary"></v-checkbox></v-col>
                <v-col cols="12" sm="2" md="2"><v-checkbox label="파워포워드" v-model="userRegInfo.positionCode" value="24" color="primary"></v-checkbox></v-col>
                <v-col cols="12" sm="2" md="2"><v-checkbox label="센터" v-model="userRegInfo.positionCode" value="30" color="primary"></v-checkbox></v-col>
            </v-row>
        </v-container>
        
        시도, 시군구 코드
        <v-btn depressed color="primary" block v-on:click="createUser">회원가입</v-btn>
    </v-container>
</template>

<script>
import userApi from '@/api/UserAPI';

// 참고자료 : https://vuetifyjs.com/en/components/forms/#vuelidate
    export default {
        data: ()=>{
            return {
                isModalOpen: '',
                passwordCheck: '',
                userRegInfo : {
                    userId: '',
                    password: '',
                    name: '',
                    email: '',
                    birthYmd: '',
                    gender: '',
                    height: 0,
                    weight: 0,
                    sidoCode: '',
                    sigunguCode: '',
                    positionCode: [],
                },
            }
        },
        methods: {
            // TODO 아이디 중복체크  API

            // TODO 비밀번호 확인 로직

            // 회원가입 요청
            async createUser() {
                alert("회원가입 구현중");
                // TODO 비밀번호 확인 하기
                // TODO 필수값 체크하기
                let params = this.userRegInfo;
                await userApi.createUser(params);
            }
        },
        
    }
</script>

<style lang="scss" scoped>

</style>