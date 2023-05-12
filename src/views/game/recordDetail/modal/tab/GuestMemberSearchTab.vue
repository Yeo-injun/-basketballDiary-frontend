<template>
	<div>
		<div>게스트(회원) 검색</div>
		<PlayerDataTable
			v-if="isLoadingOk"
			pRowBtnName="추가"
			:pHeaders="tableHeaders"
			:pPlayers="users"
			@get-row-player-info="addGameJoinPlayer"
		/>
	</div>
</template>

<script>
	import { GuestMemberSearchTabEvent } from '@/views/game/recordDetail/const/EventConst.js';

	import { GameJoinPlayerManageTabs } from '@/views/game/recordDetail/const/CompConst.js';
	import { PlayerTypeCode } from '@/const/code/PlayerCode.js';
	import UserAPI from '@/api/UserAPI.js';
	import PlayerDataTable from '@/components/game/gameJoinPlayer/PlayerDataTable.vue';

	export default {
		components: {
			PlayerDataTable,
		},
		data() {
			return {
				/** 컴포넌트 제어용 */
				isLoadingOk: false,
				tableHeaders: [
					{ text: '성별', value: 'genderName' },
					{ text: '이름', value: 'userName' },
					{ text: '포지션', value: 'positionCodeName' },
					{ text: '이메일', value: 'email' },
					{ test: '버튼', value: 'button', sortable: false },
				],
				/** 검색 조건 */
				userName: '',
				email: '',
				/** 렌더링 데이터 */
				users: [],
			};
		},
		props: {
			pActivatedTabName: String,
		},
		watch: {
			/** 활성화된 탭이 자기자신이면 다시 서버를 호출한다. */
			pActivatedTabName(newTabName) {
				const VueComp = this;
				if (newTabName == GameJoinPlayerManageTabs.GUEST_MEMBER) {
					VueComp.searchUsersExcludingTeamMember();
				}
			},
		},
		methods: {
			async searchUsersExcludingTeamMember() {
				const queryParams = this.$route.query;
				const pathVar = {
					teamSeq: queryParams.teamSeq,
				};

				const queryString = {
					userName: this.userName,
					email: this.email,
				};
				const res = await UserAPI.searchUsersExcludingTeamMember(
					pathVar,
					queryString
				);

				this.users = res.data.users;
			},
			addGameJoinPlayer(targetPlayer) {
				const backNumber = prompt('해당 선수의 등번호를 입력해주세요.');
				if (backNumber >= 1000) {
					alert('선수의 등번호는 3자리까지만 입력가능합니다.');
					return;
				}
				targetPlayer.backNumber = backNumber;
				targetPlayer.playerTypeCode = PlayerTypeCode.AUTH_GUEST.code;
				targetPlayer.playerTypeCodeName = PlayerTypeCode.AUTH_GUEST.name;
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
