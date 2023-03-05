<template>
	<v-container @click="moveQuarterRecordInputBoardPage()">
		<div v-if="hasQuarterRecords(this.pTeamsQuarterRecords)">
			<GameQuarterInfoFrame
				:pQuarterCodeName="this.pTeamsQuarterRecords.quarterCodeName"
				:pQuarterTime="this.pTeamsQuarterRecords.quarterTime"
				:pHomeTeamRecords="this.pTeamsQuarterRecords.homeTeamRecords"
				:pAwayTeamRecords="this.pTeamsQuarterRecords.awayTeamRecords"
			/>
		</div>
		<!-- 쿼터 정보가 없을 경우에 보여지는 Components -->
		<div v-else>
			<v-card>
				<v-btn>쿼터 기록하기</v-btn>
			</v-card>
		</div>
	</v-container>
</template>

<script>
	import { GameRecordStateCode } from '@/const/code/GameCode.js';

	import ValidationUtil from '@/common/util/ValidationUtil.js';
	/***********
	 * 컴포넌트
	 ***********/
	import GameQuarterInfoFrame from '@/components/game/quarter/GameQuarterInfoFrame.vue';

	export default {
		components: {
			GameQuarterInfoFrame,
		},
		props: {
			pGameRecordStateCode: String,
			pQuarterCode: String,
			pTeamsQuarterRecords: Object,
		},
		methods: {
			hasQuarterRecords(quarterRecords) {
				if (ValidationUtil.isNull(quarterRecords)) {
					return false;
				}
				return true;
			},
			moveQuarterRecordInputBoardPage() {
				if (
					GameRecordStateCode.JOIN_TEAM_CONFIRMATION ==
					this.pGameRecordStateCode
				) {
					this.$router.push({
						name: 'QuarterRecordInputBoardPage',
						params: {
							gameSeq: this.$route.params.gameSeq,
							quarterCode: this.pQuarterCode,
						},
					});
				}
				// TODO 농구게임 쿼터조회 화면으로 이동 - G005P01 화면으로
				alert(this.pGameRecordStateCode);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
