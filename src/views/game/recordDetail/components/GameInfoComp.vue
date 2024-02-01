<template>
	<v-container>
		<h2>경기 정보</h2>
		<v-container>
			<v-card>
				<v-row>
					<v-col no-gutters>
						<v-row no-gutters
							>경기일자 : {{ this.gameBasicInfo.gameYmd }}</v-row
						>
						<v-row no-gutters
							>경기시간 : {{ this.gameBasicInfo.gameTime }}</v-row
						>
					</v-col>
					<v-col no-gutters>
						<v-row no-gutters
							>주소 : {{ this.gameBasicInfo.gamePlaceAddress }}</v-row
						>
						<v-row no-gutters
							>경기장명 : {{ this.gameBasicInfo.gamePlaceName }}</v-row
						>
					</v-col>
				</v-row>
			</v-card>
		</v-container>
	</v-container>
</template>

<script>
	import GameAPI from '@/api/GameAPI.js';

	import DateUtil from '@/common/DateUtil.js';

	export default {
		props: {
			pGameSeq: Number,
		},
		data() {
			return {
				gameBasicInfo: {},
			};
		},
		methods: {
			async getGameBasicInfo() {
				console.log('getGameInfo 호출되는 시점');
				const params = {
					gameSeq: this.pGameSeq,
				};

				const res = await GameAPI.getGameBasicInfo(params);
				const gameInfo = res.data;

				const startTime = DateUtil.Format.toTime(gameInfo.gameStartTime);
				const endTime = DateUtil.Format.toTime(gameInfo.gameEndTime);
				this.gameBasicInfo = {
					gameYmd: DateUtil.Format.toYmd(gameInfo.gameYmd),
					gameTime: `${startTime} ~ ${endTime}`,
					gamePlaceAddress: gameInfo.gamePlaceAddress,
					gamePlaceName: gameInfo.gamePlaceName,
				};
			},
		},
		mounted() {
			console.log('마운트되는 시점');
			this.getGameBasicInfo();
		},
	};
</script>

<style lang="scss" scoped></style>
