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
                
                <v-tabs 
                    v-model="tab"
                    centered
                >
                    <v-tab 
                        v-for="title in tabTitles" 
                        :key="title"
                    >
                        {{ title }}
                    </v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                    <v-tab-item
                        v-for="(title, idx) in tabTitles"
                        :key="title"
                    >
                        <InvitePlayerListTab v-if="idx == 0" />
                        <JoinRequestPlayerListTab v-if="idx == 1" />
                    </v-tab-item>
                </v-tabs-items>
            </v-card>            
        </div>
        
        <!-- activator 영역 : 팝업이 뜨기전에 보여줄 컴포넌트들 -->
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
            >
            (임시용) 팀원관리 버튼
            </v-btn>
        </template>
    </v-dialog>
</template>

<script>
import JoinRequestPlayerListTab from '@/views/myTeam/tab/JoinRequestPlayerListTab.vue';
import InvitePlayerListTab from '@/views/myTeam/tab/InvitePlayerListTab.vue';

    export default {
        components: {
            InvitePlayerListTab,
            JoinRequestPlayerListTab,
        },
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