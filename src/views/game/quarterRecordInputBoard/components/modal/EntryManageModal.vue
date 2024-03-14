<template>
	<v-dialog v-model="isModalOpen" max-width="800px">
		<!-- activator 영역 : 팝업이 뜨기전에 보여줄 컴포넌트들 -->
		<!-- v-slot:activator { on } : https://m.blog.naver.com/tkddlf4209/221732083022 -->
		<template v-slot:activator="{ on, attrs }">
			<div class="text-right" v-bind="attrs" v-on="on">
				<EntryManageModalOpenBtn @do-open="onOpenModal" pBtnName="엔트리관리" />
			</div>
		</template>

		<v-card>
			<v-card-title>{{ this.homeAwayCodeName }} 엔트리 관리</v-card-title>
			<v-container>
				<div class="text-right">
					<SaveEntryBtn pBtnName="엔트리 저장" @do-save="saveEntry" />
				</div>
				<v-container>
					<h4>엔트리 명단</h4>
					<EntryTable
						v-if="isInit.gameEntry"
						:pPlayers="entry"
						pRowBtnName="삭제"
						@get-row-player-info="deletePlayerFromEntry"
					/>
				</v-container>
				<v-container>
					<h4>게임참가선수 목록</h4>
					<GameJoinPlayerTable
						v-if="isInit.gameJoinPlayers"
						:pPlayers="gameJoinPlayers"
						pRowBtnName="추가"
						@get-row-player-info="addPlayerToEntry"
					/>
				</v-container>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
	import ArrayUtil from '@/common/util/ArrayUtil.js';

	import GameAPI from '@/api/GameAPI.js';

	import { HomeAwayCode } from '@/const/code/GameCode.js';

	import EntryManageModalOpenBtn from '@/components/button/FrameOpenBtn.vue';
	import SaveEntryBtn from '@/components/button/FrameSaveBtn.vue';

	import EntryTable from '@/components/game/table/PlayerDataTable.vue';
	import GameJoinPlayerTable from '@/components/game/table/PlayerDataTable.vue';
	export default {
		components: {
			EntryManageModalOpenBtn,
			SaveEntryBtn,
			EntryTable,
			GameJoinPlayerTable,
		},
		props: {
			pHomeAwayCode: String,
			pModalState: Boolean,
		},
		data() {
			const query = this.$route.query;
			return {
				isModalOpen: false,
				isInit: {
					gameEntry: false,
					gameJoinPlayers: false,
				},
				gameSeq: query.gameSeq,
				quarterCode: query.quarterCode,
				homeAwayCodeName: this.getHomeAwayCodeName(),
				entry: [],
				gameJoinPlayers: [],
			};
		},
		// TODO 모달 공통 컴포넌트 만들기... 공통 동작 반영
		watch: {
			isModalOpen(isOpen) {
				// 모달이 OPEN됐을때 동작
				if (isOpen) {
					this.loadSavedEntry();
					this.loadGameJoinPlayers();
					return;
				}
				// 모달이 닫혔을때 동작
			},
		},
		methods: {
			// 모달 오픈되고 이후 동작 구현을 위한 이벤트 emit
			onOpenModal() {
				console.log('EntryManageModal');
				this.$emit('post-open-handle');
				console.log('EntryManageModal==END');
			},
			async loadSavedEntry() {
				const params = {
					gameSeq: this.gameSeq,
					homeAwayCode: this.pHomeAwayCode,
					quarterCode: this.quarterCode,
				};

				const res = await GameAPI.getGameEntry(params);

				switch (params.homeAwayCode) {
					case HomeAwayCode.HOME_TEAM:
						this.entry = res.data.homeTeamEntry.entry;
						break;
					case HomeAwayCode.AWAY_TEAM:
						this.entry = res.data.awayTeamEntry.entry;
						break;
				}

				// 비동기 통신 완료 후 자식 컴포넌트 생성 제어
				this.isInit.gameEntry = true;
			},
			// 게임참가선수 목록 조회
			async loadGameJoinPlayers() {
				const homeAwayCode = this.pHomeAwayCode;
				const params = {
					gameSeq: this.gameSeq,
					homeAwayCode: homeAwayCode,
				};

				const res = await GameAPI.getGameJoinPlayers(params);

				switch (homeAwayCode) {
					case HomeAwayCode.HOME_TEAM:
						this.gameJoinPlayers = res.data.homeTeam.players;
						break;
					case HomeAwayCode.AWAY_TEAM:
						this.gameJoinPlayers = res.data.awayTeam.players;
						break;
				}

				this.isInit.gameJoinPlayers = true;
			},
			// 엔트리 저장 및 모달 닫기
			async saveEntry() {
				const params = {
					gameSeq: this.gameSeq,
					homeAwayCode: this.pHomeAwayCode,
					quarterCode: this.quarterCode,
					playerList: this.entry,
				};

				await GameAPI.saveEntry(params);
				this.$emit('save-entry');

				// 모달창 닫기
				this.isModalOpen = false;
			},

			addPlayerToEntry(targetPlayer) {
				const entry = this.entry;
				const MAX_PLAYRERS = 5;
				if (entry.length >= MAX_PLAYRERS) {
					alert('엔트리는 최대 5명까지 추가 가능합니다.');
					return;
				}

				if (ArrayUtil.hasItem(entry, targetPlayer, 'gameJoinPlayerSeq')) {
					alert('이미 등록되어 있는 선수입니다.');
					return;
				}
				this.entry.push(targetPlayer);
			},
			deletePlayerFromEntry(targetPlayer) {
				this.entry = ArrayUtil.deleteItemById(
					this.entry,
					targetPlayer,
					// 'userSeq'
					'email' // TODO 참가선수 등록할때 key가 email임. 맞는지 재확인 필요
				);
			},
			getHomeAwayCodeName() {
				const homeAwayCode = this.pHomeAwayCode;
				switch (homeAwayCode) {
					case HomeAwayCode.HOME_TEAM:
						return '홈팀';
					case HomeAwayCode.AWAY_TEAM:
						return '어웨이팀';
					default:
						return '';
				}
			},
		},
	};
</script>

<style lang="scss" scoped></style>
