<template>
	<tr :data-id="pRowIndex">
		<td>
			<WeekdaySelectbox 
				:pInitVal="this.pData.dayOfTheWeekCode"
				@select-value="this.setDayOfTheWeekCode"
			/>
		</td>
		<td>
			<GameTimeStartSelectbox pLabelName="시작"
				:pInitVal="this.pData.startTime"
				@select-value="this.setDayOfTheWeekCode"
			/>
		</td>
		<td>
			<GameTimeEndSelectbox pLabelName="종료"
				:pInitVal="this.pData.endTime"
				@select-value="this.setDayOfTheWeekCode"
			/>
		</td>
		<td>
			<ExercisePlaceNameTextInput
				:pData="this.pData.exercisePlaceName"
				@compliance="this.setExercisePlaceName"
			/>
		</td>
		<td>
			<TeamExercisePlaceAddressInput 
				:pData="{ 
					'address' : this.pData.exercisePlaceAddress, 
					'sidoCode' : this.pData.sidoCode,
					'sigunguCode' : this.pData.sigunguCode,
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
	// import ValidationUtil from '@/common/util/ValidationUtil';

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
			return {
				dayOfTheWeekCode 		: this.pData.dayOfTheWeekCode ,
				startTime 				: this.pData.startTime ,
				endTime 				: this.pData.endTime ,
				exercisePlaceName		: this.pData.exercisePlaceName ,
				exercisePlaceAddress 	: this.pData.exercisePlaceAddress ,
				sidoCode 				: this.pData.sidoCode ,
				sigunguCode 			: this.pData.sigunguCode ,
			};
		},
		methods: {
			deleteExerciseTime() {
				this.$emit('delete-row', { index : this.pRowIndex } );
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
