/** * 화면ID : G002P01 * 화면명 : 게임기록 상세조회 * 생성일시 : 2022.12.29 *
작성자 : 여인준 * 작업일지 * 2022.12.29(목) 여인준 : 최초생성 */

<template>
	<v-container>
		<GameInfoComp :pGameSeq="this.gameSeq" />
		<GameJoinTeamsInfoComp :pGameSeq="this.gameSeq" />
		<GameJoinPlayersInfoComp :pGameSeq="this.gameSeq" />
		<GameQuartersComp :pGameSeq="this.gameSeq" />
		<GameDeletionBtn :pGameSeq="this.gameSeq" @delete-game="moveMyTeamPage" />
	</v-container>
</template>

<script>
	import GameInfoComp from '@/views/game/gameRecordDetail/GameInfoComp.vue';
	import GameJoinTeamsInfoComp from '@/views/game/gameRecordDetail/GameJoinTeamsInfoComp.vue';
	import GameJoinPlayersInfoComp from '@/views/game/gameRecordDetail/GameJoinPlayersInfoComp.vue';
	import GameQuartersComp from '@/views/game/gameRecordDetail/GameQuartersComp.vue';
	import GameDeletionBtn from '@/components/game/button/GameDeletionBtn.vue';

	export default {
		components: {
			GameInfoComp,
			GameJoinTeamsInfoComp,
			GameJoinPlayersInfoComp,
			GameQuartersComp,
			GameDeletionBtn,
		},
		data() {
			return {
				gameSeq: this.$route.params.gameSeq,
			};
		},
		methods: {
			moveMyTeamPage() {
				const routeParams = this.$route.params;
				this.$router.push({
					name: 'MyTeamPage',
					params: {
						teamSeq: routeParams.teamSeq,
						teamName: routeParams.teamName,
					},
				});
			},
		},
	};
</script>

<style lang="scss" scoped></style>
