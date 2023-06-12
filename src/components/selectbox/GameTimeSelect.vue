<template>
	<v-select
		v-model="selected"
		:rules="rules"
		:items="selectOptions"
		item-text="text"
		item-value="value"
		:label="pLabelName"
		@change="selectValue"
	/>
</template>

<script>
	import DateUtil from '@/common/DateUtil.js';
	import ValidationUtil from '@/common/util/ValidationUtil';

	export default {
		props: {
			pLabelName: String,
			pRules: Array,
		},
		data() {
			return {
				selectOptions: DateUtil.Times.getOptions(10),
				selected: '',
				rules: [(value) => ValidationUtil.input.checkNotEmpty(value)],
			};
		},
		methods: {
			selectValue() {
				this.$emit('select-value', this.selected);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
