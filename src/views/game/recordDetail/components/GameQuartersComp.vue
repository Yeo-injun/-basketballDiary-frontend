<template >
	<div>
		<GameRecordAuthManageModal />
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
		created() {
			this.getGameAllQuartersRecords();
		},
		props: {
			pGameSeq: {
				type 	: String,
				default : "",
			},
			pTeamSeq: {
				type 	: String,
				default : "",
			},
		},
		data() {
			return {
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
				const { data } = await GameAPI.getGameAllQuartersRecords({
					gameSeq: this.pGameSeq,
				});
				this.gameRecordStateCode 	= data.gameRecordStateCode;
				this.teamsRecords1stQuarter = data.teamsRecords1stQuarter;
				this.teamsRecords2ndQuarter = data.teamsRecords2ndQuarter;
				this.teamsRecords3rdQuarter = data.teamsRecords3rdQuarter;
				this.teamsRecords4thQuarter = data.teamsRecords4thQuarter;
			},
		},
	};
</script>

<style lang="scss" scoped></style>
