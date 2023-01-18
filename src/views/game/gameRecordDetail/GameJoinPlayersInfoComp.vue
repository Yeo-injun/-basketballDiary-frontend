<template>
	<v-container>
		<h2>게임참가선수</h2>
		<v-container>
			<v-row dense>
				<HomeTeamPlayerManageBtn />
				<AwayTeamPlayerManageBtn />
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

	import HomeTeamPlayerList from '@/views/game/gameRecordDetail/GameJoinPlayerListComp.vue';
	import HomeTeamPlayerManageBtn from '@/views/game/gameRecordDetail/GameJoinPlayerManageBtn.vue';

	import AwayTeamPlayerList from '@/views/game/gameRecordDetail/GameJoinPlayerListComp.vue';
	import AwayTeamPlayerManageBtn from '@/views/game/gameRecordDetail/GameJoinPlayerManageBtn.vue';

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
		},
		mounted() {
			this.getAllGameJoinPlayers();
		},
	};
</script>

<style lang="scss" scoped></style>
