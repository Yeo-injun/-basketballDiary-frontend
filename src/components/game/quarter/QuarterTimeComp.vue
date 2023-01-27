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
	import DateUtil from '@/common/DateUtil.js';

	export default {
		props: {
			pQuarterInfo: Object,
		},
		data() {
			return {
				quarterCode: this.pQuarterCode,
				quarterCodeName: this.pQuarterInfo.quarterCodeName,
				quarterTime: DateUtil.Format.toTime(this.pQuarterInfo.quarterTime),
			};
		},
	};
</script>

<style lang="scss" scoped></style>
