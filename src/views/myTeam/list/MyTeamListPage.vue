<template>
	<v-container>
		<MyTeamListMainTitle pTitleName="소속팀 목록" />
		<TeamCreationBtn />
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
	import MyTeamListMainTitle from '@/components/title/FramePageMainTitle.vue';
	import MyTeamList from '@/components/list/FramePaginationList.vue';
	import MyTeamComp from '@/views/myTeam/list/components/MyTeamComp.vue';

	import TeamCreationBtn from '@/views/myTeam/list/button/TeamCreationBtn.vue';

	/** Backend API */
	import MyTeamAPI from '@/api/MyTeamAPI';
	/** CODE */

	/** Utils */

	export default {
		// DOM 생성 전(mounted되기 전)에 data세팅
		created() {
			this.getMyTeams();
		},
		components: {
			MyTeamListMainTitle,
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
				const { data } = await MyTeamAPI.getMyTeams({
					pageNo: this.pagination.pageNo,
				});
				this.myTeams 	= data.myTeams;
				this.pagination = data.pagination;
			},
		},
	};
</script>

<style></style>
