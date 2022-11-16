<template>
	<v-container>
		<v-card>
			<v-row no-gutters>
				<v-col cols="12" sm="5">
					<TeamScoreComp :pTeamScoreInfo="this.homeTeam" />
				</v-col>
				<v-col cols="12" sm="2">
					<ScoreInfoComp :pGameTypeCodeName="this.gameTypeCodeName" />
				</v-col>
				<v-col cols="12" sm="5">
					<TeamScoreComp :pTeamScoreInfo="this.awayTeam" />
				</v-col>
			</v-row>
		</v-card>
	</v-container>
</template>

<script>
	import TeamScoreComp from '@/components/game/TeamScoreComp.vue';
	import ScoreInfoComp from '@/components/game/ScoreInfoComp.vue';

	export default {
		components: {
			TeamScoreComp,
			ScoreInfoComp,
		},
		props: {
			pGameScore: Object,
		},
		data() {
			return {
				gameTypeCode: this.pGameScore.gameTypeCode,
				gameTypeCodeName: this.pGameScore.gameTypeCodeName,
				homeTeam: this.pGameScore.homeTeam,
				awayTeam: this.pGameScore.awayTeam,
			};
		},
		setup() {
			return {};
		},
	};
</script>

<style lang="scss" scoped></style>
