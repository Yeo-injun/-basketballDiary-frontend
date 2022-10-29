<template>
	<v-container>
		<v-card>
			<v-row no-gutters>
				<v-col cols="12" sm="4" align-self="center">
					<v-row no-gutters align-content="center" justify="center">
						<!-- 파울기록Comp -->
						<div v-if="this.isHomeTeam()">파울</div>
						<!-- 점수Comp -->
						<div v-else>점수</div>
					</v-row>
				</v-col>
				<!-- HOME/AWAY여부  -->
				<v-col cols="12" sm="4">
					<v-row no-gutters justify="center">HOME</v-row>
					<v-row no-gutters justify="center">라텔즈</v-row>
				</v-col>
				<v-col cols="12" sm="4" align-self="center">
					<v-row no-gutters justify="center">
						<div v-if="this.isHomeTeam()">점수</div>
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
			pHomeAwayCode: String,
			pIsGameScore: Boolean,
			pTeamScoreInfo: Object,
		},
		data() {
			return {
				homeAwayCode: this.pHomeAwayCode,
				isGameScore: this.pIsGameScore,
				teamScoreInfo: this.pTeamScoreInfo,
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
