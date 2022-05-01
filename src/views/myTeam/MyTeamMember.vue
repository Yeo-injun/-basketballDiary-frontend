<template>
    <div>
        <v-container class="green darken-1 px-15">
            <MyProfile/>
            <ManagerList/>
            <TeamMemberList/>
        </v-container>
    </div>
</template>

<script>
    import MyProfile from '@/components/myTeam/MyProfile.vue';
    import ManagerList from '@/components/myTeam/ManagerList.vue';
    import TeamMemberList from '@/components/myTeam/TeamMemberList.vue';

    export default {
        components: {
            ManagerList,
            MyProfile,
            TeamMemberList,
        }
    }
</script>

<style lang="scss" scoped>

</style>