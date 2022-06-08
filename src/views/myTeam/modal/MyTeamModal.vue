<template>
    <div>
        <v-dialog v-model="dialog" width="500">
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    팀정보 수정
                </v-card-title>
            </v-card>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="4">팀명</v-col>
                        <v-col>
                            <v-text-field label="Main input" :rules="rules" hide-details="auto"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">연고지</v-col>
                        <v-col>
                            <v-autocomplete solo></v-autocomplete>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">창단일</v-col>
                        <v-col>
                            <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                :return-value.sync="date" transition="scale-transition" offset-y
                                min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="date" prepend-icon="mdi-calendar" readonly
                                        v-bind="attrs" v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="date" no-title scrollable locale="ko-kr">
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="menu = false">
                                        Cancel
                                    </v-btn>
                                    <v-btn text color="primary" @click="$refs.menu.save(date)">
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">정기운동시간</v-col>
                        <v-col cols="2">
                            <v-autocomplete :items="day" dense></v-autocomplete>
                        </v-col>
                        <v-col cols="2">
                            <v-autocomplete :items="time" dense></v-autocomplete>
                        </v-col>
                        <v-col cols="2">
                            <v-autocomplete :items="time" dense></v-autocomplete>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions>

            </v-card-actions>
        </v-dialog>
    </div>
</template>

<script>
    import myTeamApi from '@/api/MyTeamAPI';

    export default {
        props: {
            teamSeq: {
                type: Number,
                required: true
            }
        },
        components: {
        },
        //data: {} // Component끼리 data를 공유하면 안되므로 다음과 같이 사용하면 안됨.
        data: () => {
            return {
                teamInfo: {},
                date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                menu: false,
                modal: false,
                menu2: false,
                day: ['일', '월', '화', '수', '목', '금', '토',],
                time: ['0:00','1:00','2:00','3:00','4:00','5:00','6:00','7:00','8:00','9:00'
                ,'10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'
                ,'19:00','20:00','21:00','22:00','23:00',],
            }
        },
        methods: {
            async getTeamInfo() {
                try {
                    console.log(this.teamSeq);
                    var response = await myTeamApi.searchTeam(this.teamSeq);
                    const {data} = response;
                    this.teamInfo = data;
                } catch(e) {
                    console.log(e);
                }
                // .catch(function(error) {
                //     if(error.response) {
                //         console.log(error.response.data);
                //         console.log(error.response.status);
                //         console.log(error.response.headers);
                //     } else if(error.request) {
                //         console.log(error.request);
                //     } else {
                //         console.log(error.message);
                //     }
                // })
            },
            onLoad () {
                //this.getTeamInfo();
            }
        },
        mounted () {
            this.onLoad();
        }
    }
</script>

<style lang="scss" scoped>

</style>