/** * 화면ID : G004P01 * 화면명 : 농구게임 목록조회 */

<template>
	<v-container>
		<h2>{{ teamName }} 게임목록조회</h2>
		<MyTeamGameRecordSearchComp />
		<!-- 목록영역 컴포넌트 : 소제목 포함 / item 반복문 -->
		<div>총 {{ gameCount }}개</div>
		<v-container v-for="game in games" :key="game.gameSeq">
			<MyTeamGameRecordComp :pGame="game" :pTeamSeq="pTeamSeq" />
		</v-container>
		<v-pagination
			v-model="pagination.pageNo"
			:length="pagination.totalPageCount"
			@input="getMyTeamsWithPagination"
		/>
	</v-container>
</template>

<script>
	import MyTeamAPI from '@/api/MyTeamAPI.js';

	import MyTeamGameRecordSearchComp from '@/views/myTeam/detail/components/MyTeamGameRecordSearchComp.vue';
	import MyTeamGameRecordComp from '@/views/myTeam/detail/components/MyTeamGameRecordComp.vue';

	import PaginationUtil from '@/common/util/PaginationUtil.js';

	export default {
		components: {
			MyTeamGameRecordSearchComp,
			MyTeamGameRecordComp,
		},
		data() {
			const query = this.$route.query;
			return {
				teamSeq: query.teamSeq,
				teamName: query.pTeamName,
				games: [],
				// TODO 페이지네이션 추가 필요
				gameCount: 0,
				pagination: PaginationUtil.getIntlPager(),
			};
		},
		props: {
			pTeamSeq: Number,
		},
		methods: {
			/* API052 : 소속팀 게임목록조회 */
			async searchMyTeamGames() {
				const params = {
					teamSeq: this.teamSeq,
				};
				const response = await MyTeamAPI.searchMyTeamGames(params);
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
