<template>
    <v-data-table
        :headers="headers"
        :items="teamRegularExercises"
        hide-default-footer
    >
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>정기운동시간</v-toolbar-title>
                <v-divider class="mx-4" inset vertical />
                <v-btn
                    @click="createExerciseTime()"
                    small
                    color="primary"
                >
					<v-icon>mdi-plus</v-icon>
				</v-btn>
            </v-toolbar>
        </template>

        <template v-slot:item="{ item, index }">
            <tr :data-id="index">
                <td><v-autocomplete :items="days" v-model="item.dayOfTheWeekCode" /></td>
                <td><v-autocomplete :items="times" v-model="item.startTime" /></td>
                <td><v-autocomplete :items="times" v-model="item.endTime" /></td>
                <td>
					<ExercisePlaceNameTextInput
					@compliance="onInputExercisePlaceName"
					/>
				</td>
                <td>
					<TeamExercisePlaceAddressInput 
						:pData="{ 
							'address' : item.exercisePlaceAddress, 
							'sidoCode' : item.sidoCode,
							'sigunguCode' : item.sigunguCode,
						}"
						@compliance="onComplianceTeamExercisePlaceAddress"
					/>
				</td>
                <td>
                    <v-btn
                        @click="deleteExerciseTime(index)"
                        color="red"
                        outlined
                        small
                    >
						<v-icon>mdi-minus</v-icon>
					</v-btn>
                </td>
            </tr>
        </template>
    </v-data-table>
</template>

<script>
	import ExercisePlaceNameTextInput from '@/components/input/FrameTextFieldInput.vue';
	import TeamExercisePlaceAddressInput from '@/components/input/AddressInput.vue';

	import DateUtil from '@/common/DateUtil.js';


	export default {
		components: {
			ExercisePlaceNameTextInput,
            TeamExercisePlaceAddressInput,
		},
		props: {
			pData: Array,
		},
		data() {
			const hasPropsData = this.pData.length > 0;
			return {
				teamRegularExercises: hasPropsData ? this.pData : [{}],
				/*---------------------------
				 * 컴포넌트 메타 데이터 
				 *---------------------------*/
				days: DateUtil.TheWeek.getDayOptions(),
				times: DateUtil.Times.getOptions(),
				headers: [
					{ text: '요일'    , value: 'dayOfTheWeekCode'     , width: '10%',   },
					{ text: '시작시간', value: 'startTime'            , sorted : false , width: '10%',    },
					{ text: '종료시간', value: 'endTime'              , sorted : false , width: '10%' },
					{ text: '경기장'  , value: 'exercisePlaceName'    , sorted : false , },
					{ text: '주소'    , value: 'exercisePlaceAddress' , sorted : false , width: '30%', },
                    { text: '삭제'    , align: 'center' },
				],
			};
		},
		methods: {
			onInputExercisePlaceName( e ) {
				console.log([ 'onInputExercisePlaceName', e ] );
				console.log([ 'onInputExercisePlaceName', this.teamRegularExercises ] );
				// 주소 정보 할당하기
			},
			onComplianceTeamExercisePlaceAddress( e ) {
				console.log([ 'onComplianceTeamExercisePlaceAddress', e ] );
				console.log([ 'onComplianceTeamExercisePlaceAddress', this.teamRegularExercises[0] ] );
				// 주소 정보 할당하기
				this.$emit( 'change', this.teamRegularExercises );
			},
			createExerciseTime() {
				this.teamRegularExercises.push({});
			},
			deleteExerciseTime(idx) {
				const isRemainOneExercise = this.teamRegularExercises.length == 1;
				if (isRemainOneExercise) {
					alert('삭제할 수 있는 정기 운동시간이 없습니다.');
					return;
				}
				this.teamRegularExercises.splice(idx, 1);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
