<template>
	<v-container>
		<TeamSearchComp
			@on-cond-change="onSearchCondChange"
			@on-search="searchTeams"
		/>
		<TeamListPageSubTitle pTitleName="농구팀 목록" />

		<TeamListPagination
			:pList="teams"
			:pPagination="pagination"
			@click-page="searchTeams"
		>
			<template v-slot:itemSlot="data">
				<TeamComp :pTeam="data.item" />
			</template>
			<template v-slot:itemEmptySlot> 검색결과가 없습니다. </template>
		</TeamListPagination>
	</v-container>
</template>

<script>
	import TeamSearchComp from '@/views/team/list/components/TeamSearchComp.vue';
	import TeamListPageSubTitle from '@/components/title/FramePageSubTitle.vue';
	import TeamListPagination from '@/components/list/FramePaginationList.vue';
	import TeamComp from '@/views/team/list/components/TeamComp.vue';

	import TeamAPI from '@/api/TeamAPI.js';

	export default {
		components: {
			TeamSearchComp,
			TeamListPageSubTitle,
			TeamListPagination,
			TeamComp,
		},
		data() {
			return {
				searchCond: {},
				teams: [],
				pagination: {}, // 비어있는객체로 초기화해서 자식컴포넌트에 props 로 넘겨주면 초기화값 반영
			};
		},
		methods: {
			onSearchCondChange(cond) {
				this.searchCond.teamName = cond.teamName;
				this.searchCond.startDay = cond.startDay;
				this.searchCond.endDay = cond.endDay;
				this.searchCond.startTime = cond.startTime;
				this.searchCond.endTime = cond.endTime;
			},
			async searchTeams() {
				console.log(this.pagination);

				const { data } = await TeamAPI.searchTeamList({
					'team-name': this.searchCond.teamName,
					'start-day': this.searchCond.startDay,
					'end-day': this.searchCond.endDay,
					'start-time': this.searchCond.startTime,
					'end-time': this.searchCond.endTime,
					'page-no': this.pagination.pageNo,
				});
				// TODO API 메세지 속성명 변경 teams / pagination
				this.teams = data.teamDTOList;
				this.pagination = data.pagerDTO;
			},
		},
		mounted() {
			this.searchTeams();
		},
	};
</script>

<style lang="scss" scoped></style>
