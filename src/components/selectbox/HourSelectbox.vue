<template>
	<v-select
		v-model="selected"
		:items="options"
		item-text="text"
		item-value="value"
		:label="pLabelName"
		@change="selectValue"
	/>
</template>

<script>

	const HOUR_MAX_VALUE = 24;
	const HOUR_INTERVAL = 1;
	export default {
		props: {
			pUnitType: String,
			pMaxTime: Number,
			pInterval: Number,
			pLabelName: String,
			pInitVal: String,
		},
		data() {
			return {
				options: this.intlOptions(),
				selected: this.pInitVal,
			};
		},
		methods: {
			intlOptions() {
				const options = [];
				let accumualtedTimes = 0;
				while ( accumualtedTimes <= HOUR_MAX_VALUE ) {
					options.push( this._genOptionFormat( accumualtedTimes ) );
					accumualtedTimes += HOUR_INTERVAL;
				}
				return options;
			},
			_genOptionFormat( data ) {
				// const times = String( data ).padStart(2, '0');

				let result = {};
				result.text 	= data; // TODO 표시 형식을 처리해주기
				result.value 	= data;
				return result;
			},
			selectValue() {
				this.$emit('select-value', this.selected);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
