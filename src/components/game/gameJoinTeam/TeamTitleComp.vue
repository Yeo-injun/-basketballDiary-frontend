<template>
	<v-card>
		<v-card-title :class="this.titleColor" @click="clickEmit()">
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
		},
		computed: {
			titleColor() {
				if (ValidationUtil.isNull(this.pTitleInfo)) {
					return '';
				}
				const homeAwayCode = this.pTitleInfo.homeAwayCode;
				if (HomeAwayCode.HOME_TEAM == homeAwayCode) {
					return 'red lighten-4';
				}

				if (HomeAwayCode.AWAY_TEAM == homeAwayCode) {
					return 'blue lighten-4';
				}
				return '';
			},
		},
		methods: {
			clickEmit() {
				console.log('``````````````` 이벤트 실행');
				console.log(this.pTitleInfo);
				this.$emit('click-title', {
					homeAwayCode: this.pTitleInfo.homeAwayCode,
				});
			},
		},
	};
</script>

<style lang="scss" scoped></style>
