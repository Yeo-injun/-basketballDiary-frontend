<template>
	<v-container>
		<TeamSearchMainTitle pTitleName="농구팀 검색" />
		<TeamSearchCondSubTitle pTitleName="검색조건" />
		<TeamSearchComp
			@on-cond-change="onSearchCondChange"
			@on-search="searchTeams"
		/>
		<TeamListSubTitle pTitleName="검색결과" />
		<TeamList
			:pList="teams"
			:pPagination="pagination"
			@click-page="searchTeams"
		>
			<template v-slot:itemSlot="data">
				<v-container>
					<TeamComp :pTeam="data.item" />
				</v-container>
			</template>
			<template v-slot:itemEmptySlot> 검색결과가 없습니다. </template>
		</TeamList>
	</v-container>
</template>

<script>
	import TeamSearchMainTitle from "@/components/title/FramePageMainTitle.vue";

	import TeamSearchCondSubTitle from '@/components/title/FramePageSubTitle.vue';
	import TeamSearchComp from '@/views/team/list/components/TeamSearchComp.vue';
	
	import TeamListSubTitle from '@/components/title/FramePageSubTitle.vue';
	import TeamList from '@/components/list/FramePaginationList.vue';
	import TeamComp from '@/views/team/list/components/TeamComp.vue';

	import TeamAPI from '@/api/TeamAPI.js';

	export default {
		components: {
			TeamSearchMainTitle,
			TeamSearchCondSubTitle,
			TeamSearchComp,
			TeamListSubTitle,
			TeamList,
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

				const { data } = await TeamAPI.searchTeams({
					'team-name': this.searchCond.teamName,
					'start-day': this.searchCond.startDay,
					'end-day': this.searchCond.endDay,
					'start-time': this.searchCond.startTime,
					'end-time': this.searchCond.endTime,
					'page-no': this.pagination.pageNo,
				});

				this.teams = data.teams;
				this.pagination = data.pagination;
			},
		},
		mounted() {
			this.searchTeams();
		},
	};
</script>

<style lang="scss" scoped></style>
