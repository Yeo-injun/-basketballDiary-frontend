<template>
	<v-container>
		<h2>경기기록</h2>
		<v-container>
			<v-btn>입력권한관리 - 별도 컴포넌트로 분리(Layer포함)</v-btn>
		</v-container>
		<div v-if="this.isLoading">
			<GameQuarterComp
				:pQuarterCode="this.quarter1st"
				:pTeamsQuarterRecords="this.teamsRecords1stQuarter"
			/>
			<GameQuarterComp
				:pQuarterCode="this.quarter2nd"
				:pTeamsQuarterRecords="this.teamsRecords2ndQuarter"
			/>
			<GameQuarterComp
				:pQuarterCode="this.quarter3rd"
				:pTeamsQuarterRecords="this.teamsRecords3rdQuarter"
			/>
			<GameQuarterComp
				:pQuarterCode="this.quarter4th"
				:pTeamsQuarterRecords="this.teamsRecords4thQuarter"
			/>
		</div>
	</v-container>
</template>

<script>
	import { QuarterCode } from '@/const/code/GameCode.js';

	import GameAPI from '@/api/GameAPI.js';

	import GameQuarterComp from '@/components/game/quarter/GameQuarterComp.vue';

	export default {
		components: {
			GameQuarterComp,
		},
		props: {
			pGameSeq: Number,
		},
		data() {
			return {
				isLoading: false,
				quarter1st: QuarterCode.QUARTER_1ST,
				quarter2nd: QuarterCode.QUARTER_2ND,
				quarter3rd: QuarterCode.QUARTER_3RD,
				quarter4th: QuarterCode.QUARTER_4TH,
				teamsRecords1stQuarter: {},
				teamsRecords2ndQuarter: {},
				teamsRecords3rdQuarter: {},
				teamsRecords4thQuarter: {},
			};
		},
		methods: {
			async getGameAllQuartersRecords() {
				const params = {
					// gameSeq: this.pGameSeq,
					gameSeq: 1,
				};

				const res = await GameAPI.getGameAllQuartersRecords(params);
				this.teamsRecords1stQuarter = res.data.teamsRecords1stQuarter;
				this.teamsRecords2ndQuarter = res.data.teamsRecords2ndQuarter;
				this.teamsRecords3rdQuarter = res.data.teamsRecords3rdQuarter;
				this.teamsRecords4thQuarter = res.data.teamsRecords4thQuarter;
				this.isLoading = true;
			},
		},
		mounted() {
			this.getGameAllQuartersRecords();
		},
	};
</script>

<style lang="scss" scoped></style>
