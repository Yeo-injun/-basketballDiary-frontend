<template>
	<div>
		<h3>팀원 검색</h3>
		<!-- 검색창 -->
		<v-text-field label="이름" v-model="playerName" />
		<TeamMemberSearchBtn @do-search="searchAllTeamMember" />
		<PlayerDataTable
			v-if="isLoadingOk"
			pRowBtnName="추가"
			:pPlayers="teamMembers"
			@get-row-player-info="addGameJoinPlayer"
		/>
	</div>
</template>

<script>
	/** Backend API */
	import MyTeamAPI from '@/api/MyTeamAPI.js';

	/** Javasript */
	import { ObjectFactory } from '@/views/game/recordDetail/GameRecordDetail.js';

	/** Utils */
	import ValidationUtil from '@/common/util/ValidationUtil';

	/** Code */
	import { PlayerTypeCode } from '@/const/code/PlayerCode.js';

	/** Constant */
	import { TeamMemberSearchTabEvent } from '@/views/game/recordDetail/const/EventConst.js';
	import { GameJoinPlayerManageTabs } from '@/views/game/recordDetail/const/CompConst.js';

	/** Components */
	import PlayerDataTable from '@/components/game/gameJoinPlayer/PlayerDataTable.vue';
	import TeamMemberSearchBtn from '@/components/button/FrameSearchBtn.vue';

	export default {
		components: {
			PlayerDataTable,
			TeamMemberSearchBtn,
		},
		props: {
			pTeamSeq: Number,
			pActivatedTabName: String,
		},
		watch: {
			/** 활성화된 탭이 자기자신이면 다시 서버를 호출한다. */
			pActivatedTabName(newTabName) {
				const VueComp = this;
				if (newTabName == GameJoinPlayerManageTabs.TEAM_MEMBER) {
					VueComp.searchAllTeamMember();
				}
			},
		},
		data() {
			return {
				isLoadingOk: false,
				playerName: '',
				teamMembers: [],
			};
		},
		methods: {
			async searchAllTeamMember() {
				const params = {
					teamSeq: this.pTeamSeq,
					playerName: this.playerName,
					pageNo: 0,
				};

				const res = await MyTeamAPI.searchAllTeamMembers(params);
				console.log(res);
				this.teamMembers = res.data.teamMembers;
			},
			addGameJoinPlayer(targetPlayer) {
				const player = ObjectFactory.gameJoinPlayer(
					targetPlayer,
					PlayerTypeCode.TEAM_MEMBER
				);
				if (ValidationUtil.isNull(player)) {
					return;
				}
				this.$emit(TeamMemberSearchTabEvent.ADD_GAME_JOIN_PLAYER, player);
			},
		},
		beforeMount() {
			this.searchAllTeamMember();
			this.isLoadingOk = true;
		},
		mounted() {
			// this.searchAllTeamMember();
			// this.isLoadingOk = true;
		},
	};
</script>

<style lang="scss" scoped></style>
