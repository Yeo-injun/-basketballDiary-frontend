<template>
  <div>
    <v-container>
      <v-card class="grey lighten-3">
        <v-row align="center">
          <v-col cols="2">
            <v-img
              max-height="100"
              max-width="100"
              class="ms-5"
              src="https://as2.ftcdn.net/v2/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
            />
          </v-col>
          <v-col cols="10">
            <v-row justify="space-between">
              <v-col>포지션: {{ pMyProfile.positionCode }}</v-col>
              <v-col>직책: {{ pMyProfile.teamAuthCode }}</v-col>
              <v-col>가입일: {{ pMyProfile.joinYmd }}</v-col>
            </v-row>
            <v-row justify="space-between">
              <v-col>
                <v-row>
                  <v-col>신장: {{ pMyProfile.height }}</v-col>
                  <v-col>체중: {{ pMyProfile.weight }}</v-col>
                </v-row>
              </v-col>
              <v-col>등번호: {{ pMyProfile.backNumber }}</v-col>
              <v-col>경기참여: {{ pMyProfile.totGame }}회</v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    pMyProfile: Object,
  },
};
</script>

<style lang="scss" scoped></style>
