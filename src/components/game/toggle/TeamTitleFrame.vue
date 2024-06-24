<template>
	<v-card>
		<v-card-title :class="this.getTitleColor()" @click="clickEmit()">
			<div class="font-weight-bold">
				{{ this.getTeamTitleText() }}
			</div>
		</v-card-title>
	</v-card>
</template>

<script>
	import ValidationUtil from '@/common/util/ValidationUtil.js';

	import { HomeAwayCode } from '@/const/code/GameCode.js';

	export default {
		props: {
			pTeamName		: {
				type : String, 
			},
			pHomeAwayCode	: {
				type 		: String,
				required 	: true, 
			},
			pHomeAwayCodeName: {
				type 		: String, 
			},
			pIsSelected: {
				default() {
					return false;
				},
				Type: Boolean,
			},
		},
		methods: {
			getTeamTitleText() {
				if ( ValidationUtil.isNotNull( this.pTeamName ) ) {
					return `[ ${this.pHomeAwayCodeName} ] ${this.pTeamName}`;
				}
				return this.pHomeAwayCodeName;
			},
			getTitleColor() {
				const selectedState = this.pIsSelected ? '3' : '5';
				switch ( this.pHomeAwayCode ) {
					case HomeAwayCode.HOME_TEAM : return `red lighten-${selectedState}`;
					case HomeAwayCode.AWAY_TEAM : return `blue lighten-${selectedState}`;
					default : return '';
				}
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
