<template>
	<div>
		<v-container>
			<MyTeamMainTitle :pTitleName="teamName"/>
		</v-container>
		<MyTeamDetailTabs
			:pTabName="tabName"
			:pTeamSeq="teamSeq"
			:pTeamName="teamName"
		/>

	</div>
</template>

<script>
	import MyTeamMainTitle from '@/components/title/FramePageMainTitle.vue';
	import MyTeamDetailTabs from '@/views/myTeam/detail/tab/MyTeamDetailTabs.vue';

	export default {
		components: {
			MyTeamMainTitle,
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
