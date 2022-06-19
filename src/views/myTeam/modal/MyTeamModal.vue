<template>
    <v-dialog v-model="dialog" width="1200">
        <v-card>
            <v-card-title class="text-h5 grey lighten-2">
                팀정보
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="2" align-self="center">
                            <v-input>팀명</v-input>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field :rules="rules" v-model="teamInfo.teamName" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="2">
                            <v-input>연고지</v-input>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field :rules="rules" v-model="teamInfo.hometown" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="2">
                            <v-input>창단일</v-input>
                        </v-col>
                        <v-col cols="4">
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
                        <v-data-table
                            :headers="headers"
                            :items="regularExerciseList"
                            hide-default-footer
                        >
                            <template v-slot:top>
                                <v-toolbar flat>
                                    <v-toolbar-title><v-input>정기운동시간</v-input></v-toolbar-title>
                                    <v-divider
                                    class="mx-4"
                                    inset
                                    vertical
                                    ></v-divider>
                                    <v-spacer></v-spacer>
                                    <v-btn fab dark small color="primary" @click="createExercise()"><v-icon dark>mdi-plus</v-icon></v-btn>
                                </v-toolbar>
                            </template>
                            
                            <template v-slot:item="{ item, index }">
                               <tr :data-id="index">
                                    <td><v-autocomplete :items="day" dense v-model="item.dayOfTheWeekCode"/></td>
                                    <td><v-autocomplete :items="time" dense v-model="item.startTime"/></td>
                                    <td><v-autocomplete :items="time" dense v-model="item.endTime"/></td>
                                    <td><v-text-field disabled v-model="item.exercisePlaceAddress"/></td>
                                    <td><v-btn color="secondary" x-small fab dark @click="showAPI(index)" ><v-icon>mdi-pencil</v-icon></v-btn></td>
                                    <td><v-text-field v-model="item.exercisePlaceName"/></td>
                                    <td><v-btn color="secondary" x-small dark fab @click="deleteExercise(index)"><v-icon>mdi-delete</v-icon></v-btn></td>
                                </tr>
                            </template>

                        </v-data-table>
                    </v-row>
                    <v-row>
                        <v-col cols="4">
                            <v-img contain 
                                src="https://picsum.photos/id/11/500/300"
                                lazy-src="https://picsum.photos/id/11/10/6"
                                max-width="250">
                            </v-img>
                        </v-col>
                        <v-col cols="8">
                            <v-textarea label="팀 소개" max-width="250" outlined v-model="teamInfo.introduction"></v-textarea>
                        </v-col>
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
                    var response = await myTeamApi.searchTeam(this.pTeamSeq);
                    let { data } = response;
                    this.teamInfo = data;
                    this.teamInfo.foundationYmd = data.foundationYmd.substr(0, 4) + "-"
                        + data.foundationYmd.substr(4, 2) + "-" + data.foundationYmd.substr(6, 2);

                    for(let i in data.teamRegularExercisesList) {
                        switch(data.teamRegularExercisesList[i].dayOfTheWeekCode) {
                        case '1': 
                            data.teamRegularExercisesList[i].dayOfTheWeekCode = '월'; break;
                        case '2': 
                            data.teamRegularExercisesList[i].dayOfTheWeekCode = '화'; break;
                        case '3': 
                            data.teamRegularExercisesList[i].dayOfTheWeekCode = '수'; break;
                        case '4': 
                            data.teamRegularExercisesList[i].dayOfTheWeekCode = '목'; break;
                        case '5': 
                            data.teamRegularExercisesList[i].dayOfTheWeekCode = '금'; break;
                        case '6': 
                            data.teamRegularExercisesList[i].dayOfTheWeekCode = '토'; break;
                        case '7': 
                            data.teamRegularExercisesList[i].dayOfTheWeekCode = '일'; break;
                        }
                        data.teamRegularExercisesList[i].startTime = 
                            data.teamRegularExercisesList[i].startTime.substr(0, 2) + ":" + data.teamRegularExercisesList[i].startTime.substr(2, 2);
                        data.teamRegularExercisesList[i].endTime = 
                            data.teamRegularExercisesList[i].endTime.substr(0, 2) + ":" + data.teamRegularExercisesList[i].endTime.substr(2, 2);
                    }

                    this.regularExerciseList = data.teamRegularExercisesList;

                } catch (e) {
                    console.log(e);
                }
            },
            showAPI(idx) {
                // 단, 왜 arrow function을 사용했을까?
                // 출처 : https://medium.com/@hozacho/vuejs%EC%97%90%EC%84%9C-arrow-function%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%B4%EC%95%BC%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-ec067c342412
                new window.daum.Postcode({
                    oncomplete: (data) => {
                        this.regularExerciseList[idx].exercisePlaceAddress = data.address;
                    }
                }).open();
            },
            createExercise() {
                this.regularExerciseList.push({});
            },
            deleteExercise(idx) {
                this.regularExerciseList.splice(idx, 1);
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
                time: ['0:00', '0:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', '5:30', '6:00',
                        '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', 
                        '12:30', '13:00', '13:30', '14:00','14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00',
                        '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'],
                rules: [
                    str => !!str || '필수 입력사항입니다.',
                    str => (str && str.length >= 5) || '5자 이상 입력해야합니다.',
                ],
                headers: [
                    {
                        text: '요일',
                        align: 'start',
                        sortable: false,
                        value: 'dayOfTheWeekCode',
                        width: '10%',
                    },
                    { text: '시작시간', value: 'startTime', sortable: false, width: '10%' },
                    { text: '종료시간', value: 'endTime', sortable: false, width: '10%' },
                    { text: '주소', value: 'exercisePlaceAddress', sortable: false, width: '30%' },
                    { text: '' },
                    { text: '경기장', value: 'exercisePlaceName', sortable: false },
                    { text: '삭제', align: 'center'},
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