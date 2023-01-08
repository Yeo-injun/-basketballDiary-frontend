<template>
	<v-card class="ma-6 pa-2">
		<PageMoveBtn
			:pBtnName="this.getBtnName()"
			:pRouteInfo="this.getRouteInfo()"
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
	import PageMoveBtn from '@/components/button/PageMoveBtn.vue';
	import ScoreBoardComp from '@/components/game/ScoreBoardComp.vue';
	import QuarterScoreBoardComp from '@/components/game/QuarterScoreBoardComp.vue';

	import { GameRecordStateCode } from '@/const/code/GameCode.js';

	export default {
		components: {
			PageMoveBtn,
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
			getBtnName() {
				if (this.gameRecordStateCode == GameRecordStateCode.CREATION) {
					return '참가팀선택하기';
				}

				if (
					this.gameRecordStateCode == GameRecordStateCode.JOIN_TEAM_CONFIRMATION
				) {
					return '기록하기';
				}

				if (this.gameRecordStateCode == GameRecordStateCode.CONFIRMATION) {
					return '상세보기';
				}

				throw new Error(
					`존재하지 않는 코드입니다. 입력 코드 : ${this.gameRecordStateCode}`
				);
			},
			getRouteInfo() {
				if (this.gameRecordStateCode == GameRecordStateCode.CREATION) {
					return {
						name: 'GameJoinTeamSelectionPage',
						params: { gameSeq: this.gameSeq },
					};
				}

				if (
					this.gameRecordStateCode == GameRecordStateCode.JOIN_TEAM_CONFIRMATION
				) {
					return {
						name: 'LoginPage', // TODO 구현 예정 화면 : 게임상세기록화면
						params: { gameSeq: this.gameSeq },
					};
				}

				if (this.gameRecordStateCode == GameRecordStateCode.CONFIRMATION) {
					return {
						name: 'LoginPage', // TODO 구현 예정 화면 : 게임상세기록화면
						params: { gameSeq: this.gameSeq },
					};
				}

				throw new Error(
					`존재하지 않는 코드입니다. 입력 코드 : ${this.gameRecordStateCode}`
				);
			},

			testCallback: function () {
				alert('dd');
				alert('1234');
			},
		},
	};
</script>

<style lang="scss" scoped></style>
