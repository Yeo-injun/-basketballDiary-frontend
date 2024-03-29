<template>
	<v-dialog v-model="isModalOpen" max-width="800px">
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
			<v-card-title class="text-h5 grey lighten-2">
				{{ pModalTitlePrefix }} 참가선수관리
			</v-card-title>
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

			<GameJoinPlayerSelectionTabs
				v-if="isGetGameJoinPlayersLoadOk"
				:pTeamSeq="this.teamSeq"
				@add-game-join-player="addGameJoinPlayer"
			/>
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
	import PlayerDataTable from '@/components/game/table/PlayerDataTable.vue';

	import GameJoinPlayerSelectionTabs from '@/views/game/recordDetail/modal/tab/GameJoinPlayerSelectionTabs.vue';
	import { PlayerTypeCode } from '@/const/code/PlayerCode';
	
	export default {
		mounted() {
			this.getGameJoinPlayers();
		},
		components: {
			GameJoinPlayerSaveBtn,
			GameJoinPlayerManageBtn,
			PlayerDataTable,
			GameJoinPlayerSelectionTabs,
		},
		props: {
			pModalTitlePrefix: String,
			pHomeAwayCode: String,
		},
		data() {
			const query = this.$route.query;
			return {
				isModalOpen: false,
				gameSeq: query.gameSeq,
				teamSeq: '',
				isGetGameJoinPlayersLoadOk: false,
				gameJoinPlayers: [],
			};
		},
		// 참고자료 : https://velog.io/@yeoonnii/Vue.js-watch-%EC%86%8D%EC%84%B1
		// watch 객체의 속성은 감시하고자 하는 속성을 함수로 선언. 함수의 인자는 <새로운 값> 과 <이전값> 이 들어옴
		// 모달이 OPEN됐을때 초기화하기
		// TODO 모달을 공통 컴포넌트로 구현하고 대체하기
		watch: {
			isModalOpen(isOpen) {
				// 모달이 OPEN됐을때 동작
				if (isOpen) {
					this.getGameJoinPlayers();
					return;
				}
				// 모달이 닫혔을때 동작
			},
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

				const res = await GameAPI.registerGameJoinPlayers(pathVariables, reqBody);
				// TODO 개발서버에서도 Location 속성에 접근가능한지 확인 필요 ( CORS 설정때문에 해당 헤더속성에 접근못하고 있음 (local Backend서버에는 설정 추가함 ) )
				console.log( ["============게임참가선수등록========", res.headers, res.headers.location ]);
				
				this.isModalOpen = false;
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
						this.teamSeq = res.data.homeTeam.teamSeq;
						this.gameJoinPlayers = res.data.homeTeam.players;
						break;
					case HomeAwayCode.AWAY_TEAM:
						this.teamSeq = res.data.awayTeam.teamSeq;
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
