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
				:pEntry="this.homeTeamEntry"
				@get-clicked-record-info="mergeInputRecordStat"
			/>
			<AwayTeamRecordInputBoardComp v-else :pEntry="this.awayTeamEntry" />
		</div>
		// 하단 버튼 - 저장 / 쿼터삭제
	</div>
</template>

<script>
	import GameAPI from '@/api/GameAPI.js';

	import { HomeAwayCode } from '@/const/code/GameCode.js';

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
				homeTeamEntry: [],
				awayTeamTitleInfo: {
					teamName: '',
					homeAwayCode: '',
					homeAwayCodeName: '',
				},
				awayTeamEntry: [],
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
				// home팀이냐, away팀이냐 구분하고
				// 해당되는 팀의 엔트리를 순회하여 해당 선수의 기록 변경
				// TODO record에서 homeAwayCode속성 추가
			},
		},
		mounted() {
			this.getGameEntry();
		},
	};
</script>

<style lang="scss" scoped></style>
