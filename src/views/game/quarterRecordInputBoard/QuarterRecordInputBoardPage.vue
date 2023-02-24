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
		<HomeTeamRecordInputBoardComp
			v-if="this.isHomeTeamInputMode"
			:pEntry="this.homeTeamEntry"
		/>
		<AwayTeamRecordInputBoardComp v-else :pEntry="this.awayTeamEntry" />
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
				isHomeTeamInputMode: true,
				homeTeamTitleInfo: {
					teamName: '',
					homeAwayCode: '',
				},
				homeTeamEntry: [],
				awayTeamTitleInfo: {
					teamName: '',
					homeAwayCode: '',
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

				this.homeTeamTitleInfo.teamName = res.data.homeTeamEntry.teamName;
				this.homeTeamTitleInfo.homeAwayCode = HomeAwayCode.HOME_TEAM;
				this.homeTeamEntry = res.data.homeTeamEntry.entry;

				this.awayTeamTitleInfo.teamName = res.data.awayTeamEntry.teamName;
				this.awayTeamTitleInfo.homeAwayCode = HomeAwayCode.AWAY_TEAM;
				this.awayTeamEntry = res.data.awayTeamEntry.entry;

				// TODO 컴포넌트 라이프사이클과 비동기 데이터 조회 시점이 맞지 않아
				// 데이터 바인딩이 제대로 안될 경우를 위해 동기처리해주기...!
			},
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
		mounted() {
			this.getGameEntry();
		},
	};
</script>

<style lang="scss" scoped></style>
