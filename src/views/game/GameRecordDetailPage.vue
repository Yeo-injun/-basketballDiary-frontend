/** * 화면ID : G002P01 * 화면명 : 게임기록 상세조회 * 생성일시 : 2022.12.29 *
작성자 : 여인준 * 작업일지 * 2022.12.29(목) 여인준 : 최초생성 */

<template>
	<v-container>
		<GameInfoComp :pGameSeq="this.gameSeq" />
		<GameJoinTeamsInfoComp :pGameSeq="this.gameSeq" />
		<GameJoinPlayersInfoComp :pGameSeq="this.gameSeq" />
		<h2>경기기록</h2>
	</v-container>
</template>

<script>
	import GameInfoComp from '@/views/game/gameRecordDetail/GameInfoComp.vue';
	import GameJoinTeamsInfoComp from '@/views/game/gameRecordDetail/GameJoinTeamsInfoComp.vue';
	import GameJoinPlayersInfoComp from '@/views/game/gameRecordDetail/GameJoinPlayersInfoComp.vue';

	export default {
		components: {
			GameInfoComp,
			GameJoinTeamsInfoComp,
			GameJoinPlayersInfoComp,
		},
		data() {
			return {
				routeCompName: 'GameJoinTeamSelectionPage',
				gameSeq: this.$route.params.gameSeq,
			};
		},
	};
</script>

<style lang="scss" scoped></style>
