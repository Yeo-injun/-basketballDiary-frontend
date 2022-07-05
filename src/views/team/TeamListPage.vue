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
                

                <!-- <v-btn
                @click="clickSearchButton">
                검색
                </v-btn> -->
            </v-card-subtitle>
            
        </v-card>   <!--// 농구팀 검색 -->
    </v-container>
</template>

<script>
import CodeUtil from '@/common/CodeUtil.js';

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
        }
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