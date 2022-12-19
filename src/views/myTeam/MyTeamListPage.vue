<template>
	<v-container>
		<TeamCreationBtn />
		<h1>소속팀 목록</h1>
		<MyTeamComp
			v-for="(team, index) in teamList"
			:key="index"
			v-bind:teamInfo="team"
		/>

		<v-pagination
			v-model="pagination.pageNo"
			:length="pagination.totalPageCount"
			@input="searchMyTeams"
		/>
	</v-container>
</template>

<script>
	// Vue lifeCycle 에 관하여
	// https://wormwlrm.github.io/2018/12/29/Understanding-Vue-Lifecycle-hooks.html
	import myTeamApi from '@/api/MyTeamAPI';
	import MyTeamComp from '@/components/myTeam/MyTeamComp.vue';

	import TeamCreationBtn from '@/components/team/button/TeamCreationBtn.vue';

	export default {
		components: {
			MyTeamComp,
			TeamCreationBtn,
		},
		data: () => {
			return {
				teamList: [],
				pagination: {
					pageNo: 1,
					totalPageCount: 1,
					totalCount: 0,
				},
			};
		},
		methods: {
			async getMyTeams(params) {
				// 비동기적인 console.log 처리로 인해 발생하는 현상
				// https://kkangdda.tistory.com/81
				const res = await myTeamApi.searchTeams(params);
				this.teamList = res.data.myTeamDTOList;
				this.pagination = res.data.pagerDTO;
			},
			searchMyTeams() {
				const params = {
					pageNo: this.pagination.pageNo,
				};
				this.getMyTeams(params);
			},
		},
		mounted() {
			this.getMyTeams();
		},
	};
</script>

<style></style>
