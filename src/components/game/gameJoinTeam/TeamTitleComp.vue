<template>
	<v-card>
		<v-card-title :class="this.getTitleColor()" @click="clickEmit()">
			<div class="font-weight-bold">
				{{ this.pTitleInfo.teamName }}
				( {{ this.pTitleInfo.homeAwayCodeName }} )
			</div>
		</v-card-title>
	</v-card>
</template>

<script>
	import ValidationUtil from '@/common/util/ValidationUtil.js';
	import { HomeAwayCode } from '@/const/code/GameCode.js';

	export default {
		props: {
			pTitleInfo: Object,
			pIsSelected: {
				default() {
					return false;
				},
				Type: Boolean,
			},
		},
		methods: {
			getTitleColor() {
				if (ValidationUtil.isNull(this.pTitleInfo)) {
					return '';
				}
				const selectedState = this.pIsSelected ? '3' : '5';
				const homeAwayCode = this.pTitleInfo.homeAwayCode;
				if (HomeAwayCode.HOME_TEAM == homeAwayCode) {
					return `red lighten-${selectedState}`;
				}

				if (HomeAwayCode.AWAY_TEAM == homeAwayCode) {
					return `blue lighten-${selectedState}`;
				}
				return '';
			},
			clickEmit() {
				this.$emit('click-title', {
					homeAwayCode: this.pTitleInfo.homeAwayCode,
				});
			},
		},
	};
</script>

<style lang="scss" scoped></style>
