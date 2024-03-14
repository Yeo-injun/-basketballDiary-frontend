<template>
	<div>
		<div v-if="this.isInitData.gameQuarterRecords">
			<GameQuarterInfoComp
				:pGameQuarterRecords="this.gameQuarterRecords"
				@select-quarter-time="setQuarterTime"
			/>
			<v-container>
				<h4 v-if="$platform.isWeb">
					<div>※ PC웹브라우저인 경우 마우스 클릭으로 입력이 안될수 있습니다.</div>
					<div>F12를 눌러 개발도구창을 활성화 시킨 후 Ctrl + Shift + M을 눌러 태블릿 모드로 전환시켜 주세요.</div>
				</h4>
				<HomeAwayTeamToggle
					:pHomeTeamName="this.gameQuarterRecords.homeTeamRecords.teamName"
					:pHomeTeamCode="this.gameQuarterRecords.homeTeamRecords.homeAwayCode"
					:pHomeTeamCodeName="
						this.gameQuarterRecords.homeTeamRecords.homeAwayCodeName
					"
					:pAwayTeamName="this.gameQuarterRecords.awayTeamRecords.teamName"
					:pAwayTeamCode="this.gameQuarterRecords.awayTeamRecords.homeAwayCode"
					:pAwayTeamCodeName="
						this.gameQuarterRecords.awayTeamRecords.homeAwayCodeName
					"
					@select-home-away-team="changeRecordInputTeam"
				/>
			</v-container>
		</div>

		<div v-if="this.isInitData.gameEntry">
			<HomeTeamRecordTableSheet
				v-if="this.isHomeTeamInputMode"
				:pHomeAwayCode="this.homeCode"
				:pEntry="this.homeTeamEntry"
				@open-entry-manage-modal="saveGameQuarter"
				@add-player-record="processInputRecordStat"
				@save-entry="getGameEntry"
			/>
			<AwayTeamRecordTableSheet
				v-else
				:pHomeAwayCode="this.awayCode"
				:pEntry="this.awayTeamEntry"
				@open-entry-manage-modal="saveGameQuarter"
				@add-player-record="processInputRecordStat"
				@save-entry="getGameEntry"
			/>
		</div>
		<v-container>
			<v-row>
				<v-col cols="6" justify="center">
					<SaveGameQuarterBtn
						pBtnName="쿼터저장"
						@do-save="saveGameQuarterWithMessageAlert"
					/>
				</v-col>
				<v-col cols="6" justify="center">
					<DeleteGameQuarterBtn
						pBtnName="쿼터삭제"
						@do-delete="deleteGameQuarter"
					/>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
	import GameAPI from '@/api/GameAPI.js';

	import { HomeAwayCode } from '@/const/code/GameCode.js';
	import {
		StatType,
		RecordMode,
	} from '@/views/game/quarterRecordInputBoard/const/QuarterRecordInputBoard.js';

	import ValidationUtil from '@/common/util/ValidationUtil.js';

	import GameQuarterInfoComp from '@/views/game/quarterRecordInputBoard/components/GameQuarterInfoComp.vue';
	import HomeAwayTeamToggle from '@/components/game/joinTeam/toggle/HomeAwayTeamToggle.vue';

	import HomeTeamRecordTableSheet from '@/views/game/quarterRecordInputBoard/components/RecordTableSheetComp.vue';
	import AwayTeamRecordTableSheet from '@/views/game/quarterRecordInputBoard/components/RecordTableSheetComp.vue';

	import SaveGameQuarterBtn from '@/components/button/FrameSaveBtn.vue';
	import DeleteGameQuarterBtn from '@/components/button/FrameDeletionBtn.vue';

	export default {
		components: {
			GameQuarterInfoComp,
			HomeAwayTeamToggle,
			HomeTeamRecordTableSheet,
			AwayTeamRecordTableSheet,
			SaveGameQuarterBtn,
			DeleteGameQuarterBtn,
		},
		data() {
			const query = this.$route.query;
			return {
				gameSeq: query.gameSeq,
				teamSeq: query.teamSeq,
				quarterCode: query.quarterCode,
				isInitData: {
					gameQuarterRecords: false,
					gameEntry: false,
				},
				isHomeTeamInputMode: true,
				gameQuarterRecords: {
					gameSeq: '',
					quarterCode: '',
					quarterCodeName: '',
					gameYmd: '',
					gameStartTime: '',
					gameEndTime: '',
					quarterTime: '',
					homeTeamRecords: {},
					awayTeamRecords: {},
				},
				homeCode: HomeAwayCode.HOME_TEAM,
				awayCode: HomeAwayCode.AWAY_TEAM,

				homeTeamEntry: [],
				awayTeamEntry: [],

				homeTeamRecords: [],
				awayTeamRecords: [],
			};
		},
		mounted() {
			this.getGameQuarterRecords();
			this.getGameEntry();
		},
		methods: {
			async getGameQuarterRecords() {
				const params = {
					gameSeq		: this.gameSeq,
					quarterCode	: this.quarterCode,
				};

				const res = await GameAPI.getGameQuarterRecords(params);
				const gameQuarterRecords = res.data;
				this.gameQuarterRecords = gameQuarterRecords;

				this.isInitData.gameQuarterRecords = true;
			},
			async getGameEntry() {
				const params = {
					gameSeq: this.gameSeq,
					quarterCode: this.quarterCode,
				};

				const res = await GameAPI.getGameEntry(params);

				const homeTeamInfo = res.data.homeTeamEntry;
				this.homeTeamEntry = homeTeamInfo.entry;

				const awayTeamInfo = res.data.awayTeamEntry;
				this.awayTeamEntry = awayTeamInfo.entry;

				// 비동기 통신 완료 후 자식 컴포넌트 생성 제어
				this.isInitData.gameEntry = true;
			},
			setQuarterTime(targetVal) {
				this.gameQuarterRecords.quarterTime = targetVal;
			},
			// 게임쿼터 저장API 호출 후 성공여부에 따라 메세지 alert창 호출
			async saveGameQuarterWithMessageAlert() {
				const result = await this.saveGameQuarter();
				alert(result.message);
			},
			// 게임쿼터 저장API 호출
			async saveGameQuarter() {
				try {
					await GameAPI.saveQuarterRecords(
						{
							gameSeq: this.gameSeq,
							quarterCode: this.quarterCode,
						},
						{
							quarterTime: this.gameQuarterRecords.quarterTime,
							homeTeamPlayerRecords: this.homeTeamEntry,
							awayTeamPlayerRecords: this.awayTeamEntry,
						}
					);
				} catch (e) {
					return {
						success: false,
						message: e.message,
					};
				}
				return {
					success: true,
					message: '저장완료되었습니다.',
				};
			},
			async deleteGameQuarter() {
				const params = {
					gameSeq: this.gameSeq,
					quarterCode: this.quarterCode,
				};

				await GameAPI.deleteGameQuarter(params);
				this.$router.push({
					name: 'GameRecordDetailPage',
					query: {
						gameSeq: this.gameSeq,
						teamSeq: this.teamSeq,
					},
				});
			},
			changeRecordInputTeam(params) {
				const homeAwayCode = params.homeAwayCode;
				if (HomeAwayCode.HOME_TEAM == homeAwayCode) {
					this.isHomeTeamInputMode = true;
				} else {
					this.isHomeTeamInputMode = false;
				}
			},
			processInputRecordStat(record) {
				console.log(record);
				const homeAwayCode = record.homeAwayCode;
				const targetPlayer = this.getTargetPlayer(
					homeAwayCode,
					record.gameJoinPlayerSeq
				);
				const targetTeamRecords = this.getTargetTeamRecords(homeAwayCode);

				// 입력모드 체크
				const isSuccessInput = this.inputRecored(
					record,
					targetPlayer,
					targetTeamRecords
				);
				if (!isSuccessInput) {
					return;
				}

				if (HomeAwayCode.HOME_TEAM == homeAwayCode) {
					this.homeTeamRecords.push(record);
				} else {
					this.awayTeamRecords.push(record);
				}
			},
			getTargetPlayer(homeAwayCode, gameJoinPlayerSeq) {
				const isHomeTeamRecords = HomeAwayCode.HOME_TEAM == homeAwayCode;
				if (isHomeTeamRecords) {
					return this.homeTeamEntry.filter(function (player) {
						return player.gameJoinPlayerSeq == gameJoinPlayerSeq;
					})[0];
				}

				return this.awayTeamEntry.filter(function (player) {
					return player.gameJoinPlayerSeq == gameJoinPlayerSeq;
				})[0];
			},
			getTargetTeamRecords(homeAwayCode) {
				if (HomeAwayCode.HOME_TEAM == homeAwayCode) {
					return this.gameQuarterRecords.homeTeamRecords;
				}
				return this.gameQuarterRecords.awayTeamRecords;
			},
			inputRecored(record, targetPlayer, targetTeamRecords) {
				const statType = record.statType;
				if (record.mode == RecordMode.ADD) {
					return this.addStatRecord(statType, targetPlayer, targetTeamRecords);
				}
				return this.cancelStatRecord(statType, targetPlayer, targetTeamRecords);
			},
			// 스탯 올리기
			addStatRecord(statType, targetPlayer, targetTeamRecords) {
				let targetStatCnt = targetPlayer[statType];
				if (ValidationUtil.isNull(targetStatCnt)) {
					return false;
				}
				targetPlayer[statType]++;
				switch (statType) {
					case StatType.FREE_THROW:
						targetPlayer.tryFreeThrow++;
						targetPlayer.totalScore++;
						targetTeamRecords.score++;
						return true;
					case StatType.TWO_POINT:
						targetPlayer.tryTwoPoint++;
						targetPlayer.totalScore += 2;
						targetTeamRecords.score += 2;
						return true;
					case StatType.THREE_POINT:
						targetPlayer.tryThreePoint++;
						targetPlayer.totalScore += 3;
						targetTeamRecords.score += 3;
						return true;
					case StatType.FOUL:
						targetTeamRecords.foul++;
				}
				return true;
			},
			cancelStatRecord(statType, targetPlayer, targetTeamRecords) {
				let targetStatCnt = targetPlayer[statType];
				if (ValidationUtil.isNull(targetStatCnt)) {
					return false;
				}
				const canCancelCnt = targetStatCnt > 0;
				if (!canCancelCnt) {
					return false;
				}

				// TODO 득점과 관련된 속성은 시도횟수가 성공횟수보다 클경우에만 취소됨
				switch (statType) {
					case StatType.FREE_THROW:
						targetPlayer.tryFreeThrow--;
						targetPlayer.totalScore--;
						targetTeamRecords.score--;
						break;
					case StatType.TWO_POINT:
						targetPlayer.tryTwoPoint--;
						targetPlayer.totalScore -= 2;
						targetTeamRecords.score -= 2;
						break;
					case StatType.THREE_POINT:
						targetPlayer.tryThreePoint--;
						targetPlayer.totalScore -= 3;
						targetTeamRecords.score -= 3;
						break;

					case StatType.FOUL:
						targetTeamRecords.foul--;
						break;

					case StatType.TRY_FREE_THROW:
						if (targetPlayer.freeThrow >= targetPlayer.tryFreeThrow) {
							return false;
						}
						break;

					case StatType.TRY_TWO_POINT:
						if (targetPlayer.twoPoint >= targetPlayer.tryTwoPoint) {
							return false;
						}
						break;

					case StatType.TRY_THREE_POINT:
						if (targetPlayer.threePoint >= targetPlayer.tryThreePoint) {
							return false;
						}
						break;
				}
				targetPlayer[statType]--;
				return true;
			},
		},
	};
</script>

<style lang="scss" scoped></style>
