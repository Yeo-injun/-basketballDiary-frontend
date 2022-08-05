<template>
  <v-container>
    <h1>소속팀 목록</h1>
    <MyTeam 
    v-for="(team,index) in teamList" :key="index" 
    v-bind:teamInfo="team"/>
  </v-container>
</template>

<script>
// Vue lifeCycle 에 관하여
// https://wormwlrm.github.io/2018/12/29/Understanding-Vue-Lifecycle-hooks.html
import MyTeamApi from '@/api/MyTeamAPI'
import MyTeam from '@/components/myTeam/MyTeam.vue';

export default {
  data: ()=>{
    return {
      teamList: []
    }
  },
  components:{
    MyTeam
  },
  methods:{
    async load() {
      // 비동기적인 console.log 처리로 인해 발생하는 현상
      // https://kkangdda.tistory.com/81
      try{
        const list = await MyTeamApi.searchTeams();
        list.data.forEach(element => {
          this.teamList.push(element);
        });
      }catch(error) {
        console.log(error);
      }      
    }
  },
  mounted () {
    this.load();
  }
}
</script>

<style>

</style>