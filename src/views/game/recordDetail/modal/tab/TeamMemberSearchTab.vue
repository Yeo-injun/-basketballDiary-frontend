<template>
	<div>
		<div>팀원검색</div>
		<!-- 검색창 -->
		<v-text-field label="이름" v-model="playerName" />
		<v-btn class="mb-2 mr-2" width="100" @click="searchAllTeamMember">
			검색
		</v-btn>
		<PlayerDataTable
			v-if="isLoadingOk"
			pRowBtnName="추가"
			:pPlayers="teamMembers"
			@get-row-player-info="addGameJoinPlayer"
		/>
	</div>
</template>

<script>
	import { TeamMemberSearchTabEvent } from '@/views/game/recordDetail/const/EventConst.js';

	import { GameJoinPlayerManageTabs } from '@/views/game/recordDetail/const/CompConst.js';

	import MyTeamAPI from '@/api/MyTeamAPI.js';

	import PlayerDataTable from '@/components/game/gameJoinPlayer/PlayerDataTable.vue';

	export default {
		components: {
			PlayerDataTable,
		},
		props: {
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
			console.log('TeamMemberSearchTab = Data ');
			return {
				isLoadingOk: false,
				playerName: '',
				teamMembers: [],
			};
		},
		methods: {
			async searchAllTeamMember() {
				const queryParams = this.$route.query;
				const params = {
					teamSeq: queryParams.teamSeq,
					playerName: this.playerName,
					pageNo: 0,
				};

				const res = await MyTeamAPI.searchAllTeamMembers(params);
				console.log(res);
				this.teamMembers = res.data.teamMembers;
			},
			addGameJoinPlayer(targetPlayer) {
				this.$emit(TeamMemberSearchTabEvent.ADD_GAME_JOIN_PLAYER, targetPlayer);
			},
		},
		mounted() {
			console.log('TeamMemberSearchTab = MOUNTED ');

			this.searchAllTeamMember();
			this.isLoadingOk = true;
		},
	};
</script>

<style lang="scss" scoped></style>
