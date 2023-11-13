<template>
	<v-container>
		<TeamSearchComp @on-cond-change="onCondChange" @on-search="searchTeams" />
		<!-- 팀목록 : TODO 팀정보 컴포넌트 만들기 -->

		<TeamListPageSubTitle pTitleName="농구팀 목록" />

		<v-container v-for="(item, index) in teamList" :key="index">
			<TeamComp v-bind:pTeam="item" />
		</v-container>
		<v-container v-if="teamList.length == 0">
			검색 조건에 맞는 팀이 없습니다!
		</v-container>
		<div class="text-center">
			<v-pagination
				v-model="pagination.pageNo"
				:length="pagination.totalPageCount"
				@input="searchTeams"
			/>
		</div>
	</v-container>
</template>

<script>
	import TeamSearchComp from '@/views/team/list/components/TeamSearchComp.vue';
	import TeamListPageSubTitle from '@/components/title/FramePageSubTitle.vue';
	import TeamComp from '@/views/team/list/components/TeamComp.vue';

	import TeamAPI from '@/api/TeamAPI.js';

	export default {
		components: {
			TeamSearchComp,
			TeamListPageSubTitle,
			TeamComp,
		},
		data() {
			return {
				searchCond: {},
				teamList: [],
				pagination: {
					pageNo: 1,
					totalPageCount: 1,
					totalCount: 0,
				},
			};
		},
		methods: {
			onCondChange(cond) {
				this.searchCond.teamName = cond.teamName;
				this.searchCond.startDay = cond.startDay;
				this.searchCond.endDay = cond.endDay;
				this.searchCond.startTime = cond.startTime;
				this.searchCond.endTime = cond.endTime;
			},
			async searchTeams() {
				console.log(this.pagination);

				const res = await TeamAPI.searchTeamList({
					'team-name': this.searchCond.teamName,
					'start-day': this.searchCond.startDay,
					'end-day': this.searchCond.endDay,
					'start-time': this.searchCond.startTime,
					'end-time': this.searchCond.endTime,
					'page-no': this.pagination.pageNo,
				});
				this.teamList = res.data.teamDTOList;
				this.pagination = res.data.pagerDTO;
			},
		},
		mounted() {
			this.searchTeams();
		},
	};
</script>

<style lang="scss" scoped></style>
