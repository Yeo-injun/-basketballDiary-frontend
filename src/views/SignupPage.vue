<template>
    <div>
        회원가입
        <v-text-field label="아이디" v-model="userId"></v-text-field>
        <v-text-field label="비밀번호" type="password" v-model="password"></v-text-field>
        <v-text-field label="이름" v-model="username"></v-text-field>
         
        <v-card>
            <v-card-title>이것은 타이틀 : {{ userId }}</v-card-title>
            <v-card-subtitle>소제목을 작성</v-card-subtitle>
            <v-card-text>블라블라</v-card-text>
            <v-container>
                <v-row>
                    <v-col>
                        <!-- 사진 태그 -->
                        테스트테스트
                    </v-col>
                    <v-col>
                        <v-row>
                            <v-col>
                                블라블로송 : 야호
                            </v-col>
                            <v-col>
                                블라블로송 : 야호
                            </v-col>
                            <v-col class="text-left">
                                ddddd
                                <v-btn class="float-right">
                                    버튼
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>

    </div>
</template>

<script>
    export default {
        data: ()=>{
            return {
                userId: 'dddddddd',
                password: '',
                username: '',
            }
        },
        
    }
</script>

<style lang="scss" scoped>

</style>