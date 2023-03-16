<template>
	<!-- TODO 버튼 위치 잡기 -->
	<v-container>
		<v-row no-gutters justify="end">
			<v-col cols="1">
				<v-btn text color="primary" @click="this.moveRoutePage">
					{{ this.btnName }}
				</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import ValidationUtil from '@/common/util/ValidationUtil.js';
	export default {
		props: {
			pBtnInfo: Object,
		},
		data() {
			return {
				btnName: this.pBtnInfo.btnName,
				pageName: this.pBtnInfo.pageName,
				routeParams: this.pBtnInfo.routeParams,
			};
		},
		methods: {
			moveRoutePage() {
				const hasNoPageInfo = ValidationUtil.isNull(this.pageName);
				if (hasNoPageInfo) {
					return;
				}

				this.$router.push({
					name: this.pageName,
					query: this.routeParams,
				});
			},
			/** TODO API호출 후 성공할 시에 화면전환 함수 구현 */
		},
	};
</script>

<style></style>
