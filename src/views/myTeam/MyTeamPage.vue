<template>
	<div>
		<v-tabs centered v-model="tab">
			<v-tab v-for="title in tabTitles" :key="title">
				{{ title }}
			</v-tab>
		</v-tabs>
		<v-tabs-items v-model="tab">
			<v-tab-item v-for="(title, idx) in tabTitles" :key="title">
				<MyTeamMemberTab v-if="idx == 0" :pTeamSeq="teamSeq" />
				<MyTeamGameListTab v-if="idx == 1" />
				<GameCreationPage v-if="idx == 2" :pTeamSeq="teamSeq" />
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script>
	import MyTeamMemberTab from '@/components/myTeam/tab/MyTeamMemberTab.vue';
	import MyTeamGameListTab from '@/components/myTeam/tab/MyTeamGameListTab.vue';
	import GameCreationPage from '@/views/game/GameCreationPage.vue';

	export default {
		components: {
			MyTeamMemberTab,
			MyTeamGameListTab,
			GameCreationPage,
		},
		data() {
			return {
				tab: null,
				tabTitles: ['팀원 조회', '팀기록 조회', '게임생성'],
				teamSeq: this.$route.params.teamSeq,
				teamName: this.$route.params.teamName,
			};
		},
		mounted() {
			console.log(this.$route);
		},
	};
</script>

<style lang="scss" scoped></style>
