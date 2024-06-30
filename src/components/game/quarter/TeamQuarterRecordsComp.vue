<template>
	<v-container>
		<v-card>
			<v-row no-gutters>

				<v-col v-if="this.isAwayTeam()" cols="12" sm="5" align-self="center">
					<v-row no-gutters align-content="center" justify="center">
						<h2>{{ this.pTeamQuarterRecords.score }}</h2>
					</v-row>
					<v-row no-gutters align-content="center" justify="center">
						<FoulCountComp :pFoulCnt="this.pTeamQuarterRecords.foul" />
					</v-row>

				</v-col>

				<v-col cols="12" sm="7" align-self="center">
					<v-row no-gutters justify="center">
						{{ this.pTeamQuarterRecords.homeAwayCodeName }}
					</v-row>
					<v-row no-gutters justify="center">
						{{ this.pTeamQuarterRecords.teamName }}
					</v-row>
				</v-col>

				<v-col v-if="this.isHomeTeam()" cols="12" sm="5" align-self="center">
					<v-row no-gutters align-content="center" justify="center">
						<h2>{{ this.pTeamQuarterRecords.score }}</h2>
					</v-row>
					<v-row no-gutters align-content="center" justify="center">
						<FoulCountComp :pFoulCnt="this.pTeamQuarterRecords.foul" />
					</v-row>
				</v-col>
			</v-row>
		</v-card>
	</v-container>
</template>

<script>
	import { HomeAwayCode } from '@/const/code/GameCode.js';
	import FoulCountComp from '@/components/game/stat/FoulCountComp.vue';

	export default {
		components: {
			FoulCountComp,
		},
		props: {
			pTeamQuarterRecords: Object,
		},
		methods: {
			isHomeTeam() {
				return this.pTeamQuarterRecords.homeAwayCode == HomeAwayCode.HOME_TEAM;
			},
			isAwayTeam() {
				return this.pTeamQuarterRecords.homeAwayCode == HomeAwayCode.AWAY_TEAM;

			},
		},
	};
</script>

<style lang="scss" scoped></style>
