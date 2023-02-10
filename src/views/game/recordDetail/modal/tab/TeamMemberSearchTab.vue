<template>
	<div>
		<div>팀원검색</div>
		<!-- 검색창 -->
		<v-text-field label="이름" v-model="playerName" />
		<v-btn class="mb-2 mr-2" width="100" @click="searchTeamMember">
			검색
		</v-btn>
		<PlayerDataTable />
	</div>
</template>

<script>
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
			async searchTeamMember() {
				console.log(this.playerName);
				alert('dd');
			},
		},
	};
</script>

<style lang="scss" scoped></style>
