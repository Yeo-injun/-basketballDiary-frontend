<template>
	<v-row>
		<v-col>
			<HomeTeamTitle
				:pTeamName="this.pHomeTeamName"
				:pHomeAwayCode="this.pHomeTeamCode"
				:pHomeAwayCodeName="this.pHomeTeamCodeName"
				:pIsSelected="isSelectHomeTeam"
				@click-title="clickTeamTitle"
			/>
		</v-col>
		<v-col>
			<AwayTeamTitle
				:pTeamName="this.pAwayTeamName"
				:pHomeAwayCode="this.pAwayTeamCode"
				:pHomeAwayCodeName="this.pAwayTeamCodeName"
				:pIsSelected="isSelectAwayTeam"
				@click-title="clickTeamTitle"
			/>
		</v-col>
	</v-row>
</template>

<script>
	import { HomeAwayCode } from '@/const/code/GameCode.js';

	import HomeTeamTitle from '@/components/game/joinTeam/toggle/TeamTitleFrame.vue';
	import AwayTeamTitle from '@/components/game/joinTeam/toggle/TeamTitleFrame.vue';

	export default {
		components: {
			HomeTeamTitle,
			AwayTeamTitle,
		},
		props: {
			pHomeTeamName: String,
			pHomeTeamCode: String,
			pHomeTeamCodeName: String,

			pAwayTeamName: String,
			pAwayTeamCode: String,
			pAwayTeamCodeName: String,
		},
		data() {
			return {
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
