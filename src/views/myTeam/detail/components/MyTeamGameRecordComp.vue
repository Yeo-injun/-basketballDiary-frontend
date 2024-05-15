<template>
	<v-card class="ma-6 pa-2">
		<v-card-text>
			<div>경기일자 : {{ this.pGame.gameYmd }}</div>
			<div>
				경기장주소 : {{ this.pGame.gamePlaceAddress }} / 경기장명 : {{ this.pGame.gamePlaceName }}
			</div>
		</v-card-text>
		<ScoreBoardComp 
			:pGameTypeCode="this.pGame.gameTypeCode"
			:pGameTypeCodeName="this.pGame.gameTypeCodeName"
			:pHomeTeamScoreInfo="this.pGame.homeTeam"
			:pAwayTeamScoreInfo="this.pGame.awayTeam"
		/>
		<QuarterScoreBoardComp 
			:pHomeTeamQuarterScores="this.pGame.homeTeam"
			:pAwayTeamQuarterScores="this.pGame.awayTeam"
		/>
		<GameRecordPageMoveBtn
			:pBtnName="this.getPageMoveInfo().btnName"
			:pRoutePageName="this.getPageMoveInfo().routePageName"
			:pRouteParams="this.getPageMoveInfo().routeParams"
		/>
	</v-card>
</template>

<script>
	/** Backend API */
	/** Code */
	import { GameRecordStateCode } from '@/const/code/GameCode.js';

	/** Utils */
	/** Components */
	import ScoreBoardComp from '@/components/game/ScoreBoardComp.vue';
	import QuarterScoreBoardComp from '@/components/game/QuarterScoreBoardComp.vue';

	import GameRecordPageMoveBtn from '@/components/button/FramePageMoveBtn.vue';

	/** Emit Event */

	/*-----------------------------
	/*	코드값 
	/*-----------------------------*/
	const CREATION_CODE 				= GameRecordStateCode.CREATION.code;
	const JOIN_TEAM_CONFIRMATION_CODE 	= GameRecordStateCode.JOIN_TEAM_CONFIRMATION.code;
	const GAME_CONFIRMATION_CODE 		= GameRecordStateCode.GAME_CONFIRMATION.code;

	export default {
		components: {
			GameRecordPageMoveBtn,
			ScoreBoardComp,
			QuarterScoreBoardComp,
		},
		props: {
			pGame: Object,
			pTeamSeq: Number,
		},
		methods: {
			getPageMoveInfo() {
				const gameRecordStateCode = this.pGame.gameRecordStateCode;
				switch( gameRecordStateCode ) {
					case CREATION_CODE : 
						return this._getPageMoveInfo( '참가팀선택하기', 'GameJoinTeamSelectionPage' );
					case JOIN_TEAM_CONFIRMATION_CODE : 	
						return this._getPageMoveInfo( '기록하기', 'GameRecordDetailPage' );
					case GAME_CONFIRMATION_CODE : 
						return this._getPageMoveInfo( '상세보기', 'GameRecordDetailPage' );
					default : 
						throw new Error( `존재하지 않는 코드입니다. 입력 코드 : ${gameRecordStateCode}` );
				}
			},
			_getPageMoveInfo(btnName, movePageName) {
				return {
					btnName: btnName,
					routePageName: movePageName,
					routeParams: this._getRouteParams(),
				};
			},
			_getRouteParams() {
				return {
					gameSeq			: String( this.pGame.gameSeq ), // gameSeq와 같은 key값은 String type으로 관리 ( 다양한 case에 유연하게 대응 가능 )
					gameRecordState	: this.pGame.gameRecordStateCode,
					teamSeq			: this.pTeamSeq,  // TODO String으로 변환 처리 요망
				};
			},
		},
	};
</script>

<style lang="scss" scoped></style>
