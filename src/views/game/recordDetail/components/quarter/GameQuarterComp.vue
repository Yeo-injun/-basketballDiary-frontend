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
			<v-card v-if="this.pEditable">
				<div class="text-center">
					<QuarterCreateBtn
						pBtnName="쿼터 입력"
						@do-save="createGameQuarterBasicInfo"
					/>
				</div>
			</v-card>
			<v-card v-else>
				<div class="text-center">
					쿼터 입력중
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
	const JOIN_TEAM_CONFIRMATION_CODE 	= GameRecordStateCode.JOIN_TEAM_CONFIRMATION.code;
	const GAME_CONFIRMATION_CODE 		= GameRecordStateCode.GAME_CONFIRMATION.code;

	export default {
		components: {
			GameQuarterInfoFrame,
			QuarterCreateBtn,
		},
		props: {
			pGameSeq			: {
				type 	: String,
				default : "",
			},
			pTeamSeq			: {
				type 	: String,
				default : "",
			},
			pQuarterCode		: {
				type 	: String,
				default : "",
			},
			pGameRecordStateCode: {
				type 	: String,
				default : "",
			},
			pTeamsQuarterRecords: {
				type 	: Object,
				default() {
					return {
						quarterCodeName	: "",
						quarterTime		: "",
						homeTeamRecords	: {},
						awayTeamRecords	: {},
					}
				}
			},
			pEditable: {
				type 	: Boolean,
				default : false,
			},
		},
		methods: {
			hasQuarterRecords() {
				return !ValidationUtil.isNull( this.pTeamsQuarterRecords );
			},
			isGameConfirmed() {
				return GAME_CONFIRMATION_CODE == this.pGameRecordStateCode;
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
						break;
					default : 
						throw new Error( "유효하지 않은 경기기록상태값입니다." );
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
