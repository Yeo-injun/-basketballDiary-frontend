<template>
	<v-container>
		<v-card>
			<v-row no-gutters>
				<v-col cols="12" sm="5">
					<TeamScoreComp :pTeamScoreInfo="this.pHomeTeamScoreInfo" />
				</v-col>
				<v-col cols="12" sm="2">
					<ScoreInfoComp :pGameTypeCodeName="this.pGameTypeCodeName" />
				</v-col>
				<v-col cols="12" sm="5">
					<TeamScoreComp :pTeamScoreInfo="this.pAwayTeamScoreInfo" />
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
			pGameTypeCode		: String,
			pGameTypeCodeName	: String,
			pHomeTeamScoreInfo	: Object,
			pAwayTeamScoreInfo	: Object,
		},
	};
</script>

<style lang="scss" scoped></style>
