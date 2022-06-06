<template>
    <div>
        <v-tabs centered>
            <!-- TODO router에 탭 추가시 CSS를 자연스럽게 먹이기 : to prop활용하면 쉽게 적용 --> 
            <v-tab to="/myTeam/members" >팀원 조회</v-tab>
            <v-tab>팀기록 조회</v-tab>
        </v-tabs>
        <router-view :teamSeq="teamId"/>
        <!-- <h2>{{$route.params.teamSeq}}</h2>
        <h2>{{teamSeq}}</h2> -->
    </div>
</template>

<script>
    //import { API } from '@/api/MyTeamAPI.js';
    export default {
        data: () => {
            return {
                // teamId: 4,
                teamId: undefined
            }
        },        
        props: {
            teamSeq: {
                type: Number,
                required: true
            }
        },
        methods: {
            onClick () {
                // console.log(123);
                // console.log(this.teamSeq);
            },
            init(){
                this.teamId = this.teamSeq
            }
        },
        mounted (){
            // this.onClick();
            this.init();
        }        
    }
</script>

<style lang="scss" scoped>

</style>