<template>
	<v-container>
		<v-card>
			<div v-if="hasQuarterRecords(this.pTeamsQuarterRecords)">
				<v-row no-gutters>
					<v-col cols="12" sm="5">
						<TeamQuarterRecordsComp
							:pTeamQuarterRecords="this.pTeamsQuarterRecords.homeTeamRecords"
						/>
					</v-col>
					<v-col cols="12" sm="2">
						<QuarterTimeComp
							:pQuarterCodeName="this.pTeamsQuarterRecords.quarterCodeName"
							:pQuarterTime="this.pTeamsQuarterRecords.quarterTime"
						/>
					</v-col>
					<v-col cols="12" sm="5">
						<TeamQuarterRecordsComp
							:pTeamQuarterRecords="this.pTeamsQuarterRecords.awayTeamRecords"
						/>
					</v-col>
				</v-row>
			</div>
			<div v-else>
				<v-btn>테스트</v-btn>
			</div>
		</v-card>
	</v-container>
</template>

<script>
	import ValidationUtil from '@/common/util/ValidationUtil.js';
	import TeamQuarterRecordsComp from '@/components/game/quarter/TeamQuarterRecordsComp.vue';
	import QuarterTimeComp from '@/components/game/quarter/QuarterTimeComp.vue';

	export default {
		components: {
			TeamQuarterRecordsComp,
			QuarterTimeComp,
		},
		props: {
			pQuarterCode: String,
			pTeamsQuarterRecords: Object,
		},
		methods: {
			hasQuarterRecords(quarterRecords) {
				if (ValidationUtil.isNull(quarterRecords)) {
					return false;
				}
				return true;
			},
		},
	};
</script>

<style lang="scss" scoped></style>
