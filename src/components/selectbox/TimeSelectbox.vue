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
	import ValidationUtil from '@/common/util/ValidationUtil';
	
	const HOUR_TYPE 				= 'hour';
	const TIME_DEFAULT_INFO = {
		hour : {
			max 		: 24,
			interval 	: 1,
		},
		min : {
			max 		: 60,
			interval 	: 1,
		},
		sec : {
			max 		: 60,
			interval 	: 1,
		}
	}

	export default {
		props: {
			pUnitType: String,
			pMax: Number,
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
				const timeInfo 	= this._getTimeInfo();
				const options 	= [];
				let accumualtedTimes = 0;
				while ( accumualtedTimes <= timeInfo.max ) {
					options.push( this._generateOptionFormat( accumualtedTimes ) );
					accumualtedTimes += Number( timeInfo.interval );
				}
				return options;
			},
			_getTimeInfo() {
				const defaultTimeInfo = TIME_DEFAULT_INFO[ this.pUnitType ];
				return {
					max 		: ValidationUtil.isNotNull( this.pMax ) 		? this.pMax 		: defaultTimeInfo.max,
					interval 	: ValidationUtil.isNotNull( this.pInterval ) 	? this.pInterval 	: defaultTimeInfo.interval,
				}
			},
			_generateOptionFormat( data ) {
				const times = HOUR_TYPE == this.pUnitType 
							  ? data
							  : String( data ).padStart(2, '0');
				let result = {};
				result.text 	= times; 
				result.value 	= times;
				return result;
			},
			selectValue() {
				this.$emit('select-value', {
					unitType 	: this.pUnitType,
					value		: Number( this.selected ),
				});
			},
		},
	};
</script>

<style lang="scss" scoped></style>
