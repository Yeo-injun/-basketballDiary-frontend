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
			<ProfileUpdateBtn
				:pStyleBlock="false"
				@do-open="openProfileUpdateModal()"
				pBtnName="프로필 수정"
			/>
			<ProfileUpdateModal
				:pIsActivated="isActivatedProfileModal"
				:pTeamSeq="pTeamProfile.teamSeq"
				:pBackNumber="pTeamProfile.backNumber"
				:pImageUrl="pTeamProfile.profileImageUrl"
				@modal-close="closeProfileUpdateModal()"
			/>
		</template>
	</MemberInfoComp>
</template>

<script>

	/** Backend API */
	/** CODE */
	/** Utils */
	/** Components */
	import ProfileUpdateModal from '@/views/myTeam/detail/tab/modal/MyTeamProfileUpdateModal.vue';
	import ProfileUpdateBtn from '@/components/button/FrameOpenBtn.vue';

	import MemberInfoComp from '@/views/myTeam/detail/components/member/FrameMemberInfoComp.vue';

	export default {
		components: {
			ProfileUpdateModal,
			ProfileUpdateBtn,
			MemberInfoComp,
		},
		props: {
			pTeamProfile: Object,
		},
		data() {
			return {
				isActivatedProfileModal: false,
			}
		},
		methods: {
			/**-----------------------------
			 * Modal 제어
			 **-----------------------------*/
			openProfileUpdateModal() {
				this.isActivatedProfileModal = true;
			},
			closeProfileUpdateModal() {
				this.isActivatedProfileModal = false;
			},
		},
	};
</script>

<style></style>
