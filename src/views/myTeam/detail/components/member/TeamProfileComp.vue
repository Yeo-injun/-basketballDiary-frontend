<template>
	<MemberInfoComp
		class="grey lighten-3"
		:pProfileImageUrl="pTeamProfile.profileImageUrl"
		:pUserName="pTeamProfile.userName"
		:pBirthYmd="pTeamProfile.birthYmd"
		:pHeight="pTeamProfile.height"
		:pWeight="pTeamProfile.weight"
		:pPositionCodeName="pTeamProfile.positionCodeName"
		:pBackNumber="pTeamProfile.backNumber"
		:pJoinYmd="pTeamProfile.joinYmd"
		:pTotalGameCount="new String( pTeamProfile.totalGameCount )"
		:pTeamAuthCode="pTeamProfile.teamAuthCode"
	>
		<template v-slot:action-slot >
			<!-- 필요한 제어 버튼 구현 영역 -->
		</template>
	</MemberInfoComp>
</template>

<script>

	/** Backend API */
	/** CODE */
	/** Utils */
	/** Components */
	import MemberInfoComp from '@/views/myTeam/detail/components/member/FrameMemberInfoComp.vue';

	export default {
		components: {
			MemberInfoComp,
		},
		props: {
			pTeamProfile: Object,
		},
		methods: {
		},
	};
</script>

<style></style>
