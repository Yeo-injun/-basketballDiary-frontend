<template>
  <div>
    <v-chip label color="green" text-color="white">내정보</v-chip>
    <v-container>
      <v-card>
        <v-row>
          <v-col>이름 :</v-col>
          <v-col>
            <v-text-field v-model="userName" solo></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>이메일 :</v-col>
          <v-col>
            <v-text-field v-model="email" solo></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>성별 :</v-col>
          <v-col>
            <v-radio-group v-model="myinfo.gender">
              <v-radio label="남" value="M"></v-radio>
              <v-radio label="여" value="F"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row>
          <v-col>포지션 : </v-col>
          <v-col>
            <v-row>
              <v-radio-group v-model="myinfo.positionCode">
                <v-radio label="포인트 가드" value="10"></v-radio>
                <v-radio label="센터" value="20"></v-radio>
                <v-radio label="스몰포워드" value="30"></v-radio>
                <v-radio label="파워포워드" value="40"></v-radio>
                <v-radio label="슈팅가드" value="50"></v-radio>
              </v-radio-group>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col>키 : </v-col>
          <v-col cols="1">
            <v-text-field v-model="height" solo></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>몸무게 : </v-col>
          <v-col>
            <v-text-field v-model="weight" solo></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>주소 : </v-col>
          <v-col>
            <v-btn @click="showAPI()" solo>주소찾기</v-btn>
            <span
              >도로명주소<v-text-field v-model="roadAddress" solo></v-text-field
            ></span>
            <span
              >우편번호<v-text-field v-model="zoneCode" solo></v-text-field
            ></span>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn class="float-right" @click="save()">수정</v-btn>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-btn :to="{ name: 'PasswordUpdatePage' }">비밀번호 변경</v-btn>
          <v-btn :to="{ name: 'AccountSignOutPage' }">회원탈퇴</v-btn>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import myProfileApi from "@/api/AuthUserAPI";

export default {
  data: () => {
    return {
      myinfo: {},
      userName: "",
      email: "",
      gender: "",
      height: "",
      weight: "",
      roadAddress: "",
      zoneCode: "",
      sidoCode: "",
      sigunguCode: "",
    };
  },
  methods: {
    async load() {
      this.myinfo = (await myProfileApi.getMyInfo()).data;
      this.userName = this.myinfo.userName;
      this.email = this.myinfo.email;
      this.height = this.myinfo.height;
      this.weight = this.myinfo.weight;
      this.roadAddress = this.myinfo.roadAddress;
      this.zoneCode = this.myinfo.zonecode;
    },
    async save() {
      const params = {
        userName: this.userName,
        email: this.email,
        gender: this.myinfo.gender,
        height: this.height,
        weight: this.weight,
        sidoCode: this.sidoCode,
        sigunguCode: this.sigunguCode,
        positionCode: this.myinfo.positionCode,
        roadAddress: this.roadAddress,
        zoneCode: this.zoneCode,
      };
      const success = await myProfileApi.updateUser(params);
      console.log(success.status);
    },
    // kakao Address API 사용 설명 : https://chlost.tistory.com/53
    showAPI() {
      // 단, 왜 arrow function을 사용했을까?
      // 출처 : https://medium.com/@hozacho/vuejs%EC%97%90%EC%84%9C-arrow-function%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%B4%EC%95%BC%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-ec067c342412
      new window.daum.Postcode({
        oncomplete: (data) => {
          this.roadAddress = data.roadAddress;
          this.zoneCode = data.zonecode;
          this.sidoCode = data.sigunguCode.substring(0, 2);
          this.sigunguCode = data.sigunguCode;
          console.log(data);
        },
      }).open();
    },
  },
  mounted() {
    this.load();
  },
};
</script>

<style></style>
