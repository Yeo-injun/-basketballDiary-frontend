<template>
    <v-dialog
        v-model="dialog"
        max-width="800px"
    >
        모달창 띄우기
        가나다라 마바사

        <p>
            dialog API공부하기
            https://vuetifyjs.com/en/api/v-dialog/#props
        </p>
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
            >
            Open Dialog
            </v-btn>
        </template>
    </v-dialog>
</template>

<script>
    export default {
        data: () => {
            return {
                dialog: false,
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>