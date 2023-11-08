<template>
	<v-container>
		<TeamCreationBtn />
		<h1>소속팀 목록</h1>
		<MyTeamComp
			v-for="(team, index) in myTeams"
			:key="index"
			:pTeamInfo="team"
		/>

		<v-pagination
			v-model="pagination.pageNo"
			:length="pagination.totalPageCount"
			@input="getMyTeamsWithPagination"
		/>
	</v-container>
</template>

<script>
	// Vue lifeCycle 에 관하여
	// https://wormwlrm.github.io/2018/12/29/Understanding-Vue-Lifecycle-hooks.html
	import MyTeamAPI from '@/api/MyTeamAPI';
	import MyTeamComp from '@/views/myTeam/list/components/MyTeamComp.vue';

	import TeamCreationBtn from '@/views/myTeam/list/button/TeamCreationBtn.vue';

	import PaginationUtil from '@/common/util/PaginationUtil.js';
	import ValidationUtil from '@/common/util/ValidationUtil';

	export default {
		components: {
			MyTeamComp,
			TeamCreationBtn,
		},
		data: () => {
			return {
				myTeams: [],
				pagination: PaginationUtil.getIntlPager(),
			};
		},
		methods: {
			async getMyTeams(pageNo) {
				// 비동기적인 console.log 처리로 인해 발생하는 현상
				// https://kkangdda.tistory.com/81
				const res = await MyTeamAPI.getMyTeams({
					pageNo: ValidationUtil.isNotNull(pageNo) ? pageNo : 0,
				});
				this.myTeams = res.data.myTeams;
				this.pagination = res.data.pagination;
			},
			/** v-pagination @input이벤트 - page번호가 바뀌면 바뀐 page번호가 이벤트 handler의 인자로 들어옴 */
			getMyTeamsWithPagination(pageNo) {
				this.getMyTeams(pageNo);
			},
		},
		mounted() {
			this.getMyTeams();
		},
	};
</script>

<style></style>
