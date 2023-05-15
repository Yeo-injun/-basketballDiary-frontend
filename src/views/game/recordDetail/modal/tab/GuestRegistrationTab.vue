<template>
	<div>
		<h3>게스트(비회원) 등록</h3>
		<v-text-field label="이름" v-model="userName" />
		<v-text-field label="이메일" v-model="email" />
		<v-text-field label="등번호" v-model="backNumber" />
		<v-select
			v-model="selectPosition"
			:items="this.selectPositionItems"
			item-text="name"
			item-value="code"
			label="포지션"
			return-object
		/>
		<NonMemberGuestAddBtn
			@do-add="addGameJoinPlayer()"
			:pBtnName="this.addBtnName"
		/>
	</div>
</template>

<script>
	import ArrayUtil from '@/common/util/ArrayUtil.js';
	import { GuestRegistrationTabEvent } from '@/views/game/recordDetail/const/EventConst.js';

	import { GameJoinPlayerManageTabs } from '@/views/game/recordDetail/const/CompConst.js';
	import { PlayerTypeCode, PositionCode } from '@/const/code/PlayerCode.js';

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
				selectPositionItems: ArrayUtil.convertObjectToArray(PositionCode),
				/*-------------------
				 * 검색 조건
				 *-------------------*/
				/*-------------------
				 * Input 데이터
				 *-------------------*/
				userName: '',
				selectPosition: {
					code: PositionCode.POINT_GUARD.code,
					name: PositionCode.POINT_GUARD.name,
				},
				backNumber: '',
				email: '',
			};
		},
		props: {
			pActivatedTabName: String,
		},
		watch: {
			/** 활성화된 탭이 다른 탭인 경우 input을 초기화시킨다. */
			pActivatedTabName(newTabName) {
				if (newTabName != GameJoinPlayerManageTabs.GUEST_NON_MEMBER) {
					this.initInput();
				}
			},
		},
		methods: {
			initInput() {
				this.userName = '';
				this.selectPosition = {
					code: PositionCode.POINT_GUARD.code,
					name: PositionCode.POINT_GUARD.name,
				};
				this.backNumber = '';
				this.email = '';
			},
			addGameJoinPlayer() {
				const targetPlayer = {
					userName: this.userName,
					email: this.email,
					backNumber: this.backNumber,
					positionCode: this.selectPosition.code,
					positionCodeName: this.selectPosition.name,
					playerTypeCode: PlayerTypeCode.UNAUTH_GUEST.code,
					playerTypeCodeName: PlayerTypeCode.UNAUTH_GUEST.name,
				};
				this.$emit(
					GuestRegistrationTabEvent.ADD_GAME_JOIN_PLAYER,
					targetPlayer
				);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
