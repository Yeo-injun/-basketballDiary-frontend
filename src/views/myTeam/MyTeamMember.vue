<template>

    <div>
        <ManagerList/>
        <MyProfile/>
        <TeamMemberList/>

    </div>
</template>

<script>
    import ManagerList from '@/components/myTeam/ManagerList.vue';
    import MyProfile from '@/components/myTeam/MyProfile.vue';
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