<template>
    <div>
        <v-card>            
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
    

</template>

<script>
import JoinRequestPlayerListTab from '@/views/myTeam/tab/JoinRequestPlayerListTab.vue'; // TODO 파일 디렉토리 옮기기 >> myTeam - tab 으로
import InvitePlayerListTab from '@/views/myTeam/tab/InvitePlayerListTab.vue'; // TODO 파일 디렉토리 옮기기 >> myTeam - tab 으로

    export default {
        components: {
            InvitePlayerListTab,
            JoinRequestPlayerListTab,
        },
        data: () => {
            return {
                tab: null, // TODO 왜 필요한지 확인... (22.06.06 월. 인준 적용한 코드인데 추가 학습 필요)
                tabTitles: ['초대한 선수', '가입요청보낸 선수'],
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>