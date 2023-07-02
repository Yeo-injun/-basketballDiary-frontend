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
	/** Backend API */
	import GameAPI from '@/api/GameAPI.js';

	/** CODE */
	import { HomeAwayCode } from '@/const/code/GameCode.js';

	/** Utils */
	import ArrayUtil from '@/common/util/ArrayUtil.js';

	/** Components */
	import GameJoinPlayerSaveBtn from '@/components/button/FrameSaveBtn.vue';
	import GameJoinPlayerManageBtn from '@/components/button/FrameOpenBtn.vue';
	import PlayerDataTable from '@/components/game/gameJoinPlayer/PlayerDataTable.vue';

	import GameJoinPlayerSelectionComp from '@/views/game/recordDetail/modal/GameJoinPlayerSelectionComp.vue';
	import { PlayerTypeCode } from '@/const/code/PlayerCode';
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
			pHomeAwayCode: String,
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
				const pathVariables = {
					gameSeq: this.gameSeq,
					homeAwayCode: this.pHomeAwayCode,
				};

				const reqBody = {
					gameJoinPlayers: this.gameJoinPlayers,
				};

				await GameAPI.registerGameJoinPlayers(pathVariables, reqBody);

				this.dialog = false;
				// TODO 모달 닫히고, 이벤트를 에밋해서 모달의 부모 컴포넌트에서 API재호출 할 수 있도록 처리
				this.$emit('register-complete', {
					homeAwayCode: this.pHomeAwayCode,
				});
			},
			async getGameJoinPlayers() {
				const params = {
					gameSeq: this.gameSeq,
					homeAwayCode: this.pHomeAwayCode,
				};

				const res = await GameAPI.getGameJoinPlayers(params);

				switch (this.pHomeAwayCode) {
					case HomeAwayCode.HOME_TEAM:
						this.gameJoinPlayers = res.data.homeTeam.players;
						break;
					case HomeAwayCode.AWAY_TEAM:
						this.gameJoinPlayers = res.data.awayTeam.players;
						break;
				}
				this.isGetGameJoinPlayersLoadOk = true;
			},
			/** userSeq는 게임참가선수로 등록되기 전에도 가지고 있기 때문 */
			deleteGameJoinPlayer(targetPlayer) {
				// 비회원일떄는 email로 지우고
				if (this.isUnauthGuest(targetPlayer.playerTypeCode)) {
					this.gameJoinPlayers = ArrayUtil.deleteItemById(
						this.gameJoinPlayers,
						targetPlayer,
						'email'
					);
					return;
				}
				// 회원일떄는 userSeq로 지우기
				this.gameJoinPlayers = ArrayUtil.deleteItemById(
					this.gameJoinPlayers,
					targetPlayer,
					'userSeq'
				);
			},
			addGameJoinPlayer(targetPlayer) {
				if (this.checkDuplicate(targetPlayer)) {
					return;
				}

				if (!this.validateDataFormat(targetPlayer)) {
					return;
				}

				this.gameJoinPlayers.unshift(targetPlayer);
			},
			checkDuplicate(targetPlayer) {
				if (this.isUnauthGuest(targetPlayer.playerTypeCode)) {
					if (ArrayUtil.hasItem(this.gameJoinPlayers, targetPlayer, 'email')) {
						alert('선수 등록시 이메일이 중복되면 안됩니다.');
						return true;
					}
				} else {
					if (
						ArrayUtil.hasItem(this.gameJoinPlayers, targetPlayer, 'userSeq')
					) {
						alert('이미 등록되어 있는 선수입니다.');
						return true;
					}
				}

				if (
					ArrayUtil.hasItem(this.gameJoinPlayers, targetPlayer, 'backNumber')
				) {
					alert('등번호가 중복됩니다. 등번호를 수정해주세요.');
					return true;
				}

				return false;
			},
			isUnauthGuest(playerTypeCode) {
				return PlayerTypeCode.UNAUTH_GUEST.code == playerTypeCode;
			},
			validateDataFormat(targetPlayer) {
				// 등번호는 3자리수까지만 허용
				const backNumber = targetPlayer.backNumber;
				if (backNumber >= 1000) {
					alert('선수의 등번호는 3자리까지만 입력가능합니다.');
					return false;
				}

				return true;
			},
		},
	};
</script>

<style lang="scss" scoped></style>
