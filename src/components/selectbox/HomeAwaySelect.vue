<template>
	<v-container>
		<v-select
			v-model="selected"
			:items="selectItems"
			item-text="name"
			item-value="value"
			label="게임구분"
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
					{ name: 'HOME', value: '01' },
					{ name: 'AWAY', value: '02' },
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
