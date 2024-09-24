<template>
	<div>
		<v-container>
			<v-card class="mx-auto mt-6" max-width="1100" outlined >
				<MyTeamMainInfo class="pt-2 pb-2"
					:pTeamInfo="{
					teamName		: this.teamName,
					teamImagePath 	: this.teamImagePath,
					hometown 		: this.hometown,
					totMember 		: this.totMember,
					foundationYmd 	: this.foundationYmd,
					introduction 	: this.introduction,
					totMember		: this.memberCount,
				}"/>
			</v-card>
		</v-container>
		<v-container>
			<MyTeamDetailTabs
				:pTabName="tabName"
				:pTeamSeq="Number( teamSeq )"
				:pTeamName="teamName"
			/>
		</v-container>
	</div>
</template>

<script>
	/** Backend API */
	import MyTeamAPI from '@/api/MyTeamAPI';
	
	/** Code */
	/** Utils */
	/** Components */
	import MyTeamMainInfo from '@/components/team/FrameTeamMainInfoComp.vue';
	import MyTeamDetailTabs from '@/views/myTeam/detail/tab/MyTeamDetailTabs.vue';

	/** Emit Event */

	export default {
		components: {
			MyTeamMainInfo,
			MyTeamDetailTabs,
		},
		data() {
			const query = this.$route.query;
			return {
				tabName: query.tabName,
				// 팀정보 세팅 
				teamSeq			: query.teamSeq,
				teamName		: "",
				teamImagePath 	: "",
				hometown 		: "",
				totMember 		: "",
				foundationYmd 	: "",
				introduction 	: "",
				memberCount		: 0,
			};
		},
		methods : {
			async intlTeamInfo() {
				const query = this.$route.query;
				const data 	= await MyTeamAPI.getTeamInfo( query.teamSeq );
				this.teamSeq		= data.teamSeq;
				this.teamName		= data.teamName;
				this.teamImagePath 	= data.teamLogoImagePath;
				this.hometown		= data.hometown;
				this.foundationYmd	= data.foundationYmd;
				this.introduction	= data.introduction;
				this.memberCount	= data.memberCount;
			},
		},
		mounted() {
			this.intlTeamInfo();	
		}
	};
</script>

<style lang="scss" scoped></style>
