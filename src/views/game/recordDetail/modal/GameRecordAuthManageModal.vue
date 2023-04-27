<template>
	<v-dialog v-model="dialog" max-width="800px">
		<!-- v-slot:activator { on } : https://m.blog.naver.com/tkddlf4209/221732083022 -->
		<template v-slot:activator="{ on, attrs }">
			<!-- TODO 모달이 활성화되는 이벤트를 버튼에다가만 걸기. 하지만 지금은
				버튼에다 걸면 do-event가 실행안됨 ㅠ -->
			<div class="text-right" v-bind="attrs" v-on="on">
				<v-container>
					<GameRecordAuthManageBtn
						@do-open="initModal"
						pBtnName="입력권한관리"
					/>
				</v-container>
			</div>
		</template>

		<v-card>
			<v-card-title>경기기록 입력권한관리</v-card-title>
			<v-container>
				<div class="text-right">
					<GameRecordAuthSaveBtn pBtnName="저장" @do-save="saveGameRecorders" />
				</div>
				<v-container>
					<div>권한자 목록</div>
					// TODO 삭제 버튼 로직 구현
					<GameRecordersTable
						v-if="isGetGameRecordersLoadOk"
						:pGameRecorders="gameRecorders"
						@get-row-player-info="deleteGameRecorder"
					/>
				</v-container>
				<HomeAwayTeamToggle
					:pHomeTeamCodeName="this.homeTeamCodeName"
					:pAwayTeamCodeName="this.awayTeamCodeName"
				/>
				<v-container>
					<div>참가선수 목록</div>
					// TODO 추가 버튼 로직 구현
					<PlayerDataTable
						v-if="isGetGameJoinPlayersLoadOk"
						:pPlayers="gameJoinPlayers"
						pRowBtnName="추가"
						@get-row-player-info="addGameRecorder"
					/>
				</v-container>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
	import GameAPI from '@/api/GameAPI.js';

	import { HomeAwayCode } from '@/const/code/GameCode.js';
	import ValidationUtil from '@/common/util/ValidationUtil.js';

	import GameRecordAuthManageBtn from '@/components/button/FrameOpenBtn.vue';

	import GameRecordersTable from '@/views/game/recordDetail/components/GameRecordersTable.vue';

	import GameRecordAuthSaveBtn from '@/components/button/FrameSaveBtn.vue';
	import HomeAwayTeamToggle from '@/components/game/joinTeam/toggle/HomeAwayTeamToggle.vue';
	import PlayerDataTable from '@/components/game/gameJoinPlayer/PlayerDataTable.vue';

	export default {
		components: {
			GameRecordAuthManageBtn,
			GameRecordAuthSaveBtn,
			GameRecordersTable,
			HomeAwayTeamToggle,
			PlayerDataTable,
		},
		props: {
			pGameSeq: Number,
			pHomeAwayCode: String,
		},
		data() {
			const query = this.$route.query;
			return {
				gameSeq: query.gameSeq,
				homeTeamCodeName: 'HOME팀',
				awayTeamCodeName: 'AWAY팀',

				dialog: false,
				isGetGameRecordersLoadOk: false,
				isGetGameJoinPlayersLoadOk: false,
				gameRecorders: [],
				gameJoinPlayers: [],
			};
		},
		methods: {
			initModal() {
				this.getGameRecorders();
				this.getGameJoinTeamMembers();
			},
			async getGameRecorders() {
				const params = {
					gameSeq: this.gameSeq,
				};
				const res = await GameAPI.getGameRecorders(params);

				this.gameRecorders = res.data.gameRecorders;
				this.isGetGameRecordersLoadOk = true;
			},
			async getGameJoinTeamMembers() {
				const homeAwayCode = ValidationUtil.isNull(this.pHomeAwayCode)
					? HomeAwayCode.HOME_TEAM
					: this.pHomeAwayCode;
				const params = {
					gameSeq: this.gameSeq,
					homeAwayCode: homeAwayCode,
				};

				const res = await GameAPI.getGameJoinTeamMembers(params);
				this.gameJoinPlayers = res.data.gameJoinTeamMembers;
				this.isGetGameJoinPlayersLoadOk = true;
			},
			saveGameRecorders() {},
			addGameRecorder() {
				alert('가다나라');
			},
			deleteGameRecorder() {},
		},
	};
</script>

<style lang="scss" scoped></style>
