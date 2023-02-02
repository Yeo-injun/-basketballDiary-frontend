<template>
	<div>
		<!-- 참가선수 목록Comp -->
		<GameJoinPlayersComp />
		<!-- 참가선수 선택Comp -->
	</div>
</template>

<script>
	import GameJoinPlayersComp from '@/views/game/recordDetail/modal/GameJoinPlayersComp.vue';

	export default {
		components: {
			GameJoinPlayersComp,
		},
	};
</script>

<style lang="scss" scoped></style>
