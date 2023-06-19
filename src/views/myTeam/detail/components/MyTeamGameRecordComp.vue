<template>
	<v-card class="ma-6 pa-2">
		<!-- TODO 해당 버튼 바꾸기 -->
		<GameRecordPageMoveBtn
			:pBtnName="this.getPageMoveInfo().btnName"
			:pRoutePageName="this.getPageMoveInfo().routePageName"
			:pRouteParams="this.getPageMoveInfo().routeParams"
		/>
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
	// TODO FramPageMoveBtn으로 대체 검토 >>
	// import GameRecordPageMoveBtn from '@/views/myTeam/detail/button/GameRecordPageMoveBtn.vue';
	import GameRecordPageMoveBtn from '@/components/button/FramePageMoveBtn.vue';

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
			getPageMoveInfo() {
				if (this.gameRecordStateCode == GameRecordStateCode.CREATION) {
					return this._getPageMoveInfo(
						'참가팀선택하기',
						'GameJoinTeamSelectionPage'
					);
				}

				if (
					this.gameRecordStateCode == GameRecordStateCode.JOIN_TEAM_CONFIRMATION
				) {
					return this._getPageMoveInfo('기록하기', 'GameRecordDetailPage');
				}

				if (this.gameRecordStateCode == GameRecordStateCode.CONFIRMATION) {
					return this._getPageMoveInfo('상세보기', 'GameRecordDetailPage');
				}

				throw new Error(
					`존재하지 않는 코드입니다. 입력 코드 : ${this.gameRecordStateCode}`
				);
			},
			_getPageMoveInfo(btnName, movePageName) {
				return {
					btnName: btnName,
					routePageName: movePageName,
					routeParams: this._getRouteParams(),
				};
			},
			_getRouteParams() {
				const routeQuery = this.$route.query;
				return {
					gameSeq: this.gameSeq,
					gameRecordState: this.pGame.gameRecordStateCode,
					teamSeq: routeQuery.teamSeq,
					teamName: routeQuery.teamName,
				};
			},
		},
	};
</script>

<style lang="scss" scoped></style>
