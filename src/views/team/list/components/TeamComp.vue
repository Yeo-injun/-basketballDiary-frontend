<template>
	<v-card>
		<TeamMainInfo :pTeamInfo="this.pTeam" />
		<v-btn
			v-if="!this.isTeamMember( this.pTeam.teamSeq )"
			class="ma-3"
			@click="sendJoinRequest"
			>팀가입요청</v-btn
		>
	</v-card>
</template>

<script>
	import TeamMainInfo from '@/components/team/FrameTeamMainInfoComp.vue';

	import AuthUserAPI from '@/api/AuthUserAPI.js';

	import AuthManager from '@/common/auth/AuthManager.js';

	export default {
		components: {
			TeamMainInfo,
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
			hasExcercises() {
				return this.pTeam.teamRegularExercises.length > 0;
			},
		},
	};
</script>

<style lang="scss" scoped></style>
