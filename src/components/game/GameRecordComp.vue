<template>
	<v-card class="ma-6 pa-2">
		<GameRecordPageMoveBtn :pBtnInfo="this.getBtnInfo()" />
		<!-- 상세보기 버튼 추가 -->
		<v-card-text>
			<div>경기일자 : {{ gameYmd }}</div>
			<div>
				경기장주소 : {{ gamePlaceAddress }} / 경기장명 : {{ gamePlaceName }}
			</div>
		</v-card-text>
		<ScoreBoardComp :pGameScore="this.gameScore" />
		<QuarterScoreBoardComp :pQuarterScore="this.quarterScore" />
	</v-card>
</template>

<script>
	import GameRecordPageMoveBtn from '@/views/myTeam/GameRecordPageMoveBtn.vue';
	import ScoreBoardComp from '@/components/game/ScoreBoardComp.vue';
	import QuarterScoreBoardComp from '@/components/game/QuarterScoreBoardComp.vue';

	import { GameRecordStateCode } from '@/const/code/GameCode.js';

	export default {
		components: {
			GameRecordPageMoveBtn,
			ScoreBoardComp,
			QuarterScoreBoardComp,
		},
		props: {
			pGame: Object,
		},
		data() {
			return {
				gameSeq: this.pGame.gameSeq,
				gameRecordStateCode: this.pGame.gameRecordStateCode,
				gameYmd: this.pGame.gameYmd,
				gamePlaceAddress: this.pGame.gamePlaceAddress,
				gamePlaceName: this.pGame.gamePlaceName,
				gameScore: {
					gameTypeCode: this.pGame.gameTypeCode,
					gameTypeCodeName: this.pGame.gameTypeCodeName,
					homeTeam: this.pGame.homeTeam,
					awayTeam: this.pGame.awayTeam,
				},
				quarterScore: {
					homeTeam: this.pGame.homeTeam,
					awayTeam: this.pGame.awayTeam,
				},
			};
		},
		methods: {
			getBtnInfo() {
				if (this.gameRecordStateCode == GameRecordStateCode.CREATION) {
					return this._getBtnInfo(
						'참가팀선택하기',
						'GameJoinTeamSelectionPage'
					);
				}

				if (
					this.gameRecordStateCode == GameRecordStateCode.JOIN_TEAM_CONFIRMATION
				) {
					return this._getBtnInfo('기록하기', 'GameRecordDetailPage');
				}

				if (this.gameRecordStateCode == GameRecordStateCode.CONFIRMATION) {
					return this._getBtnInfo('상세보기', 'GameRecordDetailPage');
				}

				throw new Error(
					`존재하지 않는 코드입니다. 입력 코드 : ${this.gameRecordStateCode}`
				);
			},
			_getBtnInfo(btnName, pageName) {
				return {
					btnName: btnName,
					pageName: pageName,
					routeParams: this._getRouteParams(),
				};
			},
			_getRouteParams() {
				debugger;
				const routeParams = this.$route.params;
				return {
					gameSeq: this.gameSeq,
					teamSeq: routeParams.pTeamSeq,
					teamName: routeParams.pTeamName,
				};
			},
		},
	};
</script>

<style lang="scss" scoped></style>
