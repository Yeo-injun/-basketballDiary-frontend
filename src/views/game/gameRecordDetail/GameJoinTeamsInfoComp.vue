<template>
	<v-container>
		<h2>팀 정보</h2>
		<v-container>
			<v-row dense>
				<HomeTeamInfoComp
					:pGameJoinTeamInfo="pGameJoinTeamsInfo.homeTeamInfo"
				/>
				<AwayTeamInfoComp
					:pGameJoinTeamInfo="pGameJoinTeamsInfo.awayTeamInfo"
				/>
			</v-row>
		</v-container>
	</v-container>
</template>

<script>
	import HomeTeamInfoComp from '@/views/game/gameRecordDetail/GameJoinTeamInfoComp.vue';
	import AwayTeamInfoComp from '@/views/game/gameRecordDetail/GameJoinTeamInfoComp.vue';

	export default {
		components: {
			HomeTeamInfoComp,
			AwayTeamInfoComp,
		},
		props: {
			pGameJoinTeamsInfo: Object,
		},
	};
</script>

<style lang="scss" scoped></style>
