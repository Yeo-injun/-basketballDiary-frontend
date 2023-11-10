/** * 화면ID : G004P01 * 화면명 : 농구게임 목록조회 */

<template>
	<v-container>
		<h2>{{ teamName }} 게임목록조회</h2>
		<MyTeamGameRecordSearchComp />
		<div>총 {{ pagination.totalCount }}개</div>
		<MyTeamGameRecordComp
			v-for="game in games"
			:key="game.gameSeq"
			:pGame="game"
			:pTeamSeq="pTeamSeq"
		/>
		<v-pagination
			v-model="pagination.pageNo"
			:length="pagination.totalPageCount"
			@input="searchMyTeamGamesWithPagination"
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
				pagination: PaginationUtil.getIntlPager(),
			};
		},
		props: {
			pTeamSeq: Number,
		},
		methods: {
			/* API052 : 소속팀 게임목록조회 */
			async searchMyTeamGames(pageNo) {
				const { data } = await MyTeamAPI.searchMyTeamGames(
					{ teamSeq: this.teamSeq },
					{ pageNo: pageNo }
				);
				this.games = data.games;
				this.pagination = data.pagination;
			},
			/** v-pagination @input이벤트 - page번호가 바뀌면 바뀐 page번호가 이벤트 handler의 인자로 들어옴 */
			searchMyTeamGamesWithPagination(pageNo) {
				this.searchMyTeamGames(pageNo);
			},
		},
		mounted() {
			this.searchMyTeamGames();
		},
	};
</script>

<style lang="scss" scoped></style>
