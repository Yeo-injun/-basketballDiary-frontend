<template>
    <div>
        <JoinRequestToList/>
        <InviteFromTeamList/>    
    </div>
</template>

<script>
import JoinRequestToList from '@/components/authUser/JoinRequestToList.vue';
import InviteFromTeamList from '@/components/authUser/InviteFromList.vue';

    export default {
        components: {
            JoinRequestToList,
            InviteFromTeamList,
        },
        data: () => {
            return {
            }
        },

    }
</script>

<style lang="scss" scoped>

</style>