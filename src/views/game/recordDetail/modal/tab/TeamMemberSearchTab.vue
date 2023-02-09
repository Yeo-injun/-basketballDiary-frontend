<template>
	<div>
		<div>팀원검색</div>
		<PlayerDataTable />
	</div>
</template>

<script>
	import PlayerDataTable from '@/components/game/gameJoinPlayer/PlayerDataTable.vue';

	export default {
		components: {
			PlayerDataTable,
		},
	};
</script>

<style lang="scss" scoped></style>
