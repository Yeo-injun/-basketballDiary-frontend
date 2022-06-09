<template>
    <div>
        <v-container>
            <v-card class="grey lighten-3">
                <v-row align="center">
                    <v-col cols="2">
                        <v-img class="ms-5" max-height="50" max-width="50"
                            src="https://as2.ftcdn.net/v2/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" />
                    </v-col>
                    <v-col cols="10">
                        <v-row justify="space-between">
                            <v-col>{{data.userName}}/{{data.teamAuthCode}}</v-col>
                            <v-col>포지션: {{data.positionCode}}</v-col>
                            <v-col>가입일: {{data.joinYmd}}</v-col>
                            <v-col>
                                <v-btn color="black white--text" small>임원임명</v-btn>
                                <v-btn color="red white--text" small>강퇴하기</v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>신장: {{data.height}}</v-col>
                            <v-col>몸무게: {{data.weight}}</v-col>
                            <v-col>등번호: {{data.backNumber}}</v-col>
                            <v-col>경기참여: {{data.totGame}}회</v-col>
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