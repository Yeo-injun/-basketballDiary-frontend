<template>
  <v-container>
        <div>
            내가 속한 소속팀 보여주기 
            {{ tempData }}
        </div>
        <v-btn v-on:click="getJoinRequestsTo">가입요청목록 가져오기</v-btn>
  </v-container>
</template>

<script>
import authUserApi from '@/api/AuthUserAPI';
// import axios from 'axios';


export default {
    data : () => {
        return {
            tempData : '요청전',
        }
    },
    methods: {
        async getJoinRequestsTo() {
            await authUserApi.getJoinRequestsTo()
            // await axios.get(
            //         "http://127.0.0.1:8080/api/loginUser/joinRequestsTo",
            //         { withCredentials : true },
            //     )
                    .then((res) => {
                        console.log(res);
                        this.tempData(res);
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