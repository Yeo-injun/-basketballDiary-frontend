<template>
    <div>
        <v-container class="green lighten-5">
            <v-tabs centered>
                <!-- TODO router에 탭 추가시 CSS를 자연스럽게 먹이기 : to prop활용하면 쉽게 적용 --> 
                <v-tab to="/myTeam/members">팀원 조회</v-tab>
                <v-tab to="/myTeams/test">팀기록 조회</v-tab>
            </v-tabs>
            <router-view/>
        </v-container>
    </div>
</template>

<script>
    //import { API } from '@/api/MyTeamAPI.js';
    export default {
        mounted (){
            this.onClick();
        },
        methods: {
            onClick () {
                console.log(123);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>