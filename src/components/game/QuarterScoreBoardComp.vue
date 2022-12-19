<template>
	<v-container>
		<v-row>
			<v-col cols="12" sm="5">
				<QuarterScoreComp :pScore="this.homeTeamQuarterScore" />
			</v-col>
			<v-col cols="12" sm="2"></v-col>
			<v-col cols="12" sm="5">
				<QuarterScoreComp :pScore="this.awayTeamQuarterScore" />
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import QuarterScoreComp from '@/components/game/QuarterScoreComp.vue';

	export default {
		components: {
			QuarterScoreComp,
		},
		props: {
			pQuarterScore: Object,
		},
		data() {
			return {
				homeTeamQuarterScore: this.pQuarterScore.homeTeam,
				awayTeamQuarterScore: this.pQuarterScore.awayTeam,
			};
		},
	};
</script>

<style lang="scss" scoped></style>
