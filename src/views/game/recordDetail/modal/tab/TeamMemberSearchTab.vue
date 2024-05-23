<template>
	<v-container>
		<!-- 검색창 -->
		<v-text-field label="이름" v-model="playerName" />
		<TeamMemberSearchBtn @do-search="searchAllTeamMember" />
		<PlayerPaginationTable
			v-if="isLoadingOk"
			:pPlayers="teamMembers"
			:pTotalCount="pagination.totalCount"
			:pPageCount="pagination.totalPageCount"
			:pRowCount="pagination.rowCount"
			pRowBtnName="추가"
			@fetch-paging-items="searchAllTeamMember"
			@get-row-player-info="addGameJoinPlayer"
		/>
	</v-container>
</template>

<script>
	/** Backend API */
	import MyTeamAPI from '@/api/MyTeamAPI.js';

	/** Javasript */
	import {
		ObjectFactory,
		UIPrompter,
	} from '@/views/game/recordDetail/GameRecordDetail.js';

	/** Utils */
	import ValidationUtil from '@/common/util/ValidationUtil';

	/** Code */
	import { PlayerTypeCode } from '@/const/code/PlayerCode.js';

	/** Constant */
	import { TeamMemberSearchTabEvent } from '@/views/game/recordDetail/const/EventConst.js';
	import { GameJoinPlayerManageTabs } from '@/views/game/recordDetail/const/CompConst.js';

	/** Components */
	import PlayerPaginationTable from '@/components/game/table/PlayerPaginationTable.vue';

	import TeamMemberSearchBtn from '@/components/button/FrameSearchBtn.vue';

	export default {
		components: {
			PlayerPaginationTable,
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
				pagination : {
					totalCount 		: 0,
					totalPageCount 	: 1,
					rowCount 		: 5,
				},
				playerName: '',
				teamMembers: [],
			};
		},
		methods: {
			async searchAllTeamMember( paginationParam ) {
				const { data } = await MyTeamAPI.searchAllTeamMembers({
					teamSeq		: this.pTeamSeq,
					playerName	: this.playerName,
					pageNo		: ValidationUtil.isNotNull( paginationParam )
								  ? paginationParam.pageNo : 0,
				});
				
				this.teamMembers = data.teamMembers;

				const pagination = this.pagination;
				pagination.totalCount 		= data.pagination.totalCount;
				pagination.totalPageCount	= data.pagination.totalPageCount;

			},
			addGameJoinPlayer(targetPlayer) {
				const backNumber = UIPrompter.backNumber(targetPlayer.backNumber);
				if (ValidationUtil.isNull(backNumber)) {
					return;
				}

				const player = ObjectFactory.gameJoinPlayerWithBackNumber(
					targetPlayer,
					PlayerTypeCode.TEAM_MEMBER,
					backNumber
				);

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
