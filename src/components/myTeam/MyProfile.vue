<template>
    <div>
        <v-chip label color="green" text-color="white">개인프로필</v-chip>
        
        <v-container>
            <v-card class="grey lighten-2 pa-3">
                <v-row align="center">
                    <v-col cols="2">
                        <v-img max-height="100" max-width="100" src="https://scontent.ficn1-1.fna.fbcdn.net/v/t1.6435-9/42930628_2123047524380299_6256315174584582144_n.png?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=ShQS0dwV8PEAX9DlceS&_nc_ht=scontent.ficn1-1.fna&oh=00_AT-imSTO-8K8Fg4AZ2UTDAer242lnfa32yQqt67OT4V1jg&oe=628E2C34"/>
                    </v-col>
                    <v-col cols="10">
                        <v-row justify="space-between">
                            <v-col><v-card>포지션: {{data.positionCode}}</v-card></v-col>
                            <v-col><v-card>직책: {{data.temp}}</v-card></v-col>
                            <v-col><v-card>가입일: {{data.joinYmd}}</v-card></v-col>
                            <v-col>
                                <v-btn
                                    elevation="2"
                                    outlined
                                >임원 임명</v-btn>
                                <v-btn
                                    elevation="2"
                                    outlined
                                >강퇴하기</v-btn>
                            </v-col>
                        </v-row>
                        <v-row justify="space-between">
                            <v-col><v-card>신장:  {{data.height}}</v-card></v-col>
                            <v-col><v-card>체중:  {{data.weight}}</v-card></v-col>
                            <v-col><v-card>등번호:  {{data.backNumber}}</v-card></v-col>
                            <v-col><v-card>경기참여:  {{data.totGame}}</v-card></v-col>
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

<style lang="scss" scoped>

</style>