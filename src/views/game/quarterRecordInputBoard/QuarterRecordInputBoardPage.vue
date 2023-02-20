<template>
	<div>
		TODO 쿼터기록 입력창
		<GameQuarterInfoComp />
		// TODO 팀별 RecordInputBoard가 있어야 함 // 하단 버튼 - 저장 / 쿼터삭제
	</div>
</template>

<script>
	import GameQuarterInfoComp from '@/views/game/quarterRecordInputBoard/components/GameQuarterInfoComp.vue';

	export default {
		components: {
			GameQuarterInfoComp,
		},
	};
</script>

<style lang="scss" scoped></style>
