<template>
    <v-card>
        <v-card-title>팀 초대 목록</v-card-title>
        <v-card-text>
            <v-data-table
            :headers="invitationListHeader"
            :items="invitations"
            >
                <template v-slot:[`item.approval`]="{ item }">
                    <template
                    v-if="isShowButton(item.joinRequestStateCode)"
                    >
                        <v-btn
                        class="mr-2" small
                        @click="approveInvitation( item )"
                        >
                            승인
                        </v-btn>
                    </template>
                </template>
                <template v-slot:[`item.rejection`]="{ item }">
                    <template
                    v-if="isShowButton(item.joinRequestStateCode)"
                    >
                        <v-btn
                        class="mr-2" small
                        @click="rejectInvitation(item)"
                        >
                            거절
                        </v-btn>
                    </template>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>   <!--// 초대선수목록 -->
</template>

<script>
import authUserAPI from '@/api/AuthUserAPI.js';

    export default {
        data() {
            return {
                invitationListHeader: [
                    { text: '초대일시', value: 'requestDate', sortable: false },
                    { text: '팀명', value: 'teamName', sortable: false },
                    { text: '팀장이름', value: 'leaderName', sortable: false },
                    { text: '연고지', value: 'hometown', sortable: false },
                    { text: '창단일', value: 'foundationYmd', sortable: false },
                    { text: '상태', value: 'joinRequestStateCodeName', sortable: false },
                    { text: '승낙', value: 'approval', sortable: false },
                    { text: '거절', value: 'rejection', sortable: false },
                ],
                invitations: [],
            }
        },
        methods: {
            async getInvitations() {
                const res = await authUserAPI.getJoinRequestsFrom(); 
                this.invitations = res.data;
            },
            async initLoad() {
                await this.getInvitations();
            },
             async approveInvitation(item) {
                if (!confirm("가입요청을 승낙하시겠습니까?")) {
                    return;
                }

                const params = {
                    teamJoinRequestSeq : item.teamJoinRequestSeq,
                }

                await authUserAPI.approveInvitation(params);
                const res = await authUserAPI.getJoinRequestsFrom();
                this.invitations = res.data;
                
            },
            async rejectInvitation(item) {
                if (!confirm("가입요청을 거절하시겠습니까?")) {
                    return;
                }
                const params = {
                    teamJoinRequestSeq : item.teamJoinRequestSeq,
                }

                await authUserAPI.rejectInvitation(params);
                const res = await authUserAPI.getJoinRequestsFrom();
                this.invitations = res.data;
            },
            isShowButton(joinRequestStateCode) {
                const WAITING = "01";
                return joinRequestStateCode == WAITING;
            },
        },
        mounted (){
            this.initLoad();
        } 
    }
</script>

<style lang="scss" scoped>

</style>