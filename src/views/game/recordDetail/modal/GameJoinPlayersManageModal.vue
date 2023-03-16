<template>
	<v-dialog v-model="dialog" max-width="800px">
		<!-- activator 영역 : 팝업이 뜨기전에 보여줄 컴포넌트들 -->
		<!-- v-slot:activator { on } : https://m.blog.naver.com/tkddlf4209/221732083022 -->
		<template v-slot:activator="{ on, attrs }">
			<div class="text-right" v-bind="attrs" v-on="on">
				<v-container>
					<GameJoinPlayerManageBtn pBtnName="참가선수관리" />
				</v-container>
			</div>
		</template>

		<v-card>
			<v-card-title> {{ pModalTitlePrefix }} 참가선수관리</v-card-title>
			<div class="text-right">
				<GameJoinPlayerSaveBtn pBtnName="등록" @do-save="registerPlayers" />
			</div>
			<v-container>
				<div>참가선수 목록</div>
				<PlayerDataTable
					v-if="isGetGameJoinPlayersLoadOk"
					:pPlayers="gameJoinPlayers"
					pRowBtnName="삭제"
					@get-row-player-info="deleteGameJoinPlayer"
				/>
			</v-container>

			<GameJoinPlayerSelectionComp @add-game-join-player="addGameJoinPlayer" />
		</v-card>
	</v-dialog>
</template>

<script>
	import GameAPI from '@/api/GameAPI.js';

	import { HomeAwayCode } from '@/const/code/GameCode.js';

	import GameJoinPlayerSaveBtn from '@/components/button/FrameSaveBtn.vue';
	import GameJoinPlayerManageBtn from '@/components/button/FrameOpenBtn.vue';
	import PlayerDataTable from '@/components/game/gameJoinPlayer/PlayerDataTable.vue';

	import GameJoinPlayerSelectionComp from '@/views/game/recordDetail/modal/GameJoinPlayerSelectionComp.vue';
	export default {
		mounted() {
			this.getGameJoinPlayers();
		},
		components: {
			GameJoinPlayerSaveBtn,
			GameJoinPlayerManageBtn,
			PlayerDataTable,
			GameJoinPlayerSelectionComp,
		},
		props: {
			pModalTitlePrefix: String,
			pGameJoinTeamInfo: Object,
		},
		data() {
			const query = this.$route.query;
			return {
				gameSeq: query.gameSeq,

				dialog: false,
				isGetGameJoinPlayersLoadOk: false,
				gameJoinPlayers: [],
			};
		},
		methods: {
			async registerPlayers() {
				// TODO 선택한 선수들 등록하기 API035 호출
				const params = {
					gameSeq: this.gameSeq,
					gameJoinTeamSeq: this.pGameJoinTeamInfo.gameJoinTeamSeq, // TODO API url 변경 검토 - 홈어웨이 코드로 식별하는 방식검토
					gameJoinPlayers: this.gameJoinPlayers,
				};
				await GameAPI.registerGameJoinPlayers(params);

				this.dialog = false;
				// TODO 모달 닫히고, 이벤트를 에밋해서 모달의 부모 컴포넌트에서 API재호출 할 수 있도록 처리
				this.$emit('register-complete', {
					homeAwayCode: this.pGameJoinTeamInfo.homeAwayCode,
				});
			},
			async getGameJoinPlayers() {
				const params = {
					gameSeq: this.gameSeq,
					homeAwayCode: this.pGameJoinTeamInfo.homeAwayCode,
				};

				const res = await GameAPI.getGameJoinPlayers(params);
				this.isGetGameJoinPlayersLoadOk = true;

				switch (this.pGameJoinTeamInfo.homeAwayCode) {
					case HomeAwayCode.HOME_TEAM:
						this.gameJoinPlayers = res.data.homeTeam.players;
						break;
					case HomeAwayCode.AWAY_TEAM:
						this.gameJoinPlayers = res.data.awayTeam.players;
						break;
				}
			},
			/** userSeq는 게임참가선수로 등록되기 전에도 가지고 있기 때문 */
			deleteGameJoinPlayer(targetPlayer) {
				console.log(targetPlayer);

				const newPlayers = [];

				for (const player of this.gameJoinPlayers) {
					if (targetPlayer.userSeq == player.userSeq) {
						continue;
					}
					newPlayers.push(player);
				}
				this.gameJoinPlayers = newPlayers;
			},

			addGameJoinPlayer(targetPlayer) {
				console.log(`게임참가선수 목록 Modal : ${targetPlayer}`);
				console.log('addGameJoinPlayer');
				for (const player of this.gameJoinPlayers) {
					const isAlreadyExistPlayer = player.userSeq == targetPlayer.userSeq;
					if (isAlreadyExistPlayer) {
						alert('이미 등록되어 있는 선수입니다.');
						return;
					}
				}
				this.gameJoinPlayers.unshift(targetPlayer);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
