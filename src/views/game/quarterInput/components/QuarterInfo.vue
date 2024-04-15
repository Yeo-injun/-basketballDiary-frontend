<template>
	<v-container>
		<QuarterTimeSelectbox
			:pInitVal="this.quarterTime"
			@select-value="selectQuarterTime"
		/>
		<GameQuarterInfoFrame
			:pQuarterCodeName="this.pQuarterCodeName"
			:pQuarterTime="this.quarterTime"
			:pHomeTeamRecords="this.pHomeTeamRecord"
			:pAwayTeamRecords="this.pAwayTeamRecord"
		/>
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
			pQuarterCode: String,
			pQuarterCodeName : String,
			pQuarterTime : String,
			pHomeTeamRecord : Object,
			pAwayTeamRecord : Object,
		},
		data() {
			return {
				quarterTime: this.intlQuarterTime(),
			};
		},
		methods: {
			intlQuarterTime() {
				if (ValidationUtil.isNull(this.pQuarterTime)) {
					return '';
				}
				return this.pQuarterTime;
			},
			selectQuarterTime(val) {
				this.quarterTime = val;
				this.$emit('select-quarter-time', val);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
