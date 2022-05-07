<template>
  <v-container>
      <h1>개인 프로필</h1>
      <v-card class="mt-10">
          <v-row class="mb-5">
            <v-col>              
              <span>이름:</span>                   
            </v-col>
            <v-col>
              <v-input readonly>{{myinfo.userName}}</v-input>
            </v-col>
          </v-row>
          <v-row class="mb-5">
            <v-col>
              소속팀:
            </v-col>
            <v-col>
              <v-input readonly>{{myinfo.email}}</v-input>
            </v-col>
          </v-row>
          <v-row class="mb-5">
            <v-col>
              등번호:
            </v-col>
            <v-col>
              <v-text-field solo v-model="myinfo.birthYmd"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-img 
              class="ml-10"
              lazy-src="https://picsum.photos/id/11/10/6"
              max-height="150"
              max-width="250"
              src="https://picsum.photos/id/11/500/300">
            </v-img>
            <v-btn position: absolute right bottom v-on:click="setProfile">수정</v-btn>          
          </v-row>
      </v-card>
      
      <v-card>
        <v-row>
          <v-col>비밀번호</v-col>
          <v-col><v-text-field :type="'password'" solo></v-text-field></v-col>
          <v-col><v-btn color="#FF0000">탈퇴</v-btn></v-col>
        </v-row>
      </v-card>
  </v-container>
</template>

<script>
import {profileApi} from '@/api/MyProfile';

export default {
  data: ()=>{
    return {
      myinfo: {}
    }
  },
  methods: {
    async load () {
      const params = {
        userSeq: 3
      };
      try{
        const response = await profileApi.getMyProfile(params);
        this.myinfo = response.data;
      }catch(error){
        console.log(error);
      }
    },
    async setProfile(event){
      event.preventDefault();

      try{
        console.log(this.myinfo);
        const response = await profileApi.setMyProfile(this.myinfo);  //eslint-disable-line no-unused-vars
      }catch(error){
        console.log(error);
      }
    }
  },
  mounted () {
    this.load()
  }
}
</script>

<style>
</style>