<template>
	<v-container>
		<h4>경기일자 : {{ this.gameYmd }}</h4>
		<h4>경기시간 : {{ this.gameStartTime }} ~{{ this.gameEndTime }}</h4>
	</v-container>
</template>

<script>
	import DateUtil from '@/common/DateUtil';

	export default {
		props: {
			pGameYmd 		:String,
			pGameStartTime	: String,
			pGameEndTime 	: String,
		},
		data() {
			return {
				gameYmd: this.intlGameYmd(),
				gameStartTime: this.intlGameStartTime(),
				gameEndTime: this.intlGameEndTime(),
			};
		},
		methods: {
			intlGameYmd() {
				return DateUtil.Format.toYmd(this.pGameYmd);
			},
			intlGameStartTime() {
				return DateUtil.Format.toTime(this.pGameStartTime);
			},
			intlGameEndTime() {
				return DateUtil.Format.toTime(this.pGameEndTime);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
