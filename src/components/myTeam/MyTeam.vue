<template>
  <v-container>
      <h1>소속팀 목록</h1>
      <!-- Error :  Avoid using non-primitive value as key, use string/number value instead. -->
      <!-- 해결법 : https://crispypotato.tistory.com/33 -->
      <v-card class="mt-10">    
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
              팀이름: {{teamInfo.teamName}}
            </v-col>
            <v-col>
              연고지: {{teamInfo.hometown}}
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
        <v-col>
          <span>Ratels는 벌꿀오소리 처럼 상대를 가리지 않고 모든 경기에 열정을 다합니다.20대 초반부터 30대 중반까지로 선수층이 이뤄져 있습니다.</span>
          <!-- <v-btn class="float-right" to="myTeam">상세보기</v-btn> -->
          <router-link :to="{name: 'MyTeamTab', params:{teamSeq: teamInfo.teamSeq}}"><v-btn>상세보기</v-btn></router-link>
        </v-col>                
      </v-card>      
  </v-container>
</template>

<script>
export default {
    data:()=>{
        return {

        }
    },
    props:['teamInfo']
}
</script>

<style>

</style>