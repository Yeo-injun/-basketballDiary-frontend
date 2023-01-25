<template>
	<v-container>
		<v-col align-self="center">
			<v-row no-gutters justify="center">
				{{ this.quarterCodeName }} /
				{{ this.quarterTime }}
			</v-row>
		</v-col>
	</v-container>
</template>

<script>
	export default {
		props: {
			pQuarterCode: String,
			pQuarterCodeName: String,
			pQuarterTime: String,
		},
		data() {
			return {
				quarterCode: this.pQuarterCode,
				quarterCodeName: this.pQuarterCodeName,
				quarterTime: this.pQuarterTime,
			};
		},
	};
</script>

<style lang="scss" scoped></style>
