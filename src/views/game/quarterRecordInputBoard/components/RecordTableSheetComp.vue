<template>
	<v-container>
		<v-row>
			<v-col>
				<h3>선수기록지</h3>
			</v-col>
			<v-col>
				<EntryManageModal
					:pHomeAwayCode="this.pHomeAwayCode"
					@post-open-handle="emitOpenEntryManageModal"
					@save-entry="emitSaveEntryEvent"
				/>
			</v-col>
		</v-row>
		<InGameRecordSheet :pEntry="pEntry" @emit-stat-info="createRecord" />
	</v-container>
</template>

<script>
	import EntryManageModal from '@/views/game/quarterRecordInputBoard/modal/EntryManageModal.vue';
	import InGameRecordSheet from '@/views/game/quarterRecordInputBoard/components/inputBoard/InGameRecordSheetComp.vue';

	export default {
		components: {
			EntryManageModal,
			InGameRecordSheet,
		},
		props: {
			pHomeAwayCode: String,
			pEntry: Array,
		},
		data() {
			return {
				latestAddStat: {},
			};
		},
		methods: {
			emitOpenEntryManageModal() {
				this.$emit('open-entry-manage-modal');
			},
			emitSaveEntryEvent() {
				this.$emit('save-entry');
			},
			createRecord(statInfo) {
				this.$emit('add-player-record', {
					gameJoinPlayerSeq: statInfo.gameJoinPlayerSeq,
					homeAwayCode: this.pHomeAwayCode,
					statType: statInfo.statType,
					mode: statInfo.mode,
					timeStamp: new Date(),
				});
			},
		},
	};
</script>

<style lang="scss" scoped></style>
