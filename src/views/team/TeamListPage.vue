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
                                label="시작요일"
                                ></v-select>        
                            </v-col>
                            <v-col>
                                <v-select
                                v-model="endDay"
                                :items="daysOfTheWeek"
                                item-text="text"
                                item-value="value"
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
                                :value="startTime"
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
                <v-container
                v-for="(item, index) in teamList" 
                :key="index">
                    <TeamComp
                    v-bind:pTeam="item"></TeamComp>
                </v-container>
            </v-card-subtitle>
        </v-card>
    </v-container>
</template>

<script>
import TeamComp from '@/components/team/TeamComp.vue';
import DateUtil from '@/common/DateUtil.js';
import teamApi from '@/api/TeamAPI.js';

    export default {
        components: {
            TeamComp,
        },
        data() {
            return {
                daysOfTheWeek : DateUtil.getDaysOfTheWeek(),
                times: DateUtil.getExerciseTimes(),
                teamName: "",
                startDay : DateUtil.getDaysOfTheWeek()[0].value,
                endDay : DateUtil.getDaysOfTheWeek()[6].value,
                startTime: DateUtil.getExerciseTimes()[0],
                endTime: DateUtil.getExerciseTimes()[DateUtil.getExerciseTimes().length - 1],
                teamList : [],
            }
        },
        watch: {
            // TODO 유효하지 않은 데이터가 들어올 경우 이전 데이터를 유지는 하지만
            // 화면에서는 이전 데이터로 보여지지 않음. v-select 태그를 더 연구해야 할듯.
            startDay: function(newValue, oldValue) {
                this.setStartDayOnSearchParam(newValue, oldValue);
                return false;
            },
            endDay: function(newValue, oldValue) {
                this.setEndDayOnSearchParam(newValue, oldValue);
                return false;
            }
        },
        methods: {
            setStartDayOnSearchParam(newValue, oldValue) {
                if (!this.validateDay()) {
                    this.startDay = oldValue;
                    return;
                }
                this.startDay = newValue;
            },
            setEndDayOnSearchParam(newValue, oldValue) {
                if (!this.validateDay()) {
                    this.endDay = oldValue;
                    return;
                }
                this.endDay = newValue;
            },
            validateDay() {
                const startDay = Number(this.startDay);
                const endDay = Number(this.endDay);
                if (isFasterStartThanEnd(startDay, endDay)) {
                    return true;
                }
                alert("끝요일은 시작요일보다 빠를 수 없습니다.");
                return false;
            },
            validateTime() {
                const startTime = Number(this.startTime.replace(":", ""));
                const endTime = Number(this.endTime.replace(":", ""));
                if (isFasterStartThanEnd(startTime, endTime)) {
                    return true;
                }
                alert("끝시간은 시작시간보다 빠를 수 없습니다.");
                return false;
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
        return false;
    }

</script>

<style lang="scss" scoped>

</style>