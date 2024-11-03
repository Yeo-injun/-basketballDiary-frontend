<template>
	<v-row dense>
		<v-col cols="6">
			<HomeTeamPlayersManageModal
				v-if="this.pEditable"
				pModalTitlePrefix="홈팀"
				:pHomeAwayCode="this.homeTeamCode"
				@register-complete="getAllGameJoinPlayers"
			/>
			<HomeTeamPlayerList :pGameJoinPlayers="this.homeTeamPlayers" />
		</v-col>
		<v-col cols="6">
			<AwayTeamPlayersManageModal
				v-if="this.pEditable"
				pModalTitlePrefix="어웨이팀"
				:pHomeAwayCode="this.awayTeamCode"
				@register-complete="getAllGameJoinPlayers"
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
			pEditable : {
				type 	: Boolean,
				default : false,
			}
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
		},
	};
</script>

<style lang="scss" scoped></style>
