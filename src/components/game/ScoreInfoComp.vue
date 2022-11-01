<template>
	<v-container>
		<v-col align-self="center">
			<v-row no-gutters justify="center">
				{{ isGameScore }}
				{{ scoreInfo.gameTypeCodeName }}
			</v-row>
		</v-col>
	</v-container>
</template>

<script>
	export default {
		props: {
			pIsGameScore: Boolean,
			pScoreInfo: Object,
		},
		data() {
			return {
				isGameScore: this.pIsGameScore,
				scoreInfo: this.pScoreInfo,
			};
		},
	};
</script>

<style lang="scss" scoped></style>
