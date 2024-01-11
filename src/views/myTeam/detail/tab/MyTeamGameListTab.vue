/** * 화면ID : G004P01 * 화면명 : 농구게임 목록조회 */

<template>
	<v-container>
		<MyTeamGameRecordSearchComp />
		<div>총 {{ pagination.totalCount }}개</div>
		<MyTeamGameRecordList
			:pList="games"
			:pPagination="pagination"
			@click-page="searchMyTeamGames"
		>
			<template v-slot:itemSlot="data">
				<MyTeamGameRecordComp :pGame="data.item" :pTeamSeq="pTeamSeq" />
			</template>
			<template v-slot:itemEmptySlot> 경기 기록이 존재하지 않습니다. </template>
		</MyTeamGameRecordList>
	</v-container>
</template>

<script>
	/** Components */
	import MyTeamGameRecordSearchComp from '@/views/myTeam/detail/components/MyTeamGameRecordSearchComp.vue';
	import MyTeamGameRecordList from '@/components/list/FramePaginationList.vue';
	import MyTeamGameRecordComp from '@/views/myTeam/detail/components/MyTeamGameRecordComp.vue';

	/** Backend API */
	import MyTeamAPI from '@/api/MyTeamAPI';

	/** CODE */

	/** Utils */

	export default {
		components: {
			MyTeamGameRecordSearchComp,
			MyTeamGameRecordList,
			MyTeamGameRecordComp,
		},
		data() {
			return {
				games: [],
				pagination: {},
			};
		},
		props: {
			pTeamSeq: Number,
			pTeamName: String,
		},
		methods: {
			/* API052 : 소속팀 게임목록조회 */
			async searchMyTeamGames() {
				const { data } = await MyTeamAPI.searchMyTeamGames(
					{ teamSeq: this.pTeamSeq },
					{ pageNo: this.pagination.pageNo }
				);
				this.games = data.games;
				this.pagination = data.pagination;
			},
		},
		mounted() {
			this.searchMyTeamGames();
		},
	};
</script>

<style lang="scss" scoped></style>
