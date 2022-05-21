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
                    {{prevPassword}}
                  </v-text-field>
              </v-col>
          </v-row>
          <v-row>
              <v-col>새 비밀번호</v-col>
              <v-col>
                  <v-text-field v-model="curPassword" solo>
                      {{curPassword}}
                  </v-text-field>
              </v-col>
          </v-row>
          <v-row>
              <v-col>새 비밀번호 확인</v-col>
              <v-col>
                  <v-text-field solo>
                      {{curPassword}}
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
export default {
    data: ()=>{
        return {
            prevPassword:'',
            curPassword:'',
        }
    }
}
</script>

<style>

</style>