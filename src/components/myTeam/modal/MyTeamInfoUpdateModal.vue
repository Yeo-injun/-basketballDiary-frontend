<template>
  <v-dialog v-model="isActivate" width="1200">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2"> 팀정보 </v-card-title>

      <v-card-text>
        <TeamInfoFormComp :pTeamInfo="teamInfo" @e-team-info="setTeamInfo" />
      </v-card-text>

      <v-card-actions>
        <v-btn outlined depressed text @click.stop="isActivate = false">
          취소
        </v-btn>
        <v-btn color="primary" depressed @click="modifyTeamInfo()">
          저장
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import TeamInfoFormComp from "@/components/team/TeamInfoFormComp.vue";

import myTeamApi from "@/api/MyTeamAPI";

export default {
  components: {
    TeamInfoFormComp,
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    pTeamSeq: {
      type: Number,
      required: true,
    },
  },
  computed: {
    isActivate: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  data: () => {
    return {
      teamInfo: {},
    };
  },
  methods: {
    setTeamInfo(eTeamInfo) {
      this.teamInfo = eTeamInfo;
    },
    async getTeamInfo(teamSeq) {
      const response = await myTeamApi.searchTeam(teamSeq);
      this.teamInfo = response.data;
    },
    async modifyTeamInfo() {
      try {
        const paramJSON = this.teamInfo;
        await myTeamApi.modifyMyTeam(this.pTeamSeq, paramJSON);
        this.isActivate = false;
      } catch (e) {
        console.log(e);
      }
    },
    onInit() {
      const teamSeq = this.pTeamSeq;
      this.getTeamInfo(teamSeq);
    },
  },
  watch: {
    // 팝업창을 활성화 상태를 감지하여 데이터 호출
    // isActivate data를 감시하여 해당 데이터에 따라 콜백 함수 처리
    isActivate: function (isDialogOpend) {
      if (isDialogOpend) {
        // this.onInit();
      }
    },
  },
  // TODO 팝업창이 활성화될때 데이터 호출하는 구조로 변경하기...
  mounted() {
    this.onInit();
  },
};
</script>

<style lang="scss" scoped></style>
