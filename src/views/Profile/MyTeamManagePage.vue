<template>
  <v-container>
        <div>
            내가 속한 소속팀 보여주기 
            {{ tempData }}
        </div>
        <v-btn v-on:click="getJoinRequestsTo">가입요청목록 가져오기</v-btn>
        <MemberManageModal/>
  </v-container>
</template>

<script>
import authUserApi from '@/api/AuthUserAPI';
import MemberManageModal from '@/views/myTeam/modal/MemberManageModal.vue';

export default {
    components : {
        MemberManageModal,
    },
    data : () => {
        return {
            tempData : '요청전',
        }
    },
    methods: {
        async getJoinRequestsTo() {
            await authUserApi.getJoinRequestsTo()
                    .then((res) => {
                        console.log(res);
                        this.tempData = res;
                        console.log(this);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
        }
    }
}
</script>

<style>

</style>