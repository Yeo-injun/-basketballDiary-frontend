<!--
# 역할 및 책임 : 화면 라우팅만 담당하는 추상버튼. (API콜은 불가능) 
# Props 
1. pBtnInfo : {
	name : String (버튼의 이름) / 기본값 : "다음"
	... 추가 필요
}

2. pRouteInfo : {
	name : Stirng (라우팅할 화면 이름) 
	params : Object (라우팅시 전달할 파라미터)
}
-->

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
			pBtnInfo: Object,
			pRouteInfo: Object,
		},
		data() {
			return {
				btnName: this.getBtnName(),
			};
		},
		methods: {
			getBtnName() {
				if (ValidationUtil.isNull(this.pBtnInfo.name)) {
					return '다음';
				}
				return this.pBtnInfo.name;
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
		},
	};
</script>

<style></style>
