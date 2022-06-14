<template>
    <!-- v-dialog태그 안에는 2가지 영역으로 분리됨. (컨텐츠 영역과 activator 영역) -->
    <!-- activator영역이 팝업 이전의 영역으로 팝업창을 띄울 수 있는 버튼이 존재 -->
    <!-- 컨텐츠 영역은 팝업될 내용들이 존재하는 영역 -->
    <v-dialog
        v-model="dialog"
        max-width="800px"
    >
        <!-- 컨텐츠 영역 -->
        <div>
            <v-card>
                <v-toolbar dark color="primary">
                    <v-toolbar-title>선수초대하기</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn icon dark @click="dialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>

                <!-- 선수 검색 영역 -->
                <v-card-title>선수 검색</v-card-title>
                <v-card-subtitle>
                    <v-select
                    v-model="searchCond"
                    :items="searchConds"
                    label="검색조건을 선택해주세요."
                    ></v-select>

                    <v-text-field 
                    label="검색어" 
                    v-model="searchKeyword"/>
                    
                    <v-btn
                    v-on:click="searchUsers">
                    검색
                    </v-btn>
                </v-card-subtitle>
                <v-card-text>
                    <v-data-table
                    :headers="userListHeader"
                    :items="userList"
                    >
                    </v-data-table>
                </v-card-text>
            </v-card>            
        </div>
        
        <!-- activator 영역 : 팝업이 뜨기전에 보여줄 컴포넌트들 -->
        <!-- v-slot:activator { on } : https://m.blog.naver.com/tkddlf4209/221732083022 -->
        <template v-slot:activator="{ on, attrs }">
            <div class="text-right">
                <v-btn
                class="mt-2 mb-2"
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                >
                선수초대하기
                </v-btn>
            </div>
        </template>
    </v-dialog>
</template>

<script>
/**
 * TODO
 * 1. 모달창 꺼지면 검색어 input된 데이터 초기화하기
 * 2. 사용자 선택해서 초대보내기
 * 
 */

import userApi from '@/api/UserAPI.js';
    export default {
        data: () => {
            return {
                dialog: false,
                tab: null,
                tabTitles: ['초대한 선수', '가입요청보낸 선수'],
                searchCond: "",
                searchConds: [
                    {text : '이름', value: 'userName'},
                    {text : '이메일', value: 'email'},
                ],
                searchKeyword: "",
                userListHeader: [
                    { text: '이름', value: 'userName', sortable: false },
                    // { text: '활동지역', value: 'joinRequestStateCodeName', sortable: false },
                    { text: '이메일', value: 'email', sortable: false },
                    { text: '키', value: 'height', sortable: false },
                    { text: '몸무게', value: 'weight', sortable: false },
                    { text: '포지션', value: 'positionCodeName', sortable: false },
                ],
                userList: [],
            }
        },
        watch: { // 팝업창을 열고 닫는 dialog data를 감시하여 해당 데이터에 따라 콜백 함수 처리 
            dialog: function(isDialogOpend) {
                if (isDialogOpend) {
                    this.searchUsers();
                }
            },
        },
        methods: {
            async searchUsers() {
                const params = this.genSearchParams();
                try {
                    const res = await userApi.findUserInfo(params);
                    this.userList = res.data;
                    console.log(res);
                } catch(e) {
                    console.log(e);
                }
            },
            genSearchParams() {
                let params = {
                    userName: "",
                    email: "",
                };
                const searchCondText = this.searchCond;
                if (searchCondText == "userName") {
                    params.userName = this.searchKeyword;
                } else if (searchCondText == "email") {
                    params.email = this.searchKeyword;
                }
                return params;
            }
        },
    }
</script>

<style lang="scss" scoped>
</style>