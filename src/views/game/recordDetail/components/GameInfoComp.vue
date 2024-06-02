<template>
	<v-container>
		<v-container>
			<GameInfoTitle pTitleName="경기정보" />
			<v-card>
				<v-row>
					<v-col no-gutters>
						<v-row no-gutters
							>경기일자 : {{ this.gameYmd }}</v-row
						>
						<v-row no-gutters
							>경기시간 : {{ this.gameTime }}</v-row
						>
					</v-col>
					<v-col no-gutters>
						<v-row no-gutters
							>주소 : {{ this.gamePlaceAddress }}</v-row
						>
						<v-row no-gutters
							>경기장명 : {{ this.gamePlaceName }}</v-row
						>
					</v-col>
				</v-row>
			</v-card>
		</v-container>
	</v-container>
</template>

<script>
	/** Backend API */
	import GameAPI from '@/api/GameAPI.js';

	/** Code */
	/** Utils */
	import DateUtil from '@/common/DateUtil.js';

	/** Components */
	import GameInfoTitle from '@/components/title/FramePageSubTitle.vue';
	/** Emit Event */


	export default {
		components :{
			GameInfoTitle,
		},
		props: {
			pGameSeq: String,
		},
		data() {
			return {
				gameYmd				: "",
				gameTime			: "",
				gamePlaceAddress	: "",
				gamePlaceName		: "",
			};
		},
		methods: {
			async getGameBasicInfo() {

				const { data } = await GameAPI.getGameBasicInfo({
					gameSeq: this.pGameSeq,
				});
				const gameInfo = data;

				const startTime = DateUtil.Format.toTime(gameInfo.gameStartTime);
				const endTime 	= DateUtil.Format.toTime(gameInfo.gameEndTime);
				this.gameYmd			= DateUtil.Format.toYmd(gameInfo.gameYmd);
				this.gameTime			= `${startTime} ~ ${endTime}`;
				this.gamePlaceAddress	= gameInfo.gamePlaceAddress;
				this.gamePlaceName		= gameInfo.gamePlaceName;
			},
		},
		mounted() {
			this.getGameBasicInfo();
		},
	};
</script>

<style lang="scss" scoped></style>
