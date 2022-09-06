<template>
  <v-container>
    <h1>소속팀 목록</h1>
    <MyTeamComp
      v-for="(team, index) in teamList"
      :key="index"
      v-bind:teamInfo="team"
    />
  </v-container>
</template>

<script>
// Vue lifeCycle 에 관하여
// https://wormwlrm.github.io/2018/12/29/Understanding-Vue-Lifecycle-hooks.html
import MyTeamApi from "@/api/MyTeamAPI";
import MyTeamComp from "@/components/myTeam/MyTeamComp.vue";

export default {
  data: () => {
    return {
      teamList: [],
    };
  },
  components: {
    MyTeamComp,
  },
  methods: {
    async load() {
      // 비동기적인 console.log 처리로 인해 발생하는 현상
      // https://kkangdda.tistory.com/81
      try {
        const list = await MyTeamApi.searchTeams();
        list.data.forEach((element) => {
          this.teamList.push(element);
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.load();
  },
};
</script>

<style></style>
