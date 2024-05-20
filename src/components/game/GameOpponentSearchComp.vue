<template>
	<v-container>
		<PageSubTitle pTitleName="상대팀 검색" />
		<v-text-field label="팀명" v-model="searchCond.teamName" />
		<v-text-field label="팀장이름" v-model="searchCond.leaderName" />
		<SearchBtn @do-search="search()" />

		<!-- Page처리 필요 -->
		<v-data-table
			:single-select="true"
			:headers="headers"
			:items="opponents"
			item-key="teamSeq"
			:options="{
				page 			: this.pagination.pageNo,
				itemsPerPage 	: this.pagination.rowCount,
			}"
			v-model="selectedOpponentInfo"
			hide-default-footer
			show-select
			class="elevation-1"
		/>

		<!-- 하단 페이지네이션 -->
		<div class="text-center pt-2">
			<v-pagination
				v-model="pagination.pageNo"
				:length="this.pagination.totalPageCount"
				@input="fetchPaginationItems()"
			/>
		</div>

	</v-container>
</template>

<script>
	/** Backend API */
	import GameAPI from '@/api/GameAPI.js';

	/** Code */
	/** Utils */
	import ValidationUtil from '@/common/util/ValidationUtil.js';

	/** Components */
	import PageSubTitle from '@/components/title/FramePageSubTitle.vue';
	import SearchBtn from '@/components/button/FrameSearchBtn.vue';

	/** Emit Event */

	// const FETCH_SEARCH_BUTTON 	= "search";
	// const FETCH_PAGINATION		= "pagination";
	export default {
		components: {
			PageSubTitle,
			SearchBtn,
		},
		data() {
			return {
				pagable : false,
				searchCond: {
					teamName	: '',
					leaderName	: '',
				},
				headers: [
					{ text: '팀ID', value: 'teamSeq' },
					{ text: '팀명', value: 'teamName' },
					{ text: '팀장이름', value: 'leaderName' },
					{ text: '설립일자', value: 'foundationYmd' },
					{ text: '활동지역', value: 'hometown' },
				],
				// 페이징 기본 값 세팅 
				pagination : {
					pageNo 			: 1,
					rowCount 		: 5,
					totalPageCount 	: 1,
				},
				opponents: [],
				selectedOpponentInfo: [],
			};
		},
		// data의 상태를 감지하여 emit함
		watch: {
			selectedOpponentInfo(selected) {
				if (ValidationUtil.isNotNull(selected)) {
					const teamSeq = selected[0].teamSeq;
					this.$emit('select-opponent', teamSeq);
					return;
				}
			},
			searchCond : {
				deep : true,
				handler() {
					// 검색조건이 변경되면 페이징 클릭으로 조회 못하게끔 제어
					this.pagable = false;
				},
			}
		},
		methods: {
			search() {
				this.getOpponents({
					teamName	: this.searchCond.teamName		,
					leaderName	: this.searchCond.leaderName	,
					pageNo		: 1								,
				})
			},
			fetchPaginationItems( pageNo ) {
				// 페이징 조회 가능여부 판단 - 조회 조건 변경여부로 ( 조회조건 변경후 페이지 클릭을 하면 총 조회 결과가 최초 선택한 페이지 수와 불일치하는 경우 발생하기 때문 )
				if ( !this.pagable ) {
					alert( "검색조건이 변경되었습니다. 검색버튼을 눌럭 검색해주시기 바랍니다." );
					return;
				}
				if ( pageNo > 0 ) {
					this.pagination.pageNo = pageNo;
				}
				this.getOpponents({
					teamName	: this.searchCond.teamName		,
					leaderName	: this.searchCond.leaderName	,
					pageNo		: this.pagination.pageNo		,
				})
			},
			async getOpponents( searchParams ) {
				/** API044 상대팀 목록 조회 */
				const { data } = await GameAPI.searchOpponents( searchParams );
				this.opponents 		= data.opponents;
				this.pagination		= data.pagination;
				this.pagable		= true;
			},
		},
		mounted() {
			this.getOpponents({ pageNo : 1, });
		},
	};
</script>

<style lang="scss" scoped></style>
