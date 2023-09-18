<template>
	<div>
		<h3>게스트(회원) 검색</h3>
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
	/** Backend API */
	import UserAPI from '@/api/UserAPI.js';

	/** Javasript */
	import { ObjectFactory } from '@/views/game/recordDetail/GameRecordDetail.js';

	/** Utils */
	import ValidationUtil from '@/common/util/ValidationUtil.js';

	/** Code */
	import { PlayerTypeCode } from '@/const/code/PlayerCode.js';

	/** Constant */
	import { GameJoinPlayerManageTabs } from '@/views/game/recordDetail/const/CompConst.js';
	import { GuestMemberSearchTabEvent } from '@/views/game/recordDetail/const/EventConst.js';

	/** Components */
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
			pTeamSeq: Number,
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
				const pathVar = {
					teamSeq: this.pTeamSeq,
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
				const player = ObjectFactory.gameJoinPlayer(
					targetPlayer,
					PlayerTypeCode.AUTH_GUEST
				);
				if (ValidationUtil.isNull(player)) {
					return;
				}
				this.$emit(GuestMemberSearchTabEvent.ADD_GAME_JOIN_PLAYER, player);
			},
		},
		mounted() {
			this.searchUsersExcludingTeamMember();

			this.isLoadingOk = true;
		},
	};
</script>

<style lang="scss" scoped></style>
