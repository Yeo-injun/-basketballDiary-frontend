<template>
	<v-card>
		<v-card-text>
			<div>경기일자 : {{ gameYmd }}</div>
			<div>
				경기장주소 : {{ gamePlaceAddress }} / 경기장명 : {{ gamePlaceName }}
			</div>
		</v-card-text>
		<!-- TotalScoreBoardComp -->
		<!-- QuarterBoardComp >> QuarterComp -->
	</v-card>
</template>

<script>
	export default {
		data() {
			return {
				gameYmd: '2022-10-27',
				gamePlaceAddress: '',
				gamePlaceName: '',
			};
		},
	};
</script>

<style lang="scss" scoped></style>
