<template>
	<v-container>
		<h3>소속팀(변수처리)</h3>
		<h4>게임목록조회</h4>
		<GameRecordSearchComp />
		<!-- 목록영역 컴포넌트 : 소제목 포함 / item 반복문 -->
	</v-container>
</template>

<script>
	import GameRecordSearchComp from '@/components/game/GameRecordSearchComp.vue';

	export default {
		components: {
			GameRecordSearchComp,
		},
		data() {
			return {};
		},
		methods: {},
	};
</script>

<style lang="scss" scoped></style>
