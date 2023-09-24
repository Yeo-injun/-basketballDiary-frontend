<template>
	<v-container>
		<h2>게임참가선수</h2>
		<v-container v-if="this.isLoadingComplete">
			<v-row dense>
				<v-col cols="6">
					<HomeTeamPlayersManageModal
						pModalTitlePrefix="홈팀"
						:pHomeAwayCode="this.homeTeamCode"
						@register-complete="setSelectedPlayers"
					/>
					<HomeTeamPlayerList :pGameJoinPlayers="this.homeTeamPlayers" />
				</v-col>
				<v-col cols="6">
					<AwayTeamPlayersManageModal
						pModalTitlePrefix="어웨이팀"
						:pHomeAwayCode="this.awayTeamCode"
						@register-complete="setSelectedPlayers"
					/>
					<AwayTeamPlayerList :pGameJoinPlayers="this.awayTeamPlayers" />
				</v-col>
			</v-row>
		</v-container>
	</v-container>
</template>

<script>
	import GameAPI from '@/api/GameAPI.js';

	import { HomeAwayCode } from '@/const/code/GameCode.js';

	import HomeTeamPlayerList from '@/views/game/recordDetail/components/GameJoinPlayerListComp.vue';
	import HomeTeamPlayersManageModal from '@/views/game/recordDetail/modal/GameJoinPlayersManageModal.vue';

	import AwayTeamPlayerList from '@/views/game/recordDetail/components/GameJoinPlayerListComp.vue';
	import AwayTeamPlayersManageModal from '@/views/game/recordDetail/modal/GameJoinPlayersManageModal.vue';

	export default {
		components: {
			HomeTeamPlayerList,
			HomeTeamPlayersManageModal,
			AwayTeamPlayerList,
			AwayTeamPlayersManageModal,
		},
		props: {
			pGameSeq: Number,
		},
		data() {
			return {
				isLoadingComplete: false,
				homeTeamCode: HomeAwayCode.HOME_TEAM,
				awayTeamCode: HomeAwayCode.AWAY_TEAM,
				homeTeamInfo: {}, // TODO 삭제 예정
				awayTeamInfo: {}, // TODO 삭제 예정
				homeTeamPlayers: [],
				awayTeamPlayers: [],
			};
		},
		methods: {
			async getAllGameJoinPlayers() {
				const params = {
					gameSeq: this.pGameSeq,
				};

				const res = await GameAPI.getGameJoinPlayers(params);

				const homeTeam = res.data.homeTeam;
				this.homeTeamInfo = {
					homeAwayCode: HomeAwayCode.HOME_TEAM,
					gameJoinTeamSeq: homeTeam.gameJoinTeamSeq,
					teamSeq: homeTeam.teamSeq,
				};
				this.homeTeamPlayers = homeTeam.players;

				const awayTeam = res.data.awayTeam;
				this.awayTeamInfo = {
					homeAwayCode: HomeAwayCode.AWAY_TEAM,
					gameJoinTeamSeq: awayTeam.gameJoinTeamSeq,
					teamSeq: awayTeam.teamSeq,
				};
				this.awayTeamPlayers = awayTeam.players;
				this.isLoadingComplete = true;
			},
			async setSelectedPlayers(eventParams) {
				console.log(eventParams);
				const homeAwayCode = eventParams.homeAwayCode;
				const params = {
					gameSeq: this.pGameSeq,
					homeAwayCode: homeAwayCode,
				};

				const res = await GameAPI.getGameJoinPlayers(params);

				if (HomeAwayCode.HOME_TEAM == homeAwayCode) {
					this.homeTeamPlayers = res.data.homeTeam.players;
					return;
				}
				this.awayTeamPlayers = res.data.awayTeam.players;
			},
		},
		mounted() {
			this.getAllGameJoinPlayers();
		},
	};
</script>

<style lang="scss" scoped></style>
