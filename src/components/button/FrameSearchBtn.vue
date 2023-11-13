<template>
	<!-- <v-container> -->
	<v-btn class="mb-2 mr-2" width="100" @click="doSearach">
		{{ btnName }}
	</v-btn>
	<!-- </v-container> -->
</template>

<script>
	export default {
		props: {
			pBtnName: String,
		},
		data() {
			return {
				btnName: this.getBtnName(),
				eventEmitName: 'do-search',
			};
		},
		methods: {
			getBtnName() {
				if (
					this.pBtnName == null ||
					this.pBtnName == undefined ||
					this.pBtnName == ''
				) {
					return '검색';
				}
				return this.pBtnName;
			},
			doSearach() {
				this.$emit(this.eventEmitName);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
