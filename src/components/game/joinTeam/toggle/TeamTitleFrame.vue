<template>
	<v-card>
		<v-card-title :class="this.getTitleColor()" @click="clickEmit()">
			<div class="font-weight-bold">
				{{ this.pTeamName }}
				( {{ this.pHomeAwayCodeName }} )
			</div>
		</v-card-title>
	</v-card>
</template>

<script>
	import { HomeAwayCode } from '@/const/code/GameCode.js';

	export default {
		props: {
			pTeamName: String,
			pHomeAwayCode: String,
			pHomeAwayCodeName: String,
			pIsSelected: {
				default() {
					return false;
				},
				Type: Boolean,
			},
		},
		methods: {
			getTitleColor() {
				const selectedState = this.pIsSelected ? '3' : '5';
				const homeAwayCode = this.pHomeAwayCode;
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
					homeAwayCode: this.pHomeAwayCode,
				});
			},
		},
	};
</script>

<style lang="scss" scoped></style>
