<template>
	<v-container>
		<v-row>
			<v-col>
				<h3>선수기록지</h3>
			</v-col>
			<v-col>
				<EntryManageModal
					:pHomeAwayCode="this.pHomeAwayCode"
					@save-entry="emitSaveEntryEvent"
				/>
			</v-col>
		</v-row>
		<InGameRecordSheet :pEntry="pEntry" @emit-stat-info="createRecord" />
	</v-container>
</template>

<script>
	import EntryManageModal from '@/views/game/quarterRecordInputBoard/modal/EntryManageModal.vue';
	import InGameRecordSheet from '@/views/game/quarterRecordInputBoard/components/InGameRecordSheetComp.vue';

	export default {
		// created() {
		// 	alert('RecordTableSheet CREATED!!!');
		// },
		// mounted() {
		// 	alert('RecordTableSheet MOUNTED!!!');
		// },
		// destroy() {
		// 	alert('RecordTableSheet Destroy!!!');
		// },
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
			// emitPlayerRecord(player) {
			// 	this.$emit('add-player-record', {
			// 		gameJoinPlayerSeq: player.gameJoinPlayerSeq,
			// 		homeAwayCode: this.pHomeAwayCode,
			// 		statType: this.latestAddStat.statType,
			// 		mode: this.latestAddStat.mode,
			// 		timeStamp: this.latestAddStat.timeStamp,
			// 	});
			// 	// 새로운 객체로 초기화
			// 	this.latestAddStat = {};
			// },
			// emitCancelPlayerRecord(cancelInfo) {
			// 	this.$emit('cancel-player-record', {
			// 		gameJoinPlayerSeq: cancelInfo.gameJoinPlayerSeq,
			// 		homeAwayCode: this.pHomeAwayCode,
			// 		statType: cancelInfo.statType,
			// 		mode: cancelInfo.mode,
			// 		timeStamp: new Date(),
			// 	});
			// },
		},
	};
</script>

<style lang="scss" scoped></style>
