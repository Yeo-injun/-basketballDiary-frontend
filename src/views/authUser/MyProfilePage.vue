<template>
  <div>
    <v-tabs centered v-model="tab">
      <v-tab v-for="title in tabTitles" :key="title">
        {{ title }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(title, idx) in tabTitles" :key="title">
        <TeamJoinManageTab v-if="idx == 0" />
        <MyProfileUpdateTab v-if="idx == 1" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import TeamJoinManageTab from "@/components/authUser/tab/TeamJoinManageTab.vue";
import MyProfileUpdateTab from "@/components/authUser/tab/MyProfileUpdateTab.vue";

export default {
  components: {
    TeamJoinManageTab,
    MyProfileUpdateTab,
  },
  data: () => {
    return {
      tab: null,
      tabTitles: ["팀가입관리", "내정보수정"],
    };
  },
  methods: {
    init() {},
  },
  mounted() {
    this.init();
  },
};
</script>

<style></style>
