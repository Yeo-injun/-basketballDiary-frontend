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

	const HOUR_TYPE = 'hour';
	const HOUR_DEDAULT = 24;
	const HOUR_INTERVAL_DEFAULT = 30;

	const MINUTE_TYPE = 'min';
	const MINUTE_DEDAULT = 10;
	const MINUTE_INTERVAL_DEFAULT = 10;

	export default {
		props: {
			pUnitType: String,
			pMaxTime: Number,
			pInterval: Number,
			pLabelName: String,
			pInitVal: String,
			pRules: Array,
		},
		data() {
			return {
				selectOptions: this.intlOptions(),
				selected: this.pInitVal,
				rules: [(value) => ValidationUtil.input.checkNotEmpty(value)],
			};
		},
		methods: {
			intlOptions() {
				const intlTimeInfo = this._getIntlTimeInfo();
				const options = [];

				const DEFAULT_UNIT = 60;
				const totalMaxTimes = intlTimeInfo.maxTime * DEFAULT_UNIT;
				const interval = intlTimeInfo.interval;

				let accumualtedTimes = 0;
				while (accumualtedTimes <= totalMaxTimes) {
					options.push(
						this._genOptionFormat(
							Math.floor(accumualtedTimes / DEFAULT_UNIT),
							accumualtedTimes % DEFAULT_UNIT
						)
					);
					accumualtedTimes += interval;
				}
				return options;
			},
			_getIntlTimeInfo() {
				if (ValidationUtil.isNull(this.pUnitType)) {
					return {
						unitType: HOUR_TYPE,
						maxTime: HOUR_DEDAULT,
						interval: HOUR_INTERVAL_DEFAULT,
					};
				}

				switch (this.pUnitType) {
					case HOUR_TYPE:
						return {
							unitType: HOUR_TYPE,
							maxTime: this.pMaxTime || HOUR_DEDAULT,
							interval: this.pInterval || HOUR_INTERVAL_DEFAULT,
						};
					case MINUTE_TYPE:
						return {
							unitType: MINUTE_TYPE,
							maxTime: this.pMaxTime || MINUTE_DEDAULT,
							interval: this.pInterval || MINUTE_INTERVAL_DEFAULT,
						};
				}
			},
			_genOptionFormat(parentTimes, childTimes) {
				const times =
					String(parentTimes).padStart(2, '0') +
					String(childTimes).padStart(2, '0');

				let result = {};
				result.text = DateUtil.Format.toTime(times);
				result.value = result.text.replace(':', '');
				return result;
			},
			getFirstOptionValue(intervalMinutes) {
				return this.getOptions(intervalMinutes)[0].value;
			},
			getLastOptionValue(intervalMinutes) {
				const options = this.getOptions(intervalMinutes);
				const lastIndex = options.length - 1;
				return options[lastIndex].value;
			},
			selectValue() {
				this.$emit('select-value', this.selected);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
