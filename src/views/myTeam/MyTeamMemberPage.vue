<template>
    <div>
        <v-container class="px-15">

            <div class="d-flex">
                <v-subheader>개인프로필</v-subheader>
                <v-btn class="ml-auto" color="black white--text" small to="/myTeamsProfile" :teamSeq="pTeamSeq">프로필 수정</v-btn>
                <v-btn class="" color="black white--text" small to="/myTeam/info" :teamSeq="pTeamSeq">팀정보 수정</v-btn>
            </div>
            <MyProfile :data="profile" />

            <v-subheader>운영진</v-subheader>
            <div v-for="(manager, index) in managerList" v-bind:key="index">
                <MyManager v-bind:data="manager" />
            </div>

            <div class="d-flex">
                <v-subheader>팀원 목록</v-subheader>
                <v-btn class="ml-auto" color="black white--text" small>팀원 추가</v-btn>
            </div>
            <div v-for="(member, index) in memberList" v-bind:key="'A'+index">                    
                <MyMember v-bind:data="member"/>
            </div>

        </v-container>
    </div>
</template>

<script>
    import myTeamApi from '@/api/MyTeamAPI';
    import MyProfile from '@/components/myTeam/MyProfile.vue';
    import MyManager from '@/components/myTeam/MyManager.vue';
    import MyMember from '@/components/myTeam/MyMember.vue';

    export default {
        props: {
            pTeamSeq: {
                type: Number,
                required: true
            }
        },
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
                memberList: [],
            }
        },
        methods: {
            async getProflie() {
                try {
                    var response = await myTeamApi.findMyTeamsProfile(this.pTeamSeq);
                    const {data} = response;
                    this.profile = data;
                } catch(e) {
                    console.log(e);
                }
            },
            async getListManager() {
                try {
                    var response = await myTeamApi.searchManagers(this.pTeamSeq);
                    const {data} = response;
                    this.managerList = data;
                } catch(e) {
                    console.log(e);
                }
            },
            async getListMember() {
                try {
                    var response = await myTeamApi.searchMembers(this.pTeamSeq);
                    const {data} = response;
                    this.memberList = data;
                }
                catch(e) {
                    console.log(e);
                }
            },
            onLoad () {
                this.getProflie();
                this.getListManager();
                this.getListMember();
            }
        },
        mounted () {
            this.onLoad();
        }
    }
</script>

<style lang="scss" scoped>

</style>