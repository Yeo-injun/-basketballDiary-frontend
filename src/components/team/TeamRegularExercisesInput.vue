<template>
    <v-data-table
        :headers="headers"
        :items="value"
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
				:value="item"
				:pRowIndex="index"
				@input="inputExerciseTimeInfo"
				@delete-row="deleteExerciseTime( index )"
			/>
        </template>
    </v-data-table>
</template>

<script>
	/** Backend API */
	/** Code */
	/** Utils */
	
	/** Components */
	import TeamRegularExercisesInputRow from '@/components/team/TeamRegularExercisesInputRow.vue';

	/** Emit Event */
	export default {
		components: {
			TeamRegularExercisesInputRow,
		},
		props: {
			value : {},
		},
		data() {
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
			};
		},
		methods: {
			inputExerciseTimeInfo( value ) {
				console.log( ["inputExerciseTimeInfo", value ]);
				this.$emit( 'input', value );
			},
			/**
			 * 데이터는 상위컴포넌트에서 직접관리
			 * - 커스텀 이벤트를 발생시켜 상위컴포넌트에 처리위임
			 * - 데이터와 input의 값을 sync맞추기 위해서 ( 즉, 양방향 바인딩을 위해 ) v-model 혹은 :value,@input을 활용
			 */
			createExerciseTime() {
				this.$emit( 'create-row' );
			},
			deleteExerciseTime( rowIndex ) {
				const isRemainOneExercise = this.value.length <= 1;
				if (isRemainOneExercise) {
					alert('삭제할 수 있는 정기 운동시간이 없습니다.');
					return;
				}
				this.$emit( 'delete-row', rowIndex );
			},
		},
	};
</script>

<style lang="scss" scoped></style>
