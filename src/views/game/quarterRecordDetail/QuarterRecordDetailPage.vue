<template>
	<v-container>
		<h2>농구게임 쿼터조회</h2>
		<v-container>
			경기일자 : {{ this.gameYmd }} / 경기시간 : {{ this.gameTime }}
			<GameQuarterInfoFrame
				:pQuarterCodeName="this.quarterCodeName"
				:pQuarterTime="this.quarterTime"
				:pHomeTeamRecords="this.homeTeamRecords"
				:pAwayTeamRecords="this.awayTeamRecords"
			/>
		</v-container>
		<v-container>
			<HomeAwayTeamToggle
				:pHomeTeamName="this.homeTeamRecords.teamName"
				:pHomeTeamCode="this.homeTeamRecords.homeAwayCode"
				:pHomeTeamCodeName="this.homeTeamRecords.homeAwayCodeName"
				:pAwayTeamName="this.awayTeamRecords.teamName"
				:pAwayTeamCode="this.awayTeamRecords.homeAwayCode"
				:pAwayTeamCodeName="this.awayTeamRecords.homeAwayCodeName"
				@select-home-away-team="selectTargetPlayersByHomeAwayCode"
			/>
		</v-container>
		<h2>{{ this.targetTeamName }} 선수기록</h2>
		<v-container>
			<QuarterPlayerRecordsComp :pPlayersRecord="this.targetPlayersRecord" />
		</v-container>
	</v-container>
</template>

<script>
	import DateUtil from '@/common/DateUtil.js';

	import GameAPI from '@/api/GameAPI.js';

	import GameQuarterInfoFrame from '@/components/game/quarter/GameQuarterInfoFrame.vue';
	import HomeAwayTeamToggle from '@/components/game/joinTeam/toggle/HomeAwayTeamToggle.vue';
	import { HomeAwayCode } from '@/const/code/GameCode';

	import QuarterPlayerRecordsComp from '@/views/game/quarterRecordDetail/components/QuarterPlayerRecordComp.vue';

	export default {
		components: {
			GameQuarterInfoFrame,
			HomeAwayTeamToggle,
			QuarterPlayerRecordsComp,
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
				homeTeamRecords: {},
				awayTeamRecords: {},
				homeTeamPlayers: [],
				awayTeamPlayers: [],
				targetTeamName: '',
				targetPlayersRecord: [],
			};
		},
		methods: {
			async getGameQuarterRecords() {
				const query = this.$route.query;
				const params = {
					gameSeq: query.gameSeq,
					quarterCode: query.quarterCode,
				};

				const res = await GameAPI.getGameQuarterRecords(params);
				const resMessage = res.data;
				this.gameYmd = DateUtil.Format.toYmd(resMessage.gameYmd);
				this.gameTime = `${DateUtil.Format.toTime(resMessage.gameStartTime)} 
				~ ${DateUtil.Format.toTime(resMessage.gameEndTime)}`;
				this.quarterCodeName = resMessage.quarterCodeName;
				this.quarterTime = resMessage.quarterTime;

				this.homeTeamRecords = resMessage.homeTeamRecords;
				this.awayTeamRecords = resMessage.awayTeamRecords;
			},
			async getALLGameJoinPlayerRecordsByQuarter() {
				const query = this.$route.query;
				const params = {
					gameSeq: query.gameSeq,
					quarterCode: query.quarterCode,
				};

				const res = await GameAPI.getGameJoinPlayerRecordsByQuarter(params);
				const resBody = res.data;
				this.homeTeamPlayers = resBody.homeTeamPlayers;
				this.awayTeamPlayers = resBody.awayTeamPlayers;
				this.selectTargetPlayersByHomeAwayCode({
					homeAwayCode: HomeAwayCode.HOME_TEAM,
				});
			},
			selectTargetPlayersByHomeAwayCode(params) {
				const homeAwayCode = params.homeAwayCode;

				if (HomeAwayCode.HOME_TEAM == homeAwayCode) {
					this.targetTeamName = `${this.homeTeamRecords.teamName} ( ${this.homeTeamRecords.homeAwayCodeName} )`;
					this.targetPlayersRecord = this.homeTeamPlayers;
				} else {
					this.targetTeamName = `${this.awayTeamRecords.teamName} ( ${this.awayTeamRecords.homeAwayCodeName} )`;
					this.targetPlayersRecord = this.awayTeamPlayers;
				}
			},
		},
		mounted() {
			this.getGameQuarterRecords();
			this.getALLGameJoinPlayerRecordsByQuarter();
		},
	};
</script>

<style lang="scss" scoped></style>
