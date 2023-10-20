<template>
	<MyTeamDetailTabs :pTabName="this.tabName" :pTeamSeq="this.teamSeq" />
</template>

<script>
	import MyTeamDetailTabs from '@/views/myTeam/detail/tab/MyTeamDetailTabs.vue';

	export default {
		components: {
			MyTeamDetailTabs,
		},
		data() {
			return {
				tabName: 'MyTeamMembersTab',
				teamSeq: Number(this.$route.query.teamSeq),
			};
		},
	};
</script>

<style lang="scss" scoped></style>
