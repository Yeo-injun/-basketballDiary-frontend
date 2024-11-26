<template>
	<v-container>
		<v-card>
			<v-row no-gutters>
				<v-col cols="12" sm="5">
					<HomeTeamScoreComp :pTeamScoreInfo="this.pHomeTeamScoreInfo" />
				</v-col>
				<v-col cols="12" sm="2">
					<ScoreInfoComp :pGameTypeCodeName="this.pGameTypeCodeName" />
				</v-col>
				<v-col cols="12" sm="5">
					<AwayTeamScoreComp :pTeamScoreInfo="this.pAwayTeamScoreInfo" />
				</v-col>
			</v-row>
		</v-card>
	</v-container>
</template>

<script>
	import HomeTeamScoreComp from '@/components/game/TeamScoreComp.vue';
	import AwayTeamScoreComp from '@/components/game/TeamScoreComp.vue';
	import ScoreInfoComp from '@/components/game/ScoreInfoComp.vue';

	export default {
		components: {
			HomeTeamScoreComp,
			AwayTeamScoreComp,
			ScoreInfoComp,
		},
		props: {
			pGameTypeCode		: String,
			pGameTypeCodeName	: String,
			pHomeTeamScoreInfo	: {
				type	: Object,
			},
			pAwayTeamScoreInfo	: {
				type	: Object,
			},
		},
	};
</script>

<style lang="scss" scoped></style>
