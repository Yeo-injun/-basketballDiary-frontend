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
	<v-btn block outlined color="primary" @click="this.moveRoutePage">
		{{ this.getBtnName() }}
	</v-btn>
</template>

<script>
	import ValidationUtil from '@/common/util/ValidationUtil.js';
	export default {
		props: {
			pBtnName: String,
			pRoutePageName: String,
			pRouteParams: Object,
		},
		data() {
			return {
				eventEmitName: 'do-post-move',
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
				const hasNotRouteInfo = ValidationUtil.isNull(this.pRoutePageName);
				if (hasNotRouteInfo) {
					return;
				}

				this.$router.push({
					name: this.pRoutePageName,
					query: this.pRouteParams,
				});

				// 버튼 클릭 후
				// 페이지 전환하면서 후처리가 필요한 경우
				// 상위 컴포넌트에서 @do-post-move 이벤트 처리하기
				this.$emit(this.eventEmitName);
			},
		},
	};
</script>

<style></style>
