/** * 화면ID : G004P01 * 화면명 : 농구게임 목록조회 */

<template>
	<v-container>
		<h3>소속팀(변수처리)</h3>
		<h4>게임목록조회</h4>
		<GameRecordSearchComp />
		<!-- 목록영역 컴포넌트 : 소제목 포함 / item 반복문 -->
		<div>총 {{ gameCount }}개</div>
		<v-container v-for="game in games" :key="game.gameSeq">
			<GameRecordComp :pGame="game" />
		</v-container>
	</v-container>
</template>

<script>
	import myTeamAPI from '@/api/MyTeamAPI.js';

	import GameRecordSearchComp from '@/components/game/GameRecordSearchComp.vue';
	import GameRecordComp from '@/components/game/GameRecordComp.vue';

	export default {
		components: {
			GameRecordSearchComp,
			GameRecordComp,
		},
		data() {
			return {
				games: [],
				gameCount: 0,
			};
		},
		methods: {
			async searchMyTeamGames() {
				// TODO 검색조건반영하기
				const params = {
					teamSeq: 7,
				};

				const response = await myTeamAPI.searchMyTeamGames(params);
				this.games = response.data;
				this.gameCount = response.data.length;
			},
		},
		mounted() {
			this.searchMyTeamGames();
		},
	};
</script>

<style lang="scss" scoped></style>
