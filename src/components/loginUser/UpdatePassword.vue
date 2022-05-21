<template>
  <v-container>
      <h1>
          테스트
      </h1>
      <v-card>
          <v-row>
              <v-col>현재 비밀번호</v-col>
              <v-col>
                  <v-text-field solo>

                  </v-text-field>
              </v-col>
          </v-row>
          <v-row>
              <v-col>새 비밀번호</v-col>
              <v-col>
                  <v-text-field solo>
                      
                  </v-text-field>
              </v-col>
          </v-row>
          <v-row>
              <v-col>새 비밀번호 확인</v-col>
              <v-col>
                  <v-text-field solo>
                      
                  </v-text-field>
              </v-col>
          </v-row>
          <v-row justify="end">
            <v-btn class="float-right">변경</v-btn>
            <v-btn class="float-right">취소</v-btn>
          </v-row>
      </v-card>
  </v-container>
</template>

<script>
export default {
    data: ()=>{
        return {
            
        }
    }
}
</script>

<style>

</style>