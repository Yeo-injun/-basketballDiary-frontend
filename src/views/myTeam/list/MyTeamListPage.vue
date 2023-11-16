<template>
	<v-container>
		<TeamCreationBtn />
		<h1>소속팀 목록</h1>
		<MyTeamList
			:pList="myTeams"
			:pPagination="pagination"
			@click-page="getMyTeams"
		>
			<template v-slot:itemSlot="data">
				<MyTeamComp :pTeamInfo="data.item" />
			</template>
			<template v-slot:itemEmptySlot>
				소속되어 있는 농구 팀이 없습니다.
			</template>
		</MyTeamList>
	</v-container>
</template>

<script>
	/** Components */
	import MyTeamList from '@/components/list/FramePaginationList.vue';
	import MyTeamComp from '@/views/myTeam/list/components/MyTeamComp.vue';

	import TeamCreationBtn from '@/views/myTeam/list/button/TeamCreationBtn.vue';

	/** Backend API */
	import MyTeamAPI from '@/api/MyTeamAPI';
	/** CODE */

	/** Utils */

	// Vue lifeCycle 에 관하여
	// https://wormwlrm.github.io/2018/12/29/Understanding-Vue-Lifecycle-hooks.html

	export default {
		components: {
			MyTeamList,
			MyTeamComp,
			TeamCreationBtn,
		},
		data() {
			return {
				myTeams: [],
				pagination: {},
			};
		},
		methods: {
			async getMyTeams() {
				// 비동기적인 console.log 처리로 인해 발생하는 현상
				// https://kkangdda.tistory.com/81
				const res = await MyTeamAPI.getMyTeams({
					pageNo: this.pagination.pageNo,
				});
				this.myTeams = res.data.myTeams;
				this.pagination = res.data.pagination;
			},
		},
		mounted() {
			this.getMyTeams();
		},
	};
</script>

<style></style>
