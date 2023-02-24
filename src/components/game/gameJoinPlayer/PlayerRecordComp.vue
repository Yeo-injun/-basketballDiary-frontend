<template>
	<v-container>
		<v-card>
			<v-container>
				<v-col>
					<v-row justify="space-between">
						<v-col
							><h3>
								{{ this.pPlayerRecordInfo.name }} (
								{{ this.pPlayerRecordInfo.backNumber }} )
							</h3>
						</v-col>
					</v-row>
					<v-row justify="space-between">
						<v-col>총득점 : {{ this.pPlayerRecordInfo.totalScore }}</v-col>
						<v-col>자유투 : {{ this.pPlayerRecordInfo.freeThrow }}</v-col>
						<v-col>2점 : {{ this.pPlayerRecordInfo.twoPoint }}</v-col>
						<v-col>3점 : {{ this.pPlayerRecordInfo.threePoint }}</v-col>
					</v-row>
					<v-row justify="space-between">
						<v-col>리바운드 : {{ this.pPlayerRecordInfo.rebound }}</v-col>
						<v-col>스틸 : {{ this.pPlayerRecordInfo.steal }}</v-col>
						<v-col>블락 : {{ this.pPlayerRecordInfo.block }}</v-col>
						<v-col>턴오버 : {{ this.pPlayerRecordInfo.turnover }}</v-col>
						<v-col>파울 : {{ this.pPlayerRecordInfo.foul }}</v-col>
						<v-col>리바운드 : {{ this.pPlayerRecordInfo.rebound }}</v-col>
					</v-row>
				</v-col>
			</v-container>
		</v-card>
	</v-container>
</template>

<script>
	export default {
		props: {
			pPlayerRecordInfo: Object,
		},
	};
</script>

<style lang="scss" scoped></style>
