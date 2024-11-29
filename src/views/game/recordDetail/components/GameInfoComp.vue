<template>
	<v-contianer>
		<div>
			<strong>경기일자 | </strong>{{ this.gameYmd }}
		</div>
		<div>
			<strong>경기시간 | </strong>{{ this.gameTime }}
		</div>
		<div>
			<strong>주소 | </strong>{{ this.gamePlaceAddress }}
		</div>
		<div>
			<strong>경기장명 | </strong>{{ this.gamePlaceName }}
		</div>
	</v-contianer>
</template>

<script>
	/** Backend API */
	import GameAPI from '@/api/GameAPI.js';

	/** Code */
	/** Utils */
	import DateUtil from '@/common/DateUtil.js';

	/** Components */
	/** Emit Event */


	export default {
		created() {
			this.getGameBasicInfo();
		},
		props: {
			pGameSeq: {
				type 	: String,
				default : "",
			}
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
	};
</script>

<style lang="scss" scoped></style>
