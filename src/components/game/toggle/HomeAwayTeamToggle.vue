<template>
	<v-row>
		<v-col>
			<HomeTeamTitle
				:pTeamName="this.pHomeTeamName"
				:pHomeAwayCodeName="this.pHomeTeamCodeName"
				:pHomeAwayCode="this.homeTeamCode"
				:pIsSelected="isSelectHomeTeam"
				@click-title="clickTeamTitle"
			/>
		</v-col>
		<v-col>
			<AwayTeamTitle
				:pTeamName="this.pAwayTeamName"
				:pHomeAwayCodeName="this.pAwayTeamCodeName"
				:pHomeAwayCode="this.awayTeamCode"
				:pIsSelected="isSelectAwayTeam"
				@click-title="clickTeamTitle"
			/>
		</v-col>
	</v-row>
</template>

<script>
	import { HomeAwayCode } from '@/const/code/GameCode.js';

	import HomeTeamTitle from '@/components/game/toggle/TeamTitleFrame.vue';
	import AwayTeamTitle from '@/components/game/toggle/TeamTitleFrame.vue';

	export default {
		components: {
			HomeTeamTitle,
			AwayTeamTitle,
		},
		props: {
			pHomeTeamName: String,
			pHomeTeamCodeName : {
				type : String,
				default() {
					return "홈팀";
				},
			},
			pAwayTeamName: String,
			pAwayTeamCodeName: {
				type : String,
				default() {
					return "어웨이팀";
				},
			},
		},
		data() {
			return {
				homeTeamCode: HomeAwayCode.HOME_TEAM,
				awayTeamCode: HomeAwayCode.AWAY_TEAM,
				isSelectHomeTeam: true,
				isSelectAwayTeam: false,
			};
		},
		methods: {
			clickTeamTitle(params) {
				const homeAwayCode = params.homeAwayCode;
				if (HomeAwayCode.HOME_TEAM == homeAwayCode) {
					this.isSelectHomeTeam = true;
					this.isSelectAwayTeam = false;
				} else {
					this.isSelectHomeTeam = false;
					this.isSelectAwayTeam = true;
				}
				this.$emit('select-home-away-team', {
					homeAwayCode: homeAwayCode,
				});
			},
		},
	};
</script>

<style lang="scss" scoped></style>
