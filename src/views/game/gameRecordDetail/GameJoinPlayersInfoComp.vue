<template>
	<v-container>
		<h2>게임참가선수</h2>
		<v-container>
			<v-row dense>
				<HomeTeamPlayerManageBtn
					:pHomeAwayCode="this.homeTeamCode"
					@select-players="callbackSelectPlayers"
				/>
				<AwayTeamPlayerManageBtn
					:pHomeAwayCode="this.awayTeamCode"
					@select-players="callbackSelectPlayers"
				/>
			</v-row>
			<v-row dense>
				<HomeTeamPlayerList :pGameJoinPlayers="this.homeTeamPlayers" />
				<AwayTeamPlayerList :pGameJoinPlayers="this.awayTeamPlayers" />
			</v-row>
		</v-container>
	</v-container>
</template>

<script>
	import GameAPI from '@/api/GameAPI.js';

	import { HomeAwayCode } from '@/const/code/GameCode.js';

	import HomeTeamPlayerList from '@/views/game/gameRecordDetail/GameJoinPlayerListComp.vue';
	import HomeTeamPlayerManageBtn from '@/views/game/gameRecordDetail/button/GameJoinPlayerManageBtn.vue';

	import AwayTeamPlayerList from '@/views/game/gameRecordDetail/GameJoinPlayerListComp.vue';
	import AwayTeamPlayerManageBtn from '@/views/game/gameRecordDetail/button/GameJoinPlayerManageBtn.vue';

	export default {
		components: {
			HomeTeamPlayerList,
			HomeTeamPlayerManageBtn,
			AwayTeamPlayerList,
			AwayTeamPlayerManageBtn,
		},
		props: {
			pGameSeq: Number,
		},
		data() {
			return {
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
