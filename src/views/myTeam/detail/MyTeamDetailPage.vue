<template>
	<MyTeamDetailTabs
		:pTabName="tabName"
		:pTeamSeq="teamSeq"
		:pTeamName="teamName"
	/>
</template>

<script>
	import MyTeamDetailTabs from '@/views/myTeam/detail/tab/MyTeamDetailTabs.vue';

	export default {
		components: {
			MyTeamDetailTabs,
		},
		data() {
			const query = this.$route.query;
			return {
				tabName: query.tabName,
				teamSeq: Number(query.teamSeq),
				teamName: query.teamName,
			};
		},
	};
</script>

<style lang="scss" scoped></style>
