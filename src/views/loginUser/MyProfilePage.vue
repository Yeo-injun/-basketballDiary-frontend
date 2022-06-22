<template>
    <div>
        <v-tabs centered v-model="tab">
            <v-tab v-for="title in tabTitles" :key="title">
                {{ title }}
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item v-for="(title, idx) in tabTitles" :key="title">
                <TeamJoinManageTab 
                v-if="idx == 0"/>
                <MyProfile 
                v-if="idx == 1"/>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import MyProfile from '@/components/loginUser/MyProfile.vue'; // TODO 파일명 바꾸기 >> MyProfileTab
import TeamJoinManageTab from '@/components/authUser/tab/TeamJoinManageTab.vue';

    export default {
        components : {
            MyProfile,
            TeamJoinManageTab,
        },
        data: () => {
            return {
                tab: null,
                tabTitles: ['팀가입관리', '내정보수정'],
            }
        },
        methods: {
            onClick () {
                // console.log(123);
                // console.log(this.teamSeq);
            },
            init(){}
        },
        mounted (){
            // this.onClick();
            this.init();
        }        
    }
</script>

<style>

</style>