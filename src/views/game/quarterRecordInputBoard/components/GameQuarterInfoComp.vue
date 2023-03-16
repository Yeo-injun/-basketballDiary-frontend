<template>
	<v-container>
		<h3>TODO 쿼터시간 입력창 - selectBox로 30초 단위 00:00 ~ 10:00</h3>
		경기일자 : {{ this.pGameQuarterRecords.gameYmd }} / 경기시간 :
		{{ this.pGameQuarterRecords.gameStartTime }} ~
		{{ this.pGameQuarterRecords.gameEndTime }} / 쿼터시간 : 입력창 TODO
		<v-container>
			<GameQuarterInfoFrame
				:pQuarterCodeName="this.pGameQuarterRecords.quarterCodeName"
				:pQuarterTime="this.pGameQuarterRecords.quarterTime"
				:pHomeTeamRecords="this.pGameQuarterRecords.homeTeamRecords"
				:pAwayTeamRecords="this.pGameQuarterRecords.awayTeamRecords"
			/>
		</v-container>
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
