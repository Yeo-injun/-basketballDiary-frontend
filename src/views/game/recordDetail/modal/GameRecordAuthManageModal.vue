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
						pBtnName="경기기록원 관리"
					/>
				</v-container>
			</div>
		</template>

		<v-card>
			<v-card-title class="font-weight-medium grey lighten-2">
				경기기록원 관리
			</v-card-title>
			<v-container>

				<v-container>
					<ModalSubTitle pTitleName="경기기록원 후보 목록 ( 경기참가선수 중 회원만 가능 )" />
					<HomeAwayTeamToggle
						class="my-1"
						:pHomeTeamCodeName="this.homeTeamCodeName"
						:pAwayTeamCodeName="this.awayTeamCodeName"
						@select-home-away-team="getGameRecorderCandidatesByHomeAwayTeam"
					/>
					<GameRecorderCandidates
						v-if="isGetGameRecorderCandidatesLoadOk"
						:pPlayers="gameRecorderCandidates"
						pRowBtnName="추가"
						@get-row-player-info="addGameRecorder"
					/>
				</v-container>

				<v-container>
					<ModalSubTitle pTitleName="경기기록원 목록" />
					<GameRecordersTable
						v-if="isGetGameRecordersLoadOk"
						:pGameRecorders="gameRecorders"
						@get-row-player-info="deleteGameRecorder"
					/>
				</v-container>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
	import GameAPI from '@/api/GameAPI.js';

	import { HomeAwayCode, GameRecordAuthCode } from '@/const/code/GameCode.js';
	import ValidationUtil from '@/common/util/ValidationUtil.js';
	import ArrayUtil from '@/common/util/ArrayUtil.js';

	import ModalSubTitle from '@/components/title/FrameTabSubTitle.vue';
	import GameRecordersTable from '@/views/game/recordDetail/modal/GameRecordersTable.vue';

	import HomeAwayTeamToggle from '@/components/game/toggle/HomeAwayTeamToggle.vue';
	import GameRecorderCandidates from '@/components/game/table/PlayerDataTable.vue';

	import GameRecordAuthManageBtn from '@/components/button/FrameOpenBtn.vue';

	const CREATOR_CODE = GameRecordAuthCode.CREATOR.code;

	export default {
		components: {
			ModalSubTitle,

			GameRecordAuthManageBtn,
			GameRecordersTable,
			HomeAwayTeamToggle,
			GameRecorderCandidates,
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
				isGetGameRecorderCandidatesLoadOk: false,
				gameRecorders: [],
				gameRecorderCandidates: [],
			};
		},
		methods: {
			initModal() {
				this.getGameRecorders();
				this.initGameRecorderCandidates();
			},
			async getGameRecorders() {
				const params = {
					gameSeq: this.gameSeq,
				};
				const res = await GameAPI.getGameRecorders(params);

				this.gameRecorders = res.data.gameRecorders;
				this.isGetGameRecordersLoadOk = true;
			},
			initGameRecorderCandidates() {
				this.getGameRecorderCandidates({
					gameSeq			: this.gameSeq,
					homeAwayCode	: ValidationUtil.isNull( this.pHomeAwayCode )
										? HomeAwayCode.HOME_TEAM
										: this.pHomeAwayCode,
				});
			},
			getGameRecorderCandidatesByHomeAwayTeam(emitParams) {
				this.getGameRecorderCandidates({
					gameSeq			: this.gameSeq,
					homeAwayCode	: emitParams.homeAwayCode,
				});
			},
			async getGameRecorderCandidates( params ) {
				const data = await GameAPI.getGameRecorderCandidates( params );
				this.gameRecorderCandidates = data.candidates;
				this.isGetGameRecorderCandidatesLoadOk = true;
			},
			async addGameRecorder( targetPlayer ) {
				const identifierName = 'userSeq';
				if (
					ArrayUtil.hasItem(this.gameRecorders, targetPlayer, identifierName)
				) {
					alert('이미 경기 기록권한을 가진 사람입니다.');
					return;
				}
				await GameAPI.saveGameRecorder({
					gameSeq			: this.gameSeq,
					gameRecorder	: targetPlayer,
				});
				alert( "경기기록원으로 추가됐습니다." );
				await this.getGameRecorders();
			},
			deleteGameRecorder(targetPlayer) {
				const identifierName = 'userSeq';
				const deleteTarget = ArrayUtil.findItemById(
					this.gameRecorders,
					targetPlayer,
					identifierName
				);

				const hasDeleteTarget = ValidationUtil.isNotNull(deleteTarget);
				if (!hasDeleteTarget) {
					return;
				}

				if (deleteTarget.gameRecordAuthCode === CREATOR_CODE) {
					alert('경기생성자는 삭제할 수 없습니다.');
					return;
				}

				// TODO 경기기록원 삭제API 구현 및 추가 요망

				this.gameRecorders = ArrayUtil.deleteItemById(
					this.gameRecorders,
					targetPlayer,
					identifierName
				);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
