<template>
	<MemberInfoComp
		:pProfileImageUrl="pTeamMember.profileImageUrl"
		:pUserName="pTeamMember.userName"
		:pBirthYmd="pTeamMember.birthYmd"
		:pHeight="pTeamMember.height"
		:pWeight="pTeamMember.weight"
		:pPositionCodeName="pTeamMember.positionCodeName"
		:pBackNumber="pTeamMember.backNumber"
		:pJoinYmd="pTeamMember.joinYmd"
		:pTotalGameCount="new String( pTeamMember.totalCount )"
		:pTeamAuthCode="pTeamMember.teamAuthCode"
	>
		<template v-slot:action-slot >
			<div v-if="isLeaderAuth()">
				<ManagerAppointmentBtn
					:pTeamMemberSeq="pTeamMember.teamMemberSeq"
					:pTeamSeq="pTeamSeq"
				/>
				<TeamMemberDischargeBtn
					:pTeamMemberSeq="pTeamMember.teamMemberSeq"
					:pTeamSeq="pTeamSeq"
				/>
			</div>
		</template>
	</MemberInfoComp>
</template>

<script>
	import AuthManager from '@/common/auth/AuthManager.js';
	
	/** Backend API */
	/** CODE */
	/** Utils */
	/** Components */
	import MemberInfoComp from '@/views/myTeam/detail/components/member/FrameMemberInfoComp.vue';
	import ManagerAppointmentBtn from '@/components/button/ManagerAppointmentBtn.vue';
	import TeamMemberDischargeBtn from '@/components/button/TeamMemberDischargeBtn.vue';

	export default {
		components: {
			MemberInfoComp,
			ManagerAppointmentBtn,
			TeamMemberDischargeBtn,
		},
		props: {
			pTeamMember: Object,
			pTeamSeq: {
				type: Number,
				required: true,
			},
		},
		methods: {
			isLeaderAuth() {
				return AuthManager.isLeader(this.pTeamSeq);
			},
		},
	};
</script>

<style></style>
