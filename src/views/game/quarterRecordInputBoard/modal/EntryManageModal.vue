<template>
	<v-dialog v-model="dialog" max-width="800px">
		<!-- activator 영역 : 팝업이 뜨기전에 보여줄 컴포넌트들 -->
		<!-- v-slot:activator { on } : https://m.blog.naver.com/tkddlf4209/221732083022 -->
		<template v-slot:activator="{ on, attrs }">
			<div class="text-right" v-bind="attrs" v-on="on">
				<EntryManageModalOpenBtn pBtnName="엔트리관리" />
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

	import EntryTable from '@/components/game/gameJoinPlayer/PlayerDataTable.vue';
	import GameJoinPlayerTable from '@/components/game/gameJoinPlayer/PlayerDataTable.vue';
	export default {
		mounted() {
			// TODO 모달 호출시에 메소드 호출하도록 처리하기
			this.getGameJoinPlayers();
			this.getGameEntry();
		},
		components: {
			EntryManageModalOpenBtn,
			SaveEntryBtn,
			EntryTable,
			GameJoinPlayerTable,
		},
		props: {
			pHomeAwayCode: String,
		},
		data() {
			const query = this.$route.query;
			return {
				gameSeq: query.gameSeq,
				quarterCode: query.quarterCode,
				homeAwayCodeName: this.getHomeAwayCodeName(),
				isInit: {
					gameEntry: false,
					gameJoinPlayers: false,
				},
				dialog: false,
				entry: [],
				gameJoinPlayers: [],
			};
		},
		methods: {
			// TODO 엔트리 저장 API 붙이기 및 모달 닫기
			async saveEntry() {
				const params = {
					gameSeq: this.gameSeq,
					homeAwayCode: this.pHomeAwayCode,
					quarterCode: this.quarterCode,
					playerList: this.entry,
				};
				console.log(params);
				const res = await GameAPI.saveEntry(params);
				console.log(res);
				// TODO API 리턴으로 저장한 엔트리 던져주기

				this.$emit('save-entry');

				// 모달창 닫기
				this.dialog = false;
			},
			// TODO 엔트리 조회 API 구현
			async getGameEntry() {
				this.isInit.gameEntry = true;
			},
			// 게임참가선수 목록 조회
			async getGameJoinPlayers() {
				const homeAwayCode = this.pHomeAwayCode;
				const params = {
					gameSeq: this.gameSeq,
					homeAwayCode: homeAwayCode,
				};

				const res = await GameAPI.getGameJoinPlayers(params);
				this.isInit.gameJoinPlayers = true;

				switch (homeAwayCode) {
					case HomeAwayCode.HOME_TEAM:
						this.gameJoinPlayers = res.data.homeTeam.players;
						break;
					case HomeAwayCode.AWAY_TEAM:
						this.gameJoinPlayers = res.data.awayTeam.players;
						break;
				}
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
					'userSeq'
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
