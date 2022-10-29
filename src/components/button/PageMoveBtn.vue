<template>
	<!-- TODO 버튼 위치 잡기 -->
	<v-container>
		<v-row no-gutters justify="end">
			<v-col cols="1">
				<v-btn text color="primary" :to="{ name: pRouteCompName }">
					{{ btnName }}
				</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	export default {
		props: {
			pRouteCompName: String,
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
					return '다음';
				}
				return this.pBtnName;
			},
		},
	};
</script>

<style></style>
