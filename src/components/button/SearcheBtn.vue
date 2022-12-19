<template>
	<v-container>
		<v-row justify="end">
			<v-col cols="1">
				<v-btn>{{ btnName }}</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	export default {
		props: {
			pBtnName: String,
		},
		data() {
			return {
				btnName: this.getBtnName(),
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
		},
	};
</script>

<style lang="scss" scoped></style>
