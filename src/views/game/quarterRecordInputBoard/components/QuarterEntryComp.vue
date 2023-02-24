<template>
	<div>
		<h3>쿼터 엔트리</h3>
		// TODO 클릭 이벤트 에밋 // TODO 엔트리 관리 버튼 구현
		<EntryTable :pEntry="pEntry" @select-player="selectPlayer" />
	</div>
</template>

<script>
	import EntryTable from '@/views/game/quarterRecordInputBoard/components/EntryTable.vue';

	export default {
		components: {
			EntryTable,
		},
		props: {
			pEntry: Array,
		},
		methods: {
			selectPlayer(player) {
				this.$emit('select-player', player);
				alert('QuarterEntryComp');
				console.log(player);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
