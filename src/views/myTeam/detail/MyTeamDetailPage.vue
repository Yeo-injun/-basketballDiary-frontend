<template>
	<div>
		<v-container>
			<v-card 
				class="mx-auto mt-6" max-width="1100" outlined
			>
				<MyTeamMainInfo class="pt-2 pb-2"
					:pTeamInfo="{
					teamName		: this.teamName,
					teamImagePath 	: this.teamImagePath,
					hometown 		: this.hometown,
					totMember 		: this.totMember,
					foundationYmd 	: this.foundationYmd,
					introduction 	: this.introduction,
				}"/>
			</v-card>
		</v-container>
		<v-container>
			<MyTeamDetailTabs
				:pTabName="tabName"
				:pTeamSeq="teamSeq"
				:pTeamName="teamName"
			/>
		</v-container>
	</div>
</template>

<script>
	import MyTeamMainInfo from '@/components/team/FrameTeamMainInfoComp.vue';
	import MyTeamDetailTabs from '@/views/myTeam/detail/tab/MyTeamDetailTabs.vue';

	export default {
		components: {
			MyTeamMainInfo,
			MyTeamDetailTabs,
		},
		data() {
			const query = this.$route.query;
			return {
				tabName: query.tabName,
				// 팀정보 세팅 TODO 팀정보 서버에서 조회 ( 팀정보 혹은 팀원이 변경될 수 있으므로... )
				teamSeq			: Number(query.teamSeq),
				teamName		: query.teamName,
				teamImagePath 	: query.teamImagePath,
				hometown 		: query.hometown,
				totMember 		: query.totMember,
				foundationYmd 	: query.foundationYmd,
				introduction 	: query.introduction,
			};
		},
	};
</script>

<style lang="scss" scoped></style>
