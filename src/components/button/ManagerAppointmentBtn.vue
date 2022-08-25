<template>
  <v-btn color="black white--text" small @click="appointManager()">
    임원임명
  </v-btn>
</template>

<script>
import myTeamApi from "@/api/MyTeamAPI.js";

export default {
  props: {
    pTeamSeq: Number,
    pTeamMemberSeq: Number,
  },
  methods: {
    async appointManager() {
      const params = {
        teamSeq: this.pTeamSeq,
        teamMemberSeq: this.pTeamMemberSeq,
      };
      try {
        const res = await myTeamApi.appointManager(params);
        if (res.status == "200") {
          alert("관리자로 변경되었습니다.");
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
