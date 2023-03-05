<template>
	<v-container>
		<v-col align-self="center">
			<v-row no-gutters justify="center">
				<h2>{{ this.pQuarterCodeName }}</h2>
			</v-row>
			<v-row no-gutters justify="center">
				<h4>{{ this.quarterTime }}</h4>
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
