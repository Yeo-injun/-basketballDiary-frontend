<template>
    <div>
        <v-card>            
            <!-- 탭 목록 -->
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

            <!-- 탭 영역 -->
            <v-tabs-items v-model="tab">
                <v-tab-item
                v-for="(title, idx) in tabTitles"
                :key="title"
                >
                    <InvitePlayerListTab
                    :pTeamSeq="pTeamSeq" 
                    v-if="idx == 0" 
                    />
                    <JoinRequestPlayerListTab
                    :pTeamSeq="pTeamSeq" 
                    v-if="idx == 1" />
                </v-tab-item>
            </v-tabs-items>
        </v-card>            
    </div>  
    

</template>

<script>
import JoinRequestPlayerListTab from '@/components/myTeam/tab/JoinRequestPlayerListTab.vue'; // TODO 파일 디렉토리 옮기기 >> myTeam - tab 으로
import InvitePlayerListTab from '@/components/myTeam/tab/InvitePlayerListTab.vue'; // TODO 파일 디렉토리 옮기기 >> myTeam - tab 으로

    export default {
        components: {
            InvitePlayerListTab,
            JoinRequestPlayerListTab,
        },
        props: {
            pTeamSeq: Number,
        },
        data: () => {
            return {
                tab: null, // TODO 왜 필요한지 확인... (22.06.06 월. 인준 적용한 코드인데 추가 학습 필요)
                tabTitles: ['초대한 선수', '가입요청보낸 선수'],
            }
        },

    }
</script>

<style lang="scss" scoped>

</style>