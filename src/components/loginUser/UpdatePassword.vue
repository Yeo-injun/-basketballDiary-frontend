<template>
  <v-container>
      <h1>
          테스트
      </h1>
      <v-card>
          <v-row>
              <v-col>현재 비밀번호</v-col>
              <v-col>
                  <v-text-field v-model="prevPassword" solo>
                  </v-text-field>
              </v-col>
          </v-row>
          <v-row>
              <v-col>새 비밀번호</v-col>
              <v-col>
                  <v-text-field v-model="curPassword" solo>
                  </v-text-field>
              </v-col>
          </v-row>
          <v-row>
              <v-col>새 비밀번호 확인</v-col>
              <v-col>
                  <v-text-field v-model="checkPassword" solo>
                  </v-text-field>
              </v-col>
          </v-row>
          <v-row justify="end">
            <v-btn class="float-right" @click="update()">변경</v-btn>
            <v-btn class="float-right" @click="cancel()">취소</v-btn>
          </v-row>
      </v-card>
  </v-container>
</template>

<script>
import myProfileAPI from '@/api/AuthUserAPI';

export default {
    data: ()=>{
        return {
            prevPassword:'',
            curPassword:'',
            checkPassword:''
        }
    },
    methods:{
        async update(){
            const params={
                prevPassword : this.prevPassword,
                curPassword : this.curPassword,
                checkPassword : this.checkPassword
            };
            const password = (await myProfileAPI.getMyInfo()).data.password;
            console.log(password+" " + this.prevPassword+" "+this.curPassword+" "+this.checkPassword);
            
            if((password!=this.prevPassword) || (this.curPassword!=this.checkPassword)){
                alert("입력하신 비밀번호가 일치하지 않습니다.");
                return;
            }
            const res = await myProfileAPI.updatePassword(params);
            console.log(res);
        },
        cancel(){

        },
    }
}
</script>

<style>

</style>