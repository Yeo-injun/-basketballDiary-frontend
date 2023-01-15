<template>
	<v-container>
		<h2>경기 정보</h2>
		<v-card>
			<v-row>
				<v-col no-gutters>
					<v-row no-gutters>경기일자 : {{ this.pGameInfo.gameYmd }}</v-row>
					<v-row no-gutters>경기시간 : {{ this.pGameInfo.gameTime }}</v-row>
				</v-col>
				<v-col no-gutters>
					<v-row no-gutters>주소 : {{ this.pGameInfo.gamePlaceAddress }}</v-row>
					<v-row no-gutters
						>경기장명 : {{ this.pGameInfo.gamePlaceName }}</v-row
					>
				</v-col>
			</v-row>
		</v-card>
	</v-container>
</template>

<script>
	// import DateUtil from '@/common/DateUtil.js';

	export default {
		props: {
			pGameInfo: Object,
		},
		// data() {
		// 	return {
		// 		gameYmd: DateUtil.Format.toYmd(this.pGameInfo.gameYmd),
		// 		gameAddress: this.pGameInfo.gamePlaceAddress,
		// 		gameTime: this.pGameInfo.gameYmd,
		// 		gamePlaceName: this.pGameInfo.gamePlaceName,
		// 	};
		// },
		// methods: {
		// 	setGameInfo() {
		// 		this.gameYmd = DateUtil.Format.toYmd(this.pGameInfo.gameYmd);
		// 		this.gameAddress = this.pGameInfo.gamePlaceAddress;
		// 		this.gameTime = this.pGameInfo.gameYmd;
		// 		this.gamePlaceName = this.pGameInfo.gamePlaceName;
		// 	},
		// },

		// mounted() {
		// 	this.setGameInfo();
		// },
	};
</script>

<style lang="scss" scoped></style>
