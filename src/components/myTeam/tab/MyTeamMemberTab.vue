<template>
  <div>
    <v-container class="px-15">
      <div class="d-flex">
        <v-subheader>개인프로필</v-subheader>

        <v-btn color="black white--text" small @click.stop="teamProfile = true">
          프로필 수정
        </v-btn>
        <MyTeamProfileModal
          :pTeamSeq="pTeamSeq"
          :value="teamProfile"
          @input="teamProfile = $event"
        />

        <v-btn
          v-if="this.isManager()"
          color="black white--text"
          small
          @click.stop="dialog = true"
        >
          팀정보 수정
        </v-btn>
        <MyTeamInfoModal
          v-model="dialog"
          @input="dialog = $event"
          :pTeamSeq="pTeamSeq"
        />
      </div>
      <MyProfile :pMyProfile="profile" />

      <v-subheader>운영진</v-subheader>
      <div v-for="(manager, index) in managerList" v-bind:key="index">
        <MyManager :pTeamManager="manager" :pTeamSeq="pTeamSeq" />
      </div>

      <div class="d-flex">
        <v-subheader>팀원 목록</v-subheader>
        <v-btn
          @click="clickAddTeamMember"
          class="ml-auto"
          small
          color="black white--text"
        >
          팀원 추가
        </v-btn>
      </div>
      <div v-for="(member, index) in teamMembers" v-bind:key="'A' + index">
        <MyMember :pTeamMember="member" :pTeamSeq="pTeamSeq" />
      </div>
      <div class="text-center">
        <v-pagination
          v-model="pager.pageNo"
          :length="pager.totalPageCount"
          @input="handlePage"
        />
      </div>
    </v-container>
  </div>
</template>

<script>
import authUtil from "@/common/AuthUtil.js";

import myTeamApi from "@/api/MyTeamAPI";
import MyProfile from "@/components/myTeam/MyProfile.vue";
import MyManager from "@/components/myTeam/MyManager.vue";
import MyMember from "@/components/myTeam/MyMember.vue";
import MyTeamInfoModal from "@/components/myTeam/modal/MyTeamInfoModal.vue";
import MyTeamProfileModal from "@/components/myTeam/modal/MyTeamProfileModal.vue";

export default {
  //data: {} // Component끼리 data를 공유하면 안되므로 다음과 같이 사용하면 안됨.
  data: () => {
    return {
      profile: {},
      managerList: [],
      teamMembers: [],
      teamInfo: {},
      dialog: false,
      teamProfile: false,
      pager: {
        pageNo: 1,
        totalCount: 0,
        totalPageCount: 1,
      },
    };
  },
  props: {
    pTeamSeq: {
      type: Number,
      required: true,
    },
  },
  components: {
    MyProfile,
    MyManager,
    MyMember,
    // eslint-disable-next-line
    MyTeamInfoModal,
    MyTeamProfileModal,
  },
  methods: {
    async onLoad() {
      try {
        // TODO 새로고침시 props값이 날라가는 것을 제어해야함...(제어할 수 있는지 검토 필요)
        await this.getProflie();
        await this.getListManager();
        await this.getListMember();
      } catch (e) {
        console.log("에러 났습니다.");
      }
    },
    async getProflie() {
      try {
        var response = await myTeamApi.findMyTeamsProfile(this.pTeamSeq);
        const { data } = response;
        this.profile = data;
      } catch (e) {
        console.log(e);
      }
    },
    async getListManager() {
      try {
        var response = await myTeamApi.searchManagers(this.pTeamSeq);
        const { data } = response;
        this.managerList = data;
      } catch (e) {
        console.log(e);
      }
    },
    async getListMember() {
      try {
        const response = await myTeamApi.searchMembers(
          this.pTeamSeq,
          this.pager.pageNo - 1
        );
        const { data } = response;
        this.teamMembers = data.teamMembers;
        this.pager = data.pager;
      } catch (e) {
        console.log(e);
      }
    },
    clickAddTeamMember() {
      const teamSeq = this.pTeamSeq;
      this.$router.push({
        name: "MyTeamMemberManagePage",
        params: { pTeamSeq: teamSeq },
      });
    },
    handlePage() {
      this.getListMember();
    },
    isManager() {
      return authUtil.isManager(this.pTeamSeq);
    },
    isLeader() {
      return authUtil.isLeader(this.pTeamSeq);
    },
  },
  mounted() {
    this.onLoad();
  },
};
</script>

<style lang="scss" scoped></style>
