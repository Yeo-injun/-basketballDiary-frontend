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

        <template v-slot:item="{ item }">
            <TeamRegularExercisesInputRow
				:pData="item"
				@update-row="updateRow"
				@delete-row="deleteRow"
			/>
        </template>
    </v-data-table>
</template>

<script>
	/** Backend API */
	/** Code */
	/** Utils */
	import ValidationUtil from '@/common/util/ValidationUtil.js';
	import ArrayUtil from '@/common/util/ArrayUtil.js'
	
	/** Components */
	import TeamRegularExercisesInputRow from '@/components/team/TeamRegularExercisesInputRowNew.vue';

	/** Emit Event */
	export default {
		components: {
			TeamRegularExercisesInputRow,
		},
		props: {
			pData : Array,
		},
		data() {
			const exerciseTimes = ValidationUtil.isNull( this.pData ) 
									? [ this.createExerciseTime() ] 
									: this.pData.forEach( item => item.rowId = this.createRowId() );
			return {
				/*---------------------------
				 * 헤더 정보 
				 *---------------------------*/
				headers: [
					{ text: '요일'    , value: 'dayOfTheWeekCode'     , width: '10%',   },
					{ text: '시작시간', value: 'startTime'            , sorted : false , width: '15%',    },
					{ text: '종료시간', value: 'endTime'              , sorted : false , width: '15%' },
					{ text: '경기장'  , value: 'exercisePlaceName'    , sorted : false , },
					{ text: '주소'    , value: 'exercisePlaceAddress' , sorted : false , width: '30%', },
                    { text: '삭제'    , align: 'center' },
				],
				/*---------------------------
				 * 목록 정보 
				 *---------------------------*/
				 rows: exerciseTimes,
			};
		},
		methods: {
			getValue() {
				// TODO v-for 반복문으로 생성된 컴포넌트를 참조하는 방법 확인
				// const rows = this.$refs.inputRow;
				return this.rows;
			},
			createRowId() {
				return 'R' + String( Date.now() ) + '_' + String( Math.floor( Math.random() * 10000 ) ); 
			},
			/** 팀정기운동 목록 */
			createExerciseTime() {
				return {
					rowId					: this.createRowId(),
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
			updateRow( rowInfo ) {
				const updateTarget = ArrayUtil.findItemById( this.rows, rowInfo, 'rowId' );
				updateTarget.dayOfTheWeekCode		= rowInfo.dayOfTheWeekCode;
				updateTarget.startTime				= rowInfo.startTime;
				updateTarget.endTime				= rowInfo.endTime;
				updateTarget.exercisePlaceName		= rowInfo.exercisePlaceName;
				updateTarget.exercisePlaceAddress	= rowInfo.exercisePlaceAddress;
				updateTarget.sidoCode				= rowInfo.sidoCode;
				updateTarget.sigunguCode			= rowInfo.sigunguCode;
			},
			deleteRow( rowIndex ) {
				const isRemainOneExercise = this.rows.length <= 1;
				if (isRemainOneExercise) {
					alert('삭제할 수 있는 정기 운동시간이 없습니다.');
					return;
				}
				this.rows = ArrayUtil.deleteItem( this.rows, 'rowId', rowIndex );
			},
		},
	};
</script>

<style lang="scss" scoped></style>
