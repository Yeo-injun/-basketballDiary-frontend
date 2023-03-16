<template>
	<v-container>
		<v-card>
			<v-row no-gutters>
				<v-col cols="12" sm="4" align-self="center">
					<v-row no-gutters align-content="center" justify="center">
						<div v-if="this.isHomeTeam()">
							<QuarterTeamFoulComp :pFoulCnt="this.pTeamQuarterRecords.foul" />
						</div>
						<div v-else>
							<h2>{{ this.pTeamQuarterRecords.score }}</h2>
						</div>
					</v-row>
				</v-col>

				<v-col cols="12" sm="4">
					<v-row no-gutters justify="center">{{
						this.pTeamQuarterRecords.homeAwayCodeName
					}}</v-row>
					<v-row no-gutters justify="center">{{
						this.pTeamQuarterRecords.teamName
					}}</v-row>
				</v-col>

				<v-col cols="12" sm="4" align-self="center">
					<v-row no-gutters justify="center">
						<div v-if="this.isHomeTeam()">
							<h2>{{ this.pTeamQuarterRecords.score }}</h2>
						</div>
						<div v-else>
							<QuarterTeamFoulComp :pFoulCnt="this.pTeamQuarterRecords.foul" />
						</div>
					</v-row>
				</v-col>
			</v-row>
		</v-card>
	</v-container>
</template>

<script>
	import { HomeAwayCode } from '@/const/code/GameCode.js';

	import QuarterTeamFoulComp from '@/components/game/quarter/QuarterTeamFoulComp.vue';

	export default {
		components: {
			QuarterTeamFoulComp,
		},
		props: {
			pTeamQuarterRecords: Object,
		},
		methods: {
			isHomeTeam() {
				if (this.pTeamQuarterRecords.homeAwayCode == HomeAwayCode.HOME_TEAM) {
					return true;
				}
				return false;
			},
		},
	};
</script>

<style lang="scss" scoped></style>
