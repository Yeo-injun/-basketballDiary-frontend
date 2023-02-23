<template>
	<div>
		<h3>쿼터 엔트리</h3>
		// TODO 클릭 이벤트 에밋
		<EntryTable :pEntry="pEntry" />
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
	};
</script>

<style lang="scss" scoped></style>
