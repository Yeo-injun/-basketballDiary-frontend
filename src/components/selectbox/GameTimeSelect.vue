<template>
	<v-container>
		<v-select
			v-model="selected"
			:items="selectItems"
			item-text="text"
			item-value="value"
			:label="pLabelName"
			@change="selectValue"
		/>
	</v-container>
</template>

<script>
	import DateUtil from '@/common/DateUtil.js';

	export default {
		props: {
			pLabelName: String,
		},
		data() {
			return {
				selectItems: DateUtil.Times.getOptions(10),
				selected: '',
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
