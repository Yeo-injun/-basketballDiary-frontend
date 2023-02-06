/** * 화면ID : G004P01 * 화면명 : 농구게임 목록조회 */

<template>
	<v-container>
		<h2>{{ teamName }} 게임목록조회</h2>
		<MyTeamGameRecordSearchComp />
		<!-- 목록영역 컴포넌트 : 소제목 포함 / item 반복문 -->
		<div>총 {{ gameCount }}개</div>
		<v-container v-for="game in games" :key="game.gameSeq">
			<MyTeamGameRecordComp :pGame="game" />
		</v-container>
	</v-container>
</template>

<script>
	import MyTeamAPI from '@/api/MyTeamAPI.js';

	import MyTeamGameRecordSearchComp from '@/views/myTeam/detail/components/MyTeamGameRecordSearchComp.vue';
	import MyTeamGameRecordComp from '@/views/myTeam/detail/components/MyTeamGameRecordComp.vue';

	export default {
		components: {
			MyTeamGameRecordSearchComp,
			MyTeamGameRecordComp,
		},
		data() {
			return {
				searchCond: {
					teamSeq: this.$route.params.pTeamSeq,
					// TODO GameRecordSearchComp에서 이벤트가 발생할때마다 검색조건 세팅
				},
				games: [],
				// TODO 페이지네이션 추가 필요
				gameCount: 0,
				teamName: this.$route.params.pTeamName,
			};
		},
		methods: {
			/* API052 : 소속팀 게임목록조회 */
			async searchMyTeamGames() {
				const response = await MyTeamAPI.searchMyTeamGames(this.searchCond);
				this.games = response.data;
				this.gameCount = response.data.length; // TODO API에서 페이징 처리를 하면 해당 값을 반영해야 함.
			},
		},
		mounted() {
			this.searchMyTeamGames();
		},
	};
</script>

<style lang="scss" scoped></style>
