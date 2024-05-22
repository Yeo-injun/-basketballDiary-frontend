/** * 화면ID : G001P02 * 화면명 : 게임참가팀선택 화면 * 생성일시 : 2022.10.17 *
작성자 : 여인준 * 작업일지 * 2022.10.17(월) 여인준 : 최초생성 */

<template>
	<v-container>
		<h2>경기참가팀 선택</h2>

		<v-select
			v-model="selectedGameType"
			:items="selectItems"
			item-text="gameTypeCodeName"
			item-value="gameTypeCode"
			label="경기유형"
		/>
		<!-- 상대팀 검색 화면 별도 컴포넌트로 분리 -->
		<GameOpponentSearchComp
			v-if="isMatchUpGame()"
			@select-opponent="setOpponentTeamSeq"
			@init-selected="initOpponentTeamSeq"
		/>
		<v-row>
			<v-col>
				<GameJoinTeamConfirmBtn 
					pBtnName="참가팀 확정"
					@do-save="onConfirmGameJoinTeam"
				/>
			</v-col>
			<v-col>
				<GameDeleteBtn :pGameSeq="this.qGameSeq" @delete-game="toMyTeamDetailPage" />				
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	/** Backend API */
	import GameAPI from '@/api/GameAPI.js';

	/** Code */
	import { GameTypeCode, GameRecordStateCode } from '@/const/code/GameCode.js';
	/** Utils */
	import ValidationUtil from '@/common/util/ValidationUtil.js';
	/** Components */
	import GameJoinTeamConfirmBtn from '@/components/button/FrameSaveBtn.vue';
	import GameOpponentSearchComp from '@/components/game/GameOpponentSearchComp.vue';
	import GameDeleteBtn from '@/components/game/button/GameDeleteBtn.vue';
	/** Emit Event */



	const SELF_GAME_CODE 		= GameTypeCode.SELF_GAME.code;
	const MATCH_UP_GAME_CODE 	= GameTypeCode.MATCH_UP_GAME.code;

	const JOIN_TEAM_CONFIRMATION_CODE = GameRecordStateCode.JOIN_TEAM_CONFIRMATION.code;
	export default {
		components: {
			GameJoinTeamConfirmBtn,
			GameOpponentSearchComp,
			GameDeleteBtn,
		},
		data() {
			const query = this.$route.query;
			return {
				qGameSeq			: String( query.gameSeq ),
				qTeamSeq			: String( query.teamSeq ),
				selectItems: [
					{
						gameTypeCodeName: '자체전',
						gameTypeCode: SELF_GAME_CODE,
					},
					{
						gameTypeCodeName: '교류전',
						gameTypeCode: MATCH_UP_GAME_CODE,
					},
				],
				selectedGameType: SELF_GAME_CODE,
				opponentTeamSeq	: '',
			};
		},
		methods: {
			isMatchUpGame() {
				if (this.selectedGameType == MATCH_UP_GAME_CODE) {
					return true;
				}
				return false;
			},
			setOpponentTeamSeq(opponentTeamSeq) {
				this.opponentTeamSeq = opponentTeamSeq;
			},
			initOpponentTeamSeq() {
				this.opponentTeamSeq = "";
			},
			async onConfirmGameJoinTeam() {
				await GameAPI.confirmJoinTeam({
					gameSeq			: this.qGameSeq,
					gameJoinTeamInfo: this.getGameJoinTeamInfo(),
				});

				this.toGameRecordDetailPage();
			},
			getGameJoinTeamInfo() {
				if (this.selectedGameType == SELF_GAME_CODE) {
					return {
						gameTypeCode: SELF_GAME_CODE,
					};
				}

				if (ValidationUtil.isNull(this.opponentTeamSeq)) {
					const message = '상대팀을 선택해주세요.';
					alert(message);
					throw new Error(message);
				}
				return {
					gameTypeCode	: MATCH_UP_GAME_CODE,
					opponentTeamSeq	: this.opponentTeamSeq,
				};
			},
			toGameRecordDetailPage() {
				this.$router.push({
					name: 'GameRecordDetailPage',
					query: {
						gameSeq			: this.qGameSeq,
						gameRecordState	: JOIN_TEAM_CONFIRMATION_CODE,
						teamSeq			: this.qTeamSeq,
					},
				});
			},
			toMyTeamDetailPage() {
				this.$router.push({
					name: 'MyTeamDetailPage',
					query: {
						gameSeq	: this.qGameSeq,
						teamSeq	: this.qTeamSeq,
					},
				});
			},
		},
	};
</script>

<style lang="scss" scoped></style>
