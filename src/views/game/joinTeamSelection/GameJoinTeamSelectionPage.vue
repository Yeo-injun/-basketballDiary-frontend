/** * 화면ID : G001P02 * 화면명 : 게임참가팀선택 화면 * 생성일시 : 2022.10.17 *
작성자 : 여인준 * 작업일지 * 2022.10.17(월) 여인준 : 최초생성 */

<template>
	<v-container>
		<h2>게임참가팀 선택</h2>
		<v-btn @click="onConfirmGameJoinTeam">참가팀 확정</v-btn>

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
		/>
		<GameDeletionBtn :pGameSeq="this.gameSeq" @delete-game="onMovePage" />
	</v-container>
</template>

<script>
	import GameAPI from '@/api/GameAPI.js';

	import ValidationUtil from '@/common/util/ValidationUtil.js';
	import { GameTypeCode } from '@/const/code/GameCode.js';
	import { GameRecordStateCode } from '@/const/code/GameCode.js';

	import GameOpponentSearchComp from '@/components/game/GameOpponentSearchComp.vue';
	import GameDeletionBtn from '@/components/game/button/GameDeletionBtn.vue';

	const SELF_GAME_CODE = GameTypeCode.SELF_GAME.code;
	const MATCH_UP_GAME_CODE = GameTypeCode.MATCH_UP_GAME.code;

	const JOIN_TEAM_CONFIRMATION_CODE =
		GameRecordStateCode.JOIN_TEAM_CONFIRMATION.code;
	export default {
		components: {
			GameOpponentSearchComp,
			GameDeletionBtn,
		},
		data() {
			const query = this.$route.query;
			return {
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
				gameSeq: query.gameSeq,
				opponentTeamSeq: '',
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
			async onConfirmGameJoinTeam() {
				const params = {
					gameSeq: this.gameSeq,
					gameJoinTeamInfo: this.getGameJoinTeamInfo(),
				};

				await GameAPI.confirmJoinTeam(params);
				this.$router.push({
					name: 'GameRecordDetailPage',
					query: {
						gameSeq: this.gameSeq,
						gameRecordState: JOIN_TEAM_CONFIRMATION_CODE,
					},
				});
			},
			onMovePage() {
				this.$router.push({
					name: 'MyTeamDetailPage',
					query: {
						gameSeq: this.gameSeq,
						teamSeq: this.$route.query.teamSeq,
					},
				});
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
					gameTypeCode: MATCH_UP_GAME_CODE,
					opponentTeamSeq: this.opponentTeamSeq,
				};
			},
		},
	};
</script>

<style lang="scss" scoped></style>
