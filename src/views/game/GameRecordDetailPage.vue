/** * 화면ID : G002P01 * 화면명 : 게임기록 상세조회 * 생성일시 : 2022.12.29 *
작성자 : 여인준 * 작업일지 * 2022.12.29(목) 여인준 : 최초생성 */

<template>
	<v-container>
		<GameInfoComp :pGameInfo="this.gameBasicInfo" />
		<h2>팀 정보</h2>
		<h2>게임참가선수</h2>
		<h2>경기기록</h2>
	</v-container>
</template>

<script>
	import GameAPI from '@/api/GameAPI.js';

	import DateUtil from '@/common/DateUtil.js';

	import GameInfoComp from '@/views/game/gameRecordDetail/GameInfoComp.vue';

	export default {
		components: {
			GameInfoComp,
		},
		data() {
			return {
				routeCompName: 'GameJoinTeamSelectionPage',
				gameSeq: this.$route.params.gameSeq,
				gameBasicInfo: {},
			};
		},
		methods: {
			async getGameBasicInfo() {
				const params = {
					gameSeq: this.gameSeq,
				};

				const res = await GameAPI.getGameBasicInfo(params);
				const gameBasicInfo = res.data.gameInfo;

				const startTime = DateUtil.Format.toTime(gameBasicInfo.gameStartTime);
				const endTime = DateUtil.Format.toTime(gameBasicInfo.gameEndTime);
				this.gameBasicInfo = {
					gameYmd: DateUtil.Format.toYmd(gameBasicInfo.gameYmd),
					gameTime: `${startTime} ~ ${endTime}`,
					gamePlaceAddress: gameBasicInfo.gamePlaceAddress,
					gamePlaceName: gameBasicInfo.gamePlaceName,
				};
			},
		},
		mounted() {
			this.getGameBasicInfo();
		},
	};
</script>

<style lang="scss" scoped></style>
