<template>
	<div>
		<div>비회원 게스트 등록</div>
		서비스 준비중입니다.
		<NonMemberGuestAddBtn
			@do-add="addGameJoinPlayer()"
			:pBtnName="this.addBtnName"
		/>
	</div>
</template>

<script>
	import { GuestMemberSearchTabEvent } from '@/views/game/recordDetail/const/EventConst.js';

	import { GameJoinPlayerManageTabs } from '@/views/game/recordDetail/const/CompConst.js';
	import { PlayerTypeCode } from '@/const/code/PlayerCode.js';

	import NonMemberGuestAddBtn from '@/components/button/FrameAddBtn.vue';
	export default {
		components: {
			NonMemberGuestAddBtn,
		},
		data() {
			return {
				/*-------------------
				 * 컴포넌트 제어용
				 *-------------------*/
				addBtnName: '선수추가',
				/*-------------------
				 * 검색 조건
				 *-------------------*/
				/*-------------------
				 * Input 데이터
				 *-------------------*/
				userName: '',
				positionCode: '',
				positionCodeName: '',
				backNumber: '',
				email: '',
			};
		},
		props: {
			pActivatedTabName: String,
		},
		watch: {
			/** 활성화된 탭이 자기자신이면 다시 서버를 호출한다. */
			pActivatedTabName(newTabName) {
				if (newTabName == GameJoinPlayerManageTabs.GUEST_NON_MEMBER) {
					// TODO 호출할 함수 구현
				}
			},
		},
		methods: {
			addGameJoinPlayer() {
				alert('테스트중');
				const targetPlayer = {
					userName: this.userName,
					email: this.email,
					positionCode: this.positionCode,
					positionCodeName: this.positionCodeName,
					backNumber: this.backNumber,
					playerTypeCode: PlayerTypeCode.UNAUTH_GUEST.code,
					playerTypeCodeName: PlayerTypeCode.UNAUTH_GUEST.name,
				};
				this.$emit(
					GuestMemberSearchTabEvent.ADD_GAME_JOIN_PLAYER,
					targetPlayer
				);
			},
		},
		mounted() {
			this.searchUsersExcludingTeamMember();

			this.isLoadingOk = true;
		},
	};
</script>

<style lang="scss" scoped></style>
