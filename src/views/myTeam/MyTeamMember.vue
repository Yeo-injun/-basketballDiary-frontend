<template>
    <div>
        <v-container class="green darken-1 px-15">
            <MyProfile :data="profile"/>
            <v-chip label color="green" text-color="white">운영진</v-chip>
            <v-container class="pa-0">
                <div v-for="(manager, index) in managerList" v-bind:key="index">                    
                    <MyManager :data="manager"/>
                </div>
            </v-container>
            <v-chip label color="green" text-color="white">팀원 목록</v-chip>
            <v-container class="pa-0">
                <div v-for="(member, index) in memberList" v-bind:key="index">                    
                    <MyMember :data="member"/>
                </div>
            </v-container>
        </v-container>
    </div>
</template>

<script>
    import {myTeamAPI} from '@/api/MyTeamAPI';
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
                profile: {},
                managerList: [],
                memberList: []
            }
        },
        methods: {
            async load() {
                const param = {
                    teamSeq: 4
                }
                try {
                    console.log("프로필, 매니저, 팀원 가져오기");
                    this.profile = await myTeamAPI.findMyTeamsProfile(param);
                    const managerList = await myTeamAPI.searchManagers(param);
                    const memberList = await myTeamAPI.searchMembers(param);

                    managerList.data.forEach(e => this.managerList.push(e));
                    memberList.data.forEach(e => this.memberList.push(e));
                } catch(e) {
                    console.log(e);
                }
            }
        },
        mounted () {
            this.load();
        }
    }
</script>

<style lang="scss" scoped>

</style>