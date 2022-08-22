<template>
  <v-container>
    <v-card>
      <v-card-title>
        {{ team.teamName }}
      </v-card-title>
      <v-row>
        <v-col cols="4">
          {{ team.teamImagePath }}
        </v-col>
        <v-col cols="8">
          <v-row>
            <v-col>{{ `창단일 : ${team.foundationYmd}` }}</v-col>
            <v-col>{{ `인원수 : ${team.totMember}명` }}</v-col>
            <v-col>{{ `연고지 : ${team.hometown}` }}</v-col>
          </v-row>
          <v-card v-if="this.hasExcercises()">
            <!-- <v-card-subtitle></v-card-subtitle> -->
            정기운동일정
            <v-card
              v-for="(exercise, index) in team.teamRegularExercises"
              :key="index"
            >
              <v-row no-gutters>
                <v-col>{{ exercise.dayOfTheWeekCodeName }}</v-col>
                <v-col>{{
                  `${exercise.startTime} ~ ${exercise.endTime}`
                }}</v-col>
                <v-col>{{ exercise.exercisePlaceName }}</v-col>
              </v-row>
              <v-row no-gutters>
                <v-col>{{ exercise.exercisePlaceAddress }}</v-col>
              </v-row>
            </v-card>
          </v-card>
          <v-row justify="end">
            <v-btn
              v-if="!this.isTeamMember(team.teamSeq)"
              class="ma-3"
              @click="sendJoinRequest"
              >팀가입요청</v-btn
            >
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import authUserApi from "@/api/AuthUserAPI.js";
import storageUtil from "@/common/StorageUtil.js";

export default {
  props: {
    pTeam: {},
  },
  data() {
    return {
      team: this.$props.pTeam,
    };
  },
  // 상위 컴포넌트에서 받은 props가 변경되는 것을 감지하기 위함.
  watch: {
    pTeam: function (newValue) {
      this.team = newValue;
    },
  },
  methods: {
    async sendJoinRequest() {
      const params = {
        teamSeq: this.team.teamSeq,
      };
      try {
        const res = await authUserApi.sendJoinRequestToTeam(params);
        console.log(res);
        alert("가입신청이 완료되었습니다.");
      } catch (e) {
        console.log(e);
      }
    },
    isTeamMember(teamSeq) {
      const userInfo = storageUtil.getAuthUserFromSession();
      if (userInfo == null) {
        return false;
      }

      const joinedTeamSeqList = Object.keys(userInfo.userAuth);

      let isTeamMember = false;
      for (const joinedTeamSeq of joinedTeamSeqList) {
        if (teamSeq == joinedTeamSeq) {
          isTeamMember = true;
          break;
        }
      }
      return isTeamMember;
    },
    hasExcercises() {
      if (this.team.teamRegularExercises.length > 0) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
