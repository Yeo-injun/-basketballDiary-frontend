<template>
	<v-container>
		<v-select
			v-model="selected"
			:items="selectItems"
			item-text="name"
			item-value="value"
			label="경기유형"
			@change="selectValue"
		/>
	</v-container>
</template>

<script>
	export default {
		data() {
			return {
				selectItems: [
					{ name: '전체', value: '' },
					{ name: '자체전', value: '01' },
					{ name: '교류전', value: '02' },
				],
				selected: '',
			};
		},
		methods: {
			selectValue() {
				this.$emit('value', this.selected);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
