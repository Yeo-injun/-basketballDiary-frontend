<template>
	<v-card>
		<TeamMainInfo :pTeamInfo="this.pTeam" />
		<v-container>
			<JoinRequestBtn 
				pBtnName="팀가입요청"
				@do-add="sendJoinRequest"
				:_disabled="this.isTeamMember( this.pTeam.teamSeq )"
			/>
		</v-container>
	</v-card>
</template>

<script>
	/** Backend API */
	import AuthUserAPI from '@/api/AuthUserAPI.js';

	/** Code */
	/** Utils */
	import AuthManager from '@/common/auth/AuthManager.js';

	/** Components */
	import TeamMainInfo from '@/components/team/FrameTeamMainInfoComp.vue';
	import JoinRequestBtn from '@/components/button/FrameAddBtn.vue';
	/** Emit Event */


	export default {
		components: {
			TeamMainInfo,
			JoinRequestBtn,
		},
		props: {
			pTeam: {
				type 	: Object,
				default() {
					return { };
				},
			},
		},
		methods: {
			async sendJoinRequest() {
				await AuthUserAPI.sendJoinRequestToTeam({
					teamSeq : this.pTeam.teamSeq,
				});
				alert('가입신청이 완료되었습니다.');
			},
			isTeamMember( teamSeq ) {
				return AuthManager.isTeamMemeber(teamSeq);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
