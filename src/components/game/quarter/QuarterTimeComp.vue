<template>
	<v-container>
		<v-col align-self="center">
			<v-row no-gutters justify="center">
				{{ this.pQuarterCodeName }} /
				{{ this.quarterTime }}
			</v-row>
		</v-col>
	</v-container>
</template>

<script>
	import DateUtil from '@/common/DateUtil.js';

	export default {
		props: {
			pQuarterCodeName: String,
			pQuarterTime: String,
		},
		data() {
			return {
				quarterTime: DateUtil.Format.toTime(this.pQuarterTime),
			};
		},
	};
</script>

<style lang="scss" scoped></style>
