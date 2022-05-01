<template>
    <div>
        <v-chip label color="green" text-color="white">운영진</v-chip>
         <v-container>
            <MyManager/>
            <MyManager/>
            <MyManager/>
        </v-container>
    </div>
</template>

<script>
    import MyManager from '@/components/myTeam/MyManager.vue';
    export default {
        components: {
            MyManager
        }
    }
</script>

<style lang="scss" scoped>

</style>