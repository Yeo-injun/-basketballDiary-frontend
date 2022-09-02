<template>
  <v-container>
    팀 등록 화면
    <TeamInfoFormComp @e-team-info="setTeamInfo" />
    <v-btn color="primary" depressed @click="registerTeam()"> 등록 </v-btn>
  </v-container>
</template>

<script>
import teamApi from "@/api/TeamAPI.js";
import TeamInfoFormComp from "@/components/team/TeamInfoFormComp.vue";

export default {
  components: {
    TeamInfoFormComp,
  },
  data() {
    return {
      teamInfo: {},
    };
  },
  watch: {},
  methods: {
    setTeamInfo(eTeamInfo) {
      this.teamInfo = eTeamInfo;
    },
    async registerTeam() {
      // TODO 팀정보를 제대로 입력했는지 검증로직 추가 수정요망
      if (this.teamInfo == null || this.teamInfo == undefined) {
        alert("팀 정보를 입력해주세요.");
        return;
      }

      const params = this.teamInfo;

      try {
        const response = await teamApi.registerTeam(params);
        const { data } = response;
        console.log(data);
        alert("팀이 정상적으로 등록됐습니다.");
        this.$router.push({ name: "MyTeamListPage" });
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped></style>
