<template>
  <v-container>
      <h1>개인 프로필</h1>
      <v-card class="mt-10">
          <v-row class="mb-5">
            <v-col>              
              <span>이름:</span>                   
            </v-col>
            <v-col>
              <v-text-field solo v-model="name"></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mb-5">
            <v-col>
              소속팀:
            </v-col>
            <v-col>
              <v-text-field solo v-model="teamName"></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mb-5">
            <v-col>
              등번호:
            </v-col>
            <v-col>
              <v-text-field solo v-model="backNumber"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
              <v-col>
                  <v-file-input
                    show-size
                    label="Select Image"
                    accept="image/*"
                    @change="selectImage"
                    ></v-file-input>
              </v-col>
              <v-col>
                  <v-btn position: absolute right bottom v-on:click="updateProfile">수정</v-btn>          
              </v-col>     
          </v-row>
      </v-card>      
      <v-card>
        <v-row>
          <v-col>비밀번호</v-col>
          <v-col>
              <v-text-field :type="'password'" solo></v-text-field><v-btn color="#FF0000">탈퇴</v-btn>
          </v-col>
        </v-row>
      </v-card>
  </v-container>
</template>

<script>
import MyTeamApi from '@/api/MyTeamAPI';
import UploadFile from '@/common/UploadFiles';

export default {
  data: ()=>{
    return {
        name: undefined,
        teamName: undefined,
        backNumber: undefined,
        image: undefined,
    }
  },
  props: {
    teamSeq: {
        type: Number,
        required: true
    }
  },
  methods: {
    async load(){
      //MyTeamMemberPage.vue 에서 teamSeq 를 재대로 props 로 내려주지를 못함...
      const response = await MyTeamApi.findMyTeamsProfile(this.teamSeq);
      console.log(response);
    },
    selectImage(image){
      this.image = image;
    },
    async updateProfile(){
    const teamSeq = 4;
    const formData = new FormData();

    formData.append("backNumber",this.backNumber);
    formData.append("imageFile",this.image);      
    
    try{
        const response = await UploadFile.upload(`/myTeams/${teamSeq}/profile`,formData);
        console.log("response: "+response);
    }catch(error){
        console.log(error);
    }
    
    }
  },
  mounted () {
    // this.load();
  }
}
</script>

<style>
</style>