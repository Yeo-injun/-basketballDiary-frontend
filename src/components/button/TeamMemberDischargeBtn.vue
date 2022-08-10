<template>
  <v-container>
    <v-btn color="red white--text" small @click="dischargeTeamMember()">
      강퇴하기
    </v-btn>
  </v-container>
</template>

<script>
import myTeamApi from "@/api/MyTeamAPI.js";

export default {
  props: {
    pTeamSeq: Number,
    pTeamMemberSeq: Number,
  },
  methods: {
    async dischargeTeamMember() {
      const params = {
        teamSeq: this.pTeamSeq,
        teamMemberSeq: this.pTeamMemberSeq,
      };
      try {
        const res = await myTeamApi.dischargeTeamMember(params);
        if (res.status == "200") {
          alert("강퇴 되었습니다.");
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
