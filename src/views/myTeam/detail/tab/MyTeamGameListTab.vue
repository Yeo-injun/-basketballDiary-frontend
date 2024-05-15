/** * 화면ID : G004P01 * 화면명 : 농구게임 목록조회 */

<template>
	<v-container>
		<MyTeamGameRecordSearchComp @do-search="searchMyTeamGames"/>
		<div>총 {{ pagination.totalCount }}개</div>
		<MyTeamGameRecordList
			:pList="games"
			:pPagination="pagination"
			@click-page="searchMyTeamGames"
		>
		<!-- TODO 참가팀 선택단계에서 임시저장된 건 조회시 오류 발생 ( null객체가 전달되는 것으로 추정됨 )-->
			<template v-slot:itemSlot="data">
				<MyTeamGameRecordComp :pGame="data.item" :pTeamSeq="pTeamSeq" />
			</template>
			<template v-slot:itemEmptySlot> 경기 기록이 존재하지 않습니다. </template>
		</MyTeamGameRecordList>
	</v-container>
</template>

<script>
	/** Backend API */
	import MyTeamAPI from '@/api/MyTeamAPI';

	/** Code */
	/** Utils */
	import ValidationUtil from '@/common/util/ValidationUtil';

	/** Components */
	import MyTeamGameRecordSearchComp from '@/views/myTeam/detail/components/MyTeamGameRecordSearchComp.vue';
	import MyTeamGameRecordList from '@/components/list/FramePaginationList.vue';
	import MyTeamGameRecordComp from '@/views/myTeam/detail/components/MyTeamGameRecordComp.vue';
	/** Emit Event */

	export default {
		components: {
			MyTeamGameRecordSearchComp,
			MyTeamGameRecordList,
			MyTeamGameRecordComp,
		},
		data() {
			return {
				/**
				 * cf. prop를 이용하여 상위컴포넌트의 데이터를 하위컴포넌트로 전달하여 렌더링시 주의점
				 * - Props로 전달받은 데이터를 컴포넌트 data로 관리하여 해당 data속성을 컴포넌트에 관리할시 props 변경값이 반영되지 않음.
				 * - Props로 내린 값을 상위컴포넌트 변경하여 하위 컴포넌트에서 변경된 Props값을 보여주려면 props 속성 그대로 하위컴포넌트에서 사용해야 함.  
				 */
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
			async searchMyTeamGames( searchCond ) {

				const { data } = await MyTeamAPI.searchMyTeamGames(
					{ teamSeq: this.pTeamSeq },
					this.toQueryParams( searchCond ),
				);
				this.games = data.games;
				this.pagination = data.pagination;
			},
			toQueryParams( searchCond ) {
				if ( ValidationUtil.isNotNull( searchCond ) ) {
					return {
						pageNo			: this.pagination.pageNo,
						gameBgngYmd		: searchCond.gameStartYmd	,
						gameEndYmd		: searchCond.gameEndYmd		,
						gameTypeCode	: searchCond.gameTypeCode	,
						homeAwayCode	: searchCond.homeAwayCode	,
						gamePlaceName	: searchCond.gamePlaceName	,
					}
				}
				return { pageNo: this.pagination.pageNo };
			},
		},
		mounted() {
			this.searchMyTeamGames();
		},
	};

</script>

<style lang="scss" scoped></style>
