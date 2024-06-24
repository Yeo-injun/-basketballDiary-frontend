<template>
	<v-container>
		<PageMainTitle pTitleName="쿼터 기록 조회" />
		<v-container>
			경기일자 : {{ this.gameYmd }} / 경기시간 : {{ this.gameTime }}
			<GameQuarterInfo
				:pQuarterCodeName="this.quarterCodeName"
				:pQuarterTime="this.quarterTime"
				:pHomeTeamRecords="this.homeTeamRecord"
				:pAwayTeamRecords="this.awayTeamRecord"
			/>
		</v-container>
		<v-container>
			<HomeAwayTeamToggle
				:pHomeTeamName="this.homeTeamRecord.teamName"
				:pHomeTeamCode="this.homeTeamRecord.homeAwayCode"
				:pHomeTeamCodeName="this.homeTeamRecord.homeAwayCodeName"
				:pAwayTeamName="this.awayTeamRecord.teamName"
				:pAwayTeamCode="this.awayTeamRecord.homeAwayCode"
				:pAwayTeamCodeName="this.awayTeamRecord.homeAwayCodeName"
				@select-home-away-team="selectTargetPlayersByHomeAwayCode"
			/>
		</v-container>
		<PlayerRecordTable
			:pPlayersRecord="this.targetPlayersRecord"
		/>
	</v-container>
</template>

<script>
	/** Backend API */
	import GameAPI from '@/api/GameAPI.js';

	/** Code */
	import { HomeAwayCode } from '@/const/code/GameCode';

	/** Utils */
	import DateUtil from '@/common/DateUtil.js';

	/** Components */
	import PageMainTitle from '@/components/title/FramePageMainTitle.vue';
	import GameQuarterInfo from '@/components/game/quarter/GameQuarterInfoFrame.vue';
	import HomeAwayTeamToggle from '@/components/game/toggle/HomeAwayTeamToggle.vue';
	import PlayerRecordTable from '@/components/game/table/PlayerRecordTable.vue';

	export default {
		async created() {
			await this.getGameQuarterRecords();
			await this.getAllGameJoinPlayerRecordsByQuarter();
		},
		components: {
			PageMainTitle,
			GameQuarterInfo,
			HomeAwayTeamToggle,
			PlayerRecordTable,
		},
		props: {
			pGameQuarterRecords: Object,
		},
		data() {
			return {
				gameYmd: '',
				gameTime: '',
				quarterCodeName: '',
				quarterTime: '',
				homeTeamRecord: {},
				awayTeamRecord: {},
				homeTeamPlayers: [],
				awayTeamPlayers: [],
				targetTeamName: '',
				targetPlayersRecord: [],
			};
		},
		methods: {
			async getGameQuarterRecords() {
				const query 	= this.$route.query;
				const { data } 	= await GameAPI.getGameQuarterRecords({
					gameSeq		: query.gameSeq,
					quarterCode	: query.quarterCode,
				});
				
				this.gameYmd 			= DateUtil.Format.toYmd( data.gameYmd );
				this.gameTime 			= `${DateUtil.Format.toTime( data.gameStartTime )} ~ ${DateUtil.Format.toTime( data.gameEndTime )}`;
				this.quarterCodeName 	= data.quarterCodeName;
				this.quarterTime 		= data.quarterTime;

				this.homeTeamRecord = data.homeTeamRecord;
				this.awayTeamRecord = data.awayTeamRecord;
			},
			async getAllGameJoinPlayerRecordsByQuarter() {
				const query 	= this.$route.query;
				const { data } 	= await GameAPI.getGameJoinPlayerRecordsByQuarter({
					gameSeq		: query.gameSeq,
					quarterCode	: query.quarterCode,
				});
				
				this.homeTeamPlayers = data.homeTeamPlayers;
				this.awayTeamPlayers = data.awayTeamPlayers;
				this.selectTargetPlayersByHomeAwayCode({
					homeAwayCode: HomeAwayCode.HOME_TEAM,
				});
			},
			selectTargetPlayersByHomeAwayCode(params) {
				const homeAwayCode = params.homeAwayCode;
				switch( homeAwayCode ) {
					case HomeAwayCode.HOME_TEAM : 
						this.targetPlayersRecord = this._toPlayerRecordList( this.homeTeamPlayers );
						break;
					case HomeAwayCode.AWAY_TEAM : 
						this.targetPlayersRecord = this._toPlayerRecordList( this.awayTeamPlayers );
						break;
					default : 
						throw new Error( "유효하지 않은 홈/어웨이 코드입니다." );
				}
			},
			_toPlayerRecordList( players ) {
				const result = []; 
				players.forEach( function( item ) {
					result.push({
						backNumber	: item.backNumber, 
						playerInfo	: `${item.name} | ${item.positionCodeName} `, 
						totalScore	: item.totalScore, 
						freeThrow	: `${item.freeThrow} / ${item.tryFreeThrow}` , 
						twoPoint	: `${item.twoPoint} / ${item.tryTwoPoint}` , 
						threePoint	: `${item.threePoint} / ${item.tryThreePoint}` , 
						assist		: item.assist, 
						rebound		: item.rebound, 
						steal		: item.steal, 
						block		: item.block, 
						turnover	: item.turnover, 
						foul		: item.foul, 
					});
				});
				return result;
			}
		},
	};
</script>

<style lang="scss" scoped></style>
