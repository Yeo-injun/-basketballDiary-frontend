<template>
	<v-container>
		<v-card>
			<v-row no-gutters>
				<v-col cols="12" sm="5">
					<QuarterTeamScoreComp :pTeamScoreInfo="this.homeTeam" />
				</v-col>
				<v-col cols="12" sm="2">
					<QuarterTimeComp :pGameTypeCodeName="this.gameTypeCodeName" />
				</v-col>
				<v-col cols="12" sm="5">
					<QuarterTeamScoreComp :pTeamScoreInfo="this.awayTeam" />
				</v-col>
			</v-row>
		</v-card>
	</v-container>
</template>

<script>
	import QuarterTeamScoreComp from '@/components/game/quarter/QuarterTeamScoreComp.vue';
	import QuarterTimeComp from '@/components/game/quarter/QuarterTimeComp.vue';

	export default {
		components: {
			QuarterTeamScoreComp,
			QuarterTimeComp,
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
