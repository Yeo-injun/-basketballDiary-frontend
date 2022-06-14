<template>
    <div>
        <InvitePlayerModal/>
        <v-card>
            <v-card-title>초대 선수 목록</v-card-title>
            <v-card-subtitle>
                <v-select
                v-model="invitedPlayerFilterCond"
                :items="invitedPlayerFilterConds"
                label="초대상태"
                ></v-select>
            </v-card-subtitle>
            <v-card-text>
                <v-data-table
                :headers="invitedPlayerHeader"
                :items="invitedPlayers"
                >
                </v-data-table>
            </v-card-text>
        </v-card>   <!--// 초대선수목록 -->
    </div>
</template>

<script>
import myTeamApi from '@/api/MyTeamAPI.js';
import InvitePlayerModal from '@/components/myTeam/modal/InvitePlayerModal.vue';

    export default {
        components: {
            InvitePlayerModal,
        },
        data() {
            return {
                invitedPlayerFilterCond: {text : '전체', value: ''},
                invitedPlayerFilterConds: [
                    {text : '전체', value: ''},
                    {text : '대기중', value: '01'},
                    {text : '거절', value: '03'},
                ],
                invitedPlayerHeader: [
                    { text: '초대일시', value: 'requestDate', sortable: false },
                    { text: '이름', value: 'name', sortable: false },
                    { text: '이메일', value: 'email', sortable: false },
                    { text: '포지션', value: 'positionCodeName', sortable: false },
                    { text: '키', value: 'height', sortable: false },
                    { text: '몸무게', value: 'weight', sortable: false },
                    { text: '초대상태', value: 'joinRequestStateCodeName', sortable: false },
                ],
                invitedPlayers: [
                    {
                        requestDate: '2022-06-06',
                        name: 'value',
                        email: 'value',
                        positionCodeName: 'value',
                        height: 'value',
                        weight: 'value',
                        joinRequestStateCodeName: 'value',
                    },
                ]
            }
        },
        methods: {
            async initLoad() {
                const params = {
                    teamSeq: 4, // TODO 테스트용 화면에서 데이터 받아오기
                    joinRequestStateCode: this.invitedPlayerFilterCond,
                }

                try {
                    const res = await myTeamApi.searchInvitedPlayer(params);
                    this.invitedPlayers = res.data;
                } catch (e) {
                    console.log(e);
                }

            },
            changeInvitedPlayerFilterParams() {

            }
        },
        mounted (){
            this.initLoad();
        } 
    }
</script>

<style lang="scss" scoped>

</style>