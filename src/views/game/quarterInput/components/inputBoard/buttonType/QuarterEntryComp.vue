<template>
	<div>
		<v-container>
			<v-row>
				<v-col><h3>쿼터 엔트리</h3></v-col>
				<v-col>
					<EntryManageModal
						:pHomeAwayCode="this.pHomeAwayCode"
						@save-entry="emitSaveEntryEvent"
					/>
				</v-col>
			</v-row>
			<h3></h3>
		</v-container>
		<EntryTable :pEntry="pEntry" @select-player="selectPlayer" />
	</div>
</template>

<script>
	import EntryManageModal from '@/views/game/quarterInput/components/modal/EntryManageModal.vue';
	import EntryTable from '@/views/game/quarterInput/components/inputBoard/buttonType/EntryTable.vue';

	const SELECT_PLAER_EVENT = 'select-player';
	export default {
		mounted() {
			const hasEntryPlayers = this.pEntry.length > 0;
			if (hasEntryPlayers) {
				const defaultSelectedPlayer = this.pEntry[0];
				this.$emit(SELECT_PLAER_EVENT, defaultSelectedPlayer);
			}
		},
		components: {
			EntryManageModal,
			EntryTable,
		},
		props: {
			pHomeAwayCode: String,
			pEntry: Array,
		},
		methods: {
			selectPlayer(player) {
				this.$emit(SELECT_PLAER_EVENT, player);
			},
			emitSaveEntryEvent() {
				this.$emit('save-entry');
			},
		},
	};
</script>

<style lang="scss" scoped></style>
