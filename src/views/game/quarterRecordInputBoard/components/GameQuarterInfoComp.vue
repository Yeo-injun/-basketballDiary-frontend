<template>
	<v-container>
		경기일자 : {{ this.pGameQuarterRecords.gameYmd }} / 경기시간 :
		{{ this.pGameQuarterRecords.gameStartTime }} ~
		{{ this.pGameQuarterRecords.gameEndTime }} / 쿼터시간 : 입력창 TODO
		<!-- TODO 컴포넌트를 경량화 시켜야 함. 불필요한 이벤트가 들어가 있음...!-->
		<GameQuarterComp
			:pQuarterCode="this.pGameQuarterRecords.quarterCode"
			:pTeamsQuarterRecords="this.pGameQuarterRecords"
		/>
	</v-container>
</template>

<script>
	import GameQuarterComp from '@/components/game/quarter/GameQuarterComp.vue';

	export default {
		components: {
			GameQuarterComp,
		},
		props: {
			pGameQuarterRecords: Object,
		},
	};
</script>

<style lang="scss" scoped></style>
