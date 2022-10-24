<template>
	<v-container>
		<h3>소속팀(변수처리)</h3>
		<h4>게임목록조회</h4>
		<!-- 검색영역 컴포넌트 : 검색버튼 포함 -->
		<SearchBtn />
		<!-- 목록영역 컴포넌트 : 소제목 포함 / item 반복문 -->
	</v-container>
</template>

<script>
	import SearchBtn from '@/components/button/SearcheBtn.vue';

	export default {
		components: {
			SearchBtn,
		},
		data() {
			return {};
		},
		methods: {},
	};
</script>

<style lang="scss" scoped></style>
