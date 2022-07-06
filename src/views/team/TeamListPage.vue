<template>
    <v-container>
        <v-card>
            <v-card-title>농구팀 검색</v-card-title>
            <v-card-subtitle>
                <v-text-field 
                label="팀명" 
                v-model="teamName"/>
                <v-row>
                    <v-col> <!-- 정기운동 : 요일 --> 
                        <v-row>
                            <v-col>
                                <v-card-title>
                                정기운동요일
                                </v-card-title>       
                            </v-col>
                            <v-col>
                                <v-select
                                v-model="startDay"
                                :items="daysOfTheWeek"
                                item-text="text"
                                item-value="value"
                                @change="validateDay"
                                label="시작요일"
                                ></v-select>        
                            </v-col>
                            <v-col>
                                <v-select
                                v-model="endDay"
                                :items="daysOfTheWeek"
                                item-text="text"
                                item-value="value"
                                @change="validateDay"
                                label="끝요일"
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col> <!-- 정기운동 : 시간 --> 
                        <v-row>
                            <v-col>
                                <v-card-title>
                                정기운동시간
                                </v-card-title>       
                            </v-col>
                            <v-col>
                                <v-select
                                v-model="startTime"
                                :items="times"
                                @change="validateTime"
                                label="시작시간"
                                ></v-select>
                            </v-col>
                            <v-col>
                                <v-select
                                v-model="endTime"
                                :items="times"
                                @change="validateTime"
                                label="끝시간"
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            
                <v-row
                justify="end">
                    <v-btn
                    class="mb-2 mr-2"
                    width="100"
                    @click="clickSearchButton">
                    검색
                    </v-btn>

                </v-row>
            </v-card-subtitle>
        </v-card>   <!--// 농구팀 검색 -->

        <!-- 팀목록 : TODO 팀정보 컴포넌트 만들기 -->
        <v-card>
            <v-card-title>팀목록</v-card-title>
            <v-card-subtitle>
                <v-card
                v-for="(item, index) in teamList" 
                :key="index">
                    <v-card-title>
                        {{ item.teamName }}
                    </v-card-title>
                    <v-row>
                        <v-col
                        cols="4">{{ item.teamImagePath }}</v-col>
                        <v-col
                        cols="8">
                            <v-row>
                                <v-col>{{ `창단일 : ${item.foundationYmd}` }}</v-col>
                                <v-col>{{ `인원수 : ${item.totMember}명` }}</v-col>
                                <v-col>{{ `연고지 : ${item.hometown}` }}</v-col>
                            </v-row>
                            <v-card>
                                <v-card-subtitle>정기운동일정</v-card-subtitle>
                                <v-card
                                v-for="(exercise, index) in item.teamRegularExercisesList"
                                :key="index">

                                    <v-row>
                                        <v-col>{{ exercise.dayOfTheWeekCode }}</v-col>
                                        <v-col>{{ `${exercise.startTime} ~ ${exercise.endTime}` }}</v-col>
                                        <v-col>{{ exercise.exercisePlaceName }}</v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>{{ exercise.exercisePlaceAddress }}</v-col>
                                    </v-row>
                                </v-card>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>
            </v-card-subtitle>
        </v-card>
    </v-container>
</template>

<script>
import CodeUtil from '@/common/CodeUtil.js';
import teamApi from '@/api/TeamAPI.js';

    export default {
        data() {
            return {
                teamName: "",
                startDay : "",
                endDay : "",
                startTime: "",
                endTime: "",
                daysOfTheWeek : CodeUtil.getDaysOfTheWeek(),
                times: CodeUtil.getExerciseTimes(30),
                teamList : [],
            }
        },
        methods: {
            validateDay() {
                const startDay = Number(this.startDay);
                const endDay = Number(this.endDay);
                if (isFasterStartThanEnd(startDay, endDay)) {
                    return;
                }
                alert("끝요일은 시작요일보다 빠를 수 없습니다.");
            },
            validateTime() {
                const startTime = Number(this.startTime.replace(":", ""));
                const endTime = Number(this.endTime.replace(":", ""));
                if (isFasterStartThanEnd(startTime, endTime)) {
                    return;
                }
                alert("끝시간은 시작시간보다 빠를 수 없습니다.");
            },
            clickSearchButton(e) {
                console.log(e);
                const params = {
                    "team-name" : this.teamName,
                    "start-day" : this.startDay,
                    "end-day" : this.endDay,
                    "start-time" : this.startTime,
                    "end-time" : this.endTime,
                    // "sigungu" : this.sigungu,
                }
                this.getTeamList(params);
            },
            async getTeamList(params) {
                try {
                    const res = await teamApi.searchTeamList(params);
                    this.teamList = res.data;
                } catch(e) {
                    console.log(e);
                }
            }
        },
        mounted (){
            this.getTeamList();
        },
    }

    function isFasterStartThanEnd(start, end) {
        if (start == 0) {
            return true;
        }
        if (end == 0) {
            return true;
        }
        const isFasterStart = (start - end) <= 0;
        if (isFasterStart) {
            return true;
        }
    }

</script>

<style lang="scss" scoped>

</style>