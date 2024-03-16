<template>
	<v-container>
		<QuarterTimeSelectbox
			:pInitVal="this.quarterTime"
			@select-value="selectQuarterTime"
		/>
		<v-container>
			<GameQuarterInfoFrame
				:pQuarterCodeName="this.pQuarterInfo.quarterCodeName"
				:pQuarterTime="this.quarterTime"
				:pHomeTeamRecords="this.pQuarterInfo.homeTeamRecords"
				:pAwayTeamRecords="this.pQuarterInfo.awayTeamRecords"
			/>
		</v-container>
	</v-container>
</template>

<script>
	import QuarterTimeSelectbox from '@/components/selectbox/game/QuarterTimeSelectbox.vue';
	import GameQuarterInfoFrame from '@/components/game/quarter/GameQuarterInfoFrame.vue';

	import ValidationUtil from '@/common/util/ValidationUtil';

	export default {
		components: {
			QuarterTimeSelectbox,
			GameQuarterInfoFrame,
		},
		props: {
			pQuarterInfo: Object,
		},
		data() {
			return {
				quarterTime: this.intlQuarterTime(),
			};
		},
		methods: {
			intlQuarterTime() {
				if (ValidationUtil.isNull(this.pQuarterInfo.quarterTime)) {
					return '';
				}
				return this.pQuarterInfo.quarterTime;
			},
			selectQuarterTime(val) {
				console.log( val );
				this.quarterTime = val;
				this.$emit('select-quarter-time', val);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
