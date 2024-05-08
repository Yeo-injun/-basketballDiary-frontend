<template>
	<v-container>
		<h2>경기참가선수</h2>
		<v-container v-if="this.isLoadingComplete">
			<v-row dense>
				<v-col cols="6">
					<HomeTeamPlayersManageModal
						pModalTitlePrefix="홈팀"
						:pHomeAwayCode="this.homeTeamCode"
						@register-complete="getRegisteredPlayers"
					/>
					<HomeTeamPlayerList :pGameJoinPlayers="this.homeTeamPlayers" />
				</v-col>
				<v-col cols="6">
					<AwayTeamPlayersManageModal
						pModalTitlePrefix="어웨이팀"
						:pHomeAwayCode="this.awayTeamCode"
						@register-complete="getRegisteredPlayers"
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

	import HomeTeamPlayerList from '@/views/game/recordDetail/components/player/GameJoinPlayerListComp.vue';
	import HomeTeamPlayersManageModal from '@/views/game/recordDetail/modal/GameJoinPlayersManageModal.vue';

	import AwayTeamPlayerList from '@/views/game/recordDetail/components/player/GameJoinPlayerListComp.vue';
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
				const { data } = await GameAPI.getAllGameJoinPlayers({
							  	     gameSeq: this.pGameSeq,
							     });
				this.homeTeamPlayers = data.homeTeam.players;
				this.awayTeamPlayers = data.awayTeam.players;
				this.isLoadingComplete = true;
			},
			async getRegisteredPlayers(eventParams) {
				const homeAwayCode = eventParams.homeAwayCode;
				const { data } = await GameAPI.getGameJoinPlayers({
					gameSeq: this.pGameSeq,
					homeAwayCode: homeAwayCode,
				});

				// TODO 메세지 구조 변경에 따른 수정 필요
				switch( homeAwayCode ) {
					case HomeAwayCode.HOME_TEAM : this.homeTeamPlayers = data.players; break;
					case HomeAwayCode.AWAY_TEAM : this.awayTeamPlayers = data.players; break;
					default : 
						throw new Error( "유효하지 않은 HOME_AWAY_CODE값입니다." );
				}
			},
		},
		mounted() {
			this.getAllGameJoinPlayers();
		},
	};
</script>

<style lang="scss" scoped></style>
