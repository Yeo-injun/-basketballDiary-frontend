<template>
	<!-- TODO 버튼 위치 잡기 -->
	<v-container>
		<v-row no-gutters justify="end">
			<v-col cols="1">
				<v-btn text color="primary" @click="this.moveRoutePage">
					{{ btnName }}
				</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import ValidationUtil from '@/common/util/ValidationUtil.js';
	export default {
		props: {
			pRouteCompName: String, // TODO 삭제 예정 (pRouteInfo로 대체)
			pRouteInfo: Object,
			pBtnName: String,
			// TODO API 호출 후 성공 여부에 따라 화면 전환 코드 구현 예정
			pAPICallBeforeRoute: Function,
		},
		data() {
			return {
				btnName: this.getBtnName(),
			};
		},
		methods: {
			getBtnName() {
				if (ValidationUtil.isNull(this.pBtnName)) {
					return '다음';
				}
				return this.pBtnName;
			},
			moveRoutePage() {
				const hasNotRouteInfo = ValidationUtil.isNull(this.pRouteInfo);
				if (hasNotRouteInfo) {
					return;
				}

				this.$router.push({
					name: this.pRouteInfo.name,
					params: this.pRouteInfo.params,
				});
			},
			/** TODO API호출 후 성공할 시에 화면전환 함수 구현 */
		},
	};
</script>

<style></style>
