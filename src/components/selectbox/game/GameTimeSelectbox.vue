<template>
	<v-row>
		<v-col>
			<HourSelectbox :pLabelName="this.hourLabelName"
				pUnitType="hour" 
				:pInitVal="this.hour"
				@select-value="selectValue" 
			/>			
		</v-col>
		<v-col>
			<MinuteSelectbox :pLabelName="this.minuteLabelName"
				pUnitType="min"
				:pInitVal="this.minute"
				@select-value="selectValue" 
			/>
		</v-col>
	</v-row>
</template>

<script>
	import MinuteSelectbox from '@/components/selectbox/TimeSelectbox.vue';
	import HourSelectbox from '@/components/selectbox/TimeSelectbox.vue';

	import ValidationUtil from '@/common/util/ValidationUtil.js';

	export default {
		components : {
			MinuteSelectbox	,
			HourSelectbox	,
		},
		props: {
			pInitVal	: String,
			pLabelName 	: String,
		},
		data() {
			const labelNamePrefix 	= ValidationUtil.isNotNull( this.pLabelName ) ? this.pLabelName : '경기시간';
			const validInitVal 		= ValidationUtil.isNotNull( this.pInitVal ) && this.pInitVal.length == 4;
			return {
				hourLabelName 	: `${labelNamePrefix}-시`,
				minuteLabelName : `${labelNamePrefix}-분`,
				hour 	: validInitVal ? this.pInitVal.substring( 2, 4 ) : '0',
				minute 	: validInitVal ? this.pInitVal.substring( 0, 2 ) : '0',
			};
		},
		methods: {
			selectValue( data ) {
				switch( data.unitType ) {
				case 'hour' : this.hour 	= String( data.value ).padStart(2, '0'); break;
				case 'min' 	: this.minute 	= String( data.value ).padStart(2, '0'); break;
				}
				this.$emit('select-value', this.hour + this.minute );
			},
		},
	};
</script>

<style lang="scss" scoped></style>
