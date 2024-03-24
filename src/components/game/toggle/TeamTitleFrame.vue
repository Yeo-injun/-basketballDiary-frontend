<template>
	<v-card>
		<v-card-title :class="this.getTitleColor()" @click="clickEmit()">
			<div class="font-weight-bold">
				{{ this.teamTitleText }}
			</div>
		</v-card-title>
	</v-card>
</template>

<script>
	import ValidationUtil from '@/common/util/ValidationUtil.js';

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
		data() {
			console.log(
				` data()호출 : props 1 - ${this.pTeamName} / props 2 - ${this.pHomeAwayCode}`
			);
			return {
				teamTitleText: this.getTeamTitleText(
					this.pTeamName,
					this.pHomeAwayCodeName
				),
			};
		},
		methods: {
			getTeamTitleText(teamName, homeAwayName) {
				console.log(
					` getTeamTitleText()호출 : props 1 - ${this.pTeamName} / props 2 - ${this.pHomeAwayCode}`
				);

				if (ValidationUtil.isNotNull(teamName)) {
					return `${teamName} ( ${homeAwayName} )`;
				}
				return homeAwayName;
			},
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
