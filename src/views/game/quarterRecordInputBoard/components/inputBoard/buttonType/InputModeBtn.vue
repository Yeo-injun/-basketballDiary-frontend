<template>
	<v-card>
		<v-card-title :class="this.btnColor" @click="clickEmit()">
			<div class="font-weight-bold">
				{{ this.pBtnInfo.btnName }}
			</div>
		</v-card-title>
	</v-card>
</template>

<script>
	import ValidationUtil from '@/common/util/ValidationUtil.js';

	export default {
		props: {
			pBtnInfo: Object,
			pActiveMode: String,
		},
		computed: {
			btnColor() {
				if (ValidationUtil.isNull(this.pBtnInfo)) {
					return '';
				}
				const btnMode = this.pBtnInfo.mode;
				const isActiveBtn = btnMode == this.pActiveMode;
				if (isActiveBtn) {
					return 'green lighten-4';
				}
				return '';
			},
		},
		methods: {
			clickEmit() {
				this.$emit('click-mode-btn', this.pBtnInfo.mode);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
