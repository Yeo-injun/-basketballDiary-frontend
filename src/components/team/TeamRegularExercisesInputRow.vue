<template>
	<tr :data-id="pRowIndex">
		<td>
			<WeekdaySelectbox 
				:pInitVal="this.value.dayOfTheWeekCode"
				@select-value="this.setDayOfTheWeekCode"
			/>
		</td>
		<td>
			<GameTimeStartSelectbox pLabelName="시작"
				:pInitVal="this.value.startTime"
				@select-value="this.setDayOfTheWeekCode"
			/>
		</td>
		<td>
			<GameTimeEndSelectbox pLabelName="종료"
				:pInitVal="this.value.endTime"
				@select-value="this.setDayOfTheWeekCode"
			/>
		</td>
		<td>
			<ExercisePlaceNameTextInput
				:pData="this.value.exercisePlaceName"
				@compliance="this.setExercisePlaceName"
			/>
		</td>
		<td>
			<TeamExercisePlaceAddressInput 
				:pData="{ 
					'address' : this.value.exercisePlaceAddress, 
					'sidoCode' : this.value.sidoCode,
					'sigunguCode' : this.value.sigunguCode,
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
			value : {},
			pRowIndex : Number,
		},
		data() {
			return {
				dayOfTheWeekCode 		: this.value.dayOfTheWeekCode ,
				startTime 				: this.value.startTime ,
				endTime 				: this.value.endTime ,
				exercisePlaceName		: this.value.exercisePlaceName ,
				exercisePlaceAddress 	: this.value.exercisePlaceAddress ,
				sidoCode 				: this.value.sidoCode ,
				sigunguCode 			: this.value.sigunguCode ,
			};
		},
		methods: {
			deleteExerciseTime() {
				this.$emit('delete-row', this.pRowIndex );
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
			setExercisePlaceName( result ) {
				this.exercisePlaceName = result.data;
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
