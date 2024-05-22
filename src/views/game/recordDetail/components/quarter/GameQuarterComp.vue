<template>
	<v-container>
		<div
			v-if="hasQuarterRecords(this.pTeamsQuarterRecords)"
			@click="moveQuarterRecordInputBoardPage()"
		>
			<GameQuarterInfoFrame
				:pQuarterCodeName="this.pTeamsQuarterRecords.quarterCodeName"
				:pQuarterTime="this.pTeamsQuarterRecords.quarterTime"
				:pHomeTeamRecords="this.pTeamsQuarterRecords.homeTeamRecords"
				:pAwayTeamRecords="this.pTeamsQuarterRecords.awayTeamRecords"
			/>
		</div>
		<!-- 쿼터 정보가 없을 경우에 보여지는 Components -->
		<div v-else>
			<v-card v-if="!isGameConfirmed()">
				<div class="text-center">
					<QuarterCreateBtn
						pBtnName="쿼터 입력"
						@do-save="createGameQuarterBasicInfo"
					/>
				</div>
			</v-card>
		</div>
	</v-container>
</template>

<script>
	import { GameRecordStateCode } from '@/const/code/GameCode.js';

	import ValidationUtil from '@/common/util/ValidationUtil.js';

	import GameAPI from '@/api/GameAPI.js';
	/***********
	 * 컴포넌트
	 ***********/
	import GameQuarterInfoFrame from '@/components/game/quarter/GameQuarterInfoFrame.vue';
	import QuarterCreateBtn from '@/components/button/FrameSaveBtn.vue';

	/*-----------------------------
	/*	코드값 
	/*-----------------------------*/
	const JOIN_TEAM_CONFIRMATION_CODE =
		GameRecordStateCode.JOIN_TEAM_CONFIRMATION.code;
	const GAME_CONFIRMATION_CODE = GameRecordStateCode.GAME_CONFIRMATION.code;

	export default {
		components: {
			GameQuarterInfoFrame,
			QuarterCreateBtn,
		},
		props: {
			pGameSeq: String,
			pTeamSeq: Number,
			pQuarterCode: String,
			pGameRecordStateCode: String,
			pTeamsQuarterRecords: Object,
		},
		methods: {
			hasQuarterRecords(quarterRecords) {
				if (ValidationUtil.isNull(quarterRecords)) {
					return false;
				}
				return true;
			},
			isGameConfirmed() {
				if (GAME_CONFIRMATION_CODE == this.pGameRecordStateCode) {
					return true;
				}
				return false;
			},
			moveQuarterRecordInputBoardPage() {
				switch (this.pGameRecordStateCode) {
					case JOIN_TEAM_CONFIRMATION_CODE:
						this.$router.push({
							name: 'QuarterInputPage',
							query: {
								gameSeq: this.pGameSeq,
								teamSeq: this.pTeamSeq,
								quarterCode: this.pQuarterCode,
							},
						});
						break;
					case GAME_CONFIRMATION_CODE:
						this.$router.push({
							name: 'QuarterRecordDetailPage',
							query: {
								gameSeq: this.pGameSeq,
								teamSeq: this.pTeamSeq,
								quarterCode: this.pQuarterCode,
							},
						});
				}
			},
			async createGameQuarterBasicInfo() {
				await GameAPI.createGameQuarterBasicInfo({
					gameSeq: this.pGameSeq,
					quarterCode: this.pQuarterCode,
				});
				this.moveQuarterRecordInputBoardPage();
			},
		},
	};
</script>

<style lang="scss" scoped></style>
