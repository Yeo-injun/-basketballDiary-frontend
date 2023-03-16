/** * 화면ID : G001P02 * 화면명 : 게임참가팀선택 화면 * 생성일시 : 2022.10.17 *
작성자 : 여인준 * 작업일지 * 2022.10.17(월) 여인준 : 최초생성 */

<template>
	<v-container>
		<h2>게임참가팀 선택</h2>
		<v-btn @click="confirmGameJoinTeam">참가팀 확정</v-btn>

		<v-select
			v-model="selectedGameType"
			:items="selectItems"
			item-text="gameTypeCodeName"
			item-value="gameTypeCode"
			label="경기유형"
		/>
		<!-- 상대팀 검색 화면 별도 컴포넌트로 분리 -->
		<GameOpponentSearchComp
			v-if="isMatchGame()"
			@select-opponent="setOpponentTeamSeq"
		/>
		<GameDeletionBtn :pGameSeq="this.gameSeq" @delete-game="moveMainPage" />
	</v-container>
</template>

<script>
	import GameApi from '@/api/GameAPI.js';

	import ValidationUtil from '@/common/util/ValidationUtil.js';
	import { GameTypeCode } from '@/const/code/GameCode.js';

	import GameOpponentSearchComp from '@/components/game/GameOpponentSearchComp.vue';
	import GameDeletionBtn from '@/components/game/button/GameDeletionBtn.vue';

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
						gameTypeCode: GameTypeCode.SELF_GAME,
					},
					{
						gameTypeCodeName: '교류전',
						gameTypeCode: GameTypeCode.MATCH_UP_GAME,
					},
				],
				selectedGameType: GameTypeCode.SELF_GAME,
				gameSeq: query.gameSeq,
				opponentTeamSeq: '',
			};
		},
		methods: {
			isMatchGame() {
				if (this.selectedGameType == GameTypeCode.MATCH_UP_GAME) {
					return true;
				}
				return false;
			},
			setOpponentTeamSeq(opponentTeamSeq) {
				this.opponentTeamSeq = opponentTeamSeq;
			},
			/* API062 게임참가팀 확정 */
			async confirmGameJoinTeam() {
				const params = {
					gameSeq: this.gameSeq,
					gameJoinTeamInfo: this.getGameJoinTeamInfo(),
				};

				await GameApi.confirmJoinTeam(params);
				// TODO 이동할 화면 구현하기 - 게임기록 화면
				this.$router.push({
					name: 'LoginPage', // TODO 이동할 화면명으로 변경 - 게임기록 상세조회화면
					params: { gameSeq: this.gameSeq },
				});
			},
			getGameJoinTeamInfo() {
				if (this.selectedGameType == GameTypeCode.SELF_GAME) {
					const gameJoinTeamInfo = {
						gameTypeCode: GameTypeCode.SELF_GAME,
					};
					return gameJoinTeamInfo;
				}

				if (ValidationUtil.isNull(this.opponentTeamSeq)) {
					const message = '상대팀을 선택해주세요.';
					alert(message);
					throw new Error(message);
				}
				const gameJoinTeamInfo = {
					gameTypeCode: GameTypeCode.MATCH_UP_GAME,
					opponentTeamSeq: this.opponentTeamSeq,
				};
				return gameJoinTeamInfo;
			},
			moveMainPage() {
				// TODO 메인페이지로 이동하는 라우터 등록
				alert('메인페이지 이동 구현');
			},
		},
	};
</script>

<style lang="scss" scoped></style>
