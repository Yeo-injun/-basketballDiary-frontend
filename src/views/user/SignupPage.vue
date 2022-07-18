<template>
    <v-container>
        <v-form ref="form">
            <!-- 필수 입력값 표시 -->
            회원가입
            <v-text-field label="아이디" v-model="userRegInfo.userId" :rules="requiredRules" required v-on:change="initDuplicationCheckStatus"></v-text-field>
            <v-btn block v-on:click="checkDuplicateUserId">ID중복확인</v-btn>

            <v-text-field label="비밀번호" type="password" v-model="userRegInfo.password" :rules="requiredRules" required></v-text-field>
            <v-text-field label="비밀번호 확인" type="password" v-model="passwordCheck"></v-text-field>
            
            <v-text-field label="이름" v-model="userRegInfo.name" :rules="requiredRules" required></v-text-field>
            <v-text-field label="이메일" v-model="userRegInfo.email" :rules="requiredRules" required></v-text-field>

            <CustomDatePicker 
            v-on:pickup-date="setBirthYmd"
            v-bind:p-label-name="pPickerLabelName"
            v-bind:p-init-value="pInitValue"/>

            <v-radio-group v-model="userRegInfo.gender" row :rules="requiredRules" required>
                <v-radio label="남성" value="01"/>
                <v-radio label="여성" value="02"/>
            </v-radio-group>
            <v-text-field label="신장(kg)" v-model="userRegInfo.height"></v-text-field>
            <v-text-field label="몸무게(cm)" v-model="userRegInfo.weight"></v-text-field>

            <v-container>
                포지션
                <v-radio-group v-model="userRegInfo.positionCode" row>
                    <v-radio label="포인트가드" value="11" color="primary"/>
                    <v-radio label="슈팅가드" value="12" color="primary"/>
                    <v-radio label="스몰포워드" value="23" color="primary"/>
                    <v-radio label="파워포워드" value="24" color="primary"/>
                    <v-radio label="센터" value="30" color="primary"/>
                </v-radio-group>
            </v-container>
            시도, 시군구 코드
        </v-form>
        <v-btn block color="primary" v-on:click="createUser">회원가입</v-btn>
    </v-container>
</template>

<script>
import userApi from '@/api/UserAPI';
import CustomDatePicker from '@/components/common/CustomDatePicker.vue';
import router from '@/router';

// id중복체크 - 자동으로 체크하기 https://pozafly.github.io/tripllo/(6)login3-vue/
// 참고자료 : https://vuetifyjs.com/en/components/forms/#vuelidate
    export default {
        components: {
            CustomDatePicker,
        },
        data: ()=>{
            return {
                pPickerLabelName: '생년월일',
                pInitValue: '',
                requiredRules: [v => !!v || '필수 입력값입니다.'],
                isModalOpen: '',
                isNotDuplicateUserId: false,
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
        }, // data
        methods: {
            setBirthYmd(selecteDate) {
                this.userRegInfo.birthYmd = selecteDate;
            },
            initDuplicationCheckStatus() {
                this.isNotDuplicateUserId = false;
            },
            // 아이디 중복체크  API - 중복체크 후 다시 아이디를 고쳤을때 
            async checkDuplicateUserId() {
                const params = {
                    userId : this.userRegInfo.userId,
                }
                try {
                    await userApi.checkDuplicateUserId(params);
                    this.isNotDuplicateUserId = true;
                    alert("사용할 수 있는 ID입니다!");
                } catch (e) {
                    this.isNotDuplicateUserId = false;
                    alert("중복된 ID가 존재합니다. 다른 ID를 사용하시기 바랍니다.");
                }
            },
            // 비밀번호 확인 로직
            checkPassword() {
                if (this.passwordCheck == this.userRegInfo.password) {
                    return true;
                }
                return false;               
            },
            // 회원가입 요청
            async createUser() {
                if (!this.isNotDuplicateUserId) {
                    alert("ID중복확인을 해주시기 바랍니다.");
                    return;
                }

                if (!this.checkPassword()) {
                    alert("비밀번호가 일치하지 않습니다.");
                    return;
                }

                // 참고자료 : v-form으로 감싸고 ref속성 추가 - https://crispypotato.tistory.com/133
                if (!this.$refs.form.validate()) {
                    return;
                }

                // TODO 요청이 보내지고 400에러를 반환하는데 백엔드에서는 요청이력이 없음... 확인요망
                let params = this.userRegInfo;
                console.log(params);
                try {
                    await userApi.createUser(params);
                    alert("회원가입이 완료되었습니다.");
                    router.push('/login');
                } catch(e) {
                    console.log(e);
                }
            },

        },  // methods
        
    }
</script>

<style lang="scss" scoped>

</style>