<template>
	<v-container>
		<div>
			<h2>안녕하세요. 농구일기입니다. 우리팀의 경기를 기록해보세요.</h2>
		</div>
		<div v-if="isLogin">
			<h1>환영합니다. {{ loginUserInfo.userId }}님</h1>
		</div>
		<!-- 테스트 영역 -->
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
	</v-container>
</template>

<script>
	import AuthUtil from '@/common/AuthUtil.js';

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
				list: [{ name: '가' }, { name: '나' }, { name: '다' }],
				pagination: null,
			};
		},
		computed: {
			isLogin() {
				return AuthUtil.isLogin();
			},
			loginUserInfo() {
				return AuthUtil.getAuthUserInfo();
			},
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
