<template>
	<v-container>
		<v-card>
			<v-row no-gutters>
				<v-col cols="12" sm="4" align-self="center">
					<v-row no-gutters align-content="center" justify="center">
						<div v-if="this.isHomeTeam()">
							<QuarterTeamFoulComp :pFoulCnt="this.foulCnt" />
						</div>
						<div v-else>
							{{ this.score }}
						</div>
					</v-row>
				</v-col>

				<v-col cols="12" sm="4">
					<v-row no-gutters justify="center">{{ this.homeAwayCodeName }}</v-row>
					<v-row no-gutters justify="center">{{ this.teamName }}</v-row>
				</v-col>

				<v-col cols="12" sm="4" align-self="center">
					<v-row no-gutters justify="center">
						<div v-if="this.isHomeTeam()">
							{{ this.score }}
						</div>
						<div v-else>
							<QuarterTeamFoulComp :pFoulCnt="this.foulCnt" />
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
		data() {
			return {
				teamName: this.pTeamQuarterRecords.teamName,
				homeAwayCode: this.pTeamQuarterRecords.homeAwayCode,
				homeAwayCodeName: this.pTeamQuarterRecords.homeAwayCodeName,
				score: this.pTeamQuarterRecords.score,
				foulCnt: this.pTeamQuarterRecords.foul,
			};
		},
		methods: {
			isHomeTeam() {
				if (this.homeAwayCode == HomeAwayCode.HOME_TEAM) {
					return true;
				}
				return false;
			},
		},
	};
</script>

<style lang="scss" scoped></style>
