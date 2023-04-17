<template>
	<v-container>
		<v-card>
			<v-container>
				<v-col>
					<v-row justify="space-between">
						<v-col
							><h3>
								{{ this.pPlayerRecord.name }} (
								{{ this.pPlayerRecord.backNumber }} ) /
								{{ this.pPlayerRecord.positionCodeName }}
							</h3>
						</v-col>
					</v-row>
					<v-row justify="space-between">
						<v-col>총득점 : {{ this.pPlayerRecord.totalScore }} 점</v-col>
						<v-col>
							자유투 : {{ this.pPlayerRecord.freeThrow }} /
							{{ this.pPlayerRecord.tryFreeThrow }}
						</v-col>
						<v-col>
							2점 : {{ this.pPlayerRecord.twoPoint }} /
							{{ this.pPlayerRecord.tryTwoPoint }}
						</v-col>
						<v-col>
							3점 : {{ this.pPlayerRecord.threePoint }} /
							{{ this.pPlayerRecord.tryThreePoint }}
						</v-col>
					</v-row>
					<v-row justify="space-between">
						<v-col>어시스트 : {{ this.pPlayerRecord.assist }}</v-col>
						<v-col>리바운드 : {{ this.pPlayerRecord.rebound }}</v-col>
						<v-col>턴오버 : {{ this.pPlayerRecord.turnover }}</v-col>

						<v-col>스틸 : {{ this.pPlayerRecord.steal }}</v-col>
						<v-col>블락 : {{ this.pPlayerRecord.block }}</v-col>
						<v-col>파울 : {{ this.pPlayerRecord.foul }}</v-col>
					</v-row>
				</v-col>
			</v-container>
		</v-card>
	</v-container>
</template>

<script>
	export default {
		props: {
			pPlayerRecord: Object,
		},
	};
</script>

<style lang="scss" scoped></style>
