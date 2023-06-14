<template>
	<v-card>
		<v-row no-gutters>
			<v-col cols="12" sm="5">
				<TeamQuarterRecordsComp :pTeamQuarterRecords="this.pHomeTeamRecords" />
			</v-col>
			<v-col cols="12" sm="2">
				<QuarterTimeComp :pQuarterCodeName="this.pQuarterCodeName" />
			</v-col>
			<v-col cols="12" sm="5">
				<TeamQuarterRecordsComp :pTeamQuarterRecords="this.pAwayTeamRecords" />
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
	/***********
	 * 컴포넌트
	 ***********/
	import TeamQuarterRecordsComp from '@/components/game/quarter/TeamQuarterRecordsComp.vue';
	import QuarterTimeComp from '@/components/game/quarter/QuarterTimeComp.vue';

	export default {
		components: {
			TeamQuarterRecordsComp,
			QuarterTimeComp,
		},
		props: {
			pQuarterCodeName: String,
			pQuarterTime: String,
			pHomeTeamRecords: Object,
			pAwayTeamRecords: Object,
		},
	};
</script>

<style lang="scss" scoped></style>
