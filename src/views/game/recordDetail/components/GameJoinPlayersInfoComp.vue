<template>
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
</template>

<script>
	import GameAPI from '@/api/GameAPI.js';

	import { HomeAwayCode } from '@/const/code/GameCode.js';

	import HomeTeamPlayerList from '@/views/game/recordDetail/components/player/GameJoinPlayerListComp.vue';
	import HomeTeamPlayersManageModal from '@/views/game/recordDetail/modal/GameJoinPlayersManageModal.vue';

	import AwayTeamPlayerList from '@/views/game/recordDetail/components/player/GameJoinPlayerListComp.vue';
	import AwayTeamPlayersManageModal from '@/views/game/recordDetail/modal/GameJoinPlayersManageModal.vue';

	export default {
		created() {
			this.getAllGameJoinPlayers();
		},
		components: {
			HomeTeamPlayerList,
			HomeTeamPlayersManageModal,
			AwayTeamPlayerList,
			AwayTeamPlayersManageModal,
		},
		props: {
			pGameSeq: String,
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
				const { data } = await GameAPI.getAllGameJoinPlayers({
							  	     gameSeq: this.pGameSeq,
							     });
				this.homeTeamPlayers = data.homePlayers;
				this.awayTeamPlayers = data.awayPlayers;
			},
			/** 경기참가선수가 추가(서버에 1명씩 저장됨)되면 저장된 정보 재조회하는 구조 */
			async getRegisteredPlayers(eventParams) {
				const homeAwayCode = eventParams.homeAwayCode;
				const { data } = await GameAPI.getGameJoinPlayers({
					gameSeq			: this.pGameSeq,
					homeAwayCode	: homeAwayCode,
				});

				switch( homeAwayCode ) {
					case HomeAwayCode.HOME_TEAM : this.homeTeamPlayers = data.players; break;
					case HomeAwayCode.AWAY_TEAM : this.awayTeamPlayers = data.players; break;
					default : 
						throw new Error( "유효하지 않은 HOME_AWAY_CODE값입니다." );
				}
			},
		},
	};
</script>

<style lang="scss" scoped></style>
