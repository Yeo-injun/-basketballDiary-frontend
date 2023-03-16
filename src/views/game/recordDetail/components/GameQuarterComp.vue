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
					case GameRecordStateCode.JOIN_TEAM_CONFIRMATION:
						this.$router.push({
							name: 'QuarterRecordInputBoardPage',
							query: {
								gameSeq: this.gameSeq,
								quarterCode: this.pQuarterCode,
							},
						});
				}
				// TODO 농구게임 쿼터조회 화면으로 이동 - G005P01 화면으로
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
