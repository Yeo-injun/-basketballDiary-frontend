<template>
	<v-container>
		TODO API048 게임쿼터기록 조회 붙이기
		<GameQuarterInfoFrame
			pQuarterCodeName="테스트"
			pQuarterTime="테스트"
			pHomeTeamRecords="테스트"
			pAwayTeamRecords="테스트"
		/>

		TODO 선수별 기록 조회 API 붙이기 / 목록 그리기
	</v-container>
</template>

<script>
	import GameQuarterInfoFrame from '@/components/game/quarter/GameQuarterInfoFrame.vue';

	export default {
		components: {
			GameQuarterInfoFrame,
		},
		props: {
			pGameQuarterRecords: Object,
		},
	};
</script>

<style lang="scss" scoped></style>
