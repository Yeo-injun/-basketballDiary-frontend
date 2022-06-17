<template>
    <div>
        <v-card>
            <v-card-title>가입요청한 선수 목록</v-card-title>
            <v-card-subtitle>
                <v-select
                v-model="filterCond"
                :items="filterConds"
                item-text="text"
                item-value="value"
                @change="searchJoinRequestPlayer"
                label="초대상태"
                ></v-select>
            </v-card-subtitle>
            <v-card-text>
                <v-data-table
                :headers="joinRequestPlayerHeader"
                :items="joinRequestPlayers"
                >
                </v-data-table>
            </v-card-text>
        </v-card>   <!--// 가입요청한 선수목록 -->
    </div>
</template>

<script>
import myTeamApi from '@/api/MyTeamAPI.js';

    export default {
        data() {
            return {
                filterCond: '',
                filterConds: [
                    {text : '전체', value: ''},
                    {text : '대기중', value: '01'},
                    {text : '거절', value: '03'},
                ],
                joinRequestPlayerHeader: [
                    { text: '초대일시', value: 'requestDate', sortable: false },
                    { text: '이름', value: 'name', sortable: false },
                    { text: '이메일', value: 'email', sortable: false },
                    { text: '포지션', value: 'positionCodeName', sortable: false },
                    { text: '키', value: 'height', sortable: false },
                    { text: '몸무게', value: 'weight', sortable: false },
                    { text: '초대상태', value: 'joinRequestStateCodeName', sortable: false },
                ],
                joinRequestPlayers: [],
            }
        },
        methods: {
            async searchJoinRequestPlayer() {
                // this를 어디서 호출하느냐에 따라서 지칭하는 대상이 달라짐.
                const filterCond = this.filterCond;
                const params = {
                    teamSeq: 3, // TODO 테스트용 화면에서 데이터 받아오기
                    state: filterCond,
                }
                try {
                    const res = await myTeamApi.searchJoinRequestPlayer(params);
                    this.joinRequestPlayers = res.data;
                } catch (e) {
                    console.log(e);
                }
            },
            async initLoad() {
                await this.searchJoinRequestPlayer();
            },
        },
        mounted (){
            this.initLoad();
        }
    }
</script>

<style lang="scss" scoped>

</style>