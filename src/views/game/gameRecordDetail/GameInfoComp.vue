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
				gameBasicInfo: function () {
					console.log('data가 호출되는 시점 ');
				},
			};
		},
		methods: {
			async getGameBasicInfo() {
				console.log('getGameInfo 호출되는 시점');
				const params = {
					gameSeq: this.pGameSeq,
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
			console.log('마운트되는 시점');
			this.getGameBasicInfo();
		},
	};
</script>

<style lang="scss" scoped></style>
