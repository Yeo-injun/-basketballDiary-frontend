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
				@select-home-away-team="showPlayersByHomeAwayCode"
			/>
		</v-container>
		{{ this.test }}
	</v-container>
</template>

<script>
	import DateUtil from '@/common/DateUtil.js';

	import GameAPI from '@/api/GameAPI.js';

	import GameQuarterInfoFrame from '@/components/game/quarter/GameQuarterInfoFrame.vue';
	import HomeAwayTeamToggle from '@/components/game/joinTeam/toggle/HomeAwayTeamToggle.vue';
	import { HomeAwayCode } from '@/const/code/GameCode';

	export default {
		components: {
			GameQuarterInfoFrame,
			HomeAwayTeamToggle,
		},
		props: {
			pGameQuarterRecords: Object,
		},
		data() {
			return {
				test: 'TODO API호출 붙이기',
				gameYmd: '',
				gameTime: '',
				quarterCodeName: '',
				quarterTime: '',
				homeTeamRecords: {},
				awayTeamRecords: {},
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

				const homeTeamInfo = resMessage.homeTeamRecords;
				const awayTeamInfo = resMessage.awayTeamRecords;
				this.homeTeamRecords = homeTeamInfo;
				this.awayTeamRecords = awayTeamInfo;
			},
			async getALLGameJoinPlayerRecordsByQuarter() {
				const query = this.$route.query;
				const params = {
					gameSeq: query.gameSeq,
					quarterCode: query.quarterCode,
				};
				// TODO 값 제대로 할당하기
				const res = await GameAPI.getGameJoinPlayerRecordsByQuarter(params);
				this.test = res;
			},
			showPlayersByHomeAwayCode(params) {
				const homeAwayCode = params.homeAwayCode;
				// TODO 선수목록 컴포넌트 보여주기
				if (HomeAwayCode.HOME_TEAM == homeAwayCode) {
					this.test = '홈팀 선수 목록 보여주기';
				} else {
					this.test = '어웨이 선수 목록 보여주기';
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
