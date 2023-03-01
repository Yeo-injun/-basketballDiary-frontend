<template>
	<v-card>
		<v-card-title :class="this.btnColor" @click="clickEmit()">
			<div class="font-weight-bold">
				{{ this.pType }}
			</div>
		</v-card-title>
	</v-card>
</template>

<script>
	// import ValidationUtil from '@/common/util/ValidationUtil.js';
	import StatType from '@/const/StatType.js';

	export default {
		props: {
			pStatInfo: Object, // TODO 삭제 예정
			pType: String,
		},
		computed: {
			btnColor() {
				// const statInfo = this.pStatInfo;
				// if (ValidationUtil.isNull(statInfo)) {
				// 	return '';
				// }
				// const statType = statInfo.type;
				const statType = this.pType;
				const isNegativeStat = this.isNegativeStat(statType);
				if (isNegativeStat) {
					return 'red lighten-4';
				}
				return 'blue lighten-4';
			},
		},
		methods: {
			clickEmit() {
				this.$emit('get-stat-type', this.pType);
			},
			isNegativeStat(statType) {
				switch (statType) {
					case StatType.TRY_FREE_THROW:
						return true;
					case StatType.TRY_TWO_POINT:
						return true;
					case StatType.TRY_THREE_POINT:
						return true;
					case StatType.TURNOVER:
						return true;
					case StatType.FOUL:
						return true;
					default:
						return false;
				}
			},
		},
	};
</script>

<style lang="scss" scoped></style>
