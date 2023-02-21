<template>
	<div>
		TODO 쿼터기록 입력창
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
		<HomeTeamRecordInputBoardComp
			v-if="this.isHomeTeamInputMode"
			:pEntry="this.testArr"
		/>
		<AwayTeamRecordInputBoardComp v-else />
		// TODO 팀별 RecordInputBoard가 있어야 함 // 하단 버튼 - 저장 / 쿼터삭제
	</div>
</template>

<script>
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
				testArr: ['dd'],
				isHomeTeamInputMode: true,
				homeTeamTitleInfo: {
					teamName: '테스트HOME',
					homeAwayCode: '01',
				},
				awayTeamTitleInfo: {
					teamName: '테스트AWAY',
					homeAwayCode: '02',
				},
			};
		},
		methods: {
			changeRecordInputTeam(params) {
				console.log(params);
				const homeAwayCode = params.homeAwayCode;
				if (HomeAwayCode.HOME_TEAM == homeAwayCode) {
					this.isHomeTeamInputMode = true;
				} else {
					this.isHomeTeamInputMode = false;
				}
			},
		},
	};
</script>

<style lang="scss" scoped></style>
