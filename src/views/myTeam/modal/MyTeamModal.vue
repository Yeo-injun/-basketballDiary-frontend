<template>
    <v-dialog v-model="dialog" width="800">
        <v-card>
            <v-card-title class="text-h5 grey lighten-2">
                팀정보 수정
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="4">팀명</v-col>
                        <v-col>
                            <v-text-field :rules="rules" v-model="teamInfo.teamName" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">연고지</v-col>
                        <v-col>
                            <v-text-field :rules="rules" v-model="teamInfo.hometown" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">창단일</v-col>
                        <v-col>
                            <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                :return-value.sync="teamInfo.foundationYmd" transition="scale-transition" offset-y
                                min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="teamInfo.foundationYmd" prepend-icon="mdi-calendar" readonly
                                        v-bind="attrs" v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="teamInfo.foundationYmd" no-title scrollable locale="ko-kr">
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="menu = false">
                                        Cancel
                                    </v-btn>
                                    <v-btn text color="primary" @click="$refs.menu.save(teamInfo.foundationYmd)">
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">정기운동시간</v-col>
                        <v-col cols="2">
                            <v-autocomplete :items="day" dense />
                        </v-col>
                        <v-col cols="2">
                            <v-autocomplete :items="time" dense />
                        </v-col>
                        <v-col cols="2">
                            <v-autocomplete :items="time" dense />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">정기운동장소</v-col>
                        <v-text-field disabled />
                        <v-btn @click="showAPI()" solo>주소찾기</v-btn>
                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-btn color="blue darken-1" text @click.stop="dialog=false">
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import myTeamApi from '@/api/MyTeamAPI';
    export default {
        props: {
            value: {
                type: Boolean,
                required: true,
            },
            pTeamSeq: {
                type: Number,
                required: true
            },
        },
        computed: {
            dialog: {
                get() {
                    return this.value;
                },
                set(value) {
                    this.$emit('input', value);
                },
            },
        },
        methods: {
            async getTeamInfo() {
                try {
                    console.log(this.pTeamSeq);
                    var response = await myTeamApi.searchTeam(this.pTeamSeq);
                    const { data } = response;
                    this.teamInfo = data;
                    this.teamInfo.foundationYmd = data.foundationYmd.substr(0, 4) + "-"
                        + data.foundationYmd.substr(4, 2) + "-" + data.foundationYmd.substr(6, 2);
                    this.regularExerciseList = data.teamRegularExercisesList;
                } catch (e) {
                    console.log(e);
                }
            },
            showAPI() {
                // 단, 왜 arrow function을 사용했을까?
                // 출처 : https://medium.com/@hozacho/vuejs%EC%97%90%EC%84%9C-arrow-function%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%B4%EC%95%BC%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-ec067c342412
                new window.daum.Postcode({
                    oncomplete: (data) => {
                        console.log(data);
                    }
                }).open();
            },
            onLoad () {
                this.getTeamInfo();
            },
        },
        //data: {} // Component끼리 data를 공유하면 안되므로 다음과 같이 사용하면 안됨.
        data: () => {
            return {
                teamInfo: {},
                regularExerciseList: [],
                menu: false,
                day: ['일', '월', '화', '수', '목', '금', '토',],
                time: ['0:00','1:00','2:00','3:00','4:00','5:00','6:00','7:00','8:00','9:00'
                ,'10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'
                ,'19:00','20:00','21:00','22:00','23:00',],
                rules: [
                    str => !!str || '필수 입력사항입니다.',
                    str => (str && str.length >= 5) || '5자 이상 입력해야합니다.',
                ],
            }
        },
        mounted () {
            this.onLoad();
        }
    }
</script>

<style lang="scss" scoped>
</style>