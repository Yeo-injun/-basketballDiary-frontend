<template>
	<v-container>
		<v-select
			v-model="selected"
			:items="items"
			item-text="text"
			item-value="value"
			label="요일"
			@change="selectValue"
		/>
	</v-container>
</template>

<script>
	import DateUtil from '@/common/DateUtil.js';
	import ValidationUtil from '@/common/util/ValidationUtil';
	
	export default {
		props: {
			pInitVal : String,
		},
		data() {
			return {
				items: DateUtil.TheWeek.getDayOptions(),
				selected: ValidationUtil.isNull( this.pInitVal ) ? '' : this.pInitVal,
			};
		},
		methods: {
			getValue() {
				return this.selected;
			},
			selectValue() {
				this.$emit('select-value', this.selected);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
