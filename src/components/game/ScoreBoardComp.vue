<template>
	<v-container>
		<v-card>
			<v-row no-gutters>
				<v-col cols="12" sm="5">
					<TeamScoreComp
						:pHomeAwayCode="pHomeAwayCode01"
						:pIsGameScore="pIsGameScore"
						:pTeamScoreInfo="pHomeTeamScoreInfo"
					/>
				</v-col>
				<v-col cols="12" sm="2">
					<ScoreInfoComp pIsGameScore="true" :pSorceInfo="pScoreInfo" />
				</v-col>
				<v-col cols="12" sm="5">
					<TeamScoreComp
						:pHomeAwayCode="pHomeAwayCode02"
						:pIsGameScore="pIsGameScore"
						:pTeamScoreInfo="pHomeTeamScoreInfo"
					/>
				</v-col>
			</v-row>
		</v-card>
	</v-container>
</template>

<script>
	import TeamScoreComp from '@/components/game/TeamScoreComp.vue';
	import ScoreInfoComp from '@/components/game/ScoreInfoComp.vue';

	export default {
		components: {
			TeamScoreComp,
			ScoreInfoComp,
		},
		data() {
			return {
				pHomeAwayCode01: '01',
				pHomeAwayCode02: '02',
				pIsGameScore: true,
				pHomeTeamScoreInfo: {},
				pSocreInfo: {
					gameTypeCode: '01',
					gameTypeCodeName: '자체전',
				},
			};
		},
		setup() {
			return {};
		},
	};
</script>

<style lang="scss" scoped></style>
