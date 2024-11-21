<template>
	<v-container>
		<v-card>
			<v-row no-gutters>
				<v-col cols="12" sm="4" align-self="center">
					<v-row no-gutters align-content="center" justify="center">
						<!-- 파울기록Comp -->
						<div v-if="this.isHomeTeam()">파울</div>
						<div v-if="this.isAwayTeam()">{{ this.intlData.gameTotalScore }}</div>
					</v-row>
				</v-col>
				<!-- HOME/AWAY여부  -->
				<v-col cols="12" sm="4">
					<v-row no-gutters justify="center">{{ this.intlData.homeAwayCodeName }}</v-row>
					<v-row no-gutters justify="center">{{ this.intlData.teamName }}</v-row>
				</v-col>
				<v-col cols="12" sm="4" align-self="center">
					<v-row no-gutters justify="center">
						<div v-if="this.isHomeTeam()">{{ this.intlData.gameTotalScore }}</div>
						<div v-if="this.isAwayTeam()">파울</div>
					</v-row>
				</v-col>
			</v-row>
		</v-card>
	</v-container>
</template>

<script>
	import { HomeAwayCode } from '@/const/code/GameCode';
	export default {
		// props의 각 속성 default()는 해당 속성이 props로 넘어오지 않을때만 실행됨 ( null이 넘어오면 default()는 실행되지 않음 )
		props: {
			pTeamScoreInfo: {
				type	: Object,
			},
		},
		computed: {
			intlData() {
				return this.pTeamScoreInfo || {};
			},
		},
		methods: {
			isHomeTeam() {
				return HomeAwayCode.HOME_TEAM == this.intlData.homeAwayCode;
			},
			isAwayTeam() {
				return HomeAwayCode.AWAY_TEAM == this.intlData.homeAwayCode;
			}
		},
	};
</script>

<style lang="scss" scoped></style>
