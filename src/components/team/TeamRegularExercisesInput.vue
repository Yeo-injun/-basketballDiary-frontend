<template>
    <v-data-table
        :headers="headers"
        :items="rows"
        hide-default-footer
    >
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>정기운동시간</v-toolbar-title>
                <v-divider class="mx-4" inset vertical />
                <v-btn
                    @click="addExerciseTime()"
                    small
                    color="primary"
                >
					<v-icon>mdi-plus</v-icon>
				</v-btn>
            </v-toolbar>
        </template>

        <template v-slot:item="{ item, index }">
            <TeamRegularExercisesInputRow 
				:value="item"
				:pRowIndex="index"
				@delete-row="deleteRow( index )"
			/>
        </template>
    </v-data-table>
</template>

<script>
	/** Backend API */
	/** Code */
	/** Utils */
	import ValidationUtil from '@/common/util/ValidationUtil.js';
	
	/** Components */
	import TeamRegularExercisesInputRow from '@/components/team/TeamRegularExercisesInputRow.vue';

	/** Emit Event */
	export default {
		components: {
			TeamRegularExercisesInputRow,
		},
		props: {
			pData : Array,
		},
		data() {
			const rows = ValidationUtil.isNull( this.pData ) ? [ this.createExerciseTime() ] : this.pData;
			return {
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
				rows: rows,
			};
		},
		methods: {
			getValue() {
				return this.rows;
			},
			/** 팀정기운동 목록 */
			createExerciseTime() {
				return {
					dayOfTheWeekCode		: "",
					startTime				: "",
					endTime					: "",
					exercisePlaceName		: "",
					exercisePlaceAddress	: "",
					sidoCode				: "",
					sigunguCode				: "",
				};
			},
			addExerciseTime() {
				this.rows.push( this.createExerciseTime() );
			},
			deleteRow( rowIndex ) {
				const isRemainOneExercise = this.rows.length <= 1;
				if (isRemainOneExercise) {
					alert('삭제할 수 있는 정기 운동시간이 없습니다.');
					return;
				}
				this.rows.splice( rowIndex, 1 );
			},
		},
	};
</script>

<style lang="scss" scoped></style>
