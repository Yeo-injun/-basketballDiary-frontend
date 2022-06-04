<template>
  <v-container>
      <h1>개인 프로필</h1>
      <v-card class="mt-10">
          <v-row class="mb-5">
            <v-col>              
              <span>이름:</span>                   
            </v-col>
            <v-col>
              <v-input readonly></v-input>
            </v-col>
          </v-row>
          <v-row class="mb-5">
            <v-col>
              소속팀:
            </v-col>
            <v-col>
              <v-input readonly></v-input>
            </v-col>
          </v-row>
          <v-row class="mb-5">
            <v-col>
              등번호:
            </v-col>
            <v-col>
              <v-text-field solo ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-file-input
              show-size
              label="Select Image"
              accept="image/*"
              @change="selectImage"
            ></v-file-input>
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
import {myTeamApi} from '@/api/MyTeamAPI';

export default {
  data: ()=>{
    return {

    }
  },
  methods: {
    
  },
  mounted () {
  }
}
</script>

<style>
</style>