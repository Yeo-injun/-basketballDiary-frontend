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
		:pTotalGameCount="pTeamProfile.totalGameCount"
		:pTeamAuthCode="pTeamProfile.teamAuthCode"
	>
		<template v-slot:action-slot >
			<!-- 필요한 제어 버튼 구현 영역 -->
			<div class="button-container" >
				<ProfileDeleteBtn
					pBtnName="팀탈퇴"
					:pStyleBlock="false"
					@do-delete="deleteTeamProfile()"
				/>
				<ProfileUpdateBtn
					pBtnName="프로필 수정"
					:pStyleBlock="false"
					@do-open="openProfileUpdateModal()"
				/>
				<ProfileUpdateModal
					:pIsActivated="isActivatedProfileModal"
					:pTeamSeq="pTeamProfile.teamSeq"
					:pBackNumber="pTeamProfile.backNumber"
					:pImageUrl="pTeamProfile.profileImageUrl"
					@modal-close="closeProfileUpdateModal()"
				/>
			</div>
		</template>
	</MemberInfoComp>
</template>

<script>

	/** Backend API */
	import MyTeamAPI from '@/api/MyTeamAPI';
	/** CODE */
	/** Utils */
	import AuthManager from '@/common/auth/AuthManager';
	/** Components */
	import ProfileDeleteBtn from '@/components/button/FrameDeleteBtn.vue';
	import ProfileUpdateBtn from '@/components/button/FrameOpenBtn.vue';
	import ProfileUpdateModal from '@/views/myTeam/detail/tab/modal/MyTeamProfileUpdateModal.vue';

	import MemberInfoComp from '@/views/myTeam/detail/components/member/FrameMemberInfoComp.vue';

	export default {
		components: {
			ProfileDeleteBtn,
			ProfileUpdateModal,
			ProfileUpdateBtn,
			MemberInfoComp,
		},
		props: {
			pTeamProfile: Object,
			pTeamSeq : {
				required 	: true,
				type 		: Number,
			},
		},
		data() {
			return {
				isActivatedProfileModal: false,
			}
		},
		methods: {
			async deleteTeamProfile() {
				if ( !confirm("팀 탈퇴를 하시겠습니까?") ) {
					return;
				}
				await MyTeamAPI.withdrawTeam({ teamSeq : this.pTeamSeq });
				AuthManager.init();					// 사용자 세션의 팀권한 상태 동기화
				this.$router.push( "/myTeams" );	// 소속팀 목록으로 이동
			},
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

<style>
	.button-container {
		display	: flex; /* 버튼들을 옆으로 정렬 */
		gap		: 10px; /* 버튼 사이 간격 설정 */
	}
	.button-container .v-btn {
		width: 120px;
	}
</style>
