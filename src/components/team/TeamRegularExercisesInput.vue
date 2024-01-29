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
            <TeamRegularExercisesInputRow 
				:pRowIndex="index"
				:pData="item"
			/>
        </template>
    </v-data-table>
</template>

<script>
	import TeamRegularExercisesInputRow from './TeamRegularExercisesInputRow.vue';
	export default {
		components: {
			TeamRegularExercisesInputRow,
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
				headers: [
					{ text: '요일'    , value: 'dayOfTheWeekCode'     , width: '10%',   },
					{ text: '시작시간', value: 'startTime'            , sorted : false , width: '15%',    },
					{ text: '종료시간', value: 'endTime'              , sorted : false , width: '15%' },
					{ text: '경기장'  , value: 'exercisePlaceName'    , sorted : false , },
					{ text: '주소'    , value: 'exercisePlaceAddress' , sorted : false , width: '30%', },
                    { text: '삭제'    , align: 'center' },
				],
			};
		},
		methods: {
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
