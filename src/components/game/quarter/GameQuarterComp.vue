<template>
	<v-container>
		<v-card>
			<v-row no-gutters>
				<v-col cols="12" sm="5">
					<TeamQuarterRecordsComp :pTeamQuarterRecords="this.homeTeamRecords" />
				</v-col>
				<v-col cols="12" sm="2">
					<QuarterTimeComp :pQuarterInfo="this.quarterInfo" />
				</v-col>
				<v-col cols="12" sm="5">
					<TeamQuarterRecordsComp :pTeamQuarterRecords="this.awayTeamRecords" />
				</v-col>
			</v-row>
		</v-card>
	</v-container>
</template>

<script>
	import TeamQuarterRecordsComp from '@/components/game/quarter/TeamQuarterRecordsComp.vue';
	import QuarterTimeComp from '@/components/game/quarter/QuarterTimeComp.vue';

	export default {
		components: {
			TeamQuarterRecordsComp,
			QuarterTimeComp,
		},
		props: {
			pQuarterTeamsRecords: Object,
			pQuarterCode: String,
		},
		data() {
			return {
				quarterInfo: {
					quarterCode: this.pQuarterTeamsRecords.quarterCode,
					quarterCodeName: this.pQuarterTeamsRecords.quarterCodeName,
					quarterTime: this.pQuarterTeamsRecords.quarterTime,
				},
				homeTeamRecords: this.pQuarterTeamsRecords.homeTeamRecords,
				awayTeamRecords: this.pQuarterTeamsRecords.awayTeamRecords,
			};
		},
		mounted() {
			debugger;
			return;
		},
	};
</script>

<style lang="scss" scoped></style>
