<template>
	<v-container>
		<GameQuarterInfoFrame
			pQuarterCodeName="테스트"
			pQuarterTime="테스트"
			:pHomeTeamRecords="this.testHomeTeam"
			:pAwayTeamRecords="this.testAwayTeam"
		/>
		{{ this.test }}
		TODO 선수별 기록 조회 API 붙이기 / 목록 그리기
	</v-container>
</template>

<script>
	import GameAPI from '@/api/GameAPI.js';
	import GameQuarterInfoFrame from '@/components/game/quarter/GameQuarterInfoFrame.vue';

	export default {
		components: {
			GameQuarterInfoFrame,
		},
		props: {
			pGameQuarterRecords: Object,
		},
		data() {
			return {
				test: 'TODO API호출 붙이기',
				testHomeTeam: {
					teamName: '테스트홈팀',
				},
				testAwayTeam: {
					teamName: '테스트어웨이팀',
				},
			};
		},
		methods: {
			async getGameJoinPlayerRecordsByQuarter() {
				const query = this.$route.query;
				const params = {
					gameSeq: query.gameSeq,
					homeAwayCode: query.homeAwayCode,
					quarterCode: '01', // TODO 임시값 할당
				};
				// TODO 값 제대로 할당하기
				const res = await GameAPI.getGameJoinPlayerRecordsByQuarter(params);
				this.test = res;
			},
		},
		mounted() {
			this.getGameJoinPlayerRecordsByQuarter();
		},
	};
</script>

<style lang="scss" scoped></style>
