<template>
  <v-container>
      <h1>소속팀 목록</h1>
      <!-- Error :  Avoid using non-primitive value as key, use string/number value instead. -->
      <!-- 해결법 : https://crispypotato.tistory.com/33 -->
      <v-card class="mt-10" v-for="(team,index) in teamList" v-bind:key="index">        
        <v-row class="mb-5">
          <v-col align-self="center" md="3">
            <v-img
              class="ml-10"
              lazy-src="https://picsum.photos/id/11/10/6"
              max-height="150"
              max-width="250"
              src="https://picsum.photos/id/11/500/300"
            ></v-img>
          </v-col>
          <v-col>
            <v-row>
            <v-col>
              팀이름: {{team.teamName}}
            </v-col>
            <v-col>
              연고지: {{team.hometown}}
            </v-col>
            </v-row>
            <v-row>
            <v-col>
              회원수:
            </v-col>
            <v-col>
              창단일:
            </v-col>
          </v-row>       
          <v-row>
            <v-col>
              정기운동 시간/장소:
            </v-col>            
          </v-row>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-col>
          <span>Ratels는 벌꿀오소리 처럼 상대를 가리지 않고 모든 경기에 열정을 다합니다.20대 초반부터 30대 중반까지로 선수층이 이뤄져 있습니다.</span>
          <v-btn class="float-right" to="myTeam/members">상세보기</v-btn>
        </v-col>        
      </v-card>      
      <!-- <v-btn v-on:click="load">버튼</v-btn> -->
  </v-container>
</template>

<script>
// Vue lifeCycle 에 관하여
// https://wormwlrm.github.io/2018/12/29/Understanding-Vue-Lifecycle-hooks.html
import { myTeamApi } from '@/api/MyTeamAPI'


export default {
  data: ()=>{
    return {
      teamList: []
    }
  },
  methods:{
    async load(){
      const param = {
        userSeq: 3,
      }
      // 비동기적인 console.log 처리로 인해 발생하는 현상
      // https://kkangdda.tistory.com/81
      try{
        const list = await myTeamApi.searchTeams(param);
        list.data.forEach(element => {
          this.teamList.push(element);
        });
      }catch(error){
        console.log(error);
      }      
    }
  },
  mounted () {
    // this.$nextTick(this.load());
    this.load();
  }
}
</script>

<style>

</style>