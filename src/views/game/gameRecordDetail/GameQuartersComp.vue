<template>
	<v-container>
		<h2>경기기록</h2>
		<v-container>
			<v-btn>입력권한관리 - 별도 컴포넌트로 분리(Layer포함)</v-btn>
		</v-container>
		<Quarter1stComp
			:pQuarterTeamsRecords="this.teamsRecords1stQuarter"
			:pQuarterCode="this.quarter1st"
		/>
		<Quarter2ndComp
			:pQuarterTeamsRecords="this.teamsRecords2ndQuarter"
			:pQuarterCode="this.quarter2nd"
		/>
		<Quarter3rdComp
			:pQuarterTeamsRecords="this.teamsRecords3rdQuarter"
			:pQuarterCode="this.quarter3rd"
		/>
		<Quarter4thComp
			:pQuarterTeamsRecords="this.teamsRecords4thQuarter"
			:pQuarterCode="this.quarter4th"
		/>
	</v-container>
</template>

<script>
	import { QuarterCode } from '@/const/code/GameCode.js';

	import GameAPI from '@/api/GameAPI.js';

	import Quarter1stComp from '@/components/game/quarter/GameQuarterComp.vue';
	import Quarter2ndComp from '@/components/game/quarter/GameQuarterComp.vue';
	import Quarter3rdComp from '@/components/game/quarter/GameQuarterComp.vue';
	import Quarter4thComp from '@/components/game/quarter/GameQuarterComp.vue';

	export default {
		components: {
			Quarter1stComp,
			Quarter2ndComp,
			Quarter3rdComp,
			Quarter4thComp,
		},
		props: {
			pGameSeq: Number,
		},
		data() {
			return {
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
			},
		},
		mounted() {
			this.getGameAllQuartersRecords();
		},
	};
</script>

<style lang="scss" scoped></style>
