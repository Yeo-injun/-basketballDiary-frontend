<template>
	<tr :data-id="pData.rowId">
		<td>
			<WeekdaySelectbox
				ref="weekdaySelectbox"
				:pInitVal="this.pData.dayOfTheWeekCode"
				@select-value="updateExerciseTime()"
			/>
		</td>
		<td>
			<GameTimeStartSelectbox pLabelName="시작"
				ref="gameTimeStartSelectbox"
				:pInitVal="this.pData.startTime"
				@select-value="updateExerciseTime()"
			/>
		</td>
		<td>
			<GameTimeEndSelectbox pLabelName="종료"
				ref="gameTimeEndSelectbox"
				:pInitVal="this.pData.endTime"
				@select-value="updateExerciseTime()"
			/>
		</td>
		<td>
			<ExercisePlaceNameTextInput
				ref="exercisePlaceNameTextInput"
				:pData="this.pData.exercisePlaceName"
				@compliance="updateExerciseTime()"
			/>
		</td>
		<td>
			<TeamExercisePlaceAddressInput
				ref="teamExercisePlaceAddressInput"
				:pData="{ 
					'address' 		: this.pData.exercisePlaceAddress, 
					'sidoCode' 		: this.pData.sidoCode,
					'sigunguCode' 	: this.pData.sigunguCode,
				}"
				@compliance="updateExerciseTime()"
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
			pData 	: Object,
		},
		methods: {
			deleteExerciseTime() {
				this.$emit('delete-row', this.pData.rowId );
			},
			updateExerciseTime() {
				const refs 			= this.$refs;
				const placeAddrInfo = refs.teamExercisePlaceAddressInput.getValue();
				const rowInfo = {
					rowId 					: this.pData.rowId								,
					dayOfTheWeekCode 		: refs.weekdaySelectbox.getValue()				,
					startTime 				: refs.gameTimeStartSelectbox.getValue()		,
					endTime 				: refs.gameTimeEndSelectbox.getValue()			,
					exercisePlaceName		: refs.exercisePlaceNameTextInput.getValue()	,
					exercisePlaceAddress 	: placeAddrInfo.address							,				
					sidoCode 				: placeAddrInfo.sidoCode						,
					sigunguCode 			: placeAddrInfo.sigunguCode						,
				}
				this.$emit( 'update-row', rowInfo );
			},
		},
	};
</script>

<style lang="scss" scoped></style>
