<template>
    <v-container>
        <v-card>
            <v-card-title>
                {{ pTeam.teamName }}
            </v-card-title>
            <v-row>
                <v-col
                cols="4">
                    {{ pTeam.teamImagePath }}
                </v-col>
                <v-col
                cols="8">
                    <v-row>
                        <v-col>{{ `창단일 : ${pTeam.foundationYmd}` }}</v-col>
                        <v-col>{{ `인원수 : ${pTeam.totMember}명` }}</v-col>
                        <v-col>{{ `연고지 : ${pTeam.hometown}` }}</v-col>
                    </v-row>
                    <v-card>
                        <!-- <v-card-subtitle></v-card-subtitle> -->
                        정기운동일정
                        <v-card
                        v-for="(exercise, index) in pTeam.teamRegularExercisesList"
                        :key="index">

                            <v-row no-gutters>
                                <v-col>{{ exercise.dayOfTheWeekCode }}</v-col>
                                <v-col>{{ `${exercise.startTime} ~ ${exercise.endTime}` }}</v-col>
                                <v-col>{{ exercise.exercisePlaceName }}</v-col>
                            </v-row>
                            <v-row no-gutters>
                                <v-col>{{ exercise.exercisePlaceAddress }}</v-col>
                            </v-row>
                        </v-card>
                    </v-card>
                    <v-row justify="end">
                        <v-btn 
                        v-if="!this.isTeamMember(pTeam.teamSeq)"
                        class="ma-3"
                        @click="sendJoinRequest">팀가입요청</v-btn>
                    </v-row>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
import authUserApi from '@/api/AuthUserAPI.js';
import storageUtil from '@/common/StorageUtil.js';

    export default {
        props: {
            pTeam : {},
        },
        data() {
            return {
                team : this.$props.pTeam,
            }
        },
        methods: {
            async sendJoinRequest() {
                const params = {
                    teamSeq: this.team.teamSeq,
                }
                try {
                    const res = await authUserApi.sendJoinRequestToTeam(params);
                    console.log(res);
                    alert("가입신청이 완료되었습니다.");
                } catch(e) {
                    console.log(e);
                }
            },
            isTeamMember(teamSeq) {
                const userInfo = storageUtil.getAuthUserFromSession();
                const joinedTeamSeqList = Object.keys(userInfo.userAuth);

                let isTeamMember = false;
                for (const joinedTeamSeq of joinedTeamSeqList) {
                        if (teamSeq == joinedTeamSeq) {
                        isTeamMember = true;
                        break;
                    }
                }
                return isTeamMember;
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>