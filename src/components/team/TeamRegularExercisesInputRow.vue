<template>
	<tr :data-id="pRowIndex">
		<td>
			<WeekdaySelectbox 
				:pInitVal="this.dayOfTheWeekCode"
				@select-value="this.setDayOfTheWeekCode"
			/>
		</td>
		<td>
			<GameTimeStartSelectbox pLabelName="시작"
				:pInitVal="this.startTime"
				@select-value="this.setDayOfTheWeekCode"
			/>
		</td>
		<td>
			<GameTimeEndSelectbox pLabelName="종료"
				:pInitVal="this.endTime"
				@select-value="this.setDayOfTheWeekCode"
			/>
		</td>
		<td>
			<ExercisePlaceNameTextInput
				:pData="this.exercisePlaceName"
				@compliance="this.setExercisePlaceName"
			/>
		</td>
		<td>
			<TeamExercisePlaceAddressInput 
				:pData="{ 
					'address' : this.exercisePlaceAddress, 
					'sidoCode' : this.sidoCode,
					'sigunguCode' : this.sigunguCode,
				}"
				@compliance="this.setExercisePlaceAddress"
			/>
		</td>
		<td>
			<v-btn
				@click="deleteExerciseTime()"
				color="red"
				outlined
				small
			>
				<v-icon>mdi-minus</v-icon>
			</v-btn>
		</td>
	</tr>
</template>

<script>
	/** Backend API */
	/** Code */
	/** Utils */
	import ValidationUtil from '@/common/util/ValidationUtil';

	/** Components */
	import WeekdaySelectbox from '@/components/selectbox/WeekdaySelectbox.vue';
	import GameTimeStartSelectbox from '@/components/selectbox/game/GameTimeSelectbox.vue'; 
	import GameTimeEndSelectbox from '@/components/selectbox/game/GameTimeSelectbox.vue'; 

	import ExercisePlaceNameTextInput from '@/components/input/FrameTextFieldInput.vue';
	import TeamExercisePlaceAddressInput from '@/components/input/AddressInput.vue';

	/** Emit Event */


	export default {
		components: {
			WeekdaySelectbox,
			GameTimeStartSelectbox,
			GameTimeEndSelectbox,
			ExercisePlaceNameTextInput,
            TeamExercisePlaceAddressInput,
		},
		props: {
			pRowIndex : Number,
			pData : Object,
		},
		data() {
			const initData = ValidationUtil.isNull( this.pData ) ? {
				dayOfTheWeekCode		: "",
				startTime				: "",
				endTime					: "",
				exercisePlaceName		: "",
				exercisePlaceAddress	: "",
				sidoCode				: "",
				sigunguCode				: "",
			} : this.pData;
			return {
				dayOfTheWeekCode 		: initData.dayOfTheWeekCode ,
				startTime 				: initData.startTime ,
				endTime 				: initData.endTime ,
				exercisePlaceName		: initData.exercisePlaceName ,
				exercisePlaceAddress 	: initData.exercisePlaceAddress ,
				sidoCode 				: initData.sidoCode ,
				sigunguCode 			: initData.sigunguCode ,
			};
		},
		methods: {
			deleteExerciseTime() {
				this.$emit('deleteRow', { rowIndex : this.pRowIndex } );
			},
			setDayOfTheWeekCode( value ) {
				this.dayOfTheWeekCode = value;
			},
			setStartTime( value ) {
				this.startTime = value;
			},
			setEndTime( value ) {
				this.endTime = value;
			},
			setExercisePlaceName( value ) {
				this.exercisePlaceName = value;
			},
			setExercisePlaceAddress( data ) {
				this.exercisePlaceAddress	= data.address;
				this.sidoCode				= data.sidoCode;
				this.sigunguCode			= data.sigunguCode;
			},
		},
	};
</script>

<style lang="scss" scoped></style>
