<template>
	<v-container>
		<h2>게임참가선수</h2>
		<v-container v-if="this.isLoadingComplete">
			<v-row dense>
				<v-col cols="6">
					<HomeTeamPlayersManageModal
						pModalTitlePrefix="홈팀"
						:pHomeAwayCode="this.homeTeamCode"
						@select-players="callbackSelectPlayers"
					/>
					<HomeTeamPlayerList :pGameJoinPlayers="this.homeTeamPlayers" />
				</v-col>
				<v-col cols="6">
					<AwayTeamPlayersManageModal
						pModalTitlePrefix="어웨이팀"
						:pHomeAwayCode="this.awayTeamCode"
						@select-players="callbackSelectPlayers"
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

	import HomeTeamPlayerList from '@/views/game/recordDetail/GameJoinPlayerListComp.vue';
	import HomeTeamPlayersManageModal from '@/views/game/recordDetail/modal/GameJoinPlayersManageModal.vue';

	import AwayTeamPlayerList from '@/views/game/recordDetail/GameJoinPlayerListComp.vue';
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

				this.homeTeamPlayers = res.data.homeTeam.players;
				this.awayTeamPlayers = res.data.awayTeam.players;
				this.isLoadingComplete = true;
			},
			async callbackSelectPlayers(eventParams) {
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
