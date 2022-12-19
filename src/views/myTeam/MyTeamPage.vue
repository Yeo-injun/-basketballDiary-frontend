<template>
	<div>
		<v-tabs centered v-model="tab">
			<v-tab v-for="title in tabTitles" :key="title">
				{{ title }}
			</v-tab>
		</v-tabs>
		<v-tabs-items v-model="tab">
			<v-tab-item v-for="(title, idx) in tabTitles" :key="title">
				<MyTeamMemberTab v-if="idx == 0" :pTeamSeq="pTeamSeq" />
				<MyTeamGameListTab v-if="idx == 1" />
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script>
	import MyTeamMemberTab from '@/components/myTeam/tab/MyTeamMemberTab.vue';
	import MyTeamGameListTab from '@/components/myTeam/tab/MyTeamGameListTab.vue';

	export default {
		components: {
			MyTeamMemberTab,
			MyTeamGameListTab,
		},
		data: () => {
			return {
				tab: null,
				tabTitles: ['팀원 조회', '팀기록 조회'],
			};
		},
		props: {
			pTeamSeq: {
				type: Number,
				required: true,
			},
		},
	};
</script>

<style lang="scss" scoped></style>
