<template>
	<v-container>
		<h4>경기일자 : {{ this.gameYmd }}</h4>
		<h4>경기시간 : {{ this.gameStartTime }} ~{{ this.gameEndTime }}</h4>
		<GameTimeSelect
			pLabelName="쿼터시간"
			pUnitType="min"
			:pMaxTime="10"
			:pInitVal="this.quarterTime"
			@select-value="selectQuarterTime"
		/>

		<v-container>
			<GameQuarterInfoFrame
				:pQuarterCodeName="this.pGameQuarterRecords.quarterCodeName"
				:pQuarterTime="this.quarterTime"
				:pHomeTeamRecords="this.pGameQuarterRecords.homeTeamRecords"
				:pAwayTeamRecords="this.pGameQuarterRecords.awayTeamRecords"
			/>
		</v-container>
	</v-container>
</template>

<script>
	import GameTimeSelect from '@/components/selectbox/GameTimeSelect.vue';
	import GameQuarterInfoFrame from '@/components/game/quarter/GameQuarterInfoFrame.vue';

	import ValidationUtil from '@/common/util/ValidationUtil';
	import DateUtil from '@/common/DateUtil';

	export default {
		components: {
			GameTimeSelect,
			GameQuarterInfoFrame,
		},
		props: {
			pGameQuarterRecords: Object,
		},
		data() {
			return {
				gameYmd: this.intlGameYmd(),
				gameStartTime: this.intlGameStartTime(),
				gameEndTime: this.intlGameEndTime(),
				quarterTime: this.intlQuarterTime(),
			};
		},
		methods: {
			intlGameYmd() {
				return DateUtil.Format.toYmd(this.pGameQuarterRecords.gameYmd);
			},
			intlGameStartTime() {
				return DateUtil.Format.toTime(this.pGameQuarterRecords.gameStartTime);
			},
			intlGameEndTime() {
				return DateUtil.Format.toTime(this.pGameQuarterRecords.gameEndTime);
			},
			intlQuarterTime() {
				if (ValidationUtil.isNull(this.pGameQuarterRecords.quarterTime)) {
					return '';
				}
				return this.pGameQuarterRecords.quarterTime;
			},
			selectQuarterTime(val) {
				this.quarterTime = val;
				this.$emit('select-quarter-time', val);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
