<template>
	<v-container>
		<h2>경기기록</h2>
		<GameRecordAuthManageModal />
		<div v-if="this.isLoadingComplete">
			<GameQuarterComp
				:pGameSeq="pGameSeq"
				:pTeamSeq="pTeamSeq"
				:pGameRecordStateCode="this.gameRecordStateCode"
				:pQuarterCode="this.quarter1st"
				:pTeamsQuarterRecords="this.teamsRecords1stQuarter"
			/>
			<GameQuarterComp
				:pGameSeq="pGameSeq"
				:pTeamSeq="pTeamSeq"
				:pGameRecordStateCode="this.gameRecordStateCode"
				:pQuarterCode="this.quarter2nd"
				:pTeamsQuarterRecords="this.teamsRecords2ndQuarter"
			/>
			<GameQuarterComp
				:pGameSeq="pGameSeq"
				:pTeamSeq="pTeamSeq"
				:pGameRecordStateCode="this.gameRecordStateCode"
				:pQuarterCode="this.quarter3rd"
				:pTeamsQuarterRecords="this.teamsRecords3rdQuarter"
			/>
			<GameQuarterComp
				:pGameSeq="pGameSeq"
				:pTeamSeq="pTeamSeq"
				:pGameRecordStateCode="this.gameRecordStateCode"
				:pQuarterCode="this.quarter4th"
				:pTeamsQuarterRecords="this.teamsRecords4thQuarter"
			/>
		</div>
	</v-container>
</template>

<script>
	import { QuarterCode } from '@/const/code/GameCode.js';

	import GameAPI from '@/api/GameAPI.js';

	import GameRecordAuthManageModal from '@/views/game/recordDetail/modal/GameRecordAuthManageModal.vue';
	import GameQuarterComp from '@/views/game/recordDetail/components/quarter/GameQuarterComp.vue';

	export default {
		components: {
			GameRecordAuthManageModal,
			GameQuarterComp,
		},
		props: {
			pGameSeq: String,
			pTeamSeq: Number,
		},
		data() {
			return {
				isLoadingComplete: false,
				quarter1st: QuarterCode.QUARTER_1ST,
				quarter2nd: QuarterCode.QUARTER_2ND,
				quarter3rd: QuarterCode.QUARTER_3RD,
				quarter4th: QuarterCode.QUARTER_4TH,
				gameRecordStateCode: '',
				teamsRecords1stQuarter: {},
				teamsRecords2ndQuarter: {},
				teamsRecords3rdQuarter: {},
				teamsRecords4thQuarter: {},
			};
		},
		methods: {
			async getGameAllQuartersRecords() {
				const params = {
					gameSeq: this.pGameSeq,
				};

				const res = await GameAPI.getGameAllQuartersRecords(params);
				this.gameRecordStateCode = res.data.gameRecordStateCode;
				this.teamsRecords1stQuarter = res.data.teamsRecords1stQuarter;
				this.teamsRecords2ndQuarter = res.data.teamsRecords2ndQuarter;
				this.teamsRecords3rdQuarter = res.data.teamsRecords3rdQuarter;
				this.teamsRecords4thQuarter = res.data.teamsRecords4thQuarter;
				this.isLoadingComplete = true;
			},
		},
		mounted() {
			this.getGameAllQuartersRecords();
		},
	};
</script>

<style lang="scss" scoped></style>
