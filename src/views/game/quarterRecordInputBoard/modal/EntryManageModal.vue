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
			<v-card-title>{{ this.pHomeAwayCodeName }} 엔트리 관리</v-card-title>
			<v-container>
				<div>TODO 저장버튼 구현</div>
				<v-container>
					<h4>엔트리 명단</h4>
					<EntryTable
						v-if="isGetEntryLoadOk"
						:pPlayers="entry"
						pRowBtnName="삭제"
						@get-row-player-info="deletePlayerFromEntry"
					/>
				</v-container>
				<v-container>
					<h4>게임참가선수 목록</h4>
					<GameJoinPlayerTable
						v-if="isGetGameJoinPlayersLoadOk"
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
	import GameAPI from '@/api/GameAPI.js';

	import { HomeAwayCode } from '@/const/code/GameCode.js';

	import EntryManageModalOpenBtn from '@/components/button/FrameOpenBtn.vue';

	import EntryTable from '@/components/game/gameJoinPlayer/PlayerDataTable.vue';
	import GameJoinPlayerTable from '@/components/game/gameJoinPlayer/PlayerDataTable.vue';
	export default {
		mounted() {
			this.getGameJoinPlayers();
			this.getGameEntry();
		},
		components: {
			EntryManageModalOpenBtn,
			EntryTable,
			GameJoinPlayerTable,
		},
		props: {
			pHomeAwayCode: String,
			pHomeAwayCodeName: String,
		},
		data() {
			return {
				dialog: false,
				isGetEntryLoadOk: false,
				entry: [],
				isGetGameJoinPlayersLoadOk: false,
				gameJoinPlayers: [],
			};
		},
		methods: {
			// TODO 엔트리 저장 API 붙이기 및 모달 닫기
			async saveEntry() {
				alert('saveEntry');
			},
			// TODO 엔트리 조회 API 구현
			async getGameEntry() {
				this.isGetEntryLoadOk = true;
			},
			// 게임참가선수 목록 조회
			async getGameJoinPlayers() {
				const homeAwayCode = this.pHomeAwayCode;
				const params = {
					gameSeq: this.$route.params.gameSeq,
					homeAwayCode: homeAwayCode,
				};

				const res = await GameAPI.getGameJoinPlayers(params);
				this.isGetGameJoinPlayersLoadOk = true;

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

				// TODO 리스트에서 중복체크 로직 공통화 >> Util클래스로 구현 - ArrayUtil.checkDuplicate(targetArray, targetItem, callback() )
				for (const player of entry) {
					const isAlreadyExistPlayer = player.userSeq == targetPlayer.userSeq;
					if (isAlreadyExistPlayer) {
						alert('이미 등록되어 있는 선수입니다.');
						return;
					}
				}
				this.entry.push(targetPlayer);
			},
			deletePlayerFromEntry(targetPlayer) {
				console.log(targetPlayer);
				// TODO 리스트에서 삭제 로직 공통화
				const newEntry = [];
				for (const player of this.entry) {
					if (targetPlayer.userSeq == player.userSeq) {
						continue;
					}
					newEntry.push(player);
				}
				this.entry = newEntry;
			},
		},
	};
</script>

<style lang="scss" scoped></style>
