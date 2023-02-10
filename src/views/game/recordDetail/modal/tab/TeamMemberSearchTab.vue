<template>
	<div>
		<div>팀원검색</div>
		<!-- 검색창 -->
		<v-text-field label="이름" v-model="playerName" />
		<v-btn class="mb-2 mr-2" width="100" @click="searchAllTeamMember">
			검색
		</v-btn>
		<PlayerDataTable />
	</div>
</template>

<script>
	import MyTeamAPI from '@/api/MyTeamAPI.js';

	import PlayerDataTable from '@/components/game/gameJoinPlayer/PlayerDataTable.vue';

	export default {
		components: {
			PlayerDataTable,
		},
		data() {
			return {
				playerName: '',
			};
		},
		methods: {
			async searchAllTeamMember() {
				console.log(this.playerName);
				const params = {
					teamSeq: 7, // TODO 동적처리
					playerName: this.playerName,
					pageNo: 0,
				};

				const res = await MyTeamAPI.searchAllTeamMembers(params);
				console.log(res);
			},
		},
		mounted() {
			this.searchAllTeamMember();
		},
	};
</script>

<style lang="scss" scoped></style>
