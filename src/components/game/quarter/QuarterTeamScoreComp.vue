<template>
	<v-container>
		<v-card>
			<v-row no-gutters>
				<v-col cols="12" sm="4" align-self="center">
					<v-row no-gutters align-content="center" justify="center">
						<!-- 파울기록Comp -->
						<div v-if="this.isHomeTeam()">파울</div>
						<!-- 점수Comp -->
						<div v-else>{{ this.gameTotalScore }}</div>
					</v-row>
				</v-col>
				<!-- HOME/AWAY여부  -->
				<v-col cols="12" sm="4">
					<v-row no-gutters justify="center">{{ this.homeAwayCodeName }}</v-row>
					<v-row no-gutters justify="center">{{ this.teamName }}</v-row>
				</v-col>
				<v-col cols="12" sm="4" align-self="center">
					<v-row no-gutters justify="center">
						<div v-if="this.isHomeTeam()">{{ this.gameTotalScore }}</div>
						<div v-else>파울</div>
					</v-row>
				</v-col>
			</v-row>
		</v-card>
	</v-container>
</template>

<script>
	export default {
		props: {
			pTeamScoreInfo: Object,
		},
		data() {
			return {
				teamName: this.pTeamScoreInfo.teamName,
				homeAwayCode: this.pTeamScoreInfo.homeAwayCode,
				homeAwayCodeName: this.pTeamScoreInfo.homeAwayCodeName,
				gameTotalScore: this.pTeamScoreInfo.gameTotalScore,
			};
		},
		methods: {
			isHomeTeam() {
				if (this.homeAwayCode == '01') {
					return true;
				}
				return false;
			},
		},
	};
</script>

<style lang="scss" scoped></style>
