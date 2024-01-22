<template>
	<v-row>
		<v-col>
			<MinuteSelectbox pLabelName="쿼터시간-분"
				pUnitType="min"
				:pInitVal="this.minute"
				@select-value="selectValue" 
			/>
		</v-col>
		<v-col>
			<SecondSelectbox pLabelName="쿼터시간-초"
				pUnitType="sec" 
				:pInitVal="this.second"
				@select-value="selectValue" 
			/>			
		</v-col>
	</v-row>
</template>

<script>
	import MinuteSelectbox from '@/components/selectbox/TimeSelectbox.vue';
	import SecondSelectbox from '@/components/selectbox/TimeSelectbox.vue';

	import ValidationUtil from '@/common/util/ValidationUtil.js';

	export default {
		components : {
			MinuteSelectbox	,
			SecondSelectbox	,
		},
		props: {
			pInitVal: String,
		},
		data() {
			const validInitVal = ValidationUtil.isNotNull( this.pInitVal ) && this.pInitVal.length == 4;
			return {
				minute : validInitVal ? this.pInitVal.substring( 0, 2 ) : '0',
				second : validInitVal ? this.pInitVal.substring( 2, 4 ) : '0',
			};
		},
		methods: {
			selectValue( data ) {
				switch( data.unitType ) {
				case 'min' : this.minute = String( data.value ).padStart(2, '0'); break;
				case 'sec' : this.second = String( data.value ).padStart(2, '0'); break;
				}
				this.$emit('select-value', this.minute + this.second );
			},
		},
	};
</script>

<style lang="scss" scoped></style>
