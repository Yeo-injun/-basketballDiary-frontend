<template>
	<div>
		<h3>쿼터 엔트리</h3>
		// TODO 엔트리 관리 버튼 구현
		<EntryTable :pEntry="pEntry" @select-player="selectPlayer" />
	</div>
</template>

<script>
	import EntryTable from '@/views/game/quarterRecordInputBoard/components/EntryTable.vue';

	const SELECT_PLAER_EVENT = 'select-player';
	export default {
		components: {
			EntryTable,
		},
		props: {
			pEntry: Array,
		},
		methods: {
			selectPlayer(player) {
				this.$emit(SELECT_PLAER_EVENT, player);
			},
		},
		mounted() {
			const defaultSelectedPlayer = this.pEntry[0];
			this.$emit(SELECT_PLAER_EVENT, defaultSelectedPlayer);
		},
	};
</script>

<style lang="scss" scoped></style>
