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
			<v-card>
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
			pQuarterCode: String,
			pGameRecordStateCode: String,
			pTeamsQuarterRecords: Object,
		},
		data() {
			const query = this.$route.query;
			return {
				gameSeq: query.gameSeq,
			};
		},
		methods: {
			hasQuarterRecords(quarterRecords) {
				if (ValidationUtil.isNull(quarterRecords)) {
					return false;
				}
				return true;
			},
			moveQuarterRecordInputBoardPage() {
				switch (this.pGameRecordStateCode) {
					case JOIN_TEAM_CONFIRMATION_CODE:
						this.$router.push({
							name: 'QuarterRecordInputBoardPage',
							query: {
								gameSeq: this.gameSeq,
								quarterCode: this.pQuarterCode,
							},
						});
						break;
					case GAME_CONFIRMATION_CODE:
						this.$router.push({
							name: 'QuarterRecordDetailPage',
							query: {
								gameSeq: this.gameSeq,
								quarterCode: this.pQuarterCode,
							},
						});
				}
			},
			async createGameQuarterBasicInfo() {
				const params = {
					gameSeq: this.gameSeq,
					quarterCode: this.pQuarterCode,
				};

				await GameAPI.createGameQuarterBasicInfo(params);
				this.moveQuarterRecordInputBoardPage();
			},
		},
	};
</script>

<style lang="scss" scoped></style>
