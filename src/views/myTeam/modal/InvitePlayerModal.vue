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
                    <v-toolbar-title>팀원추가관리</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn icon dark @click="dialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                
                사용자 검색
                사용자 그리드
            </v-card>            
        </div>
        
        <!-- activator 영역 : 팝업이 뜨기전에 보여줄 컴포넌트들 -->
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
    export default {
        data: () => {
            return {
                dialog: false,
                tab: null,
                tabTitles: ['초대한 선수', '가입요청보낸 선수'],
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>