<template>
	<v-container>
		<v-card>
			<v-row no-gutters>
				<v-col cols="12" sm="4" align-self="center">
					<v-row no-gutters align-content="center" justify="center">
						<div v-if="this.isHomeTeam()">
							<FoulCountComp :pFoulCnt="this.pTeamQuarterRecords.foul" />
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
							<FoulCountComp :pFoulCnt="this.pTeamQuarterRecords.foul" />
						</div>
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
				if (this.pTeamQuarterRecords.homeAwayCode == HomeAwayCode.HOME_TEAM) {
					return true;
				}
				return false;
			},
		},
	};
</script>

<style lang="scss" scoped></style>
