<template>
    <div>
        <v-container class="green darken-1 px-15">
            <MyProfile :data="profile"/>
            <v-chip label color="green" text-color="white">운영진</v-chip>
            <v-container class="pa-0">
                <div v-for="(manager, index) in managerList" v-bind:key="index">
                    <MyManager v-bind:data="manager"/>
                </div>
            </v-container>
            <v-chip label color="green" text-color="white">팀원 목록</v-chip>
            <v-container class="pa-0">
                <div v-for="(member, index) in memberList" v-bind:key="index">                    
                    <MyMember v-bind:data="member"/>
                </div>
            </v-container>
        </v-container>
    </div>
</template>

<script>
    import {myTeamApi} from '@/api/MyTeamAPI';
    import MyProfile from '@/components/myTeam/MyProfile.vue';
    import MyManager from '@/components/myTeam/MyMember.vue';
    import MyMember from '@/components/myTeam/MyMember.vue';

    export default {
        components: {
            MyProfile,
            MyManager,
            MyMember
        },
        //data: {} // Component끼리 data를 공유하면 안되므로 다음과 같이 사용하면 안됨.
        data: () => {
            return {
                params: {
                    teamId: 4,
                },
                profile: {},
                managerList: [],
                memberList: []
            }
        },
        methods: {
            getProflie() {
                return myTeamApi.findMyTeamsProfile(this.params)
                .then(response => {
                    const {data} = response;
                    this.profile = data;
                })
                .catch(error => {
                    console.log(error);
                })
                // .catch(function(error) {
                //     if(error.response) {
                //         console.log(error.response.data);
                //         console.log(error.response.status);
                //         console.log(error.response.headers);
                //     } else if(error.request) {
                //         console.log(error.request);
                //     } else {
                //         console.log(error.message);
                //     }
                // })
            },
            getListManager() {
                return myTeamApi.searchManagers(this.params)
                .then(response => {
                    const {data} = response;
                    this.managerList = data;
                })
                .catch(error => {
                    console.log(error);
                })
            },
            getListMember() {
                return myTeamApi.searchMembers(this.params)
                .then(response => {
                    const {data} = response;
                    this.memberList = data;
                })
                .catch(error => {
                    console.log(error);
                })
            },
            async onLoad () {
                await this.getProflie();
                await this.getListManager();
                await this.getListMember();
            }

        },
        mounted () {
            this.onLoad();
        }
    }
</script>

<style lang="scss" scoped>

</style>