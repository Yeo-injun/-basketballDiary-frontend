<template>
	<div>
		TODO 쿼터기록 입력창 - API048 게임쿼터기록조회 붙이기
		<div v-if="this.isGetGameQuarterRecordsLoad">
			<GameQuarterInfoComp :pGameQuarterRecords="this.gameQuarterRecords" />
		</div>
		<v-container>
			<v-row>
				<v-col>
					<HomeTeamTitle
						:pTitleInfo="homeTeamTitleInfo"
						@click-title="changeRecordInputTeam"
					/>
				</v-col>
				<v-col>
					<AwayTeamTitle
						:pTitleInfo="awayTeamTitleInfo"
						@click-title="changeRecordInputTeam"
					/>
				</v-col>
			</v-row>
		</v-container>
		<div v-if="this.isGetGameEntryLoadOk">
			<HomeTeamRecordInputBoardComp
				v-if="this.isHomeTeamInputMode"
				:pHomeAwayCode="this.homeCode"
				:pEntry="this.homeTeamEntry"
				@get-clicked-record-info="processInputRecordStat"
			/>
			<AwayTeamRecordInputBoardComp
				v-else
				:pHomeAwayCode="this.awayCode"
				:pEntry="this.awayTeamEntry"
				@get-clicked-record-info="processInputRecordStat"
			/>
		</div>
		// 하단 버튼 - 저장 / 쿼터삭제
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
	import HomeTeamTitle from '@/components/game/gameJoinTeam/TeamTitleComp.vue';
	import AwayTeamTitle from '@/components/game/gameJoinTeam/TeamTitleComp.vue';

	import HomeTeamRecordInputBoardComp from '@/views/game/quarterRecordInputBoard/components/RecordInputBoardComp.vue';
	import AwayTeamRecordInputBoardComp from '@/views/game/quarterRecordInputBoard/components/RecordInputBoardComp.vue';

	export default {
		components: {
			GameQuarterInfoComp,
			HomeTeamTitle,
			AwayTeamTitle,
			HomeTeamRecordInputBoardComp,
			AwayTeamRecordInputBoardComp,
		},
		data() {
			return {
				isGetGameQuarterRecordsLoad: false,
				isGetGameEntryLoadOk: false,
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
				homeTeamTitleInfo: {
					teamName: '',
					homeAwayCode: '',
					homeAwayCodeName: '',
				},
				homeCode: HomeAwayCode.HOME_TEAM,
				homeTeamEntry: [],
				homeTeamRecords: [],
				awayTeamTitleInfo: {
					teamName: '',
					homeAwayCode: '',
					homeAwayCodeName: '',
				},
				awayCode: HomeAwayCode.AWAY_TEAM,
				awayTeamEntry: [],
				awayTeamRecords: [],
			};
		},
		methods: {
			async getGameQuarterRecords() {
				const params = {
					gameSeq: 1,
					quarterCode: this.$route.params.quarterCode,
				};

				const res = await GameAPI.getGameQuarterRecords(params);
				const gameQuarterRecords = res.data;
				this.gameQuarterRecords = gameQuarterRecords;

				this.isGetGameQuarterRecordsLoad = true;
			},
			async getGameEntry() {
				const params = {
					gameSeq: 2, //this.$route.params.gameSeq,
					quarterCode: this.$route.params.quarterCode,
				};

				const res = await GameAPI.getGameEntry(params);

				const homeTeamInfo = res.data.homeTeamEntry;
				this.homeTeamTitleInfo.teamName = homeTeamInfo.teamName;
				this.homeTeamTitleInfo.homeAwayCode = HomeAwayCode.HOME_TEAM;
				this.homeTeamTitleInfo.homeAwayCodeName = homeTeamInfo.homeAwayCodeName;
				this.homeTeamEntry = homeTeamInfo.entry;

				const awayTeamInfo = res.data.awayTeamEntry;
				this.awayTeamTitleInfo.teamName = awayTeamInfo.teamName;
				this.awayTeamTitleInfo.homeAwayCode = HomeAwayCode.AWAY_TEAM;
				this.awayTeamTitleInfo.homeAwayCodeName = awayTeamInfo.homeAwayCodeName;
				this.awayTeamEntry = res.data.awayTeamEntry.entry;

				// 비동기 통신 완료 후 자식 컴포넌트 생성 제어
				this.isGetGameEntryLoadOk = true;
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

				// 입력모드 체크
				const isSuccessInput = this.inputRecored(targetPlayer, record);
				if (!isSuccessInput) {
					return;
				}

				// TODO 팀의 stat도 같이 올라가야함!! 추가 구현 예정
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
			inputRecored(targetPlayer, record) {
				// TODO 타겟 팀도 선정
				const targetTeamRecords = this.getInputTargetTeamRecords(
					record.homeAwayCode
				);

				const statType = record.statType;
				if (record.mode == RecordMode.ADD) {
					return this.addStatRecord(statType, targetPlayer, targetTeamRecords);
				}
				return this.cancelStatRecord(statType, targetPlayer, targetTeamRecords);
			},
			getInputTargetTeamRecords(homeAwayCode) {
				if (HomeAwayCode.HOME_TEAM == homeAwayCode) {
					return this.gameQuarterRecords.homeTeamRecords;
				}
				return this.gameQuarterRecords.awayTeamRecords;
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
				}
			},
			cancelStatRecord(statType, targetPlayer) {
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
						break;
					case StatType.TWO_POINT:
						targetPlayer.tryTwoPoint--;
						targetPlayer.totalScore -= 2;
						break;
					case StatType.THREE_POINT:
						targetPlayer.tryThreePoint--;
						targetPlayer.totalScore -= 3;
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
		mounted() {
			this.getGameQuarterRecords();
			this.getGameEntry();
		},
	};
</script>

<style lang="scss" scoped></style>
