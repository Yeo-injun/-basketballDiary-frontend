<template>
	<div v-if="this.env == 'local'">
		<EventTestComp />
		<TestSlot :pList="list" :pPagination="pagination" @click-page="onClick">
			<!-- 하위컴포넌트에서 slot에 할당한 데이터를 상위컴포넌트에서는 data라는 변수명으로 사용한다는 문법 -->
			<!-- 상위컴포넌트에서 정의한 변수명 다음으로 하위 컴포넌트에서 정의한 변수명을 사용해야 해당 데이터에 접근가능 -->
			<template v-slot:itemSlot="data">
				<TestBtn :pBtnName="data.item.name" @do-add="onClick" />
			</template>
			<!-- 목록이 존재하지 않을 경우 보여줄 컴포넌트 -->
			<template v-slot:itemEmptySlot> 검색결과가 없습니다. </template>
		</TestSlot>
	</div>
</template>

<script>
	import EventTestComp from '@/components/EventTestComp.vue';
	import TestSlot from '@/components/list/FramePaginationList.vue';
	import TestBtn from '@/components/button/FrameAddBtn.vue';

	export default {
		components: {
			EventTestComp,
			TestSlot,
			TestBtn,
		},
		data() {
			return {
				// 실행 환경 확인
				env: process.env.NODE_ENV,
				list: [{ name: '가' }, { name: '나' }, { name: '다' }],
				pagination: null,
			};
		},
		methods: {
			onClick() {
				this.pagination = {
					pageNo: 2,
					totalPageCount: 5,
					totalCount: 0,
				};
			},
		},
	};
</script>
