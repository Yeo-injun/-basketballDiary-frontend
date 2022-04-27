<template>
    <div>
        회원가입
        <v-text-field label="아이디" v-model="userId"></v-text-field>
        <v-text-field label="비밀번호" type="password" v-model="password"></v-text-field>
        <v-text-field label="이름" v-model="username"></v-text-field>
         
    </div>
</template>

<script>
    export default {
        data: ()=>{
            return {
                userId: '',
                password: '',
                username: '',
            }
        },
        
    }
</script>

<style lang="scss" scoped>

</style>