<template>
    <div>
        <v-container>
            <v-card class="grey lighten-3">
                <v-row align="center">
                    <v-col cols="2">
                        <v-img class="ms-5" max-height="50" max-width="50" src="https://scontent.ficn1-1.fna.fbcdn.net/v/t1.6435-9/42930628_2123047524380299_6256315174584582144_n.png?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=ShQS0dwV8PEAX9DlceS&_nc_ht=scontent.ficn1-1.fna&oh=00_AT-imSTO-8K8Fg4AZ2UTDAer242lnfa32yQqt67OT4V1jg&oe=628E2C34"/>
                    </v-col>
                    <v-col cols="10">
                        <v-row justify="space-between">
                            <v-col>
                                <v-row>{{data.teamAuthCode}}/{{data.userName}}</v-row>
                                <v-row>{{data.birthYmd}}</v-row>
                            </v-col>
                            <v-col>신장: {{data.height}}</v-col>
                            <v-col>몸무게: {{data.weight}}</v-col>
                            <v-col>등번호: {{data.backNumber}}</v-col>
                            <v-col>가입일: {{data.joinYmd}}</v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    export default {
        props: {
            data:{}
        }
    }
</script>

<style>

</style>