<template>
	<div>
		TODO 쿼터기록 입력창 - API048 게임쿼터기록조회 붙이기
		<GameQuarterInfoComp />
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
				@get-clicked-record-info="mergeInputRecordStat"
			/>
			<AwayTeamRecordInputBoardComp
				v-else
				:pHomeAwayCode="this.awayCode"
				:pEntry="this.awayTeamEntry"
			/>
		</div>
		// 하단 버튼 - 저장 / 쿼터삭제
	</div>
</template>

<script>
	import GameAPI from '@/api/GameAPI.js';

	import { HomeAwayCode } from '@/const/code/GameCode.js';
	import StatType from '@/const/StatType.js';

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
				isGetGameEntryLoadOk: false,
				isHomeTeamInputMode: true,
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
			mergeInputRecordStat(record) {
				console.log(record);
				const isHomeTeamRecords = HomeAwayCode.HOME_TEAM == record.homeAwayCode;
				if (isHomeTeamRecords) {
					// TODO 팀의 stat도 같이 올라가야함!! 추가 구현 예정
					this.homeTeamRecords.push(record);

					// 입력값을 받은 선수 filter
					const targetPlayer = this.homeTeamEntry.filter(function (player) {
						return player.gameJoinPlayerSeq == record.gameJoinPlayerSeq;
					})[0];

					// 스탯 유형에 따라 count
					const statType = record.statType;

					// 입력모드 체크
					if (record.mode == 'add') {
						switch (statType) {
							case StatType.TWO_POINT:
								targetPlayer.twoPoint++;
								targetPlayer.tryTwoPoint++;
								targetPlayer.totalScore += 2;
								return;
							case StatType.TRY_TWO_POINT:
								targetPlayer.tryTwoPoint++;
								// TODO 파울갯수 임시 테스트
								targetPlayer.foul++;
								return;
						}
					}

					switch (statType) {
						case StatType.TWO_POINT:
							--targetPlayer.twoPoint;
							--targetPlayer.tryTwoPoint;
							targetPlayer.totalScore -= 2;
							return;
						case StatType.TRY_TWO_POINT:
							--targetPlayer.tryTwoPoint;
							return;
					}
				}

				// TODO 어웨이팀 제어 구현 >> 객체와 메소드를 활용하여 중복 소스 제거 필요
			},
		},
		mounted() {
			this.getGameEntry();
		},
	};
</script>

<style lang="scss" scoped></style>
