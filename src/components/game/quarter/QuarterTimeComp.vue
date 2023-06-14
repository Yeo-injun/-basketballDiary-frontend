<template>
	<v-container>
		<v-col align-self="center">
			<v-row no-gutters justify="center">
				<h2>{{ this.pQuarterCodeName }}</h2>
			</v-row>
			<v-row no-gutters justify="center">
				<h4>{{ this.pQuarterTime }}</h4>
			</v-row>
		</v-col>
	</v-container>
</template>

<script>
	import DateUtil from '@/common/DateUtil.js';
	import ValidationUtil from '@/common/util/ValidationUtil';

	export default {
		props: {
			pQuarterCodeName: String,
			pQuarterTime: String,
		},
		watch: {
			/** 쿼터 시간 값이 없으면 (null || undefined || "") 보여주지 않는다. */
			pQuarterTime(newVal) {
				if (ValidationUtil.isNull(newVal)) {
					return null;
				}
				return DateUtil.Format.toTime(newVal);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
