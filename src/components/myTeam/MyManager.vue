<template>
  <div>
    <v-container>
      <v-card class="grey lighten-3">
        <v-row align="center">
          <v-col cols="2">
            <v-img
              class="ms-5"
              max-height="50"
              max-width="50"
              src="https://as2.ftcdn.net/v2/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
            />
          </v-col>
          <v-col cols="10">
            <v-row justify="space-between">
              <v-col>
                <v-row>{{ data.teamAuthCode }}/{{ data.userName }}</v-row>
                <v-row>{{ data.birthYmd }}</v-row>
              </v-col>
              <v-col>신장: {{ data.height }}</v-col>
              <v-col>몸무게: {{ data.weight }}</v-col>
              <v-col>등번호: {{ data.backNumber }}</v-col>
              <v-col>
                <v-row> 가입일: {{ data.joinYmd }} </v-row>
                <v-row v-if="this.isLeader()">
                  <v-btn color="black white--text" small>임원 제명</v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import authUtil from "@/common/AuthUtil.js";

export default {
  props: {
    data: Object,
    pTeamSeq: String,
  },
  methods: {
    isLeader() {
      return authUtil.isLeader(this.pTeamSeq);
    },
  },
};
</script>

<style></style>
